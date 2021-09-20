<template>
  <div>
    <b-card 
      v-for="card in cards"
      :key="card.number"
      :class="['ts-card', 'mt-1', card.phase, card.side]">
        <TSCardTitle :card=card />
    </b-card>
  </div>
</template>

<script>
import TSCardTitle from './TSCardTitle.vue'

export default {
  name: 'TSCardStack',
  components: {
    TSCardTitle
  },
  props: {
    cards: Array
  },
}
</script>

<style>
div.card-body { padding:0; }
</style>


