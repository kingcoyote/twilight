<template>
  <div>
    <b-card-group deck :class="['ts-card-collection', 'hand', name]" v-if="display === 'hand'">
        <TSCardHand 
          v-for="card in cards"
          :key=card.title
          :card="card"
          :collection="name" />
    </b-card-group>
    <div :class="['ts-card-collection', 'stack', name]" v-if="display === 'stack'">
        <TSCardStack 
          v-for="card in cards" 
          :key=card.title
          :card="card"
          :collection="name" />
    </div>
  </div>
</template>

<script>
import TSCardHand from './TSCardHand.vue'
import TSCardStack from './TSCardStack.vue'

export default {
  name: 'TSCardCollection',
  components: {
      TSCardHand,
      TSCardStack
  },
  props: {
    name: String,
    cards: Array,
    display: String,
  }
}
</script>

<style scoped>

</style>
