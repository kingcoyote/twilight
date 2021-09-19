import { expect } from 'chai'
import { mutations, getters } from '../src/store/index.js'

const { newGame, moveCard, reshuffle, addPhase } = mutations

describe('twilight store', () => {
    it('creates new game with default cards', () => {
        const state = { }
        newGame(state)
        expect(state.hasOwnProperty("cards")).to.equal(true);
        expect(getters.cardsWithState(state)("deck").length).to.equal(36)
        expect(getters.cardsWithState(state)("inactive").length).to.equal(6)
    })
    it('creates new game with optional cards (104-110)', () => {
        const state = { }
        newGame(state, { optional: true })
        expect(getters.cardsWithState(state)("deck").length).to.equal(39)
    })
    it('moves cards between states', () => {
        const state = { }
        newGame(state)
        expect(state.hasOwnProperty("cards")).to.equal(true);

        moveCard(state, { card: state.cards[0], destination: "ussr" })
        expect(state.cards[0].state).to.equal("ussr")

        moveCard(state, { card: state.cards[1], destination: "usa" })
        expect(state.cards[1].state).to.equal("usa")

        moveCard(state, { card: state.cards[2], destination: "removed" })
        expect(state.cards[2].state).to.equal("removed")

        moveCard(state, { card: state.cards[3], destination: "discard" })
        expect(state.cards[3].state).to.equal("discard")
    })
    it('reshuffles discard into deck', () => {
        const state = { }
        newGame(state)

        moveCard(state, { card: state.cards[0], destination: "discard" })
        moveCard(state, { card: state.cards[1], destination: "usa" })
        moveCard(state, { card: state.cards[2], destination: "ussr" })
        moveCard(state, { card: state.cards[3], destination: "removed" })
        moveCard(state, { card: state.cards[4], destination: "discard" })

        reshuffle(state)
        expect(state.cards[0].state).to.equal("deck")
        expect(state.cards[1].state).to.equal("usa")
        expect(state.cards[2].state).to.equal("ussr")
        expect(state.cards[3].state).to.equal("removed")
        expect(state.cards[4].state).to.equal("deck")
    })
    it("adds mid war phase cards", () => {
        const state = { }
        newGame(state)

        expect(getters.cardsWithState(state)("deck").length).to.equal(36)

        addPhase(state, { phase: "mid" })
        expect(getters.cardsWithState(state)("deck").length).to.equal(39)
    })
    it("gets cards with state", () => {
        const state = { }
        newGame(state)

        let cardsWithState = getters.cardsWithState(state)
        expect(cardsWithState("deck").length).to.equal(36)

        moveCard(state, { card: state.cards[0], destination: "ussr" })
        expect(cardsWithState("ussr").length).to.equal(1)
        expect(cardsWithState("deck").length).to.equal(35)
        expect(cardsWithState("usa").length).to.equal(0)
        
    })
})