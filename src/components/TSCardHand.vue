<template>
  <b-container>
    <b-card-group
      :class="['ts-card-collection', 'ts-hand']"> 
      <TSCard v-for="card in cards" :key=card.number :card=card display="full"/> 
    </b-card-group>
  </b-container>
</template>

<script>
import TSCard from './TSCard.vue'

export default {
  name: 'TSCardHand',
  components: {
    TSCard
  },
  props: {
    cards: Array
  },
  computed: {
  }
}
</script>

<style scoped>
  div.ts-card { width:25%; }
</style>
