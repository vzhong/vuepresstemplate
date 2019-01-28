module.exports = {
  title: 'ShARC Analysis',
  head: [
    ['link', {rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css'}],
    ['script', {src: 'https://unpkg.com/marked@0.3.6'}],
    ['script', {src: 'https://unpkg.com/lodash@4.16.0'}],
  ],
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
