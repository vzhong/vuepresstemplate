<template lang='pug'>
  .saveload
    .field.has-addons
      p.control
        a.button.is-dark(@click='save') Save
      p.control
        b-upload(v-model='uploadFile')
          a.button.is-dark Load
</template>


<script>
export default {
  props: ['data'],
  methods: {
    loadFile(fname) {
      var o = this
      fetch(fname)
        .then(response => response.json())
        .then(json => {
          for (var i=0; i<json.length; i++) {
            json[i].id = i
            if (!json[i].tags) {
              json[i].tags = []
            }
          }
          o.$emit('load', json)
        })
    },
    save() {
      const fname = 'analysis.json'
      const data = JSON.stringify(this.data)
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
