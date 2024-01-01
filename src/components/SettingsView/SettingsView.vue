<script setup>
    /* eslint-disable */
    import {useSettingsStore} from './../../stores/settings.js';
    import {reactive, ref} from 'vue';
    import options from './../../options';
    
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const store = useSettingsStore();
    const previousLanguage = store.activeLanguage;
    let selectedLng = ref(store.activeLanguage);

    function languageRadioHandler(newLanguage) {
        store.activeLanguage = newLanguage
        //console.log(previousLanguage)
    }
    function applySettings() {
        router.push(`/`).then(() => { router.go() });
    }
    function cancelSettings() {
        store.activeLanguage = previousLanguage
        router.push(`/`);
    }
</script>
<template>
    <v-container>
    <section class="page">
        <v-row class="center">
            <v-col >
                <p class="text-h5">{{ $t("settings.availableLanguages") }}</p>
                <v-radio-group  v-model="selectedLng" mandatory>
                    <v-radio v-for="languageOpt in options.availableLanguagesOptions"
                        :label="languageOpt.name"
                        :key="languageOpt.key"
                        :value="languageOpt.key"
                        @change="languageRadioHandler(languageOpt.key)"
                    ></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <v-btn block class="text-none mb-4" color="indigo-darken-3" size="x-large" variant="flat"
            @click="applySettings">
            Appliquer
        </v-btn>
        <v-btn block class="text-none" color="grey-lighten-3" size="x-large" variant="flat"
            @click="cancelSettings">
            Annuler
        </v-btn>
    </section>
    </v-container>
</template>

<script>
/*export default {
    data () {
      return {
        radioGroup: 1,
      }
    },
  }*/
</script>

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