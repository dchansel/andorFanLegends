<script setup>
    import {useLegendsStore} from './../../stores';
    import options from './../../options';
    import {reactive, watch } from 'vue';//computed

    // TODO : Delete route and historyback and place result button in main APP.vue ????
    import { useRouter } from 'vue-router';
    const router = useRouter();

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
                    ><template v-slot:label>A imprimer uniquement<v-icon class="only-download" color="red-darken-2" icon="mdi-link"></v-icon></template></v-switch>
                <p class="text-h5">Type des Légendes</p>
                <v-switch
                    color="light-green-darken-4"
                    v-model="selected.officialLegends"
                    name="officialLegends"
                    label="Légendes officielles"
                    hide-details
                    ><template v-slot:label>Légendes Bonus officielles<v-icon class="only-download" color="red-darken-2" icon="mdi-shield-sword"></v-icon></template></v-switch>
                <v-switch
                    color="light-green-darken-4"
                    v-model="selected.fanLegends"
                    name="fanLegends"
                    label="Légendes de Fans"
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