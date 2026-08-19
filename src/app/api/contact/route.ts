import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required." },
      { status: 400 }
    );
  }

  const html = `
    <h2>New Contact Form Submission Website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
    <p><strong>Subject:</strong> ${subject}</p>
    <hr />
    <p>${message}</p>
  `;

  // Pemanggilan Resend API
  const { error } = await resend.emails.send({
    // Format "Name <onboarding@resend.dev>" diizinkan oleh Resend
    from: process.env.CONTACT_EMAIL_FROM || "Hedgar Construction <onboarding@resend.dev>",
    // Pastikan fallback TO diarahkan ke email pribadi/uji coba Anda
    to: [process.env.CONTACT_EMAIL_TO || "msh.webdev@gmail.com"], 
    subject: `[Contact] ${subject}`,
    html,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}