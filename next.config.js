/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  // useFileSystemPublicRoutes: false,
  // serverRuntimeConfig: {
  //   mySecret: "secret",
  //   SERVER_ROOT: "./",
  // },
  // publicRuntimeConfig: {
  //   API_URL: "http://localhost:3000/api",
  // },
};

module.exports = nextConfig;
