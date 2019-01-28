<template lang='pug'>
  section.content
    b-collapse.card(:open.sync='isOpen')
      .card-header(slot='trigger', slot-scope='props')
        .card-header-title Filters
        .card-header-icon
          b-icon(:icon='props.open ? "menu-down" : "menu-up"')
      .card-content
        .filter(v-for='f, i in filters')
          .field.has-addons.text-filter(v-if='f.type == "text"')
            p.control
              a.button.is-static {{f.name}} contains text
            p.control
              input.input(v-model='values[i]')
          .field.has-addons.text-filter(v-if='f.type == "equal"')
            p.control
              a.button.is-static {{f.name}} matches field
            p.control
              input.input(v-model='values[i]')
</template>


<script>
export default {
  props: ['filters'],
  data() {
    return {
      isOpen: false,
      values: [],
    }
  },
  mounted() {
    var values = this.values
    this.filters.forEach(f => {
      if (f.type == 'text') {
        values.push('')
      } else if (f.type == 'equal') {
        values.push('')
      } else {
        console.log('Unknown filter type ' + f)
        values.push(null)
      }
    })
  },
  watch: {
    values() {this.$emit('constrain', this.values)}
  },
  computed: {
  },
  methods: {
  }
}
</script>
