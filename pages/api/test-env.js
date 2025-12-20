export default function handler(req, res) {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.replace(/["']/g, '');
    
    res.status(200).json({
        hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
        recaptchaSecretRaw: process.env.RECAPTCHA_SECRET_KEY,
        recaptchaSecretCleaned: recaptchaSecret,
        hasEmailHost: !!process.env.EMAIL_HOST,
        nodeEnv: process.env.NODE_ENV
    });
}