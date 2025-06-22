import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { fromName, fromEmail, message } = await request.json();

    if (!fromName || !fromEmail || !message)
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ các trường." },
        { status: 500 }
      );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
      secure: true,
      port: 465,
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject: `Tin nhắn mới từ Portfolio: ${fromName}`,
      html: `
        <p><b>Tên người gửi:</b> ${fromName}</p>
        <p><b>Email người gửi:</b> <a href="mailto:${fromEmail}">${fromEmail}</a></p>
        <p><b>Lời nhắn:</b></p>
        <p>${message}</p>
        <br>
        <small>Email này được gửi từ form liên hệ trên portfolio của bạn.</small>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Tin nhắn đã được gửi thành công!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);

    if (error instanceof Error)
      return NextResponse.json(
        { message: `Đã xảy ra lỗi server: ${error.message}` },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "Đã xảy ra lỗi server không xác định." },
      { status: 500 }
    );
  }
}
