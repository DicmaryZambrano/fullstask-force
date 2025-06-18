import { NextResponse } from 'next/server';
import { Resend } from 'resend';
export const runtime = 'nodejs';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.formData();
  const name = data.get('name');
  const email = data.get('email');

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const senderName = String(name);
    const senderEmail = String(email);

    await resend.emails.send({
      from: 'Handcrafted Haven <onboarding@resend.dev>', 
      to: senderEmail,
      subject: 'Welcome to Handcrafted Haven!',
      html: `
        <h1>Welcome, ${senderName}!</h1>
        <p>Thanks for subscribing. Get ready for beautiful handcrafted treasures ✨</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
