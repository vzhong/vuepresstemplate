<template lang='pug'>
  .main
    section.hero
      .hero-body
        .container
          h1.title My title
          p.subtitle my subtitle
          p You can edit the content of this file in
          pre .vuepress/components/Main.vue
          p The main template is in 
          pre .vuepress/theme/Layout.vue
          p The following packages are installed:
          ul
            li
              a(href='https://vuex.vuejs.org/') Vuex
            li
              a(href='https://buefy.github.io') Buefy
          p In addition, #[a(href='https://materialdesignicons.com/') Material Design icons] have been installed! #[b-icon(icon='heart', size='is-small')]
    section.footer
      .container
        p Made by {{$site.themeConfig.author}}, {{(new Date()).getFullYear()}}.
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style scoped>
</style>
