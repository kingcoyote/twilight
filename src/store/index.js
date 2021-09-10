import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards.js'

Vue.use(Vuex)

export const mutations = {
  newGame(state, data) {
    const defaultCards = JSON.parse(JSON.stringify(TSCards))
    
    // if optional is true, turn disabled cards to inactive
    if (data && (data.optional ?? false)) {
      defaultCards
        .filter((card) => (card.flags || []).includes("optional"))
        .forEach((card) => card.state = "inactive")
    } else {

    }

    // set all early inactive cards to deck
    defaultCards
      .filter((card) => card.phase === "early" && card.state !== "disabled")
      .forEach((card) => card.state = "deck")

    if (state.cards === undefined) {
      state.cards = defaultCards
    }
    for (let i = 0; i < defaultCards.length; i++) {
      state.cards[i].state = defaultCards[i].state
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
