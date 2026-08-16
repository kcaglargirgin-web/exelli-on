import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName, email, vision } = body;

    if (!fullName || !email || !vision) {
      return res.status(400).json({ error: 'All fields (fullName, email, vision) are required.' });
    }

    const recipient = process.env.RECIPIENT_EMAIL || 'k.caglar.girgin@gmail.com';
    const smtpUser = process.env.SMTP_USER || 'k.caglar.girgin@gmail.com';
    const rawPass = process.env.SMTP_PASS || '';

    if (!rawPass) {
      return res.status(500).json({
        error: 'SMTP_PASS environment variable is missing in Vercel settings.',
      });
    }

    // Clean space formatting if copied with spaces (e.g., "yoib qdna revs xwsq" -> "yoibqdnarevsxwsq")
    const cleanPass = rawPass.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: smtpUser,
        pass: cleanPass,
      },
    });

    await transporter.sendMail({
      from: `"Exelli-on Web Portal" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `[Exelli-on Inquiry] New Vision from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nVision:\n${vision}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #332d2b; max-width: 600px;">
          <h2 style="color: #c99f90; border-bottom: 2px solid #f4ece6; padding-bottom: 10px;">Exelli-on Dialogue Inquiry</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Reply Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background-color: #fdfbf9; border: 1px solid #d8b6a9; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="margin: 0; font-weight: bold; color: #6e5d57;">Vision & Inquiry Details:</p>
            <p style="margin-top: 10px; white-space: pre-wrap; line-height: 1.6;">${vision}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully via SMTP.' });
  } catch (err: any) {
    console.error('[Vercel Contact API Error]', err);
    return res.status(500).json({ error: 'Failed to send email via SMTP.', details: err.message });
  }
}
