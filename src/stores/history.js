import { defineStore } from 'pinia'
import {useLegendsStore} from './index.js';  
//import { useRoute } from "vue-router";

export const useHistoriesStore = defineStore('history', {
    persist: true,
    /*$persist: {
        storage: sessionStorage,
        paths: ['someState'],
    },*/
    state: () => ({
        history: [
            //{"name":"La Danse de la Sorcière","slug":"la-danse-de-la-sorciere","cards":[{"slug":"a1","seen":true},{"slug":"a2","seen":false},{"slug":"a3","seen":false},{"slug":"b","seen":false},{"slug":"c","seen":false},{"slug":"g","seen":false},{"slug":"la-cache-de-la-sorciere","seen":false},{"slug":"N","seen":false}]}
        ],
        activeHistory: null
    }),

    getters: {
        /*getCurrentLegend: (state) => {
            return state.legend
        },*/
        getCurrentLegendHistory: (state) => {
            return state.activeHistory 
            /*const legends = useLegendsStore()
            console.log("getCurrentLegendHistory : " + legends.getCurrentLegend.slug)
            if (legends.getCurrentLegend) {
                return this.history.find(i => i.slug === legends.getCurrentLegend.slug)
            }*/
            /*if (legends.getCurrentLegend.slug != null) {
                const slug = legends.getCurrentLegend.slug
                return  this.loadHistory(slug)
            }*/

            /*let legendHistory = this.history.find(i => i.slug === legends.getCurrentLegend.slug);
            if (!legendHistory) {
                console.log("Creation de l'historique")
                this.createLegendHistory();
                //this.getCurrentLegendHistory()
                legendHistory = this.getLegendHistory(this.legend.slug)
                return legendHistory;
            }*/
            //return legendHistory;

            //console.log(legends)
            //return null
        },
        currentCardHistory () {

        }
    },

    actions: {
        setCurrentHistory() {
            const legends = useLegendsStore()
            /*console.log("getCurrentLegendHistory : " + legends.getCurrentLegend.slug)
            if (legends.getCurrentLegend) {
                return this.history.find(i => i.slug === legends.getCurrentLegend.slug)
            }*/
            if (legends.getCurrentLegend) {
                this.activeHistory = this.history.find(i => i.slug === legends.getCurrentLegend.slug)
            }
        },
        loadHistory(slug) {
            console.log(slug);
            //console.log(this.history)
            //console.log(this.history.find(i => i.slug === slug))
            let legendHistory = this.history.find(i => i.slug === slug);
            console.log(legendHistory)
            if (!legendHistory) {
                console.log("Creation de l'historique")
                this.createLegendHistory();
                //this.getCurrentLegendHistory()
                //legendHistory = this.getLegendHistory(this.legend.slug)
            }
            return legendHistory;
            //console.log(legendHistory)
            //this.getCurrentLegendHistory = legendHistory;
        },
        createLegendHistory() {
            const legends = useLegendsStore()
            console.log(legends.getCurrentLegend)
            const legend = legends.getCurrentLegend
            //console.log("1-" + legend.name);
            let history = {
                "name": legend.name,
                "slug": legend.slug,
                "done": legend.done,
                "cards": legend.cards.map(card => {
                    return {
                        "slug": card.slug,
                        "seen": false
                    }
                })
            };
            // Add to History Store
            const store = useHistoriesStore();
            store.addHistory(history);
        },
        seenCard(currentCard) {
            //console.log(currentCard);
            this.getCurrentLegendHistory.cards.find(i => i.slug === currentCard).seen = true
            //console.log(this.getCurrentLegendHistory.cards)
            //this.getters.currentCard.seen = true;
            
        },

        legendDone() {

        },

        legendHistory(slug) {
            //console.log("history store" + slug);
            //return true;
            console.log("legendHistory")
            console.log(this.history.find(i => {
                console.log("SLUG" + slug + ' VS ' + i.slug)
                console.log(i.slug)
                console.log(i.slug === slug)
                return i.slug === slug

            }))
            //{{ areaName.area.find(({id}) => id === 1 ).name }}
            return this.history.find(i => i.slug === slug) || false;
        },

        addHistory(history) {
            //console.log("addHistory");
            //console.log(history);
            this.history.push(history);
        }

        /*createLegendHistory(legend) {
            console.log("2-" + legend.name);
            let history = [];
            history.name = legend.name
            history.cards = legend.cards.map(card => {
                return history.cards.push({
                    "slug": card.slug,
                    "seen": false
                })
                // return {...card, seen: false };
            })
            console.log(history);
        },*/

        //createLegendHystory(state, legend){
            //window.localStorage.clear();
            //return true;
            
            // Adding seen: false to every card
            /*state.legends = legends.map(legend => {
              legend.cards = legend.cards.map(card => {
                return {...card, seen: false };
              })
              return legend;
            });*/
        //},
    }
});