<script setup>
    import router from './../../router';
    //import { useRoute} from 'vue-router';
    //import { storeToRefs } from 'pinia'
    import {useLegendsStore} from './../../stores';
    import {reactive, computed} from 'vue';

    //const route = useRoute();
    const store = useLegendsStore();
    //store.$i18n = i18n.locale;
    //const legends = storeToRefs(store);
    let navigation = reactive({
        page: 1,
        pageSize: 1,
        //list: [], //[]
        listCount: 0,
        historyList: []
    });

    initPage();
    //updatePage();

    function initPage() {
        //console.log("INIT PAGE = " + route.query.page);
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
        //router.push({ path: 'register', query: { plan: 'private' }})
        //console.log(navigation);
    }

    // METHODS 
    function handleFilter() {
        router.push(`/filter`);
    }
    
    function changeLegend(slug) {
        router.push({path:`/${slug}` });
    }
</script>

<template>
    <v-container fill-height fluid >
        <v-row>
            <v-col md="12">
                <v-btn prepend-icon="mdi-filter-variant" size="small" @click="handleFilter">{{$t("list.filter")}}</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(legend, index) in navigation.historyList" :key="index">
                        <v-expansion-panel-title>
                            {{ legend.name }}
                            <!--<v-icon color="error">mdi-alert-circle</v-icon>-->
                            <template v-slot:actions v-if="legend.done">
                                <v-icon color="teal">mdi-check</v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            {{ legend.abstract }}
                            <v-btn
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

<script>
//import { computed } from 'vue';//computed
   
//export default {
    //const store = useLegendsStore();
    //const {legends} = ref(storeToRefs(store));
    /*data() {
        console.log("NB legend=" + legends.length)
    
        return {
            page: 1,
            pageSize: 5,
            //list: [], //[]
            listCount: 0,
            historyList: []
        };
    },*/
        //initPage() {
            //let _this = this;
            /*this.listCount = this.list.legends.length;
            //console.log(navigation.listCount);
            if (this.listCount < this.pageSize) {
                this.historyList = this.list;
            } else {
                this.historyList = this.list.legends.slice(0, this.pageSize);
            }
            console.log(this.historyList)
            
            const store = useLegendsStore();
            const legends = storeToRefs(store);
            return legends;*/
        //},
//    },
    /*computed: {
        pages(){
            if (this.pageSize == null || this.listCount == null) return 0;
            return Math.ceil(this.listCount / this.pageSize);
        },*/
        /*filtering() {
        //return this.$store.state.ui.loading;
        },
        legends() {
        return this.$store.state.legends;
        }*/
    //},
    /*methods: {
        initPage() {
            //console.log("NB legend=" + this.legends.length);
        },
        updatePage(pageIndex) {
            //let _this = this;
            //console.log("update " + navigation.page);
            let _start = (pageIndex - 1) * this.pageSize;
            let _end = pageIndex * this.pageSize;
            //console.log(_start + " - " + _end )
            this.historyList = this.list.legends.slice(_start, _end);
            //console.log(navigation.historyList);
            this.page = pageIndex;
            //console.log(navigation.page);
            //return navigation.historyList;
        },
        changeLegend(slug) {
            this.$router.push(`/${slug}`);
        },
        openCollapsible(slug) {
        this.open = slug;
        },
        openForm() {
        window.open("https://goo.gl/forms/nWkajUEA616YFjRp1");
        },
        handleFilter() {
            this.$router.push(`/filter`);
        //alert("toto")
        //this.$store.dispatch("loadLegenden");
        },
    },*/
    /*beforeMount() {
        this.initPage()
    },*/
//};
</script>

