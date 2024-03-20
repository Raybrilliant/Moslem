if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let c = {};
    const t = (e) => n(e, r),
      o = { module: { uri: r }, exports: c, require: t };
    s[r] = Promise.all(i.map((e) => o[e] || t(e))).then((e) => (a(...e), c));
  };
}
define(["./workbox-9b4d2a02"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "1616faf2723ce1ca1ce8c5eae7cf78a6",
        },
        {
          url: "/_next/static/YQfdkgltFrgNIorMgdbRm/_buildManifest.js",
          revision: "e0a21c7d7f93d89dce16df0231dc76f2",
        },
        {
          url: "/_next/static/YQfdkgltFrgNIorMgdbRm/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/349-83f5a8f2102fff38.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/386-8d798146da9edec0.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/581-aab5c69cd0afb9a2.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/664-73c5004a80399d48.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/69-5516183fd0d729d1.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/703-516722f3d041be2f.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/792-396356b9234c6511.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/912-24b09fa2bab16b26.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/_not-found-4acd1dc965b94c58.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/about/page-150ead40e95100f1.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/layout-fd0aa7ec3a2dfeb8.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/loading-8ca67ffe3a8481ca.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/page-642a17095b62f32f.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/quran/loading-fe4638c989d01c01.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/quran/page-79faf0600ad519ba.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/surah/%5Bid%5D/loading-167cf59e888af48d.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/app/surah/%5Bid%5D/page-3d99e935e98747fc.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/fd9d1056-f898535ba37b63c1.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/framework-aec844d2ccbe7592.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/main-1963ea360faedc38.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/main-app-e22876323178d2fc.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/pages/_app-75f6107b0260711c.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-8f2fe794096b2f6a.js",
          revision: "YQfdkgltFrgNIorMgdbRm",
        },
        {
          url: "/_next/static/css/5aea36818bd83e92.css",
          revision: "5aea36818bd83e92",
        },
        {
          url: "/_next/static/css/feb8a49405c4c062.css",
          revision: "feb8a49405c4c062",
        },
        {
          url: "/_next/static/media/7336262c93a38de8-s.p.otf",
          revision: "43269f118299246de0cf264e04ae2680",
        },
        {
          url: "/android/android-launchericon-144-144.png",
          revision: "811b4185e870c1d09ce566e7910abaab",
        },
        {
          url: "/android/android-launchericon-192-192.png",
          revision: "cf56d8c15a5ac49474f9763c17877fe5",
        },
        {
          url: "/android/android-launchericon-48-48.png",
          revision: "3f3582ba6da2737bff3d09bdf38ae2f3",
        },
        {
          url: "/android/android-launchericon-512-512.png",
          revision: "74ca6a13bede955a55d04921909aafdf",
        },
        {
          url: "/android/android-launchericon-72-72.png",
          revision: "293174d2d8ec1fab2fa4cc998467b9ca",
        },
        {
          url: "/android/android-launchericon-96-96.png",
          revision: "b82c1986793f8b4fe7bf4b480bab6866",
        },
        { url: "/day.png", revision: "72415f41d77ebcb7b05ef5f7a92953dd" },
        {
          url: "/font/Uthmanic.otf",
          revision: "43269f118299246de0cf264e04ae2680",
        },
        { url: "/ios/100.png", revision: "1243e703682388882944896352f41dd7" },
        { url: "/ios/1024.png", revision: "32c7b769a0186441341b92213634401d" },
        { url: "/ios/114.png", revision: "77b00fb0be949972c42f89d46b1c6d14" },
        { url: "/ios/120.png", revision: "72d2929d9fb8c330148c4755732e030a" },
        { url: "/ios/128.png", revision: "97048cbe8f8edb7c4cdca97bd272905d" },
        { url: "/ios/144.png", revision: "811b4185e870c1d09ce566e7910abaab" },
        { url: "/ios/152.png", revision: "58ab5d61c983bd0be97852491bd5cda3" },
        { url: "/ios/16.png", revision: "dc7862de7b35c53d014ebb7bb60ab938" },
        { url: "/ios/167.png", revision: "48453faca5e0d4e1cf9bbedc03f8ffff" },
        { url: "/ios/180.png", revision: "0d8f0418251ff907d0a69be47155479a" },
        { url: "/ios/192.png", revision: "cf56d8c15a5ac49474f9763c17877fe5" },
        { url: "/ios/20.png", revision: "ef3823d1b6f8f7360a09ba22c206a694" },
        { url: "/ios/256.png", revision: "66f06dd76e839610ffaa48621caec6d3" },
        { url: "/ios/29.png", revision: "c85c039b8bfb23bed42c13b2b8212c24" },
        { url: "/ios/32.png", revision: "88e29c586c15226f0027c7f3c49f70bc" },
        { url: "/ios/40.png", revision: "c91a5d757715a140c037035e84e94580" },
        { url: "/ios/50.png", revision: "abbe7498e38295eb198a4f0e3a5e1bf6" },
        { url: "/ios/512.png", revision: "74ca6a13bede955a55d04921909aafdf" },
        { url: "/ios/57.png", revision: "4e0fbf6dc49f23499fa093ddde16ce45" },
        { url: "/ios/58.png", revision: "b32a3117677568fe0bb66023dd365982" },
        { url: "/ios/60.png", revision: "d5407b123324331b8140b30cd9b8f6e9" },
        { url: "/ios/64.png", revision: "9bf7c46d919cbb44df81819137848fd5" },
        { url: "/ios/72.png", revision: "293174d2d8ec1fab2fa4cc998467b9ca" },
        { url: "/ios/76.png", revision: "81d0870cafee93b465a4d59d220c9b4e" },
        { url: "/ios/80.png", revision: "e1e19136650a1cc4926cbfb796571285" },
        { url: "/ios/87.png", revision: "36490c5910a64e8c8579f61f5ba0cf5b" },
        { url: "/manifest.json", revision: "93c9b43cee7ead19f8c70cfeff1fbd0f" },
        { url: "/mosque.png", revision: "60482a9532c3361c1ff58a3795d854ed" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/night.png", revision: "bfade535c37158c40e444204eeba0289" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
