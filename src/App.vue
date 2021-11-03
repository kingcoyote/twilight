<template>
  <b-container id="twilight">
    <b-row>
      <b-col sm>
        <h1>TS Track</h1>
      </b-col>
      <b-col sm>
        <div class="float-right">
          <b-button-group class="my-1 mx-3">
            <b-button squared variant="primary" @click="newGame({optional: true})">New Game</b-button>
          </b-button-group>
          <b-button-group class="my-1 mx-3">
            <b-button squared variant="primary" @click="reshuffle">Reshuffle</b-button>
            <b-button squared v-if="phase === 'early'" variant="warning" @click="addMidWar">Add Mid-War Cards</b-button>
            <b-button squared v-if="phase === 'mid'" variant="warning" @click="addLateWar">Add Late-War Cards</b-button>
          </b-button-group>
        </div>
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
    <b-row>
      <b-button-toolbar class="mx-auto">
        <b-button-group class="mx-2">
          <b-button :variant="isSort('number', 'asc') ? 'primary' : 'secondary'" @click="setSort('number', 'asc')"><i class="bi-sort-numeric-down"></i></b-button>
          <b-button :variant="isSort('number', 'desc') ? 'primary' : 'secondary'" @click="setSort('number', 'desc')"><i class="bi-sort-numeric-up"></i></b-button>
        </b-button-group>
        <b-button-group class="mx-2">
          <b-button :variant="isSort('alpha', 'asc') ? 'primary' : 'secondary'" @click="setSort('alpha', 'asc')"><i class="bi-sort-alpha-down"></i></b-button>
          <b-button :variant="isSort('alpha', 'desc') ? 'primary' : 'secondary'" @click="setSort('alpha', 'desc')"><i class="bi-sort-alpha-up"></i></b-button>
        </b-button-group>
        <b-button-group class="mx-2">
          <b-button :variant="isSort('ops', 'asc') ? 'primary' : 'secondary'" @click="setSort('ops', 'asc')"><i class="bi-sort-down"></i></b-button>
          <b-button :variant="isSort('ops', 'desc') ? 'primary' : 'secondary'" @click="setSort('ops', 'desc')"><i class="bi-sort-up"></i></b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-row>
    <b-row id="stacks" class="mb-3">
      <b-col id="deck" class="ts-stack col-12 col-md-6 col-lg-4">
        <h3>Deck ({{ deckCards.length }})</h3>
        <TSCard v-for='card in deckCards' :key=card.number :card=card display="min"/> 
      </b-col>
      <b-col id="discard" class="ts-stack col-12 col-md-6 col-lg-4">
        <h3>Discard ({{ discardCards.length }})</h3>
        <TSCard v-for='card in discardCards' :key=card.number :card=card display="min"/> 
      </b-col>
      <b-col id="removed" class="ts-stack col-12 col-md-6 col-lg-4">
        <h3>Removed ({{ removedCards.length }})</h3>
        <TSCard v-for='card in removedCards' :key=card.number :card=card display="min"/> 
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TSCardHand from './components/TSCardHand.vue'
import TSCard from './components/TSCard.vue'
import { mapMutations, mapGetters } from 'vuex'

function sortCards(cards, sort, order) {
  const filterName = function(name) {
    return name.toLowerCase().replace("the", "").replace("“", "").replace("”", "").trim();
  }

  cards.sort((a, b) => {
    if (sort === "number") {
      return a.number - b.number;
    } else if (sort === "alpha") {
      return filterName(a.name).localeCompare(filterName(b.name));
    } else if (sort === "ops") {
      return b.ops - a.ops;
    }
  })

  if (order === "desc") {
    cards.reverse();
  }

  return cards;
}

export default {
  name: 'Twilight',
  data: function() {
    const savedGame = localStorage.getItem('savedGame');

    if (savedGame) {
      const savedGameData = JSON.parse(localStorage.getItem(savedGame))
      this.$store.commit('loadGame', {name: savedGame, cards: savedGameData["cards"], phase: savedGameData["phase"]})
    } else {
      this.$store.commit("newGame", {name: new Date().toISOString()})
      localStorage.setItem('lastGame', this.$store.getters.name)
    }

    this.$store.watch((state) => {
      const savedGameString = JSON.stringify(state)
      localStorage.setItem(state.name, savedGameString)
      localStorage.setItem('savedGame', state.name)
    });

    return { 
      sort: "number",
      order: "asc"
    }
  },
  components: {
    TSCardHand,
    TSCard
  },
  methods: {
    ...mapMutations(['newGame', 'addPhase', 'reshuffle']),
    addMidWar: function() {
      this.$store.commit('addPhase', {phase: "mid"});
    },
    addLateWar: function() {
      this.$store.commit('addPhase', {phase: "late"});
    },
    setSort: function(sort, order) {
      this.sort = sort;
      this.order = order;
    },
    isSort: function(sort, order) {
      return this.sort === sort && this.order === order;
    },
  },
  computed: {
    ...mapGetters(['cardsInLocation', 'phase']),
    
    usaCards: function() {
      return this.$store.getters.cardsInLocation("usa");
    },
    ussrCards: function() {
      return this.$store.getters.cardsInLocation("ussr");
    },
    deckCards: function() {
      return sortCards(this.$store.getters.cardsInLocation("deck"), this.sort, this.order);
    },
    discardCards: function() {
      return sortCards(this.$store.getters.cardsInLocation("discard"), this.sort, this.order);
    },
    removedCards: function() {
      return sortCards(this.$store.getters.cardsInLocation("removed"), this.sort, this.order);
    },
    savedGames: function() {
      return JSON.parse(localStorage.getItem('savedGames')) || [];
    }
  }
}
</script>

<style>
h3 { border-bottom:1px solid black; }
div#usa, div#ussr, div#stacks { min-height: calc(33vh - 56px)}
</style>
