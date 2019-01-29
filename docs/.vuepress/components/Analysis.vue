<template lang='pug'>
  .box
    p.has-text-weight-bold Analysis
    .block
      .columns
        .column
          p #[span.tag.is-dark Annotated]
        .column
          p {{annotated.length}} / {{data.length}}
        .column.is-three-quarters
          progress.progress(:value='annotated.length', :max='data.length') {{annotated.length}} / {{data.length}}
    .block(v-for='t in tags')
      .columns
        .column
          p #[span.tag.is-dark {{t}}]
        .column
          p {{groupByTag[t].length}} / {{annotated.length}}
        .column.is-three-quarters
          progress.progress(:value='groupByTag[t].length', :max='annotated.length') {{groupByTag[t].length}} / {{annotated.length}}
</template>


<script>
export default {
  props: ['data'],
  data() {
    return {
    }
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    annotated() {return this.data.filter(ex => ex.tags && ex.tags.length > 0)},
    groupByTag() {
      var group = {}
      this.data.forEach(e => {
        e.tags.forEach(t => {
          if (!group[t]) {
            group[t] = []
          }
          group[t].push(e)
        })
      })
      return group
    },
    tags() {
      var tags = Object.keys(this.groupByTag)
      tags.sort()
      return tags
    }
  },
  methods: {
  }
}
</script>
