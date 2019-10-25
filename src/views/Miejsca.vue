<template>
    <div class="miejscaPage">
        <div class="titleBar bg-blue">
            <span class="titleBar__title">Atrakcje:</span>
            <span class="titleBar__more">Pokaż więcej</span>
        </div>
        <div class="carousel">
            <div class="carousel__div">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">Nazwa obiektu</div>
                <div class="carousel__div--distance">Odległość: 520m</div>
            </div>
        </div>



        <div class="titleBar bg-yellow">
            <span class="titleBar__title">Rekreacja:</span>
            <router-link :to="'/viewall/rekreacja'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <div class="carousel__div" v-for="place in rekreacja.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </div>
        </div>


        <div class="titleBar bg-green">
            <span class="titleBar__title">Gastronomia:</span>
            <span class="titleBar__more">Pokaż więcej</span>
        </div>
        <div class="carousel">
            <!-- TUTAJ BĘDZIE CARUZELA V-FOR -->
        </div>

        
        <div class="titleBar bg-red">
            <span class="titleBar__title">Noclegi:</span>
            <router-link :to="'/viewall/noclegi'" tag="span" class="titleBar__more">Pokaż więcej</router-link>
        </div>
        <div class="carousel">
            <div class="carousel__div" v-for="place in noclegi.slice(0,5)" :key="place.id">
                <img class="carousel__div--img" src="../assets/fakephoto.png">
                <div class="carousel__div--title">{{place.properties.name}}</div>
                <div class="carousel__div--distance">Odległość: {{addUnits(countDistance(place.geometry.coordinates))}}</div>
            </div>
        </div>


        <div class="titleBar bg-brown">
            <span class="titleBar__title">Puby:</span>
            <span class="titleBar__more">Pokaż więcej</span>
        </div>
        <div class="carousel">
            <!-- TUTAJ BĘDZIE CARUZELA V-FOR -->
        </div>
        <div class="titleBar bg-dark-green">
            <span class="titleBar__title">Tereny zielone:</span>
            <span class="titleBar__more">Pokaż więcej</span>
        </div>
        <div class="carousel">
            <!-- TUTAJ BĘDZIE CARUZELA V-FOR -->
        </div>
        <div class="titleBar bg-dark-blue">
            <span class="titleBar__title">W okolicy:</span>
            <span class="titleBar__more">Pokaż więcej</span>
        </div>
        <div class="carousel">
            <!-- TUTAJ BĘDZIE CARUZELA V-FOR -->
        </div>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
    name: 'miejsca',
    computed: {
        ...mapGetters(["countDistance", "addUnits", "rekreacja", "noclegi"])
    },
    /*
    computed: {
        atrakcje() {
            const poi = this.$store.state.poi
            const atrakcje = poi.filter(function(el) {
                const prop = el.properties
                const amenity_tags = ["cinema", "marketplace", "place_of_worship", "theatre"]
                const historic_tags = ["cannon", "fort", "memorial", "monument", "ruins", "tomb", "castle"]
                const leisure_tags = ["firepit", "fitness_centre", "swimming_pool", "park"]
                const shop_tags = ["art", "gift", "mall", "department_store"]
                const tourism_tags = ["artwork", "attraction", "picnic_site", "viewpoint"]
                if ("amenity" in prop) {
                    return amenity_tags.includes(prop.amenity)
                } else if ("historic" in prop) {
                    return historic_tags.includes(prop.historic)
                } else if ("leisure" in prop) {
                    return leisure_tags.includes(prop.leisure)
                } else if ("shop" in prop) {
                    return shop_tags.includes(prop.shop)
                } else if ("tourism" in prop) {
                    return tourism_tags.includes(prop.tourism)
                }
            })
            return atrakcje
        }
    }
    */
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
