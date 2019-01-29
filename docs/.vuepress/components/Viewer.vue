<template lang='pug'>
  .viewer
    .saveload
      .field.has-addons
        p.control
          a.button.is-dark(@click='save') Save
        p.control
          b-upload(v-model='uploadFile')
            a.button.is-dark Load
    .box
      section
        .block
          .columns
            .column
              p Answer class
              b-radio(v-model='goldClass', :native-value='c', v-for='c in classes', :key='c') {{c}}
            .column
              p Predicted class
              b-radio(v-model='predClass', :native-value='c', v-for='c in classes', :key='c') {{c}}
          .block
              p Predicted class equals answer class 
                b-checkbox(v-model='predEqGold')
    Analysis(v-if='raw.length > 0', v-bind:data='raw')
    Pagination(v-if='raw.length > 0', v-bind:data='filtered', v-bind:allTags='allTags', v-bind:defaultPerPage='10')
</template>

<script>
export default {
  data() {
    return {
      raw: [],
      uploadFile: null,
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
          for (var i=0; i<json.length; i++) {
            json[i].id = i
            if (!json[i].tags) {
              json[i].tags = []
            }
          }
          o.raw = json
          console.log('Loaded ' + json.length + ' examples')
        })
  },
  watch: {
    uploadFile() {
      var fr = new FileReader();
      fr.onload = this.loadFile;
      fr.readAsText(this.uploadFile);
    }
  },
  computed: {
    allTags() {
      var tags = {}
      this.raw.forEach(ex => {
        ex.tags.forEach(t => {
          tags[t] = true
        })
      })
      tags = Object.keys(tags)
      tags.sort()
      return tags
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
    },
    loadFile(el) {
      var lines = el.target.result
      this.raw = JSON.parse(lines)
      console.log('Loaded ' + this.raw.length + ' examples')
    },
    save() {
      const fname = 'analysis.json'
      const data = JSON.stringify(this.raw)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents')
      var a = document.createElement('a')
      a.download = fname
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
  }
}
</script>
