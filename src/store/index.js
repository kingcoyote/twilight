import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: TSCards
  },
  mutations: {
    moveCard(state, data) {
      console.log(data)
      data.card.state = data.destination
    }
  },
  actions: {
  },
  modules: {
  }
})
