<template>
  <div class="title m-1">
    <svg height="46" width="46" class="star">
      <defs>
        <pattern id="neutralStripe" width="46" height="46" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <rect stroke="none" fill="white" x="0" y="0" width="46" height="46"></rect>
          <polygon stroke="none" fill="red" points="3,46 46,46 34,0"/>
        </pattern>
      </defs>
      <!-- 5 pointed star -->
      <polygon 
        points="19.447,0.926 23.797,15.107 37.968,15.075 26.485,23.806 30.893,37.968 19.447,29.183 8.000,37.968 12.409,23.806 0.926,15.075 15.097,15.1074"
        style="stroke-width:2;" />
      <text v-if="card.ops > 0" style="font:Arial;font-size:32px;font-weight:bold;stroke-width:1px;" transform="translate(10,34)">{{ card.ops }}</text>
      Sorry, your browser does not support inline SVG.
    </svg>
    <span>{{ card.name }}<span class="remove" v-if="card.flags && card.flags.includes('remove')">*</span></span>
    <b-dropdown size="sm" class="card-opts float-right">
      <b-dropdown-item @click="moveCard({card, destination:'ussr'})">To USSR</b-dropdown-item>
      <b-dropdown-item @click="moveCard({card, destination:'usa'})">To USA</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="moveCard({card, destination:'deck'})">Deck</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="moveCard({card, destination:'discard'})">Discard</b-dropdown-item>
      <b-dropdown-item @click="moveCard({card, destination:'removed'})">Remove</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TSCardTitle',
  props: {
    card: Object
  },
  methods: {
    ...mapMutations(['moveCard'])
  }
}
</script>

<style>
  div.ts-card svg { display:inline-block; margin-top:-10px; margin-bottom:-10px; }

  /* set the star and text colors for each side */
  div.ts-card.ussr svg.star { fill:red; stroke:yellow; }
  div.ts-card.ussr text { fill:white; stroke:black; }
  div.ts-card.usa svg.star { fill: white; stroke: blue; }
  div.ts-card.usa text { fill:black; stroke:white; }
  div.ts-card.neutral svg.star { fill:url(#neutralStripe);stroke:black; }
  div.ts-card.neutral text { fill:black; stroke:white; }

  /* set the title bg for each phase */
  div.title { display:inline-block; margin-top:5px; margin-bottom:5px; border:1px solid black; padding-right:5px; width:calc(100% - 10px)}
  div.ts-card div.title { color: white; }
  div.ts-card.early div.title { background-color:rgb(0, 171, 202); }
  div.ts-card.mid div.title { background-color:rgb(0,119,139); }
  div.ts-card.late div.title { background-color:rgb(0,79,92); }

  div.dropdown.card-opts button { padding:0 5px; margin:2px 0; }
</style>