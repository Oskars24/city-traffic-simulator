<template>
    <div class="viewAllPage">
        <div class="pageTitle bg-blue">
            <router-link :to="{ name: 'miejsca'}" tag="span" class="pageTitle__prev">⇠</router-link>
            <span class="pageTitle__title">{{pageTitle.replace("_", " ")}}</span>
        </div>
        <!--
        <div tag="div" class="place" v-for="place in placesArray" :key="place.id">
            <a class="place__img" :href="'https://www.openstreetmap.org/'+place.id" target="_blank"><img class="place__img" src="../assets/fakephoto.png"></a><br>
            <div class="place__title">{{place.properties.name}}</div>
            <div class="place__distance">(odl: {{addUnits(countDistance(place.geometry.coordinates))}})</div>
            <div class="place__desc" v-if="place.properties.description">{{place.id.replace('/','_')}} {{place.properties.description}}</div>
        </div>
        -->
        <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="place" v-for="place in placesArray" :key="place.id" v-show="place.properties.name && place.properties.description">
            <img class="place__img" :src="loadImage(place.id)">
            <div class="place__title">{{place.properties.name}}</div>
            <div class="place__distance">(odl: {{addUnits(countDistance(place.geometry.coordinates))}})</div>
            <div class="place__desc" v-if="place.properties.description">{{place.properties.description}}</div>
        </router-link>
       
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'viewall',
    methods: {
        loadImage(variable) {
            try {
                return require(`../assets/images/thumb/${variable.replace('/','_')}.jpg`)
            } catch (e) {
                return require(`../assets/fakephoto.png`);
            }
        }
    },
    computed: {
        ...mapGetters(["addUnits", "countDistance"]),
        pageTitle() {
            return this.$route.params.name
        },
        placesArray() {
            return eval(`this.$store.getters.${this.pageTitle}`)
        },
    },
    created() {
        
    }
}
</script>

<style lang="scss" scoped>
.viewAllPage {
    display: flex;
    flex-flow: column;
    overflow-y: auto;
}

.pageTitle {
    text-transform: uppercase;
    height: 45px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    color: white;
    border-top: $border-grey;
    border-radius: 0 0 7px 7px;

    &__prev {
        font: $h0;
        padding-left: 10px;
        padding-bottom: 5px;
    }

     &__title {
        font: $h1;
        padding-right: 10px;
        margin: auto;
    }
}

.place {
    margin: 5px 10px 5px 10px;
    height: 100px;
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-rows: max-content max-content auto;

    &__img {
        margin-right: 10px;
        grid-column: 1/2;
        grid-row: 1/4;
        height: 100px;
        border-radius: 7px;
        border: $border-grey;
    }

    &__title {
        font: $h4;
        grid-column: 2/-1;
        grid-row: 1/2;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        }

    &__distance {
            font: $h4;
            grid-column: 2/-1;
            grid-row: 2/3;
    }

    &__desc {
        font: $h6;
        grid-column: 2/-1;
        grid-row: 3/4;
        overflow: hidden;
        position: relative;
        height: 5.5em;
    }

    &__desc:after {
            content: "";
            text-align: right;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 25%;
            height: 1.2em;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 75%);
            }
}
</style>
