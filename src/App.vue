<template>
  <b-container>
    <b-row>
      <b-col sm>
        <h1>TS Track</h1>
      </b-col>
      <b-col sm>
        <b-button-group class="my-1 mx-3">
          <b-button squared variant="primary" @click="newGame()">New Game</b-button>
          <b-button squared variant="success">Save</b-button>
          <b-button squared variant="warning">Load</b-button>
        </b-button-group>
        <b-button-group class="my-1 mx-3">
          <b-button squared variant="primary">Reshuffle</b-button>
          <b-button squared variant="warning">Add Mid-War Cards</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row id="usa" class="mb-3">
      <b-col sm>
        <h3>USA ({{ usaCards.length }})</h3>
        <TSCardHand :cards=usaCards cols=4 />
      </b-col>
    </b-row>
    <b-row id="ussr" class="mb-3">
      <b-col sm >
        <h3>USSR ({{ ussrCards.length }})</h3>
        <TSCardHand :cards=ussrCards cols=4 />
      </b-col>
    </b-row>
    <b-row id="stacks" class="mb-3">
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
    ...mapGetters(['cardsInLocation']),
    usaCards: function() {
      return this.$store.getters.cardsInLocation("usa");
    },
    ussrCards: function() {
      return this.$store.getters.cardsInLocation("ussr");
    }
  }
}
</script>

<style>
h3 { border-bottom:1px solid black; }
div#usa, div#ussr, div#stacks { min-height: calc(33vh - 56px)}
</style>
