import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, product } = body;

    if (!name || !email || !phone || !product) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Professional Invoice-Style Email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #00001E; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Quote Request</h2>
        </div>
        
        <div style="padding: 20px;">
          <h3 style="color: #333; border-bottom: 2px solid #00001E; padding-bottom: 10px;">👤 Customer Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>

          <h3 style="color: #333; border-bottom: 2px solid #00001E; padding-bottom: 10px; margin-top: 30px;">📦 Product Requested</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; width: 100px;">
                ${product.image ? `<img src="${product.image}" alt="Product" style="width: 80px; height: 80px; object-fit: contain; border: 1px solid #eee;">` : 'No Image'}
              </td>
              <td style="padding: 10px; vertical-align: top;">
                <h4 style="margin: 0 0 5px 0; color: #00001E;">${product.name}</h4>
                <p style="margin: 0; font-size: 14px; color: #666;"><strong>Category:</strong> ${product.category}</p>
                <p style="margin: 0; font-size: 14px; color: #666;"><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f0f8ff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0056b3;">Please contact this customer to provide a custom quote.</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Website Quote" <${process.env.SMTP_USER}>`,
      to: 'sales@starlightlinkers.com', // Sent to you
      replyTo: email,
      subject: `📝 Quote Requested: ${product.name}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Quote Email Error:", error);
    return NextResponse.json({ error: "Failed to send quote" }, { status: 500 });
  }
}