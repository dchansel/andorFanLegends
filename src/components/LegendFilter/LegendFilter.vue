<script setup>
    import {useLegendsStore} from './../../stores';
    import options from './../../options';
    import {reactive, watch } from 'vue';//computed

    // TODO : Delete route and historyback and place result button in main APP.vue ????
    import { useRouter } from 'vue-router';
    const router = useRouter();

    //const difficultiesOptions = [{name:'Facile', key:1}, {name:'Moyenne', key:2}, {name:'Difficile', key:3}];
    //const boardOptions = [{name:'Andor',key:1},{name:'Cavern',key:2},{name:'Mer du Nord',key:3},{name:'Hadria',key:4},{name:'Montagnes grises',key:5},{name:'Krahd',key:6},{name:'Andor enneigé',key:7},{name:'Pays des trois frères',key:8}];
    //const yearOptions = ['2013','2014','2015','2016','2017'];
    //const boxExtOptions = [{name:'Andor (base)', key:1},{name:'Voyage vers le Nord', key:2},{name:'Le Dernier Espoir', key:3}, {name:'Froid Eternel', key:4}, {name:'Boite Bonus', key:5}, {name:'Lég. oubliées : Heures sombres', key:6}, {name:'Lég. oubliées : Esprits Ancestraux', key:7}, {name:'Lég. de Gardétoile', key:8}, {name:'Nouveaux Héros', key:9}, {name:'Héros Sombres', key:10}  ]
    
    const store = useLegendsStore();
    let selected = reactive(store.filtering);
    watch(selected, () => {
        store.legends = store.loadLegends2();
    });

    // TODO : Delete route and historyback and place result button in main APP.vue ????
    function historyBack() {
        router.go(-1);
    }
</script>

<template>
    <v-container>
    <section class="page">
        <v-row class="center">
            <v-col >
                <p class="text-h5">Disponibilité des Légendes</p>
                <v-switch
                    color="light-green-darken-4"
                    label="Jouable dans l'application"
                    v-model="selected.inApp"
                    name="inApp"
                    hide-details
                    ></v-switch>
                    <div v-show="selected.inApp" style="margin:-25px 30px"><v-switch
                        color="light-green-darken-4"
                        v-model="selected.withPrintableElement"
                        name="withPrintableElement"
                        label="Avec Elements imprimables"
                        hide-details
                        ></v-switch>
                    </div>
                <v-switch
                    color="light-green-darken-4"
                    v-model="selected.onlyPrintable"
                    name="onlyPrintable"
                    label="A imprimer uniquement"
                    hide-details
                    ></v-switch>
                <p class="text-h5">Difficulté</p>
                <v-chip-group
                    v-model="selected.difficulty"
                    selected-class="bg-light-green-darken-4"
                    column multiple>
                    <v-chip
                        color="grey-lighten-3"
                        v-for="difficulty in options.difficultiesOptions" 
                            :key="difficulty.key"
                            :value="difficulty.key">
                        {{ difficulty.name }}
                    </v-chip>
                </v-chip-group>
                

                <p class="text-h5">Plateau</p>
                <v-chip-group
                    v-model="selected.board"
                    selected-class="bg-light-green-darken-4"
                    column multiple>
                    <v-chip
                        color="grey-lighten-3"
                        v-for="board in options.boardOptions" 
                            :key="board.key"
                            :value="board.key">
                        {{ board.name }}
                    </v-chip>
                </v-chip-group>
                

                <p class="text-h5">Année de publication</p>
                <v-chip-group
                    v-model="selected.year"
                    selected-class="bg-light-green-darken-4"
                    column multiple>
                    <v-chip
                        color="grey-lighten-3"
                        v-for="year in options.yearOptions" 
                            :key="year"
                            :value="year">
                        {{ year }}
                    </v-chip>
                </v-chip-group>
            <!--    
            <p class="text-h5">Nombre de héros</p>
            
            In app : {{selected.inApp}} - onlyPrintable {{ selected.onlyPrintable }}
            <span>difficulté selectionnée : {{selected.difficulty}}</span>
            <span>Année selectionnée : {{selected.year}}</span>
            <span>Plateau selectionnée : {{selected.board}}</span>
            -->
            </v-col>
        </v-row>
        <v-bottom-navigation active>
            <v-btn @click="historyBack"  block>Afficher ({{store.getNumberOfLegends}} Résultats)</v-btn>
        </v-bottom-navigation>
    </section>
</v-container>

</template>

<style>
.page {
    margin: 2rem;
}

.text-h5{
    margin:15px 0 0 0;
}

.v-bottom-navigation .v-bottom-navigation__content > .v-btn {
    max-width: 100%;
}
</style>