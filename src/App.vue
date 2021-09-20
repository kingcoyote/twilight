<template>
  <b-container class="mt-5">
    <h1>Twilight Strategy Card Tracker</h1>
    <b-button-group>
      <b-button @click="newGame()">New Game</b-button>
    </b-button-group>
    <b-row class="mb-3">
      <b-col sm  id="usa">
        <h3>USA Hand</h3>
        <TSCardHand :cards='cardsInLocation("usa")' />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm id="ussr">
        <h3>USSR Hand</h3>
        <TSCardHand :cards='cardsInLocation("ussr")' />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm id="deck">
        <h3>Deck</h3>
        <TSCardStack :cards='cardsInLocation("deck")' />
      </b-col>
      <b-col sm id="discard">
        <h3>Discard</h3>
        <TSCardStack :cards='cardsInLocation("discard")' />
      </b-col>
      <b-col sm id="removed">
        <h3>Removed</h3>
        <TSCardStack :cards='cardsInLocation("removed")' />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TSCardHand from './components/TSCardHand.vue'
import TSCardStack from './components/TSCardStack.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Twilight',
  data: function() {
    return {
      cards: this.$store.state.cards
    }
  },
  components: {
    TSCardHand,
    TSCardStack
  },
  methods: {
    ...mapMutations(['newGame']),
  },
  computed: {
    ...mapGetters(['cardsInLocation'])
  }
}
</script>

<style>

</style>
