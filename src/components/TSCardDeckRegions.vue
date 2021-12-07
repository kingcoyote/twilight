<template>
  <div>
    <div v-for="region in regions" :key=region>
      <h3>{{ region }}</h3>
      <TSCard v-for="card in regionCards(region)" :key=card.number :card=card display="min" />
      <div v-for="country in countries(region)" :key=country >
        <h4>{{ country }}</h4>
        <TSCard v-for="card in regionCards(country)" :key=card.number :card=card display="min" />
      </div>
    </div>
  </div>
</template>

<script>
import TSCard from './TSCard.vue'

export default {
  name: 'TSCardDeckRegions',
  components: {
    TSCard
  },
  props: {
    cards: Array
  },
  computed: {
    regions: function() {
      return [
        'Europe',
        'Asia',
        'Middle East',
        'Africa',
        'Central America',
        'South America'
      ]
    },
  },
  methods: {
    countries: function(region) {
      if (region === "Europe") {
        return ["Canada", "UK", "France", "W. Germany", "E. Germany", "Poland", "Czechoslovakia", "Romania", "Bulgaria", "Yugoslavia", "Turkey", 
                /** "Spain/Portugal", "Benelux", "Italy", "Norway", "Denmark", "Sweden", "Finland", "Austria", "Greece" */
                ]
      } else if (region === "Asia") {
        return ["Pakistan", "India", "Vietnam", "Taiwan", "S. Korea", "Japan", 
                /** "Afghanistan", "Burma", "Laos/Cambodia", "Thailand", "Malaysia", "Philippines" "Indonesia", "N. Korea", "Australia" */]
      } else if (region === "Middle East") {
        return ["Lebanon", "Israel", "Iraq", "Iran", "Libya", "Egypt", "Jordan", "Gulf States", "Saudi Arabia",
         /** "Syria", */]
      } else if (region === "Africa") {
        return ["Sudan", "Angola", "SE African States", "Botswana", "South Africa"
                /** "Morocco", "Algeria", "Tunisia", "West African States", "Saharan States", "Ivory Coast", "Nigeria", "Ethiopia",
                "Somalia", "Cameroon", "Zaire", "Kenya", "Angola", "Zimbabwe"*/]
      } else if (region === "Central America") {
        return ["Honduras", "Nicaragua", "Cuba", "Costa Rica", "Panama", 
                /**"Mexico", "Guatamala", "El Salvador", "Haiti", "Dominican Rep."*/]
      } else if (region === "South America") {
        return ["Venezuela", "Chile", "Argentina", /** "Colombia", "Ecuador", "Peru", "Brazil", "Bolivia",  "Paraguay", "Uruguay", */ ]
      }

      return [];
    },
    regionCards: function(region) {
      return this.cards.filter((card) => card.region && card.region.includes(region))
    },
  }
}
</script>

<style scoped>
  h3, h4 { text-align:center; font-size:1.25em; }
</style>