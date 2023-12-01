import { defineStore } from 'pinia'
//import { useRoute } from "vue-router";

/*
[
    {
        legendSlug:"",
        "done": 0|1
        "cards": [
        {
            "slug": "A1",
            "seen": true
        },
        {
            "slug": "A2",
            "seen": false
        },
        ...
    },
]
*/

export const useHistoriesStore = defineStore('history', {

    state: () => ({
        history: []
    }),

    getters: {
        /*getCurrentLegend: (state) => {
            return state.legend
        },*/

    },

    actions: {
        seenCard(currentCard) {
            console.log(currentCard);
            //this.getters.currentCard.seen = true;
        },

        legendDone() {

        },

        legendHistory(slug) {
            console.log(slug);
            //return true;
            //console.log(this.history)
            //return this.history.find(i => i.slug === slug) || false;
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