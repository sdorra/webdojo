/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // https://webcontainers.io/guides/quickstart#cross-origin-isolation
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
