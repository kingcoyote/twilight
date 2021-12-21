<template>
  <b-container id="twilight" :class="['view-' + settings.view.toLowerCase()]">
    <b-row>
      <b-col class="col-lg-3">
        <h1>TS Track</h1>
      </b-col>
      <b-col class="col-lg-9">
        <div class="float-right">
          <b-button squared class="my-1 mx-1" v-b-modal.modal-settings>Config</b-button>
          <b-button-group class="my-1 mx-3">
            <b-button squared variant="primary" v-b-modal.modal-new-game>New</b-button>
            <b-button squared variant="danger" @click=deleteGame(lastGame)>Delete</b-button>
          </b-button-group>
          <b-form-select v-model="lastGame" :options="games" @change="loadGame(lastGame)" style="width:240px;"></b-form-select>
          <b-button-group class="my-1 mx-3">
            <b-button squared variant="primary" @click="reshuffle">Reshuffle</b-button>
            <b-button squared v-if="phase === 'early'" variant="warning" @click="addMidWar">Add Mid-War Cards</b-button>
            <b-button squared v-if="phase === 'mid'" variant="warning" @click="addLateWar">Add Late-War Cards</b-button>
          </b-button-group>
          <b-modal id="modal-settings" title="Settings">
            <b-form-select v-model="settings.view" :options="['Full', 'Slim']"></b-form-select>
            <template #modal-footer>
              <div class="w-100">
                <b-button-group class="float-right">
                  <b-button variant="primary" size="sm" @click="saveSettings(); $bvModal.hide('modal-settings')">Save</b-button>
                </b-button-group>
              </div>
            </template>
          </b-modal>
          <b-modal id="modal-new-game" title="New Game">
            <b-form-group id="input-game-name" label-for="input-game-name">
              <b-form-input id="input-game-name" v-model=newGameForm.name placeholder="Enter game name" required></b-form-input>
            </b-form-group>
            <b-form-group id="input-game-optcards" label-for="input-game-optcards" class="float-right">
              <b-form-checkbox-group v-model=newGameForm.opts>
                <b-form-checkbox value="optcards" checked>Use Optional Cards</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <template #modal-footer>
              <div class="w-100">
                <b-button-group class="float-right">
                  <b-button variant="danger" size="sm" @click="$bvModal.hide('modal-new-game')">Cancel</b-button>
                  <b-button variant="primary" size="sm" @click="newGame({name: newGameForm.name, optional: newGameForm.opts.includes('optcards')}); $bvModal.hide('modal-new-game')">Start</b-button>
                </b-button-group>
              </div>
            </template>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="settings.view == 'Full'" id="usa" class="mb-3">
      <b-col sm>
        <h3>USA ({{ usaCards.length }})</h3>
        <TSCardHand :cards=usaCards cols=4 />
      </b-col>
    </b-row>
    <b-row v-if="settings.view == 'Full'" id="ussr" class="mb-3">
      <b-col sm >
        <h3>USSR ({{ ussrCards.length }})</h3>
        <TSCardHand :cards=ussrCards cols=4 />
      </b-col>
    </b-row>
    <b-row v-if="settings.view == 'Slim'" class="justify-content-center mb-3">
      <b-col class="col-12 col-md-4 col-sm-6">
        <h3>USA ({{ usaCards.length }})</h3>
        <TSCard v-for='card in usaCards' :key=card.number :card=card display="min"/> 
      </b-col>
      <b-col class="col-12 col-md-4 col-sm-6">
        <h3>USSR ({{ ussrCards.length }})</h3>
        <TSCard v-for='card in ussrCards' :key=card.number :card=card display="min"/> 
      </b-col>
    </b-row>
    <b-row class="mx-auto">
      <b-button-toolbar class="mx-auto text-center">
        <b-button :variant="isSort('playdek', 'asc') ? 'primary' : 'secondary'" class="mx-2 my-1" @click="setSort('playdek', 'asc')">Playdek</b-button>
        <!-- <b-button-group class="mx-2">
          <b-button :variant="isSort('number', 'asc') ? 'primary' : 'secondary'" @click="setSort('number', 'asc')"><i class="bi-sort-numeric-down"></i></b-button>
          <b-button :variant="isSort('number', 'desc') ? 'primary' : 'secondary'" @click="setSort('number', 'desc')"><i class="bi-sort-numeric-up"></i></b-button>
        </b-button-group> -->
        <b-button-group class="mx-2 my-1">
          <b-button :variant="isSort('alpha', 'asc') ? 'primary' : 'secondary'" @click="setSort('alpha', 'asc')"><i class="bi-sort-alpha-down"></i></b-button>
          <b-button :variant="isSort('alpha', 'desc') ? 'primary' : 'secondary'" @click="setSort('alpha', 'desc')"><i class="bi-sort-alpha-up"></i></b-button>
        </b-button-group>
        <b-button-group class="mx-2 my-1">
          <b-button :variant="isSort('ops', 'asc') ? 'primary' : 'secondary'" @click="setSort('ops', 'asc')"><i class="bi-sort-down"></i></b-button>
          <b-button :variant="isSort('ops', 'desc') ? 'primary' : 'secondary'" @click="setSort('ops', 'desc')"><i class="bi-sort-up"></i></b-button>
        </b-button-group>
        <b-button class="mx-2 my-1" :variant="group == 'region' ? 'primary' : 'secondary'" @click="setGroup('region')">Region</b-button>
        <b-button class="mx-2 my-1" :variant="group == 'effect' ? 'primary' : 'secondary'" @click="setGroup('effect')">Effect</b-button>
      </b-button-toolbar>
    </b-row>
    <b-row id="stacks" class="mb-3">
      <b-col id="deck" class="ts-stack col-12 col-md-6 col-lg-4">
        <h3>Deck ({{ deckCards.length }})</h3>
        <div v-if="group === 'region'">
          <TSCardDeckRegions :cards=potentialCards />
        </div>
        <div v-else-if="group === 'effect'">
          <TSCardDeckEffects :cards=potentialCards />
        </div>
        <div v-else>
          <TSCard v-for='card in deckCards' :key=card.number :card=card display="min"/> 
        </div>
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
import TSCardDeckRegions from './components/TSCardDeckRegions.vue'
import TSCardDeckEffects from './components/TSCardDeckEffects.vue'
import TSCardHand from './components/TSCardHand.vue'
import TSCard from './components/TSCard.vue'
import { mapMutations, mapGetters } from 'vuex'

