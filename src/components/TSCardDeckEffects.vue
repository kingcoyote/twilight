<template>
  <div>
    <div v-for="effect in effects" :key=effect>
      <div v-if="effectCards(effect).length > 0">
        <h4>{{ effect }}</h4>
        <TSCard v-for="card in effectCards(effect)" :key=card.number :card=card display="min" />
      </div>
    </div>
  </div>
</template>

<script>
import TSCard from './TSCard.vue'

export default {
  name: 'TSCardDeckEffects',
  components: {
    TSCard
  },
  props: {
    cards: Array
  },
  computed: {
    effects: function() {
      return [
        'VP',
        'DEFCON',
        'Space Race',
        'MilOps',
        'Ops',
        'Discard'
      ]
    },
  },
  methods: {
    effectCards: function(effect) {
      return this.cards.filter((card) => card.flags && card.flags.includes(effect))
    },
  }
}
</script>

<style scoped>
  h3, h4 { text-align:center; font-size:1.25em; }
</style>