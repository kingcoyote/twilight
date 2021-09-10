import { expect } from 'chai'
import { mutations } from '../src/store/index.js'

const { newGame, increment } = mutations

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
})