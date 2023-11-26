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
        history: [
            /*{
                slug: "die-eskorte-des-knigs",
                done: true,
                cards: [
                    {
                        "slug": "A1",
                        "seen": true
                    }
                ]
            }*/
        ]
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