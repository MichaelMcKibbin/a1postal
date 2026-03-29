export async function getServerSideProps() {
    return {
        props: {
            renderedAt: new Date().toISOString(),
            serverRendered: true,
        },
    };
}

export default function SsrDemo({ renderedAt, serverRendered }) {
    const formattedTime = new Date(renderedAt).toLocaleString("en-IE", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Europe/Dublin",
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
                    Server-Side Rendering Demo
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    This page is rendered on the server using Next.js.
                </p>

                <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Render Information
                        </h2>
                        <p className="text-sm text-green-600 font-medium">
                            ✅ Rendered on Server: {serverRendered ? "Yes" : "No"}
                        </p>
                        <p className="text-sm text-gray-600">
                            Rendered at: {formattedTime}
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">
                            What this demonstrates
                        </h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• HTML is generated on the server before reaching the browser</li>
                            <li>• Content can be produced dynamically per request</li>
                            <li>• Pages can be more SEO-friendly</li>
                            <li>• The initial load can include meaningful pre-rendered content</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}