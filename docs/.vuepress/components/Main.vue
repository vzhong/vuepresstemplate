<template lang='pug'>
  .main
    section.hero
      .hero-body
        .container
          h1.title ShARC Analysis
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
    var o = this
    fetch('analysis.json')
      .then(response => response.json())
      .then(json => o.$store.commit('SET_DATA', json));
  },
  watch: {
  },
  computed: {
    raw() {
      return this.$store.getters.getData
    }
  },
  methods: {
    validate() {
      console.log(this.raw)
    }
  }
}
</script>
<style scoped>
</style>
