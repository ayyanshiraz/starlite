import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // This map links your existing IDs to new, clean SKUs
  const updates = [
    // Laptops & Tablets
    { id: "cmiig7bpe00105xg055n2e812", sku: "HP-ProBook-450-G10" },
    { id: "cmiig7qre001z5xg0lrm5xycq", sku: "Lenovo-Tab-M9" },
    { id: "cmiig7r5800205xg0u2g0xy1n", sku: "ThinkBook-14-G7-ARP" },
    { id: "cmiig8ar000375xg0y5cj5og4", sku: "ThinkPad-X1-Carbon-G12" },
    { id: "cmiig8bfm00395xg0ksyc4v3e", sku: "ThinkPad-X1-C-G12-Ultra5" },
    { id: "cmiig8ca4003b5xg06m53da3u", sku: "ThinkPad-X1-Gen9" },
    { id: "cmiig8g5f003j5xg0uwr4rbz4", sku: "82YU00U8UK" }, // Extracted from name
    { id: "cmiig8gk3003k5xg0v125iknn", sku: "Lenovo-V15-G4-i5" },
    { id: "cmiig8h0w003l5xg0h21io2l3", sku: "83A1008YUK" }, // Extracted from name
    { id: "cmiig8hex003m5xg0pafudayf", sku: "83A100H9UK" }, // Extracted from name
    { id: "cmiig8hw1003n5xg09ebf4kdz", sku: "83A100PNUK" }, // Extracted from name
    { id: "cmiig8izm003q5xg0eeoyvp57", sku: "ThinkPad-L14-G5-AMD" },
    { id: "cmiig8kzw003v5xg0dm7p86t4", sku: "TP-E14-G6-AMD" },
    { id: "cmiig9mkk00685xg0tzq3wet6", sku: "12LN000AUK" }, // Extracted from name
    { id: "cmiiga88n007h5xg06mcf9ipf", sku: "A1VFK-001UK" }, // Extracted from name
    { id: "cmiigabje007o5xg0zgeyfq5i", sku: "PH18-72" }, // Acer Predator

    // Networking (Ubiquiti / Aruba / Cisco)
    { id: "cmiig8pjx00465xg0r07v7g33", sku: "U6-Plus" },
    { id: "cmiig8p2r00455xg0r9flmidk", sku: "USW-Enterprise-24-PoE" },
    { id: "cmjswaahw0001mrxlljc89wap", sku: "UF-MM-1G-20" },
    { id: "cmjswaai10002mrxlg5dxohio", sku: "UF-SM-10G-S" },
    { id: "cmjswaai70003mrxlmwbinry1", sku: "Axiom-SFP-DAC-0.5m" },
    { id: "cmjswaaic0004mrxlem180s95", sku: "UF-RJ45-10G" },
    { id: "cmjswaaij0005mrxlm37j4ygz", sku: "1G-SX-SFP-550M" },
    { id: "cmiig9xs9006u5xg0wxdsgcxq", sku: "NBE-5AC-GEN2" },
    { id: "cmiiga0h200705xg08354gb2i", sku: "JL256A" }, // Aruba
    { id: "cmiiga5rr007b5xg0ukvgbili", sku: "JL683A" }, // Aruba
    { id: "cmiiga66f007c5xg0q2ucvv10", sku: "AP-303P" }, // Aruba
    { id: "cmiiga7uh007g5xg03dmmld0m", sku: "U6-PRO" },
    { id: "cmjswaahi0000mrxl4fzt4atx", sku: "UF-SM-10G" },
    { id: "cmjswaaj40009mrxlq2h5ebwr", sku: "Ubiquiti-Compact-Cam" },
    { id: "cmiiga95z007j5xg0o8l9o2q0", sku: "UCG-MAX" },
    { id: "cmiiga9n0007k5xg09q4qqdvg", sku: "SFP-10G-LR" },
    { id: "cmjswaaio0006mrxli7piz5jl", sku: "Axiom-1000BASE-T" },
    { id: "cmjswaait0007mrxl5axetegg", sku: "NanoBeam-AC-2.4" },
    { id: "cmjswaaiz0008mrxlzr612px2", sku: "POE-24-12W-G" },

    // Peripherals & Accessories
    { id: "cmiig9d39005n5xg0indqs5of", sku: "HP-320K-Keyboard" },
    { id: "cmiiga4i600785xg0wtyooz1d", sku: "Acer-V246HL" },
    { id: "cmiiga4z900795xg09fau8qbr", sku: "Acer-V227Qbip" },
    { id: "cmiiga5ec007a5xg079leplo0", sku: "62D2H0E" }, // Lexmark Toner
    { id: "cmiiga6my007d5xg00sbiz6vy", sku: "APC-AR2400" }, // Netshelter 24U
    { id: "cmiiga71t007e5xg04h5ks95i", sku: "APC-AR3100" }, // Netshelter 48U
    { id: "cmiiga7ib007f5xg09oioil69", sku: "APC-Easy-UPS" },
    { id: "cmiiga8ov007i5xg047oa8tjg", sku: "MSI-PRO-H610M-E" },
    { id: "cmiigaa43007l5xg0f1dzerpp", sku: "C13S050691" } // Epson Toner
  ];

  let successCount = 0;
  let errors = [];

  for (const item of updates) {
    try {
      await prisma.product.update({
        where: { id: item.id },
        data: { sku: item.sku }
      });
      successCount++;
    } catch (e: any) {
      errors.push(`Failed ${item.sku}: ${e.message}`);
    }
  }

  return NextResponse.json({ 
    message: "Fixed Missing SKUs", 
    successCount, 
    errors 
  });
}