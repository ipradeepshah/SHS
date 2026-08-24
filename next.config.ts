import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows access from any local network IP (192.168.x.x, 10.x.x.x etc.)
  // This fixes the "Blocked cross-origin request" warning when opening
  // the site from http://192.168.x.x:3000 instead of localhost
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.105",
    "192.168.18.10",
    "192.168.0.*",
    "192.168.1.*",
    "192.168.18.*",
    "10.0.0.*",
    "10.0.1.*",
  ],
};

export default nextConfig;
