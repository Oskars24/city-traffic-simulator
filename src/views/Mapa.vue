<template>
    <div class="mapaPage">
        <div class="iconsLeft">
            <div class="iconsRight__icon" @click="plusClick">
                <img class="iconsRight__icon--img" src="../assets/icons/plus.svg" >
            </div>
            <div class="iconsRight__icon" @click="minusClick">
                <img class="iconsRight__icon--img" src="../assets/icons/minus.svg" >
            </div>
        </div>
        <div class="iconsTop">
            <div class="iconsRight__icon">
                <img class="iconsRight__icon--img" :style="{transform: 'rotate('+rotation+'rad)', transition: 'transform .3s'}" @click="mapAlign" src="../assets/icons/north.svg" >
            </div>
        </div>
        <div class="iconsRight">
            <div class="iconsRight__icon" v-if="$store.state.enableTracking">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking_save.svg" >
            </div> 
            <div class="iconsRight__icon" v-if="$store.state.enableTracking">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking_erase.svg" @click="eraseTracking">
            </div>
            <div class="iconsRight__icon" v-if="$store.state.enableTracking" @click="startTracking">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking_play.svg" v-if="!$store.state.startTracking">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking_pause.svg" v-if="$store.state.startTracking">
            </div>
            <div class="iconsRight__icon" @click="enableTracking">
                <img class="iconsRight__icon--img" src="../assets/icons/tracking.svg" >
            </div>
            <div class="iconsRight__icon" @click="geoCrossClick">
                <img class="iconsRight__icon--img" src="../assets/icons/geocross_center.svg">
            </div>
        </div>

        <vl-map class="globalMap" ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
            <vl-view ref="view" :rotation.sync="rotation" :center="getChoosenPosition" :extent.sync="extent" :zoom.sync='zoom' :min-zoom.sync='zoomMin' :max-zoom.sync='zoomMax'></vl-view>
            
            <!-- AKTUALNA LOKALIZACJA -->
            <vl-geoloc @update:position='updateGeoPosition($event)'>
                <vl-feature>
                    <vl-geom-point :coordinates="getChoosenPosition"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src='icon' :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
                </vl-feature>
            </vl-geoloc>

            <!-- POIS -->
            <vl-layer-vector :z-index="1">
                <vl-source-vector :features="filtered"></vl-source-vector>
                <vl-style-box>
                        <vl-style-icon :src='icon2' :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
            </vl-layer-vector>

            <!-- ŚCIEŻKA ŚLEDZENIA -->
            <vl-feature>
                    <vl-geom-multi-line-string :coordinates="$store.state.userPath" v-if="$store.state.userPath.length!=0"></vl-geom-multi-line-string>
            </vl-feature>

            <!-- MAPA GŁOWNA -->
            <vl-layer-tile :z-index="0">
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
            zoom: 16,
            zoomMin: 11,
            zoomMax: 19,
            icon: require("@/assets/icons/location.svg"),
            icon2: require("@/assets/icons/info.svg"),
            center: [22.7695915, 49.7822044],
            extent: [22.712516, 49.820265, 22.855682, 49.745781],
            rotation: 0,
        }
    },
    methods: {
        updateGeoPosition(event) {
            this.$store.commit("updateGeoPosition", event)
            this.$store.dispatch("getCurrentAdress", event)
            if (this.$store.state.startTracking) {
                this.$store.commit("updateUserPath", {empty: null, coords:event})
            }
        },
        geoCrossClick() {
            if (this.$store.state.useGeoPosition) {
                this.$refs.view.animate({center: this.$store.state.geoPosition})
            }
        },
        enableTracking() {
            if (this.$store.state.enableTracking) {
                this.$store.commit("switchEnableTracking", false)
            } else {
                this.$store.commit("switchEnableTracking", true)
            }
        },
        startTracking() {
            if (this.$store.state.startTracking) {
                this.$store.commit("switchStartTracking", false)
                this.$store.commit("reduceUserPath", 1)
            } else {
                this.$store.commit("switchStartTracking", true)
                this.$store.commit("updateUserPath", {empty: [], coords: this.$store.state.geoPosition})
            }
        },
        eraseTracking() {
            this.$store.commit("reduceUserPath", undefined)
            this.$store.commit("updateUserPath", {empty: [], coords: this.$store.state.geoPosition})
        },
        mapAlign() {
            this.$refs.view.animate({rotation : 0})
        },
        plusClick() {
            if (this.zoom < this.zoomMax) {
                this.zoom++
            }
            
        },
        minusClick() {
            if (this.zoom > this.zoomMin) {
                this.zoom--
            }
        }
        
    },
    computed: {
        getChoosenPosition() {
            if (this.$store.state.useGeoPosition) {
                return this.$store.state.geoPosition
            } else {
                return this.$store.state.choosenPosition
            }
        },
        filtered() {
                const poi = this.$store.state.poi
                const range = 0.001
                const lon = this.$store.state.geoPosition[0]
                const lat = this.$store.state.geoPosition[1]
                const lonUp = lon + range
                const latUp = lat + range
                const lonDown = lon - range
                const latDown = lat - range

                const rangePois = poi.filter(function(el) {
                    let poiLon = el.geometry.coordinates[0]
                    let poiLat = el.geometry.coordinates[1]
                    return (
                        (((lon < poiLon) && (poiLon < lonUp)) || ((lonDown < poiLon) && (poiLon < lon))) &&
                        (((lat < poiLat) && (poiLat < latUp)) || ((latDown < poiLat) && (poiLat < lat)))
                    )
                })
                return rangePois
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

.iconsLeft {
    left: 5px;
    top: 10px;
}

.iconsTop {
    right: 5px;
    top: 10px;
}

.iconsRight {
    right: 5px;
    bottom: 10px;
}

.iconsRight, .iconsTop, .iconsLeft {
    position: absolute;
    z-index: 1;
    display: grid;
    grid-row-gap: 5px;
    
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
    height: $fullheight;
}
</style>
