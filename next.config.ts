import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ['*.e2b.app', '127.0.0.1', 'localhost'],
  images: { formats: ['image/avif', 'image/webp'] },
  // Baseline headers safe for the informational release. CSP and HSTS stay staging-bound
  // because they depend on the approved HTTPS domain and final service inventory.
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      ],
    }];
  },
};
export default withNextIntl(nextConfig);
