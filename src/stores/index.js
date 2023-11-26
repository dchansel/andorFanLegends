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
            //console.log("SLUG : " + route.params.legendSlug);
            //console.log("FETCH" + this.$router.params.legendSlug);
            this.legend = null;
            //this.legend = this.legends.find(i => i.slug === this.router.params.legendSlug) || false;
            //this.legend = this.legends.find(i => i.slug === route.params.legendSlug) || false;
            this.legend = require('./../../public/legends/' + i18n.global.locale.value + "/" + route.params.legendSlug + '.json');

            //Add Legend History if exist
            getHistory();
            
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
                console.log("DONE = " + i.done);
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
    console.log(history.value);
    return history;
}