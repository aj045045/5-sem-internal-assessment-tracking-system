/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: 'http://127.0.0.1:5000/assessment-system/:path*'
                destination: process.env.FLASK_API_PATH
            },
        ]
    },
}