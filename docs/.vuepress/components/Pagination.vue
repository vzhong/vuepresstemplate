<template lang='pug'>
  .paginator
    section
      p Currently showing page examples {{start+1}}-{{end}} out of {{total}} entries. {{currPage+1}} out of {{totalPage}} pages.
    section.field.has-addons
      p.control
        a.button(@click='prevPage') Previous
      p.control
        a.button(@click='nextPage') Next page
      p.control
        a.button.is-static Go to page 
      p.control
        input.input(type='number', v-model='currPage')
      p.control
        a.button.is-static Per page
      p.control
        input.input(type='number', v-model='perPage')
    section
      Example(v-for='ex in batch', v-bind:ex='ex', v-bind:allTags='allTags')
</template>


<script>
export default {
  props: ['data', 'allTags', 'defaultPerPage'],
  data() {
    return {
      currPage: 0,
      perPage: this.defaultPerPage,
    }
  },
  mounted() {
    this.retrieve()
  },
  watch: {
    currPage() {this.retrieve()}
  },
  computed: {
    total() {return this.data.length},
    start() {return Math.max(0, Math.min(this.total-1, this.currPage * this.perPage))},
    end() {return Math.min(this.total, this.start + this.perPage)},
    totalPage() {return Math.ceil(this.total / this.perPage)},
    batch() {
      var chunk = []
      var vm = this
      for (var i=vm.start; i<vm.end; i++) {
        chunk.push(vm.data[i])
      }
      return chunk
    }
  },
  methods: {
    retrieve() {this.$emit('retrieve', {start: this.start, end: this.end})},
    nextPage() {this.currPage = Math.min(this.totalPage, this.currPage + 1)},
    prevPage() {this.currPage = Math.max(0, this.currPage - 1)},
  }
}
</script>
