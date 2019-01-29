<template lang='pug'>
  .main
    section.hero
      .hero-body
        section.section
          h1 ShARC Analysis
        section.section
          Viewer
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
  mounted() {
  },
  watch: {
  },
  computed: {
    raw() {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
