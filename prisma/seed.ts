import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- YOUR PRODUCT DATA ---
const products = [
  // --- COMPUTERS & LAPTOPS ---
  {
    name: 'Dell 14″ Latitude 7420 2-in-1 Touchscreen – RGRW0',
    slug: 'dell-14-latitude-7420-2-in-1-touchscreen-rgrw0',
    image: '/computerandlaptops/dell/dell1.png',
    category: 'Laptops, Dell',
    price: null, // "Get a Quote"
    sku: 'RGRW0',
    stock: 50,
    description: "Dell 14 inch Latitude 7420 2-in-1 Touchscreen Notebook Overview. Slim and versatile design with a 360 degree hinge."
  },
  {
    name: 'HP 14″ EliteBook 640 G9 – 6C0Z3UT',
    slug: 'hp-14-elitebook-640-g9-6c0z3ut',
    image: '/computerandlaptops/hp2/1.jpg',
    category: 'Laptops, HP',
    price: null,
    sku: '6C0Z3UT',
    stock: 50,
    description: "HP 14 inch EliteBook 640 G9 Overview. A professional 14 inch laptop featuring a sleek and durable chassis built for business mobility."
  },
  {
    name: 'Lenovo 100e Chromebook Gen 4 82W00003UK',
    slug: 'lenovo-100e-chromebook-gen-4-82w00003uk-29-5-cm-11-6-chromebook',
    image: '/computerandlaptops/lenovo/l1.jpg',
    category: 'Laptops, Lenovo',
    price: null,
    sku: '82W00003UK',
    stock: 100,
    description: "Lenovo 100e Chromebook Gen 4. A rugged 11.6 inch Chromebook built to withstand the rigors of the classroom."
  },
  {
    name: 'HP 250 G10 15.6″ Notebook – 16 GB',
    slug: 'hp-250-g10-39-6-cm-15-6-notebook-16-gb',
    image: '/computerandlaptops/hp2/1.jpg',
    category: 'Laptops, HP',
    price: null,
    sku: '9B9R8EA',
    stock: 20,
    description: "HP 250 G10 15.6 inch Notebook. An essential business laptop offering a large screen for productivity."
  },
  
  // --- DOCKING STATIONS ---
  {
    name: 'Dell WD19S Docking station - USB-C',
    slug: 'dell-wd19s-docking-station-usb-c',
    image: '/dell-docking-station/5.jpg',
    category: 'Docking Station, Dell',
    price: null,
    sku: '210-AZBG',
    stock: 200,
    description: "Dell WD19S Docking station. Transform your laptop into a full desktop workstation with a single USB-C cable."
  },
  {
    name: 'HP USB-C Dock G5',
    slug: 'hp-usb-c-dock-g5-5tw10aa',
    image: '/hp-docking-station/3.jpg',
    category: 'Docking Station, HP',
    price: null,
    sku: '5TW10AA',
    stock: 150,
    description: "A versatile USB-C dock designed for the modern workspace, providing video, data, and power over a single cable."
  },

  // --- NETWORKING (SWITCHES & ROUTERS) ---
  {
    name: 'Ubiquiti UniFi Dream Machine Pro (UDM-Pro)',
    slug: 'ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro',
    image: '/ubiquiti/5.png',
    category: 'Networking, Ubiquiti',
    price: null,
    sku: 'UDM-Pro',
    stock: 30,
    description: "All-in-one enterprise security gateway and network appliance for small to medium-sized businesses."
  },
  {
    name: 'Ubiquiti UniFi U6+ Access Point',
    slug: 'ubiquiti-unifi-u6',
    image: '/ubiquiti/7.jpg',
    category: 'Networking, Ubiquiti',
    price: null,
    sku: 'U6-Plus',
    stock: 500,
    description: "Compact, dual-band WiFi 6 access point with 2x2 MIMO and OFDMA functionality."
  },
  {
    name: 'Aruba Instant On 1930 24G 4SFP/SFP+ Switch',
    slug: 'aruba-jl683a-aba-instant-on-1930',
    image: '/aruba/1.jpg',
    category: 'Networking, Aruba',
    price: null,
    sku: 'JL683A',
    stock: 45,
    description: "Aruba Instant On 1930 24G Class4 PoE 4SFP/SFP+ 370W Switch. High performance, smart-managed switch."
  },
  
  // --- PRINTERS ---
  {
    name: 'HP LaserJet Pro M501dn',
    slug: 'hp-laserjet-pro-m501dn-j8h61a-bgj',
    image: '/hp-printers/3.jpg',
    category: 'Printers, HP',
    price: null,
    sku: 'J8H61A',
    stock: 15,
    description: "Put impressive print speeds and performance to work in your office. This energy-saving printer starts faster and delivers security features."
  },
  {
    name: 'Brother HL-L6410DW Laser Printer',
    slug: 'brother-hl-l6410dw-laser-printer-1200-dpi-wi-fi-duplex-printing',
    image: '/brother/1.png',
    category: 'Printers, Brother',
    price: null,
    sku: 'HLL6410DW',
    stock: 25,
    description: "Professional monochrome laser printer with wireless connectivity and duplex printing."
  },

  // --- ACCESSORIES (MONITORS & UPS) ---
  {
    name: 'Acer V246HL 24″ Full HD LED Monitor',
    slug: 'acer-v246hl-24-1920-x-1080-pixels-full-hd-led-black',
    image: '/acer/2.jpg',
    category: 'Accessories, Acer',
    price: null,
    sku: 'UM.FV6EE.001',
    stock: 100,
    description: "24-inch Full HD LED monitor with a 5ms response time and high contrast ratio."
  },
  {
    name: 'APC Smart-UPS On-Line SRT5KXLI',
    slug: 'apc-smart-ups-on-line-uninterruptible-power-supply-ups-srt5kxli',
    image: '/apc/11.avif',
    category: 'UPS, APC',
    price: null,
    sku: 'SRT5KXLI',
    stock: 5,
    description: "High density, double-conversion on-line power protection with scalable runtime."
  },
  
  // --- NEW ADDITIONS ---
  {
    name: 'D-Link DWA-X1850 AX1800 Wi-Fi 6 USB Adapter',
    slug: 'd-link-dwa-x1850-ax1800-wi-fi-6-usb-adapter',
    image: '/dlink/0.jpg',
    category: 'Accessories, D-Link',
    price: null,
    sku: 'DWA-X1850',
    stock: 200,
    description: "Next-generation Wi-Fi 6 USB adapter for instant PC or Laptop upgrade."
  },
  {
    name: 'D-Link DAP-X2850 Nuclias Connect AX3600',
    slug: 'd-link-dap-x2850-nuclias-connect-ax3600-wi-fi-6-poe-access-point',
    image: '/dlink/2.jpg',
    category: 'Networking, D-Link',
    price: null,
    sku: 'DAP-X2850',
    stock: 50,
    description: "Wi-Fi 6 AX3600 Access Point for high-density business environments."
  }
];

async function main() {
  console.log('Starting seeding...');

  for (const p of products) {
    const exists = await prisma.product.findUnique({
      where: { slug: p.slug }
    });

    if (!exists) {
      await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          image: p.image,
          category: p.category,
          price: p.price, // null means "Get a Quote"
          sku: p.sku,
          stock: p.stock,
          description: p.description,
          availability: 'In Stock'
        }
      });
      console.log(`Created: ${p.name}`);
    } else {
      console.log(`Skipped (Already Exists): ${p.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });