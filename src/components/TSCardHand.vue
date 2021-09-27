<template>
  <b-container>
    <b-card-group deck v-for="row in rows"
      :key=row.id
      :class="['ts-card-collection', 'ts-hand']"> 
      <TSCard v-for="card in row.cards" :key=card.number :card=card display="full"/> 
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
    rows: function() {
      let rows = []
      const cols = 4
      for (let i = 0; i < this.cards.length / cols; i++) {
        rows.push({id: i, cards:this.cards.slice(i*cols, i*cols+cols)})
      }
      return rows;
    }
  }
}
</script>

<style scoped>
  div.ts-card { width:25%; }
</style>
