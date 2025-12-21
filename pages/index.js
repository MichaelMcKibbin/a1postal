import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col" style={{minHeight: 'calc(100vh - 80px)'}}>
            <div className="flex-grow flex flex-col items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-6">Welcome to A1 Postal</h1>
                    <p className="text-xl text-gray-600 mb-8">Your trusted partner for postal and shipping services</p>
                    <div className="flex flex-col gap-4 items-center">
                        <Link href="/services"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                            Our Services
                        </Link>
                        <Link href="/tracking"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                            Track Package
                        </Link>
                    </div>
                </div>
            </div>
            
            <footer className="bg-gray-100 border-t border-gray-200 py-6 px-8 mt-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        A Node.js server side rendered (SSR) web application built with Next.js, React, and Tailwind CSS, with automatic deployment via GitHub webhook.
                    </p>
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} A1Postal.com. • All rights reserved. • <a href="https://michaelmckibbin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Michael McKibbin</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}