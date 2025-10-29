import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // ה-host שמותר לטעון ממנו תמונות
  },
};

module.exports = nextConfig;