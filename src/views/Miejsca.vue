<template>
    <div class="miejscaPage">
        <!-- ATRAKCJE -->
         <div class="titleBar bg-blue">
            <span class="titleBar__title">Atrakcje:</span>
            <router-link :to="'/viewall/atrakcje'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in atrakcje.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- RAKREACJA -->
        <div class="titleBar bg-yellow">
            <span class="titleBar__title">Rekreacja:</span>
            <router-link :to="'/viewall/rekreacja'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in rekreacja.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- GASTRONOMIA -->
        <div class="titleBar bg-green">
            <span class="titleBar__title">Gastronomia:</span>
            <router-link :to="'/viewall/gastronomia'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in gastronomia.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- NOCLEGI -->
        <div class="titleBar bg-red">
            <span class="titleBar__title">Noclegi:</span>
            <router-link :to="'/viewall/noclegi'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in noclegi.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- PUBY -->
        <div class="titleBar bg-brown">
            <span class="titleBar__title">Puby:</span>
            <router-link :to="'/viewall/puby'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in puby.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- TERENY ZIELONE -->
        <div class="titleBar bg-dark-green">
            <span class="titleBar__title">Tereny zielone:</span>
            <router-link :to="'/viewall/tereny_zielone'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/szczegoly/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in tereny_zielone.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>

    </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
    name: 'miejsca',
    computed: {
        ...mapGetters(["countDistance", "addUnits", "atrakcje", "rekreacja", "noclegi", "gastronomia", "puby", "tereny_zielone"])
    },
}
</script>

<style lang="scss" scoped>
.miejscaPage {
    overflow-y: auto;
}

.titleBar {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border-top: $border-grey;
    border-radius: 0 0 7px 7px;

    &__title {
        font: $h2;
        padding-left: 10px;
    }

    &__more {
        font: $h5;
        padding-right: 10px;
    }
}

.carousel {
    height: 160px;
    display: flex;
    overflow-x: auto;

    &__div {
        padding: 10px;
        max-width: 140px;

        &--img {
            height: 100px;
            border-radius: 7px;
            border: $border-grey;
        }

        &--title {
            font: $h4;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &--distance {
            font: $h5;
        }
    }
}

</style>
