import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards.js'

Vue.use(Vuex)

export const mutations = {
  newGame(state) {
    state.cards = JSON.parse(JSON.stringify(TSCards))
  },
  moveCard(state, data) {
    data.card.state = data.destination
  },
  reshuffle(state) {
    state.cards.forEach((card) => card.state = card.state === "discard" ? "deck" : card.state);
  },
  addPhase(state, data) {
    state.cards
      .filter((card) => card.phase === data.phase)
      .forEach((card) => card.state = "deck")
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
