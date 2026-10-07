const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
