module.exports = {
  title: 'My title',
  ga: '',
  themeConfig: {
    author: 'Victor Zhong',
    nav: [
    ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@lib': 'node_modules',
      }
    }
  }
}
