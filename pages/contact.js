export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Get In Touch</h1>
                
                <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Looking for Web Development Services?</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            I'm Michael McKibbin, a full-stack developer specializing in modern web applications. 
                            This A1 Postal site showcases Next.js, React, and server-side rendering capabilities.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <a 
                            href="https://michaelmckibbin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-md block"
                        >
                            🌐 Visit My Portfolio<br />
                            <span className="text-sm opacity-90">michaelmckibbin.com</span>
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/in/michaelkevinmckibbin/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-md block"
                        >
                            💼 Connect on LinkedIn<br />
                            <span className="text-sm opacity-90">Professional Network</span>
                        </a>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3">Services I Offer:</h3>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>• Next.js & React Development</div>
                            <div>• Server-Side Rendering (SSR)</div>
                            <div>• Full-Stack Web Applications</div>
                            <div>• API Development & Integration</div>
                            <div>• Responsive Design</div>
                            <div>• Database Design & Management</div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                        This demonstration site shows modern web development practices including SSR, 
                        API routes, and responsive design. Contact me through my main website for project inquiries.
                    </p>
                </div>
            </div>
        </div>
    );
}