import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      "source.unsplash.com",
      "lh3.googleusercontent.com",
      'png.pngtree.com', // Adicionado o domínio necessário
      'encrypted-tbn0.gstatic.com', // Adicionado para suportar as imagens fornecidas
    ]
    
  }
};

export default nextConfig;
