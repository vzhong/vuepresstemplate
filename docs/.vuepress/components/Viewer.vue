<template lang='pug'>
  .viewer
    Pagination(v-if='defaultPerPage > 0', v-bind:total='filtered.length', v-bind:defaultPerPage='defaultPerPage', @retrieve='selectBatch')
    .box
      section
        .block
          .columns
            .column
              p Answer class
              b-radio(v-model='goldClass', :native-value='c', v-for='c in classes') {{c}}
            .column
              p Predicted class
              b-radio(v-model='predClass', :native-value='c', v-for='c in classes') {{c}}
          .block
              p Predicted class equals answer class 
                b-checkbox(v-model='predEqGold')
    Example(v-for='i in batch', v-bind:ex='filtered[i]', v-bind:index='i', :key='i')

</template>

<script>

export default {
  data() {
    return {
      batch: [],
      defaultPerPage: 0,
      classes: ['all', 'yes', 'no', 'irrelevant', 'more'],
      goldClass: 'all',
      predClass: 'all',
      predEqGold: false,
    }
  },
  mounted() {
    var o = this
    fetch('analysis.json')
      .then(response => response.json())
      .then(json => {
        o.$store.commit('SET_DATA', json)
        o.defaultPerPage = Math.min(10, json.length)
        o.batch = _.range(0, o.defaultPerPage)
      });
  },
  watch: {
    goldClass() {
      this.selectBatch({start: 0, end: Math.min(this.filtered.length, this.defaultPerPage)})
    },
    predClass() {
      this.selectBatch({start: 0, end: Math.min(this.filtered.length, this.defaultPerPage)})
    },
    predEqGold() {
      this.selectBatch({start: 0, end: Math.min(this.filtered.length, this.defaultPerPage)})
    },
  },
  computed: {
    raw() {
      return this.$store.getters.getData
    },
    filtered() {
      var match = []
      var o = this
      this.raw.forEach(ex => {
        var gold = o.getExampleClass(ex.answer)
        var pred = o.getExampleClass(ex.extracted_answer)
        var goldMatch = o.goldClass === 'all' || o.goldClass === gold
        var predMatch = o.predClass === 'all' || o.predClass === pred
        var predEqGold = (o.predEqGold && pred === gold) || (!predEqGold && pred !== gold)
        if (goldMatch && predMatch && predEqGold) {
          match.push(ex)
        }
      })
      return match
    }
  },
  methods: {
    validate() {
      console.log(this.raw)
    },
    selectBatch(batch) {
      while (this.batch.length) { this.batch.pop() }
      for (var i=batch.start; i<batch.end; i++) {
        this.batch.push(i)
      }
    },
    getExampleClass(ans) {
      ans = ans.toLowerCase()
      if (ans === 'yes') {
        return 'yes'
      } else if (ans === 'no') {
        return 'no'
      } else if (ans === 'irrelevant') {
        return 'irrelevant'
      } else {
        return 'more'
      }
    }
  }
}
</script>
