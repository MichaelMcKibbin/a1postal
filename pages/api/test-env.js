export default function handler(req, res) {
    res.status(200).json({
        hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
        hasEmailHost: !!process.env.EMAIL_HOST,
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
        nodeEnv: process.env.NODE_ENV
    });
}