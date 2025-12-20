export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields required' });
    }

    // Log the submission (in production, you'd save to database or send email)
    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({ message: 'Message received successfully' });
}