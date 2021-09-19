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
        .forEach((card) => card.location = "inactive")
    }

    // set all early inactive cards to deck
    defaultCards
      .filter((card) => card.phase === "early" && card.location !== "disabled")
      .forEach((card) => card.location = "deck")

    if (state.cards === undefined) {
      state.cards = defaultCards
    }

    for (let i = 0; i < defaultCards.length; i++) {
      state.cards[i].state = defaultCards[i].state
    }
  },
  moveCard(state, data) {
    data.card.location = data.destination
  },
  reshuffle(state) {
    state.cards.forEach((card) => card.location = card.location === "discard" ? "deck" : card.location);
  },
  addPhase(state, data) {
    state.cards
      .filter((card) => card.phase === data.phase)
      .forEach((card) => card.location = "deck")
  }
}

export const getters = {
  cardsInLocation: (state) => (location) => {
    return state.cards.filter((card) => card.location === location)
  }
}

export default new Vuex.Store({
  state: {
    cards: JSON.parse(JSON.stringify(TSCards))
  },
  mutations,
  getters,
  actions: {
  },
  modules: {
  }
})
