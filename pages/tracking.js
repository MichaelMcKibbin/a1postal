// /pages/tracking.js
import { useState } from "react";

export default function Tracking() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingResult, setTrackingResult] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        if (trackingNumber.trim()) {
            // Simulate tracking result
            setTrackingResult({
                number: trackingNumber,
                status: "In Transit",
                location: "Distribution Center",
                estimatedDelivery: "Tomorrow by 5:00 PM"
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Package Tracking</h2>
            <p className="text-center mb-8 text-gray-600">Enter your tracking number to get real-time updates on your package.</p>
            
            <form onSubmit={handleTrack} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Track
                    </button>
                </div>
            </form>

            {trackingResult && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Tracking Results</h3>
                    <div className="space-y-2">
                        <p><strong>Tracking Number:</strong> {trackingResult.number}</p>
                        <p><strong>Status:</strong> <span className="text-green-600">{trackingResult.status}</span></p>
                        <p><strong>Current Location:</strong> {trackingResult.location}</p>
                        <p><strong>Estimated Delivery:</strong> {trackingResult.estimatedDelivery}</p>
                    </div>
                </div>
            )}
        </div>
    );
}