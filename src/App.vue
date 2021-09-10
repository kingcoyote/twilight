<template>
  <b-container class="mt-5">
    <h1>Twilight Strategy Card Tracker</h1>
    <b-row class="mb-3">
      <b-col sm>
        <h3>USA Hand</h3>
        <TSCardCollection name="usa" display="hand" :cards=cards />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm>
        <h3>USSR Hand</h3>
        <TSCardCollection name="ussr" display="hand" :cards=cards  />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm id="deck">
        <h3>Deck</h3>
        <TSCardCollection name="deck" display="stack" :cards=cards  />
      </b-col>
      <b-col sm id="discard">
        <h3>Discard</h3>
        <TSCardCollection name="discard" display="stack" :cards=cards  />
      </b-col>
      <b-col sm id="removed">
        <h3>Removed</h3>
        <TSCardCollection name="removed" display="stack" :cards=cards  />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TSCardCollection from './components/TSCardCollection.vue'

export default {
  name: 'Twilight',
  data: function() {
    return {
      cards: this.$store.state.cards
    }
  },
  components: {
    TSCardCollection
  }
}
</script>

<style>

</style>
