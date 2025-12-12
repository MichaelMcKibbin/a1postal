// /pages/services.js
import Link from "next/link";

const services = [
    { slug: 'standard-shipping', name: 'Standard Shipping' },
    { slug: 'express-delivery', name: 'Express Delivery' },
    { slug: 'international', name: 'International Shipping' },
    { slug: 'packaging', name: 'Packaging Services' },
    { slug: 'insurance', name: 'Shipping Insurance' },
    { slug: 'bulk-shipping', name: 'Bulk Shipping'}
];

const activities = [
    { slug: 'letter-simulator', name: 'Letter Simulator', description: 'Interactive letter writing experience' }
];

export default function Services() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Our Services</h2>
            <p>Comprehensive postal and shipping solutions for all your needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {services.map(service => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-300">
                        <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                    </Link>
                ))}
            </div>
            
            <h2 className="text-xl font-semibold mb-4 mt-8">📝 Interactive Activities</h2>
            <p>Try our postal-themed interactive experiences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {activities.map(activity => (
                    <Link key={activity.slug} href={`/${activity.slug}`} className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-300">
                        <h3 className="text-lg font-semibold text-blue-800">{activity.name}</h3>
                        <p className="text-sm text-blue-600 mt-2">{activity.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}