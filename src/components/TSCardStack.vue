<template>
  <b-card :class="['ts-card', 'mt-1', card.phase, card.side]" v-if="card.state === collection">
      <TSCardTitle :card=card />
  </b-card>
</template>

<script>
import TSCardTitle from './TSCardTitle.vue'

export default {
  name: 'TSCardStack',
  components: {
    TSCardTitle
  },
  props: {
    card: Object,
    collection: String,
    display: String
  },
}
</script>

<style>
div.card-body { padding:0; }
</style>


