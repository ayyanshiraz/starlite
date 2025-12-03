import nodemailer from 'nodemailer';

// 1. Helper to parse the port number
const port = Number(process.env.SMTP_PORT) || 465;

// 2. Create Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: port,
  secure: port === 465, // True for 465, False for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // 🟢 FIX: Trust the shared hosting certificate
  tls: {
    rejectUnauthorized: false
  }
});

// 3. Send Order Notification (For Paid Orders)
export async function sendOrderEmail(order: any) {
  try {
    const shortId = order.id.slice(-8).toUpperCase();
    const total = (order.amountTotal / 100).toFixed(2);
    const date = new Date(order.createdAt).toLocaleString();

    // Safe check for items array
    const items = Array.isArray(order.items) ? order.items : [];
    
    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.sku || '-'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">x${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price / 100).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00001E;">New Order Received! (#${shortId})</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">PAID (Processing)</span></p>
        <hr />
        <h3>👤 Customer</h3>
        <p>
          ${order.customerName}<br/>
          ${order.customerEmail}<br/>
          ${order.customerPhone || 'N/A'}
        </p>
        <h3>📍 Address</h3>
        <p>
          ${order.addressLine1}<br/>
          ${order.city}, ${order.postalCode}<br/>
          ${order.country}
        </p>
        <h3>🛒 Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>${itemsHtml}</tbody>
        </table>
        <h3 style="text-align: right; margin-top: 20px;">Total: $${total}</h3>
      </div>
    `;

    await transporter.sendMail({
      from: `"Starlight System" <${process.env.SMTP_USER}>`,
      to: 'billing@starlightlinkers.com', // Send to yourself
      subject: `💰 New Order #${shortId} - $${total}`,
      html: htmlContent,
    });
    console.log(`📧 Order Email sent for #${shortId}`);
  } catch (error) {
    console.error("❌ Order Email Failed:", error);
  }
}

// 4. Send OTP to Admin (For Login)
export async function sendAdminOTP(email: string, code: string) {
  try {
    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 400px;">
        <h2 style="color: #00001E;">Admin Login Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="letter-spacing: 5px; background: #f3f4f6; padding: 10px; text-align: center;">${code}</h1>
        <p style="color: #666; font-size: 12px;">Valid for 5 minutes.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Starlight Security" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🔐 Login Code: ${code}`,
      html: htmlContent,
    });
    console.log(`📧 OTP sent to ${email}`);
  } catch (error: any) {
    console.error("❌ OTP Email Failed:", error.message);
    // We THROW the error so the UI knows it failed
    throw error;
  }
}