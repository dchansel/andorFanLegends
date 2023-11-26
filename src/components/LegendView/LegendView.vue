<script setup>
    import { reactive, defineEmits } from 'vue'; //
    import router from './../../router';
    import {storeToRefs} from 'pinia';    
    import {useLegendsStore} from './../../stores';    
    import cardView from './CardView';

    const {legend} = storeToRefs(useLegendsStore());
    const { fetchLegend } = useLegendsStore()

    fetchLegend();

    const emits = defineEmits(['on-add'])
    emits('on-add', legend.value.name)
    //emits('on-add', useLegendsStore.getters.getCurrentLegend)

    const dialog = reactive({state: false});
    const currentCard = [];
    
    function handleOpenCard(slug) {
        router.push(`/${legend.value.slug}/${slug}`);
        dialog.state = true
        //let currentCard = [];
        /*let currentCard = legend.value.cards.find(f => {
            return f.slug === slug
        });
        console.log(currentCard);*/
        this.currentCard = legend.value.cards.find(f => {
        //let currentCard.value = legend.value.cards.find(f => {    
            return f.slug === slug
        });
        //console.log(this.currentCard);
        //this.$store.commit("seeCard");
    }

    function handleCloseCard() {
        //console.log(this.currentCard);
        if(currentCard){
            dialog.state = false
            //currentCard.value = [];
            router.go(-1);
        }
    }
</script>

<template>
<div>
    <div style="display: flex; flex-wrap: wrap;">
        <button
            v-for="card in legend.cards.filter(i => i.type ==='letter' || i.type === 'end')"
            :key="card.name"
            :raised="!card.seen"
            size="large"
            class="cardbtn"
            :class="{ seen: card.seen }"
            @click="handleOpenCard(card.slug)"
        >
            {{ card.name }}
        </button>
    </div>
    <hr v-if="legend.cards.filter(i => i.type ==='custom').length !== 0" class="trenner">
    <div
        v-for="card in legend.cards.filter(i => i.type ==='custom')"
        :key="card.name"
        class="customCardHolder"
        >
        <button
            align="end" 
            :raised="!card.seen"
            size="large"
            :type="card.seen ? 'primary': 'secondary'"
            class="cardbtn customcard"
            :class="{ seen: card.seen }"
            @click="handleOpenCard(card.slug)"
            >
            {{ card.name }}
        </button>
        <div style="padding-right: 15px;"><b>{{ card.name }}</b><br/>{{ card.subname }}</div>
    </div>
    <v-dialog
        fullscreen
        v-model="dialog.state">
        <v-card>
            <v-card-title class="justify-center">
                <span class="text-h4" style="vertical-align:text-top">A</span>
                <v-btn
                    icon="mdi-close"
                    class="float-right"
                    variant="text" 
                    @click="handleCloseCard"></v-btn>
            </v-card-title>
            <cardView :card-data="currentCard || {}" :name="legend.name" card-type="app" />
        </v-card>
        
      </v-dialog>
</div>
</template>


<style scoped>
.cardbtn {
  margin: 10px;
  border-radius: 5px;
  background-image: url("./../../assets/blankocard.png");
  background-size: cover;
  background-position: center;
  font-size: 36px;
  text-shadow: 0px 0px 2px white;
  width: 85px;
  height: 128px;
  font-weight:bold;
  padding-top:20px;
}

.cardbtn.seen {
  filter: grayscale(90%);
}

.cardbtn.customcard {
  font-size: 15px;
  padding: 0 0;
  background-position: bottom;
  border-radius: 0 0 5px 5px;
  height: 100px;
  min-width: 160px;
}

.customcard :deep(.ui-button__content) {
  flex-direction: column;
}

.customcard :deep(.ui-button__content strong) {
  padding-bottom: 20px;
}

.customCardHolder {
  display: flex;
  align-items: center;
}

.cardModal :deep(.ui-modal__body) {
  padding: 0;
}

.v-card .v-card-title{
    height:64px;
}
</style>