/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: "http://localhost:3002",
    JWT_KEY: "inventory_app_jwt",
  },
};

export default nextConfig;
