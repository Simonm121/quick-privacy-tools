module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "quickprivacytools.com",
          },
        ],
        destination: "https://www.quickprivacytools.com/:path*",
        permanent: true,
      },
    ];
  },
};
