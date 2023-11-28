import i18n from "./../locales/i18n";
import { defineStore, storeToRefs } from 'pinia';
import {useHistoriesStore} from "./history.js";
import { useRoute } from "vue-router";
//import router from './../router';
//import { defineEmits } from 'vue';

//const emits = defineEmits(['on-add']);

export const useLegendsStore = defineStore('legends', {

    state: () => ({
        legends: loadLegends(),
        legend: null,
        legendHistory: null
    }),

    // getters return data from the data store
    getters: {
        getNumberOfLegends: (state) => {
            return state.legends.length
        },
        getCurrentLegend: (state) => {
            return state.legend
        },
        /*currentLegend: (state) => {
            console.log(router.params.legendSlug)
            return state.legends.find(i => i.slug === router.params.legendSlug) || false;
        },*/
        
        /*currentCard(state, getters){
          return getters.currentLegend && getters.currentLegend.cards.find(i => i.slug === state.route.params.cardSlug) || false;
        }*/
    },
    actions: {
        fetchLegend() {
            const route = useRoute();
            this.legend = null;
            this.legend = require('./../../public/legends/' + i18n.global.locale.value + "/" + route.params.legendSlug + '.json');

            this.legendHistory = getLegendHistory(this.legend.slug)
            if (!this.legendHistory) {
                console.log("History not exist");
                //create&Load
                //const store = useHistoriesStore();
                //store.createLegendHistory(this.legend);
                createLegendHistory(this.legend);
            } else {
                console.log("History exist");
            }
            
        },
        currentLegend(){
            return this.state.legends.find(i => i.slug === this.state.route.params.legendSlug) || false;
        },
        activeLegend() {
            const route = useRoute();
            //const route = useRoute();
            //console.log(route.params.legendSlug);
            return require('./../../public/legends/' + i18n.global.locale.value + "/" + route.params.legendSlug + '.json');
        },
    },
})

const loadLegends = () => {

    let legends = require('./../../public/legends/legends-'+i18n.global.locale.value+'.json');
    let history = getHistory().value;

    legends = legends.map(legend => {
        let doneState = history.find(i => {
            if( i.slug === legend.slug) {
                //console.log("DONE = " + i.done);
                return i.done;
            }
            return false;
        }) || false;
        let done =  doneState.done || false;
        return {...legend, done: done };
      });
    return legends;
    //return require('./../../public/legends/legends-'+i18n.global.locale.value+'.json');
}

function getHistory() {
    const {history} = storeToRefs(useHistoriesStore());
    //console.log(history.value);
    return history;
}

function getLegendHistory(slug) {
    const store = useHistoriesStore();
    //console.log(useHistoriesStore())
    //const {history} = storeToRefs(store);
    //console.log(store.legendHistory(slug));
    return store.legendHistory(slug);
}

function createLegendHistory(legend) {
    console.log(legend.name);
    let history = [{
        "name": legend.name,
        "cards": legend.cards.map(card => {
            return {
                "slug": card.slug,
                "seen": false
            }
        })
            //)
            // return {...card, seen: false };
    }];
    console.log(history);
    // Add to History Store
}