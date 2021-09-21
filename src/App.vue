<template>
  <b-container class="mt-5">
    <h1>Twilight Strategy Card Tracker</h1>
    <b-button-group>
      <b-button @click="newGame()">New Game</b-button>
    </b-button-group>
    <b-row class="mb-3">
      <b-col sm  id="usa">
        <h3>USA Hand</h3>
        <TSCardHand :cards='cardsInLocation("usa")' cols=4 />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm id="ussr">
        <h3>USSR Hand</h3>
        <TSCardHand :cards='cardsInLocation("ussr")' cols=4 />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm id="deck" class="ts-stack">
        <h3>Deck</h3>
        <TSCard v-for='card in cardsInLocation("deck")' :key=card.number :card=card display="min"/> 
      </b-col>
      <b-col sm id="discard" class="ts-stack">
        <h3>Discard</h3>
        <TSCard v-for='card in cardsInLocation("discard")' :key=card.number :card=card display="min"/> 
      </b-col>
      <b-col sm id="removed" class="ts-stack">
        <h3>Removed</h3>
        <TSCard v-for='card in cardsInLocation("removed")' :key=card.number :card=card display="min"/> 
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TSCardHand from './components/TSCardHand.vue'
import TSCard from './components/TSCard.vue'
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
    TSCard
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
