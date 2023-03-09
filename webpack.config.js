module.exports = {
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
      fs: false,
      path: false,
      os: false,
    },
  },
};
