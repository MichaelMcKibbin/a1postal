// /pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    console.log('Contact API called:', req.method);
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, message, recaptcha } = req.body;
    console.log('Form data received:', { name, email, messageLength: message?.length });

    // Check environment variables
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('Missing RECAPTCHA_SECRET_KEY');
        return res.status(500).json({ message: "Server configuration error" });
    }

    // Verify reCAPTCHA
    try {
        const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
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

    // Check email environment variables
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('Missing environment variables:', missingVars);
        return res.status(500).json({ message: `Missing configuration: ${missingVars.join(', ')}` });
    }

    console.log('Email config:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER
    });

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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
