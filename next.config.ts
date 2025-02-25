import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        ppr: 'incremental'
    },
    images: {
        domains: ["raw.githubusercontent.com"],
    },
};

export default nextConfig;