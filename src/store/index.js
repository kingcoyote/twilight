import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards.js'

Vue.use(Vuex)

export const mutations = {
  newGame(state) {
    state.cards = TSCards
  },
  moveCard(state, data) {
    data.card.state = data.destination
  }
}

export default new Vuex.Store({
  state: {
    cards: TSCards
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
