<template>
  <b-card sm: :class="['ts-card', 'float-left', 'm-1', 'phase-' + card.phase, 'side-' + card.side, card.short, 'loc-' + card.location]">
    <div class="title mx-1 mt-1 mb-0" @click="myDisplay = myDisplay === 'full' && !['usa', 'ussr'].includes(card.location) ? 'min' : 'full' ">
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
      <span v-if="!(card.flags && card.flags.includes('scoring')) || myDisplay !== 'full'">
        <span v-if="card.ops > 0" :class="['ops', 'side-'+card.side]">{{ card.ops }}</span>
        <span v-if="card.ops == 0" class="ops"><i class="bi-star-half" /></span>&nbsp;
        <span class="name">{{ card.name }}</span><span class="remove" v-if="card.flags && card.flags.includes('remove')">*</span>
      </span>
      <b-button-toolbar class="card-opts toolbar text-center float-right">
        <b-button-group>
          <b-button v-if="card.location !== 'deck' && card.number != 6" @click="moveCard({card, destination:'deck'})" class="to-deck" variant="success"><i class="bi-arrow-repeat to-deck"></i></b-button>
          <b-button v-if="card.flags && card.flags.includes('remove') && card.location !== 'removed'" @click="moveCard({card, destination:'removed'})" class="to-removed"><i class="bi-trash to-removed"></i></b-button>
          <b-button v-if="card.location !== 'discard' && card.number != 6" @click="moveCard({card, destination:'discard'})" class="to-discard"><i class="bi-arrow-down-short to-discard"></i></b-button>
        </b-button-group>
        <b-button-group>
          <b-button v-if="card.location !== 'usa'" @click="moveCard({card, destination:'usa'})" class="to-usa"><i class="bi-arrow-left-short"></i></b-button>
          <b-button v-if="card.location !== 'ussr'" @click="moveCard({card, destination:'ussr'})" class="to-ussr"><i class="bi-arrow-right-short"></i></b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    <div v-if="myDisplay === 'full'" class="body">
      <div class="p-2" v-if="card.flags && card.flags.includes('scoring')">
        <table class="table table-striped scoring">
          <thead>
            <tr><th>
              <span class="name">{{ card.name }}</span>
              <span>Both sides score:</span>
            </th></tr>
          </thead>
          <tbody>
            <tr v-for="score in card.scoring" :key=score>
              <td>{{ score }}</td>
            </tr>
          </tbody>
        </table>
        <div class="remove p-2" v-if="card.flags && card.flags.includes('remove')">Remove from play after scoring.</div>
        <div class="not-held">MAY NOT BE HELD</div>
      </div>
      <div v-else>
        <div class="text p-2 pt-1 text-center" >{{ cardDescription }}</div>
        <div class="remove p-2" v-if="card.flags && card.flags.includes('remove')">Remove from play if used as an event.</div>
      </div>
    </div>
    <template #footer v-if="myDisplay === 'full'" class="p-0">
      <b-button-toolbar class="card-opts toolbar text-center">
        <b-button-group>
          <b-button v-if="card.location !== 'deck' && card.number != 6" @click="moveCard({card, destination:'deck'})" class="to-deck" variant="success"><i class="bi-arrow-repeat to-deck"></i></b-button>
          <b-button v-if="card.flags && card.flags.includes('remove') && card.location !== 'removed'" @click="moveCard({card, destination:'removed'})" class="to-removed"><i class="bi-trash to-removed"></i></b-button>
          <b-button v-if="card.location !== 'discard' && card.number != 6" @click="moveCard({card, destination:'discard'})" class="to-discard"><i class="bi-arrow-down-short to-discard"></i></b-button>
        </b-button-group>
        <b-button-group>
          <b-button v-if="card.location !== 'usa'" @click="moveCard({card, destination:'usa'})" class="to-usa"><i class="bi-arrow-left-short"></i></b-button>
          <b-button v-if="card.location !== 'ussr'" @click="moveCard({card, destination:'ussr'})" class="to-ussr"><i class="bi-arrow-right-short"></i></b-button>
        </b-button-group>
      </b-button-toolbar>
    </template>
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
  div.ts-card.loc-inactive div.title span { text-decoration:line-through; }

  div.ts-stack div.ts-card { width:100%; }
  div.container.view-slim div.ts-card { width:100%; flex:1;}
  @media(max-width:767.8px) {
    div.container.view-full div.ts-hand div.ts-card { min-width:100%; max-width:100%; width:100%; }
  }
  @media(min-width:768px) {
    div.container.view-full div.ts-hand div.ts-card { min-width:calc(50% - 8px); max-width:calc(50% - 8px); }
  }
  @media(min-width:992px) {
    div.container.view-full div.ts-hand div.ts-card { min-width:calc(33% - 8px); max-width:calc(33% - 8px); }
  }
  @media(min-width:1200px) {
    div.container.view-full div.ts-hand div.ts-card { min-width:calc(25% - 8px); max-width:calc(25% - 8px); }
  }
  div.ts-card div.card-body { padding:0; }
  div.ts-card svg { display:inline-block; margin-top:-10px; margin-bottom:-10px; }

  /* set the star and text colors for each side */
  div.ts-card.side-ussr svg.star { fill:red; stroke:yellow; }
  div.ts-card.side-ussr text { fill:white; stroke:rgb(175, 173, 173); }
  div.ts-card.side-usa svg.star { fill: white; stroke: blue; }
  div.ts-card.side-usa text { fill:black; stroke:white; }
  div.ts-card.side-neutral svg.star { fill:url(#neutralStripe);stroke:black; }
  div.ts-card.side-neutral text { fill:black; stroke:white; }

  /* set the title bg for each phase */
  div.title { display:inline-block; margin-top:5px; margin-bottom:5px; border:1px solid black; padding-right:5px; width:calc(100% - 10px)}
  div.ts-card div.title { color: white; max-width:100% }
  div.ts-card div.title .name { display:inline-flex; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:55%;}
  div.ts-card.phase-early div.title { background-color:rgb(0, 171, 202); }
  div.ts-card.phase-mid div.title { background-color:rgb(0,119,139); }
  div.ts-card.phase-late div.title { background-color:rgb(0,79,92); }

  div.ts-card div.remove { font-style:italic; font-weight:bold; color:#cc3333; text-align:center; font-size:0.8em; }

  div.ts-card div.card-footer { padding:0; }

  div.card-opts { margin:0; }
  div.card-opts div.btn-group { margin:0 2px; }
  div.card-opts button { padding:2px 4px; font-size:0.8em; margin:3px 0 }
  div.dropdown.card-opts button { padding:0 5px; }

  div.card-opts button.btn { border: none; }
  div.card-opts button.btn.to-usa { background-color:blue; color:white; }
  div.card-opts button.btn.to-ussr { background-color:red; color:yellow; }
  div.card-opts button.btn.to-deck { background-color: white; color:black; }
  div.card-opts button.btn.to-discard { background-color: white; color: black; }
  div.card-opts button.btn.to-removed { background-color: white; color: black; }

  div.card table.scoring { text-align:center; border:1px solid black; }
  div.card table td, div.card table th { padding:3px; border:none; }
  div.card table.scoring th { border:1px solid black; }
  div.card table.scoring th span { font-weight:normal; display:block; }
  div.card table.scoring th span.name { font-weight:bold; font-size:1.25em; }
  div.card table.scoring td { background-color: white; }
  div.card.assc th { background-color:#f4ad43; }
  div.card.assc tr:nth-child(even) td { background-color:#face8d; }
  div.card.eusc th { background-color:#a796ca; }
  div.card.eusc tr:nth-child(even) td { background-color:#c7c8e4; }
  div.card.mesc th { background-color:#c7eafd; }
  div.card.mesc tr:nth-child(even) td { background-color:#c7eafd; }
  div.card.casc th { background-color:#d9e3a4; }
  div.card.casc tr:nth-child(even) td { background-color:#d9e3a4; }
  div.card.seasc th { background-color:#f2a41c; }
  div.card.seasc tr:nth-child(even) td { background-color:#ffd504; }
  div.card.afsc th { background-color:#ffec95; }
  div.card.afsc tr:nth-child(even) td { background-color:#ffec95; }
  div.card.sasc th { background-color:#a0c987; }
  div.card.sasc tr:nth-child(even) td { background-color:#a0c987; }

  div.card div.not-held { border:1px solid black; background-color:red; color: yellow; text-align:center; font-weight: bold; }

  div.container.view-full div.title div.card-opts { display:none; }
  div.container.view-full div.title .name { max-width:70%; }

  div.container.view-slim h3 { font-size:1.25em; }

  div.container.view-slim div.ts-card svg { display:none; }
  div.container.view-slim div.ts-card { margin-top:0 !important; margin-bottom: 0 !important;}
  div.container.view-slim div.ts-card div.title { margin-top:0 !important; margin-bottom: 0 important!; border:none; background-color:transparent;}
  div.container.view-slim div.ts-card.phase-early div.title { color:rgb(0, 171, 202); }
  div.container.view-slim div.ts-card.phase-mid div.title { color:rgb(0,119,139); }
  div.container.view-slim div.ts-card.phase-late div.title { color:rgb(0,79,92); }
  div.container.view-slim div.ts-card div.body { display:none; }

  div.container.view-full div.ts-card span.ops { display:none; }
  div.container.view-slim div.ts-card.side-neutral span.ops { color: black; }
  div.container.view-slim div.ts-card.side-ussr span.ops { color: red; }
  div.container.view-slim div.ts-card.side-usa span.ops { color: blue; }

  @media screen and (min-width: 992px) { 
    div.card-opts.dropdown { display: hidden; } 
    div.card-opts.toolbar { display: inherit; } 
  }
  @media screen and (max-width: 991.8px) { 
    div.card-opts.dropdown { display: inherit;} 
    div.card-opts.toolbar { display:hidden; } 
  }
</style>