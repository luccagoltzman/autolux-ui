/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Desativar o ícone do Next.js no canto inferior direito
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Desativar a análise de pacotes
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Não usar o plugin de análise de pacotes
      config.optimization.splitChunks.cacheGroups = {};
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

module.exports = nextConfig; 