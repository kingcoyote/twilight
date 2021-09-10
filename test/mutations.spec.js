import { expect } from 'chai'
import { mutations } from '../src/store/index.js'

const { increment } = mutations


describe('twilight store', () => {
    it('INCREMENT', () => {
        const state = { count: 0 }
        increment(state)
        expect(state.count).to.equal(1)
    })
})