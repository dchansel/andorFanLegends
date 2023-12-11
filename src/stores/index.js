/* eslint-disable */
import i18n from "./../locales/i18n";
import options from './../options';
import { defineStore, storeToRefs } from 'pinia';
import {useHistoriesStore} from "./history.js";
import { useRoute } from "vue-router";

//const emits = defineEmits(['on-add']);

export const useLegendsStore = defineStore('legends', {
    //TODO: ADD OPTIONS FILE TO INIT filtering with all 
    state: () => ({
        //legends: this.loadLegends2(),
        legends: [],
        legend: null,
        filtering: {
            inApp: true,
            withPrintableElement: true,
            onlyPrintable: true,
            difficulty: options.difficultiesOptions.map(n => {return n.key}), // Object.keys(options.difficultiesOptions) //[1,2,3]
            board: options.boardOptions.map(n => {return n.key}),
            year: options.yearOptions,
        }
    }),

    // getters return data from the data store
    getters: {
        getNumberOfLegends: (state) => {
            return state.legends.length
        },
        getCurrentLegend: (state) => {
            return state.legend
        },
        getSelectedYear(state) {
            if(state.filtering.year.length == 1) {
                return state.filtering.year[0];
            } else {
                return "Années (" + state.filtering.year.length + ")"
            }
        },
        getSelectedDifficulty(state) {
            if(state.filtering.difficulty.length == 1) {
                return options.difficultiesOptions.filter(item => item['key'] == state.filtering.difficulty)[0].name;
            } else {
                return "Difficulté (" + state.filtering.difficulty.length + ")"
            }
        },
        getSelectedBoard(state) {
            if (state.filtering.board.length == 1) {
                return options.boardOptions.filter(item => item['key'] == state.filtering.board)[0].name;
            } else {
                return "Plateau (" + state.filtering.board.length + ")"
            }
        },
        getSelectedAvailability(state) {
            if (!state.filtering.withPrintableElement && !state.filtering.onlyPrintable) {
                return "Not additional print";
            }
            if (state.filtering.inApp &&  !state.filtering.onlyPrintable) {
                return "In-App";    
            }
            if (state.filtering.onlyPrintable && !state.filtering.inApp) {
                return  "Only PnP";
            }
            if (!state.filtering.withPrintableElement) {
                return "Not additional print";
            }
            if (state.filtering.inApp &&  state.filtering.onlyPrintable) {
                return null;    
            }
            
            return "No legends";
        }
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
            // Sort cards by name
            this.legend.cards = sort_by_key(this.legend.cards, 'name');
            
            // Get the Legend's History 
            this.legendHistory = getLegendHistory(this.legend.slug)
            if (!this.legendHistory) {
                createLegendHistory(this.legend);
                this.legendHistory = getLegendHistory(this.legend.slug)
            } else {
                console.log("History exist");
            }
        },
        currentLegend(){
            return this.state.legends.find(i => i.slug === this.state.route.params.legendSlug) || false;
        },
        /*activeLegend() {
            const route = useRoute();
            //const route = useRoute();
            //console.log(route.params.legendSlug);
            return require('./../../public/legends/' + i18n.global.locale.value + "/" + route.params.legendSlug + '.json');
        },*/
        loadLegends2(state) {

            let legends = require('./../../public/legends/legends-'+i18n.global.locale.value+'.json');
            let history = getHistory().value;
        
            // FILTERING
            let filter = this.filtering;
            legends = legends.filter(function (n) { // YEARS
                return filter.year.includes(n.year)
            });
            //console.log(legends);
            legends = legends.filter(function (n) { // DIFFICULTY
                return n.difficulty.map(String).some(difficultyOne => filter.difficulty.includes(difficultyOne));
            });
            legends = legends.filter(function (n) { // BOARD
                return n.board.map(String).some(boardOne => filter.board.includes(boardOne));
            });
            legends = legends.filter(function (n) { // Only Printable False
                if( filter.inApp && filter.onlyPrintable && filter.withPrintableElement) { //ALL
                    return true;
                }
                if( filter.inApp && filter.onlyPrintable ) { //ALL
                    return true;
                }
                if ( (filter.inApp && !filter.onlyPrintable) && n.cardsCount > 0) { // "In-App";
                    //console.log("in app");
                    return true;
                }
                if (filter.onlyPrintable && !filter.inApp && n.cardsCount == 0) { //"Only PnP"
                    //console.log("only pnp");
                    return  true;
                }
                return false;
            });
            legends = legends.filter(function (n) { // Printable Element
                if ( !filter.withPrintableElement && ( n.hasOwnProperty("additional")  && n.additional != "") ) { 
                    return false;
                }
                return true;
            });
            
        
            // get history
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
        }
    },
})

/*const loadLegends = (state) => {

    let legends = require('./../../public/legends/legends-'+i18n.global.locale.value+'.json');
    let history = getHistory().value;

    // get history
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
}*/

function getHistory() {
    const {history} = storeToRefs(useHistoriesStore());
    return history;
}

function getLegendHistory(slug) {
    const store = useHistoriesStore();
    return store.legendHistory(slug);
}

function createLegendHistory(legend) {
    //console.log("1-" + legend.name);
    let history = {
        "name": legend.name,
        "slug": legend.slug,
        "cards": legend.cards.map(card => {
            return {
                "slug": card.slug,
                "seen": false
            }
        })
    };
    //console.log(history);
    // Add to History Store
    const store = useHistoriesStore();
    store.addHistory(history);
}

function sort_by_key(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}