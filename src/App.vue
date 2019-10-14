<template>
  <div id="app">
    <vl-map class="globalMap" ref="map" @click="onMapClick" :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" :extent.sync="extent" :min-zoom='11' :max-zoom='19'></vl-view>
        
        <vl-layer-vector v-if="poi">
            <vl-source-vector :features.sync="poi"></vl-source-vector>
        </vl-layer-vector>
        
        <vl-geoloc @update:position="geolocPosition = $event">
            <template slot-scope="geoloc">
                <vl-feature v-if="geoloc.position" id="position-feature">
                    <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src='icon' :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
                </vl-feature>
                <vl-feature>
                    <vl-geom-line-string :coordinates="mapRoute"></vl-geom-line-string>
                </vl-feature>
                <vl-feature>
                    <vl-geom-multi-polygon :coordinates="coortest"></vl-geom-multi-polygon>
                </vl-feature>
            </template>
        </vl-geoloc>

        <vl-layer-tile>
            <vl-source-xyz url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></vl-source-xyz>
        </vl-layer-tile>

        <!--
        <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
        -->

    </vl-map>
    <div style="padding: 20px">
        Zoom: {{ zoom }}<br>
        Center: {{ center }}<br>
        Rotation: {{ rotation }}<br>
        My geolocation: {{ geolocPosition }}<br>
        test: {{ setRoute }}<br>
        point1: {{ point1 }}<br>
        point1: {{ point2 }}<br>
        poi: {{ poi }}<br>
        <!--test2: {{ mapRoute }}-->
    </div>
  </div>
</template>

<script>
import { transform } from 'ol/proj'
import urzad from './assets/test.geojson'
import osmtogeojson from 'osmtogeojson/index'
export default {
    data () {
        return { 
            icon: require("./assets/marker.png"),
            zoom: 15,
            center: [22.774444, 49.782222],
            rotation: 0,
            extent: [22.712516, 49.820265, 22.855682, 49.745781],
            geolocPosition: undefined,
            point1: [22.760753, 49.776407],
            point2: [22.767941, 49.786861],
            mapRoute: [[0,0],[0,0]],
            n: 1,
            coortest: urzad.features[0].geometry.coordinates,
            poi: ""
        }
    },
    created: function() {
        this.setPois
    },
    computed: {
        setRoute() {
            fetch("https://routing.openstreetmap.de/routed-foot/route/v1/walking/"+this.point1+";"+this.point2+"?overview=full")
            .then((response) => response.json())
            .then((responseJSON) => {
            return this.mapRoute=this.$polyline.decode(responseJSON.routes[0].geometry).map((x) => {return x.reverse()})
            });
        },
        setPois() {
            fetch("http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0Anode%5B~%22%5E%28amenity%7Cbuilding%7Ccraft%7Cemergency%7Chistoric%7Cleisure%7Cplace%7Cshop%7Csport%7Ctourism%29%24%22~%22.%22%5D%28around%3A1000%2C49.782222%2C22.774444%29%3B%0Aout%3B")
            .then((response) => response.json())
            .then((responseJSON) => {
                return this.poi=osmtogeojson(responseJSON).features
            });
        },
    },
    methods: {
        onMapClick (evt) {
            let features = transform(this.$refs.map.$map.getCoordinateFromPixel(evt.pixel),'EPSG:3857', 'EPSG:4326')
            if (this.n === 1) {
                this.point1=features
                this.n++
            } else {
                this.point2=features
                this.n=1
            }
        }
    }
}

</script>

<style>
#app {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.globalMap {
    width: 500px;
    height: 400px;
}
</style>