function playdek_score(card) {
  let score = 0;
  if (card.ops === 0) {
    score += 1000;
  }
  if (card.side === "usa") {
    score += 200;
  } else if (card.side === "ussr") {
    score += 100;
  }

  score += (4 - card.ops) * 10;

  return score;
}

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
    } else if (sort === "playdek") {
      let sca = playdek_score(a)
      let scb = playdek_score(b)

      if (sca == scb) return a.name.localeCompare(b.name)

      return scb - sca;
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
    let lastGame = localStorage.getItem('game.last');

    if (lastGame) {
      const savedGameData = JSON.parse(localStorage.getItem("games." + lastGame))
      this.$store.commit('loadGame', {name: lastGame, cards: savedGameData["cards"], phase: savedGameData["phase"]})
    } else {
      this.$store.commit("newGame", {name: new Date().toISOString(), optional: true})
      localStorage.setItem('game.last', this.$store.getters.name)
      lastGame = this.$store.getters.name;
    }

    this.$store.watch((state) => {
      const savedGameString = JSON.stringify(state)
      localStorage.setItem("games." + state.name, savedGameString)
      localStorage.setItem('game.last', state.name)

      let games = JSON.parse(localStorage.getItem('games') || "[]");
      if (games.includes(state.name) === false) {
        games.push(state.name);
        localStorage.setItem("games", JSON.stringify(games))
        this.games = games;
        this.lastGame = state.name;
      }
    });

    const games = JSON.parse(localStorage.getItem('games') || "[]");
    const settings = JSON.parse(localStorage.getItem('settings') || '{"view":"Full"}');

    return { 
      sort: "alpha",
      order: "asc",
      newGameForm: {
        name: "new game",
        opts: ["optcards"]
      },
      group: "",
      games,
      lastGame,
      settings
    }
  },
  components: {
    TSCardHand,
    TSCard,
    TSCardDeckRegions,
    TSCardDeckEffects
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
    setGroup: function(group) {
      if (this.group === group) {
        this.group = ""
        return;
      }

      this.group = group;
    },
    isSort: function(sort, order) {
      return this.sort === sort && this.order === order;
    },
    loadGame: function(name) {
      const savedGameData = JSON.parse(localStorage.getItem("games." + name));
      const phase = savedGameData.phase;
      const cards = savedGameData.cards;
      this.$store.commit('loadGame', {name, phase, cards})
    },
    deleteGame: function(name) {
      let games = JSON.parse(localStorage.getItem('games') || "[]");
      games = games.filter((g) => g !== name);
      localStorage.setItem("games", JSON.stringify(games))
      this.games = games;
    },
    saveSettings: function() {
      console.log(JSON.stringify(this.settings));
      localStorage.setItem('settings', JSON.stringify(this.settings));
    }
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
    potentialCards: function() {
      const deckCards = this.$store.getters.cardsInLocation("deck");
      const inactiveCards = this.$store.getters.cardsInLocation("inactive");
      return Array.prototype.concat(deckCards, inactiveCards);
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
