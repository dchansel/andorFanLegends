<script setup>
    import { ref, computed, reactive } from 'vue';
    //import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useConfirm, useSnackbar } from 'vuetify-use-dialog'
    import { useHistoriesStore } from "./stores/history.js";

    import { useI18n } from "vue-i18n";
    import {useSettingsStore} from './stores/settings.js';

    import useUpdater from './update.js';
    let updater = useUpdater();
    updater.created()
    //let snackUpdateExists = updater.updateData.snackUpdateExists
    //let snackUpdate = updater.updateData.updateExists
    //updateExists = updateData.value.updateExists
    //console.log(updateExists)
    function refreshApp() {
        console.log("refrshapp")
        updater.updateData.updateExists = false
        // Make sure we only send a 'skip waiting' message if the SW is waiting
        if (!updater.updateData.registration || !updater.updateData.registration.waiting) return
        // Send message to SW to skip the waiting and activate the new SW
        updater.updateData.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }

    const t = useI18n();
    const userSettings = useSettingsStore();
    let languageSettings = reactive(userSettings.activeLanguage);
    if (languageSettings != null && languageSettings != t.locale.value) {
        t.locale.value = languageSettings;
    }
    userSettings.activeLanguage = t.locale.value; 
    //console.log(t.locale.value)
    //t.locale.value = "de";
    

    const route = useRoute();
    const mainpage = computed(() => {
        //return this.$route.path === "/";
        return route.path === "/";
    });
    const filter = computed(() => {
        //return this.$route.path === "/";
        return route.path === "/filter";
    });
    const settings = computed(() => {
        return route.path === "/settings";
    });

    const router = useRouter();
    function historyBack() {
        //this.$router.go(-1);
        router.go(-1);
    }

    var activeLegend= ref("");
    function receiveEmit(legend) {
        activeLegend.value = legend;
        //console.log(legendName)
    }

    function menuAdditionnalPnp() {
        console.log("additionnal");
    }

    function menuDownloadLegend() {
        console.log("download");
    }

    function menuFinish() {
        let options = {
            title: "Marquer comme terminée",
            content: 'La Légende sera indiquée comme effectuée, et toutes les cartes seront marquées comme lues.',
            confirmationText: 'Oui',
            cancellationText: 'Annuler'
        }
        handleConfirm(options,"finish")
    }

    function menuReset() {
        let options = {
            title: "Réinitialiser ?",
            content: 'Toutes les cartes seront activées, la légende sera marquée comme non réalisée.',
            confirmationText: 'Oui',
            cancellationText: 'Annuler'
        }
        handleConfirm(options, 'reset')
    }

    const createConfirm = useConfirm()
    const createSnackbar = useSnackbar()

    async function handleConfirm(options, type) {
        const isConfirmed = await createConfirm(options)

        if (!isConfirmed) return

        createSnackbar({ text: 'Confirmed' })
        console.log(type)

        const history = useHistoriesStore()
        history.doAction(type)
        return true
    }

    function handleSettings() {
        router.push(`/settings`);
    }

    //let updateAvailable = reactive(false)
    function handleUpdate() {
        updater.updateData.snackUpdateExists = true
        //router.push(`/update`);
    }

    /*function handleLoading() {
        this.$store.dispatch("loadLegenden");
    }*/
    //const snackbar = true
</script>

<template>
    <v-app>
        <v-container class="py-0">
            <v-app-bar class="v-theme--dark" :elevation="2">
                <div id="back">
                    <v-btn density="default" icon="mdi-keyboard-backspace"
                        v-show="!mainpage && !settings"
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
                </div>
                <img src="./assets/logo-menu.png"
                    v-if="mainpage" 
                    alt style="max-height: 100%">
                <div
                    v-if="!mainpage && !filter">{{activeLegend.name}}
                </div>
                <template v-slot:append>
                    <v-btn v-show="updater.updateData.updateExists" icon="mdi-bell"  @click="handleUpdate"></v-btn>
                    <v-menu class="align-content-end" v-if="mainpage">
                        <template  v-slot:activator="{ props }">
                            <v-btn icon="mdi-cog" v-bind="props" @click="handleSettings"></v-btn>
                        </template>
                    </v-menu>
                    <v-menu class="align-content-end" v-if="!mainpage && !filter && !settings">
                        <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-if="activeLegend.additionaldownload" @click="menuAdditionnalPnp()">
                                <v-list-item-title>Télécharger contenu PnP</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="menuDownloadLegend()">
                                <v-list-item-title>Télécharger la Légende</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="menuFinish()">
                                <v-list-item-title>Marquer comme terminé</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="menuReset()">
                                <v-list-item-title>Réinitialiser</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>    
            </v-app-bar>
        </v-container>
        <v-main class="d-flex justify-center" style="min-height: 300px;"><!--align-center -->
            <router-view @activeLegend="receiveEmit"></router-view>
            <v-snackbar bottom right v-model="updater.updateData.snackUpdateExists" :timeout="5000" color="primary">
                An update is available
                <v-btn text @click="refreshApp">
                    Update
                </v-btn>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<style>
.v-toolbar__content{
    background: #5f5f5f;
}

.add-to-homescreen-container {
    background-color: #33691e !important;
    color: #fff !important;
    
    .icon{
        background-size: 60% !important;
    }

    .btn-container{
        float: none !important;

        .add-button{
            border-radius: 25px;
            :hover{
                background-color:#f1f2f5;
            }
        }

    }
}

</style>
