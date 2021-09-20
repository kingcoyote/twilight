<template>
  <div>
    <b-card 
      v-for="card in cards"
      :key="card.number"
      sm :class="['ts-card', 'float-left', 'm-1', card.phase, card.side]">
      <b-card-body>
        <TSCardTitle :card=card />
        <div class="text p-3 text-center">{{ card.text }}</div>
        <div class="remove p-3" v-if="card.flags && card.flags.includes('remove')">Remove from play if used as an event.</div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import TSCardTitle from './TSCardTitle.vue'

export default {
  name: 'TSCardHand',
  components: {
    TSCardTitle
  },
  props: {
    cards: Array
  },
}
</script>

<style scoped>
  div.ts-card { max-width:275px; }
  div.ts-card.ussr svg.star { fill:red; stroke:yellow; }
  div.ts-card.ussr text { fill:white; stroke:black; }
  div.ts-card.usa svg.star { fill: white; stroke: blue; }
  div.ts-card.usa text { fill:black; stroke:white; }
  div.ts-card.neutral svg.star { fill:url(#diagonalHatch2);stroke:black; }
  div.ts-card.neutral text { fill:black; stroke:white; }
  
  div.ts-card div.text { height:150px; }

  div.ts-card div.remove { text-align:center; font-size:0.8em; font-style:italic; font-weight:bold; color:#CC3333; }
</style>
