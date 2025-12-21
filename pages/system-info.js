export async function getServerSideProps({ req }) {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const serverTime = new Date().toISOString();
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    
    return {
        props: {
            userAgent,
            serverTime,
            clientIP,
            serverRendered: true
        }
    };
}

export default function SystemInfo({ userAgent, serverTime, clientIP, serverRendered }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-800">System Information</h1>
                <p className="text-center text-gray-600 mb-8">This page demonstrates Server-Side Rendering (SSR)</p>
                
                <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Server Details</h2>
                        <p className="text-sm text-green-600 font-medium">✅ Rendered on Server: {serverRendered ? 'Yes' : 'No'}</p>
                        <p className="text-sm text-gray-600">Server Time: {serverTime}</p>
                    </div>
                    
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Client Information</h2>
                        <p className="text-sm text-gray-600">IP Address: {clientIP}</p>
                        <p className="text-sm text-gray-600 break-all">User Agent: {userAgent}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">SSR Benefits Demonstrated:</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Server-side data fetching</li>
                            <li>• Request header access</li>
                            <li>• Pre-rendered HTML content</li>
                            <li>• SEO-friendly rendering</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}