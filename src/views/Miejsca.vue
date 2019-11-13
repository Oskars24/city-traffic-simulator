<template>
    <div class="miejscaPage">
        <!-- ATRAKCJE -->
         <div class="titleBar bg-blue">
            <span class="titleBar__title">Atrakcje:</span>
            <router-link :to="'/atrakcje/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/atrakcje/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in atrakcje.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- RAKREACJA -->
        <div class="titleBar bg-yellow">
            <span class="titleBar__title">Rekreacja:</span>
            <router-link :to="'/rekreacja/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/rekreacja/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in rekreacja.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- GASTRONOMIA -->
        <div class="titleBar bg-green">
            <span class="titleBar__title">Gastronomia:</span>
            <router-link :to="'/gastronomia/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/gastronomia/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in gastronomia.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- NOCLEGI -->
        <div class="titleBar bg-red">
            <span class="titleBar__title">Noclegi:</span>
            <router-link :to="'/noclegi/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/noclegi/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in noclegi.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- PUBY -->
        <div class="titleBar bg-brown">
            <span class="titleBar__title">Puby:</span>
            <router-link :to="'/puby/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/puby/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in puby.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </router-link>
        </div>
        <!-- TERENY ZIELONE -->
        <div class="titleBar bg-dark-green">
            <span class="titleBar__title">Tereny zielone:</span>
            <router-link :to="'/tereny_zielone/viewall'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <router-link :to="'/tereny_zielone/'+place.id.replace('/', '_')" tag="div" class="carousel__div" v-for="place in tereny_zielone.slice(0,7)" :key="place.id">
                <div class="carousel__div--photo">
                    <img class="carousel__div--photo-img" :src="loadImage(place.id)">
                </div>
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
        ...mapGetters(["countDistance", "addUnits", "loadImage", "atrakcje", "rekreacja", "noclegi", "gastronomia", "puby", "tereny_zielone"])
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

        &--photo {
            height: 100px;
            width: 127px;
            border-radius: 7px;
            border: $border-grey;
            overflow: hidden;
            display: flex;
            justify-items: center;
            align-items: center;

            &-img {
                min-width: 100%;
                min-height: 100%;
                max-width: 127%;
            }
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
