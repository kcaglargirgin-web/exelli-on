import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form Submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { fullName, email, vision } = req.body;

      if (!fullName || !email || !vision) {
        return res.status(400).json({ error: 'All fields (fullName, email, vision) are required.' });
      }

      const recipient = process.env.RECIPIENT_EMAIL || 'k.caglar.girgin@gmail.com';
      const smtpUser = process.env.SMTP_USER;
      // Clean space formatting in app password if needed
      const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : undefined;
      const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

      console.log(`[Contact Form] New submission from ${fullName} (${email}) for ${recipient}:`);
      console.log(`Vision: ${vision}`);

      // 1. Send via Nodemailer SMTP if credentials exist
      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
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

        return res.json({ success: true, message: 'Email sent successfully via SMTP.' });
      }

      // 2. Forward to Formspree Endpoint if configured
      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, vision, _to: recipient }),
        });

        if (response.ok) {
          return res.json({ success: true, message: 'Form forwarded successfully via Formspree.' });
        }
      }

      // 3. Fallback: Logged on server (Awaiting SMTP configuration)
      return res.json({
        success: true,
        delivered: false,
        message: 'Submission received and logged. Add SMTP_USER & SMTP_PASS to send live emails.',
      });
    } catch (err: any) {
      console.error('[Contact Form Error]', err);
      return res.status(500).json({ error: 'Failed to process inquiry.', details: err.message });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Exelli-on Server running on http://localhost:${PORT}`);
  });
}

startServer();
