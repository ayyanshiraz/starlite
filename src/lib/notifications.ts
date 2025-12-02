import { prisma } from '@/lib/prisma';

export async function createAdminNotification(order: any) {
  try {
    const shortId = order.id.slice(-8).toUpperCase();
    const total = (order.amountTotal / 100).toFixed(2);
    const customer = order.customerName || "Guest";

    await prisma.notification.create({
      data: {
        type: "NEW_ORDER",
        message: `💰 New Order #${shortId} from ${customer} - $${total}`,
        orderId: order.id,
        read: false
      }
    });

    console.log(`✅ Notification saved for Order #${shortId}`);
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
}