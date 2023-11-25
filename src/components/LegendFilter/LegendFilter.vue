<template>
    <section class="page">
        <ui-checkbox-group
            :options="['Facile', 'Moyenne', 'Difficile']"
            v-model="group1"
        >Difficulté</ui-checkbox-group>
        <ui-checkbox-group
            :options="['Andor', 'Cavern']"
            v-model="group1"
        >Plateau</ui-checkbox-group>

        Nombre de héros

        Année de publication
    </section>


</template>

<script>
export default {
    data() {
        return {
            group1: ['Facile', 'Moyenne', 'Difficile'],
            group2: ['Andor', 'Cavern']
        }
    }
}
</script>

<style>
.page {
    margin: 2rem;
}
</style>