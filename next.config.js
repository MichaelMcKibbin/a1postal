// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    output: 'standalone'
};

module.exports = nextConfig;
