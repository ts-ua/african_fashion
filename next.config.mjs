/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['jghdcweypzxylqpmrvsn.supabase.co'], // Add the necessary domains here
    },

    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: "/uploads/:path*", // Adjust this path based on your project structure
            },
        ];
    },
};


export default nextConfig;
