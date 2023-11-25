<script setup>
    import { computed, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    //import LegendView from './components/LegendView/LegendView.vue';

    const route = useRoute();
    const router = useRouter();

    const mainpage = computed(() => {
        //return this.$route.path === "/";
        return route.path === "/";
    });

    /*const activeLegend = computed(() => {
         return "tata";
    });*/
    let activeLegend = ref("");

    /*const activeLegend = reactive(

    );*/ 

    function historyBack() {
        //this.$router.go(-1);
        router.go(-1);
    }

    function receiveEmit(legendName) {
        activeLegend = legendName;
        console.log(legendName);
        //alert("toto");
    }
    /*function handleLoading() {
        this.$store.dispatch("loadLegenden");
    }
    function handleSettings() {
        this.$store.dispatch("loadLegenden");
    }
    function dismissMessage() {
        this.$store.commit("clearMessage");
    }*/

</script>

<template>
    <v-app>
        <v-container class="py-0">
            <v-app-bar :elevation="2">
                <div id="back">
                    <v-btn density="default" icon="mdi-keyboard-backspace"
                        v-show="!mainpage"
                        @click="historyBack"
                    ></v-btn>
                </div>
                <div id="actions">
                    <!--<ui-icon-button
                        v-show="mainpage"
                        color="black"
                        icon="refresh"
                        :loading="loading"
                        size="large"
                        type="secondary"
                        @click="handleLoading"
                    ></ui-icon-button>-->
                    <!--<ui-icon-button
                        v-show="mainpage"
                        color="black"
                        icon="settings"
                        :loading="loading"
                        size="large"
                        type="secondary"
                        @click="handleSettings"
                        ></ui-icon-button>-->
                </div>
                <img src="./assets/logo-menu.png"
                    v-if="mainpage" 
                    alt style="max-height: 100%">
                <div
                    v-if="!mainpage">{{ activeLegend }}
                </div>
            </v-app-bar>
        </v-container>
        <v-main class="d-flex justify-center" style="min-height: 300px;"><!--align-center -->
            <router-view @on-add="receiveEmit"></router-view>
        </v-main>
    </v-app>
</template>


<style>
</style>
