<template lang='pug'>
  article.message
    .message-header
      span.is-pulled-left Example {{ex.id}}
      span.is-pulled-right #[a(:href='ex.source_url') View URL]
    .message-body(v-if='ex')
      b-field(label='Annotation')
        b-taginput(v-model='ex.tags', :data='filteredTags', autocomplete, :allow-new='true', @typing='getFilteredTags', type='is-dark')
      .columns
        .column
          p Utterance ID:
            code {{ex.utterance_id}}
          p.has-text-weight-bold Rule text
          .box(v-html='compiledSnippet')
          p.has-text-weight-bold Scenario
          p.box {{ex.scenario}}
          p.has-text-weight-bold Gold evidence
          .evidence
            .box.turn(v-for='h in evidence')
              p {{h.follow_up_question}}
              p {{h.follow_up_answer}}
          p.has-text-weight-bold Question
          p.box {{ex.question}}
          p.has-text-weight-bold History
          .history
            .box.turn(v-for='h in ex.history')
              p {{h.follow_up_question}}
              p {{h.follow_up_answer}}
        .column
          p Tree ID:
            code {{ex.tree_id}}
          p.has-text-weight-bold Gold Clauses
          .box.clauses
            ul
              li(v-for='c in ex.clauses') {{c.join(' ')}}
          p.has-text-weight-bold Gold Answer
          p.box {{ex.answer}}
          p.has-text-weight-bold Extracted Spans
          .box.extracted-spans
            ul
              li(v-for='c in ex.extracted_spans') {{c}}
          p.has-text-weight-bold Extracted Answer
          p.box {{ex.extracted_answer}}
</template>


<script>
export default {
  props: ['ex', 'allTags'],
  data() {
    return {
      filteredTags: this.allTags,
    }
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    compiledSnippet() {
      return marked(this.ex.snippet)
    },
    evidence() {
      var ev = []
      this.ex.evidence.forEach(e => {
        if (e.followup_question) {
          ev.push({
            follow_up_question: e.followup_question,
            follow_up_answer: e.followup_answer,
          })
        } else {
          ev.push({
            follow_up_question: e.follow_up_question,
            follow_up_answer: e.follow_up_answer,
          })
        }
      })
      return ev
    }
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.allTags.filter(tag => {return tag.toLowerCase().indexOf(text.toLowerCase()) >= 0})
    }
  }
}
</script>
