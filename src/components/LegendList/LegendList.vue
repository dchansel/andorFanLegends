<script setup>
    import router from './../../router';
    //import { useRoute} from 'vue-router';
    //import { storeToRefs } from 'pinia'
    import {useLegendsStore} from './../../stores';
    import {reactive, computed} from 'vue';
    import options from './../../options';

    //const route = useRoute();
    const store = useLegendsStore();
    store.legends = store.loadLegends2()
    
    let navigation = reactive({
        page: 1,
        pageSize: 6,
        //list: [], //[]
        listCount: 0,
        historyList: []
    });

    initPage();
    //updatePage();

    function initPage() {
        navigation.listCount = store.legends.length;
        /*if (route.query.page && route.query.page !=1) {
            navigation.page = route.query.page;
            updatePage(route.query.page);
        } else {*/
            //navigation.listCount = store.legends.length;
            if (navigation.listCount < navigation.pageSize) {
                navigation.historyList = store.legends;
            } else {
                navigation.historyList = store.legends.slice(0, navigation.pageSize);
            }
        //}
        //console.log(navigation);
    }

    // a computed ref
    const pages = computed(() => {
        if (navigation.pageSize == null || navigation.listCount == null) {
            //console.log( "IF");
            return 0;
        }
        //console.log("PAGES (count & size)= " + navigation.listCount  + "-" + navigation.pageSize )
        return Math.ceil(navigation.listCount / navigation.pageSize);
    })

    function updatePage(pageIndex) {
        let _start = (pageIndex - 1) * navigation.pageSize;
        let _end = pageIndex * navigation.pageSize;
        navigation.historyList = store.legends.slice(_start, _end);
        navigation.page = pageIndex;
        //console.log("NEW " + pageIndex);
        //console.log("ACTUEL" + route.query.page);
        //router.replace({ query: { ...route.query, page } })
        router.replace({ query: { page: pageIndex } })
    }

    // METHODS 
    function handleFilter() {
        router.push(`/filter`);
    }
    
    function changeLegend(slug) {
        router.push({path:`/${slug}` });
    }

    function showYear() {
        if(store.filtering.year.length == options.yearOptions.length) {
            return false;
        }
        return true;
    }
    function resetYear() {
        store.filtering.year = options.yearOptions;
        store.legends = store.loadLegends2();
        initPage();
    }

    function showDifficulty() {
        if(store.filtering.difficulty.length == options.difficultiesOptions.length) {
            return false;
        }
        return true;
    }
    function resetDifficulty() {
        store.filtering.difficulty = options.difficultiesOptions.map(n => {return n.key})
        store.legends = store.loadLegends2();
        initPage();
    }

    function showBoard() {
        if(store.filtering.board.length == options.boardOptions.length) {
            return false;
        }
        return true;
    }
    function resetBoard() {
        store.filtering.board = options.boardOptions.map(n => {return n.key})
        store.legends = store.loadLegends2();
        initPage();
    }
</script>

<template>
    <v-container fill-height fluid >
        <v-row>
            <v-col md="12">
                <v-btn prepend-icon="mdi-filter-variant" size="small" @click="handleFilter">{{$t("list.filter")}}</v-btn>
            </v-col>
            <v-chip
                v-show="showDifficulty()"
                class="ma-2"
                closable
                @click:close="resetDifficulty()">
                {{store.getSelectedDifficulty}}
            </v-chip>
            <v-chip
                v-show="showBoard()"
                class="ma-2"
                closable
                @click:close="resetBoard()">
                {{store.getSelectedBoard}}
            </v-chip>
            <v-chip
                v-show="showYear()"
                class="ma-2"
                closable
                @click:close="resetYear()">
                {{store.getSelectedYear}}
            </v-chip>
        </v-row>
        <v-row>
            <v-col md="12">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(legend, index) in navigation.historyList" :key="index">
                        <v-expansion-panel-title>
                            {{ legend.name }}
                            <v-icon v-if="legend.cardsCount==0" class="only-download" color="red-darken-2" icon="mdi-link"></v-icon>
                            <template v-slot:actions v-if="legend.done">
                                <v-icon color="teal">mdi-check</v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            {{ legend.abstract }}
                            <v-btn 
                                v-if="legend.cardsCount==0"
                                :href="legend.download" 
                                density="comfortable" class="float-right rounded mt-3">
                                {{ $t("list.downloadLegend") }}</v-btn>
                            <v-btn
                                v-if="legend.cardsCount>0"
                                @click="changeLegend(legend.slug)" 
                                density="comfortable" class="float-right rounded mt-3">
                                {{ $t("list.startLegend") }}</v-btn>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-pagination class="pagination mb-2" v-model="navigation.page" :length="pages" @update:modelValue="updatePage"></v-pagination>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.only-download {
    margin: 0 10px;
}
</style>