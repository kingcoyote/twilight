import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards.js'

Vue.use(Vuex)

export const mutations = {
  newGame(state) {
    if (state.cards === undefined) {
      state.cards = JSON.parse(JSON.stringify(TSCards))
    }
    for (let i = 0; i < TSCards.length; i++) {
      state.cards[i].state = TSCards[i].state
    }
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
    cards: JSON.parse(JSON.stringify(TSCards))
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
