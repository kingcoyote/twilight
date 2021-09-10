import { expect } from 'chai'
import { mutations } from '../src/store/index.js'

const { newGame, moveCard, reshuffle } = mutations

describe('twilight store', () => {
    it('creates new deck', () => {
        const state = { }
        newGame(state)
        expect(state.hasOwnProperty("cards")).to.equal(true);
        expect(state.cards.length).to.equal(42);
        for (let i = 0; i < 36; i++) {
            expect(state.cards[i].state).to.equal("deck");
        }
        for (let i = 36; i < 42; i++) {
            expect(state.cards[i].state).to.equal("inactive");
        }
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
})