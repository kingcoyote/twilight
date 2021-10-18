import Vue from 'vue'
import Vuex from 'vuex'
import TSCards from './ts_cards.js'

Vue.use(Vuex)

export const mutations = {
  newGame(state, data) {
    const defaultCards = JSON.parse(JSON.stringify(TSCards))
    
    data = data || {}

    // if optional is true, turn disabled cards to inactive
    if (data.optional ?? false) {
      defaultCards
        .filter((card) => (card.flags || []).includes("optional"))
        .forEach((card) => card.location = "inactive")
    }

    // set all early inactive cards to deck
    defaultCards
      .filter((card) => card.phase === "early" && card.location !== "disabled")
      .forEach((card) => card.location = "deck");
    
    // except The China Card, which always starts with USSR
    defaultCards[5].location = "ussr";

    if (state.cards === undefined) {
      state.cards = defaultCards
    }

    data.name = data.name ?? new Date().toISOString()

    mutations.loadGame(state, {cards: defaultCards, phase: "early", name: data.name});
  },
  loadGame(state, data) {
    const cards = data.cards

    for (let i = 0; i < cards.length; i++) {
      state.cards[i].location = cards[i].location
    }
    state.name = data.name
    state.phase = data.phase
  },
  moveCard(state, data) {
    data.card.location = data.destination
  },
  reshuffle(state) {
    // TODO optionally move all deck cards to opponent hand
    state.cards.forEach((card) => card.location = card.location === "discard" ? "deck" : card.location);
  },
  addPhase(state, data) {
    state.cards
      .filter((card) => card.phase === data.phase)
      .forEach((card) => card.location = "deck")

    state.phase = data.phase;
  }
}

export const getters = {
  cardsInLocation: (state) => (location) => {
    return state.cards.filter((card) => card.location === location)
  },
  name: (state) => {
    return state.name;
  },
  phase: (state) => {
    return state.phase;
  },
  cards: (state) => {
    return state.cards;
  }
}

const store = new Vuex.Store({
  state: {
    cards: JSON.parse(JSON.stringify(TSCards)),
    phase: "early",
    name: ""
  },
  mutations,
  getters,
  actions: {
  },
  modules: {
  }
})

store.commit('newGame', { optional: false })

export default store;