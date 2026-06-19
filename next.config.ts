import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTENT_SECURITY_POLICY,
  PROTECTED_ASSET_ROBOTS,
  SECURITY_HEADERS,
} from './src/lib/security/headers';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const framerStub = path.join(projectRoot, 'src/framer/stubs/framer.ts');
const utilsStub = path.join(projectRoot, 'src/framer/stubs/Utils.tsx');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  serverExternalPackages: ['three', 'gsap', 'troika-three-text'],
  transpilePackages: ['unframer', 'framer-motion', '@gsap/react'],
  async headers() {
    const globalHeaders = [
      ...SECURITY_HEADERS,
      { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
    ];

    const protectedAssetHeaders = [
      { key: 'X-Robots-Tag', value: PROTECTED_ASSET_ROBOTS },
      { key: 'Cache-Control', value: 'private, max-age=3600' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    ];
    return [
      {
        source: '/:path*',
        headers: globalHeaders,
      },
      {
        source: '/mockups/:path*',
        headers: protectedAssetHeaders,
      },
      {
        source: '/before-after/:path*',
        headers: protectedAssetHeaders,
      },
      {
        source: '/logo_full.png',
        headers: protectedAssetHeaders,
      },
      {
        source: '/logo_mark.png',
        headers: protectedAssetHeaders,
      },
    ];
  },  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      framer: framerStub,
      'https://framer.com/m/Utils-FINc.js': utilsStub,
    };

    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            framerVendor: {
              test: /[\\/]src[\\/]framer[\\/]vendor[\\/]/,
              name: 'framer-vendor',
              chunks: 'async',
              priority: 40,
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
  turbopack: {
    resolveAlias: {
      framer: './src/framer/stubs/framer.ts',
      'https://framer.com/m/Utils-FINc.js': './src/framer/stubs/Utils.tsx',
    },
  },
};

export default nextConfig;
