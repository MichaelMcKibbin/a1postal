// /pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    console.log('Contact API called:', req.method);
    
    // Debug endpoint - remove after testing
    if (req.method === 'GET') {
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.replace(/["']/g, '');
        return res.status(200).json({
            hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
            recaptchaSecretRaw: process.env.RECAPTCHA_SECRET_KEY,
            recaptchaSecretCleaned: recaptchaSecret,
            hasEmailHost: !!process.env.EMAIL_HOST
        });
    }
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, message, recaptcha } = req.body;
    console.log('Form data received:', { name, email, messageLength: message?.length });
    console.log('Environment check:', {
        hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
        recaptchaSecretLength: process.env.RECAPTCHA_SECRET_KEY?.length,
        hasEmailHost: !!process.env.EMAIL_HOST,
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
    });

    // Check environment variables (remove quotes if present)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.replace(/["']/g, '');
    if (!recaptchaSecret) {
        console.error('Missing RECAPTCHA_SECRET_KEY');
        return res.status(500).json({ message: "Missing RECAPTCHA_SECRET_KEY environment variable" });
    }

    // Verify reCAPTCHA v2
    try {
        const verifyResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`, {
            method: 'POST'
        });
        
        const verifyData = await verifyResponse.json();
        console.log('reCAPTCHA verification:', verifyData);
        
        if (!verifyData.success) {
            return res.status(400).json({ message: "reCAPTCHA verification failed" });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({ message: "reCAPTCHA verification error" });
    }

    // Clean environment variables (remove quotes)
    const emailHost = process.env.EMAIL_HOST?.replace(/["']/g, '');
    const emailPort = process.env.EMAIL_PORT?.replace(/["']/g, '');
    const emailUser = process.env.EMAIL_USER?.replace(/["']/g, '');
    const emailPass = process.env.EMAIL_PASS?.replace(/["']/g, '');

    const requiredEnvVars = { emailHost, emailPort, emailUser, emailPass };
    const missingVars = Object.entries(requiredEnvVars).filter(([key, value]) => !value).map(([key]) => key);
    
    if (missingVars.length > 0) {
        console.error('Missing environment variables:', missingVars);
        return res.status(500).json({ message: `Missing configuration: ${missingVars.join(', ')}` });
    }

    console.log('Email config:', { host: emailHost, port: emailPort, user: emailUser });

    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: parseInt(emailPort),
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    try {
        const mailOptions = {
            from: emailUser,
            to: emailUser,
            subject: `Contact Form: ${name}`,
            text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
            replyTo: email,
        };
        
        console.log('Sending email with options:', { ...mailOptions, html: '[HTML content]' });
        await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully');
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}
