import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message, recaptcha } = req.body;

    if (!name || !email || !message || !recaptcha) {
        return res.status(400).json({ message: 'All fields and reCAPTCHA required' });
    }

    // Temporarily bypass reCAPTCHA for testing
    console.log('Bypassing reCAPTCHA verification for testing');
    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
    // });
    // 
    // const recaptchaData = await recaptchaResponse.json();
    // console.log('reCAPTCHA response:', recaptchaData);
    // if (!recaptchaData.success) {
    //     return res.status(400).json({ message: 'reCAPTCHA verification failed', details: recaptchaData });
    // }

    try {
        console.log('Attempting to send email with config:', {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER ? 'SET' : 'NOT SET',
            to: process.env.EMAIL_TO
        });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT == '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Contact Form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Detailed email error:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
}