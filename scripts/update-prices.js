const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- CONFIGURATION ---
const SKU_FILE_PATH = path.join(__dirname, '../src/lib/sku-data.ts'); // Path to your TS file
const CSV_FILE_PATH = path.join(__dirname, '../prices.csv'); // Path to your CSV file

// --- MAIN FUNCTION ---
async function updatePrices() {
  console.log('🚀 Starting Price Update Process...');

  // 1. Check if files exist
  if (!fs.existsSync(SKU_FILE_PATH)) {
    console.error(`❌ Error: Could not find sku-data.ts at ${SKU_FILE_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`❌ Error: Could not find prices.csv at ${CSV_FILE_PATH}`);
    process.exit(1);
  }

  // 2. Read and Parse CSV
  const newPrices = new Map();
  const fileStream = fs.createReadStream(CSV_FILE_PATH);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  console.log('📖 Reading CSV file...');
  
  for await (const line of rl) {
    // Skip empty lines or headers (simple check if line contains "sku")
    if (!line || line.toLowerCase().includes('sku,price')) continue;

    // Split by comma (assuming simple CSV format: SKU,PRICE)
    const parts = line.split(',');
    if (parts.length >= 2) {
      const sku = parts[0].trim();
      let price = parts[1].trim();

      // If price is a number, keep it numeric-looking, otherwise keep string
      // You can force formatting here if you want, e.g., removing '$'
      price = price.replace('$', '');

      if (sku) {
        newPrices.set(sku, price);
      }
    }
  }

  console.log(`✅ Loaded ${newPrices.size} new prices from CSV.`);

  // 3. Read the TypeScript File
  let fileContent = fs.readFileSync(SKU_FILE_PATH, 'utf8');
  let updatesCount = 0;

  // 4. Perform Replacements using Regex
  // We look for the SKU, look ahead for the price field, and replace it.
  for (const [sku, newPrice] of newPrices) {
    // This Regex looks for:
    // 1. sku: "THE_SKU" (handles single or double quotes)
    // 2. Any amount of whitespace/newlines/other chars
    // 3. price:
    // 4. The old value (either a string or a number)
    const regex = new RegExp(`(sku:\\s*["']${escapeRegExp(sku)}["'][\\s\\S]*?price:\\s*)(["'][^"']*["']|[\\d.]+)`, 'g');

    if (regex.test(fileContent)) {
      // Check if the new price is a number or string ("Get a Quote")
      const isNumeric = !isNaN(parseFloat(newPrice)) && isFinite(newPrice);
      const formattedPrice = isNumeric ? newPrice : `"${newPrice}"`;

      fileContent = fileContent.replace(regex, `$1${formattedPrice}`);
      updatesCount++;
      console.log(`   -> Updated SKU: ${sku} to ${formattedPrice}`);
    } else {
      console.warn(`   ⚠️  Warning: SKU "${sku}" not found in sku-data.ts`);
    }
  }

  // 5. Write back to file
  if (updatesCount > 0) {
    fs.writeFileSync(SKU_FILE_PATH, fileContent, 'utf8');
    console.log(`\n🎉 Success! Updated ${updatesCount} products in sku-data.ts`);
  } else {
    console.log('\nℹ️  No matching SKUs found. No files were changed.');
  }
}

// Helper to escape special regex characters in SKU names
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

updatePrices();