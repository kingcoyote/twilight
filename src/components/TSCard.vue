<template>
  <b-card sm: :class="['ts-card', 'float-left', 'm-1', card.phase, card.side]">
    <b-card-body>
      <div class="title mx-1 mt-1 mb-0" @click="myDisplay = myDisplay === 'full' ? 'min' : 'full' ">
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
        <b-button-toolbar class="card-opts toolbar float-right d-none d-lg-block">
          <b-button-group>
            <b-button v-if="card.location !== 'usa'" @click="moveCard({card, destination:'usa'})" class="to-usa"><i class="bi-arrow-left-short"></i></b-button>
            <b-button v-if="card.location !== 'ussr'" @click="moveCard({card, destination:'ussr'})" class="to-ussr"><i class="bi-arrow-right-short"></i></b-button>
          </b-button-group>
          <b-button-group>
            <b-button v-if="card.location !== 'deck'" @click="moveCard({card, destination:'deck'})" class="to-deck" variant="success"><i class="bi-arrow-repeat to-deck"></i></b-button>
            <b-button v-if="card.location !== 'discard'" @click="moveCard({card, destination:'discard'})" class="to-discard"><i class="bi-arrow-down-short to-discard"></i></b-button>
            <b-button v-if="card.location !== 'removed'" @click="moveCard({card, destination:'removed'})" class="to-removed"><i class="bi-trash to-removed"></i></b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-dropdown right size="sm" class="card-opts dropdown float-right d-block d-lg-none">
          <b-dropdown-item @click="moveCard({card, destination:'usa'})"><i class="bi-arrow-left-short to-usa"></i> To USA</b-dropdown-item>
          <b-dropdown-item @click="moveCard({card, destination:'ussr'})"><i class="bi-arrow-right-short to-ussr"></i> To USSR</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="moveCard({card, destination:'deck'})"><i class="bi-arrow-repeat to-deck"></i> Deck</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="moveCard({card, destination:'discard'})"><i class="bi-arrow-down-short to-discard"></i> Discard</b-dropdown-item>
          <b-dropdown-item @click="moveCard({card, destination:'removed'})"><i class="bi-trash to-removed"></i> Remove</b-dropdown-item>
        </b-dropdown>
      </div>
      <div v-if="myDisplay === 'full'">
        <div class="text p-2 pt-1 text-center" >{{ cardDescription }}</div>
        <div class="remove p-2" v-if="card.flags && card.flags.includes('remove')">Remove from play if used as an event.</div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "TSCard",
  props: {
      card: Object,
      display: String
  },
  data: function() {
    return {
      myDisplay: this.display ?? "min"
    }
  },
  methods: {
    ...mapMutations(['moveCard'])
  },
  computed: {
    cardDescription: function() {
      let markup = this.card.text;
      // TODO add italics, line breaks, bold, other fancy stuff
      return markup;
    }
  }
}
</script>

<style>
  div.ts-card { border: none; border-radius: 0; background-color:#eee; }

  div.ts-stack div.ts-card { width:100%; }
  @media(max-width:767.8px) {
    div.ts-hand div.ts-card { min-width:100%; max-width:100%; width:100%; }
  }
  @media(min-width:768px) {
    div.ts-hand div.ts-card { min-width:calc(50% - 8px); max-width:calc(50% - 8px); }
  }
  @media(min-width:992px) {
    div.ts-hand div.ts-card { min-width:calc(33% - 8px); max-width:calc(33% - 8px); }
  }
  @media(min-width:1200px) {
    div.ts-hand div.ts-card { min-width:calc(25% - 8px); max-width:calc(25% - 8px); }
  }
  div.ts-card div.card-body { padding:0; }
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

  div.ts-card div.remove { font-style:italic; font-weight:bold; color:#cc3333; text-align:center; }

  div.card-opts { margin:2px 0; }
  div.card-opts div.btn-group { margin:0 2px; }
  div.card-opts button { padding:2px 4px; font-size:0.8em; }
  div.dropdown.card-opts button { padding:0 5px; }

  div.card-opts button.btn { border: none; }
  div.card-opts button.btn.to-usa { background-color:blue; color:white; }
  div.card-opts button.btn.to-ussr { background-color:red; color:yellow; }
  div.card-opts button.btn.to-deck { background-color: white; color:black; }
  div.card-opts button.btn.to-discard { background-color: white; color: black; }
  div.card-opts button.btn.to-removed { background-color: white; color: black; }

  @media screen and (min-width: 992px) { 
    div.card-opts.dropdown { display: hidden; } 
    div.card-opts.toolbar { display: inherit; } 
  }
  @media screen and (max-width: 991.8px) { 
    div.card-opts.dropdown { display: inherit;} 
    div.card-opts.toolbar { display:hidden; } 
  }
</style>