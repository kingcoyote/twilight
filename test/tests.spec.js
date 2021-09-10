import { expect } from 'chai'

describe('mocha boundary', () => {
    it('passes', () => {
        const state = { count: 1 }
        expect(state.count).to.equal(1)
    })
})