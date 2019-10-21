<template>
    <div class="mapaPage">
        <div class="iconsRight">
            <div class="iconsRight__icon">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking.svg">
            </div>
            <div class="iconsRight__icon">
                <img class="iconsRight__icon--img" src="../assets/icons/geocross.svg" @click="geoCrossClick">
            </div>
        </div>

        <vl-map class="globalMap" ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
            <vl-view ref="view" :center="getChoosenPosition" :extent.sync="extent" :zoom='16' :min-zoom='11' :max-zoom='19'></vl-view>
            
            <!-- AKTUALNA LOKALIZACJA -->
            <vl-geoloc @update:position='updateGeoPosition($event)'>
                <vl-feature>
                    <vl-geom-point :coordinates="getChoosenPosition"></vl-geom-point>
                </vl-feature>
            </vl-geoloc>

            <!-- MAPA GŁOWNA -->
            <vl-layer-tile>
                <vl-source-xyz url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></vl-source-xyz>
            </vl-layer-tile>
        </vl-map>
    </div>
</template>

<script>
import { transform } from 'ol/proj'
import urzad from '../assets/test.geojson'
import osmtogeojson from 'osmtogeojson/index'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
export default {
  name: 'mapa',
  data () {
        return {
            icon: require("@/assets/marker.png"),
            center: [22.7695915, 49.7822044],
            extent: [22.712516, 49.820265, 22.855682, 49.745781],
        }
    },
    methods: {
        updateGeoPosition(event) {
            this.$store.commit("updateGeoPosition", event)
            this.$store.dispatch("getCurrentAdress", event)
        },
        geoCrossClick() {
            if (this.$store.state.geoTracking) {
                this.$refs.view.animate({center: this.$store.state.geoPosition})
            }
        }
        
    },
    computed: {
        getChoosenPosition() {
            if (this.$store.state.geoTracking) {
                return this.$store.state.geoPosition
            } else {
                return this.$store.state.choosenPosition
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.mapaPage {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
}

.iconsRight {
    position: absolute;
    right: 5px;
    bottom: 10px;
    z-index: 1;
    
    &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 100%;
        border: $border-grey;

        &--img {
             width: 70%;
        }
    }
}

.globalMap {
    width: 100vw;
    height: 100vh;
}
</style>
