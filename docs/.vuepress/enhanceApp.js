import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Buefy)
  Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      data: {}
    },
    getters: {
      getData: state => {
        return state.data
      },
    },
    mutations: {
      SET_DATA_KEY: (state, payload) => {
        state.data[payload.key] = payload.val
      },
      LOAD_DATA_DEBUG: state => {
        state.data = {
          key1: {subkey1: 'subvalue1', subkey2: 'subvalue2'},
          key2: {subkey3: 'subvalue3', subkey4: 'subvalue4'},
          key3: {subkey1: 'subvalue1', subkey3: 'subvalue3'},
        }
      }
    },
  })

  options.store = store
}
