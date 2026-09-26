/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect legacy/query-param variants to their canonical calculator URL
  // so filters/sorts/tracking params never become separate indexable pages.
  async redirects() {
    return [];
  },
};

export default nextConfig;
