import nextPWA from 'next-pwa';
// const withPWA = nextPWA({
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//     register: false,
//     // scope: '/app',
//     // sw: 'service-worker.js',
//     //...
//   })

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        runtime: 'experimental-edge',
      },
};

export default nextConfig;
// export default withPWA(nextConfig);
