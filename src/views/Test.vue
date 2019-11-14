<template>
  <div id="app">
    <vl-map @click="clicktest" class="globalMap" ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" :extent.sync="extent" :min-zoom='11' :max-zoom='19'></vl-view>
        
        <template v-if="poi">
            <vl-layer-vector>
                <vl-source-vector ref="pointsSource" :features.sync="poi"></vl-source-vector>
                <vl-style-func :factory="pointsStyleFunc" />
            </vl-layer-vector>
        </template>

        <vl-interaction-select :features.sync="selectedFeatures"></vl-interaction-select>
        
        <vl-overlay v-for="feature in selectedPoints" :key="feature.id" :id="feature.id + '-popup'" :position="feature.geometry.coordinates">
            <div class="popup">
               Name: {{ feature.properties.name }}<br>
               Amenity: {{ feature.properties.amenity }}<br>
               Building: {{ feature.properties.building }}<br>
               Craft: {{ feature.properties.craft }}<br>
               Emergency: {{ feature.properties.emergency }}<br>
               Historic: {{ feature.properties.historic }}<br>
               Leisure: {{ feature.properties.leisure }}<br>
               Place: {{ feature.properties.place }}<br>
               Shop: {{ feature.properties.shop }}<br>
               Sport: {{ feature.properties.sport }}<br>
               Tourism: {{ feature.properties.tourism }}<br>
            </div>
        </vl-overlay>


        <vl-geoloc @update:position="geolocPosition = $event">
            <template slot-scope="geoloc">
                <vl-feature v-if="geoloc.position" id="position-feature">
                    <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src='icon' :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
                </vl-feature>
                <vl-feature>
                    <vl-geom-point :coordinates="$store.state.choosenPosition"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src='icon' :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
                </vl-feature>

                <vl-feature>
                    <vl-geom-point :coordinates="nearest"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src='icon' :scale="0.2" :anchor="[0.5, 1]"></vl-style-icon>
                    </vl-style-box>
                </vl-feature>
                
                <vl-feature>
                    <vl-geom-line-string :coordinates="checkUserPath"></vl-geom-line-string>
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

    </vl-map>
    <div class="zmienne">
        Zoom: {{ zoom }}<br>
        Center: {{ center }}<br>
        Rotation: {{ rotation }}<br>
        My geolocation: {{ geolocPosition }}<br>
        point1: {{ point1 }}<br>
        point1: {{ point2 }}<br>
    </div>
    <canvas class="canvaswiz" width="100" height="100"></canvas>
  </div>
</template>

<script>
import { transform } from 'ol/proj'
import urzad from '../assets/test.geojson'
import osmtogeojson from 'osmtogeojson/index'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import getPixels from 'get-pixels'
import {fromLonLat} from 'ol/proj'
import {toLonLat} from 'ol/proj'
export default {
    data () {
        return { 
            icon: require("@/assets/marker.png"),
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
            poi: "",
            selectedFeatures: [],
            nearest: [0,0],
            extentpolygon: [[[0,0],[0,0],[0,0],[0,0]]]
        }
    },
    created: function() {
        this.setPois
    },

    computed: {
        checkUserPath() {
            if (this.$store.state.userPath.length === 0) {
                return [[0,0]]
            } else {
                return this.$store.state.userPath
            }
        },
        setRoute() {
            fetch("https://routing.openstreetmap.de/routed-foot/route/v1/walking/"+this.point1+";"+this.point2+"?overview=full")
            .then((response) => response.json())
            .then((responseJSON) => {
            return this.mapRoute=this.$polyline.decode(responseJSON.routes[0].geometry).map((x) => {return x.reverse()})
            });
        },
        setPois() {
            fetch("http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0Anode%5B~%22%5E%28amenity%7Cbuilding%7Ccraft%7Cemergency%7Chistoric%7Cleisure%7Cplace%7Cshop%7Csport%7Ctourism%29%24%22~%22.%22%5D%28around%3A50%2C49.782222%2C22.774444%29%3B%0Aout%3B")
            .then((response) => response.json())
            .then((responseJSON) => {
                return this.poi=osmtogeojson(responseJSON).features
            });
        },
        selectedPoints () {
            return this.selectedFeatures.filter(feature => {
                return this.$refs.pointsSource.featureIds.includes(feature.id)
            })
        },
    },
    methods: {
        clicktest(evt) {
            const coord = fromLonLat(evt.coordinate, 'EPSG:3857')
            const tileGrid = evt.map.getLayers().item(0).getProperties().source.tileGrid
            const resolution = evt.map.getView().getResolution()
            const tileCoord = tileGrid.getTileCoordForCoordAndResolution(coord, resolution);
            const tileExtent = function (tileCoord) {
                const z = tileCoord[0];
                const x = tileCoord[1];
                const y = tileCoord[2];
                const tileGridOrigin = tileGrid.getOrigin(z);
                const tileSizeAtResolution = tileGrid.getTileSize(z)[0] * tileGrid.getResolution(z);
                return [
                tileGridOrigin[0] + tileSizeAtResolution * x,
                tileGridOrigin[1] + tileSizeAtResolution * y,
                tileGridOrigin[0] + tileSizeAtResolution * (x + 1),
                tileGridOrigin[1] + tileSizeAtResolution * (y + 1)];
            }

            const extent = tileExtent(tileCoord)
            //this.extentpolygon=[toLonLat([extent[0], extent[3]], 'EPSG:3857'),toLonLat([extent[2],extent[3]], 'EPSG:3857'),toLonLat([extent[0],extent[1]], 'EPSG:3857'),toLonLat([extent[2],extent[1]], 'EPSG:3857')]
            const myPixel = (coord) => {
                const xMin = extent[0]
                const yMin = extent[3]
                const xMax = extent[2]
                const yMax = extent[1]
                const A = (256 * (Math.abs(coord[0]-xMin))) / (Math.abs(xMax - xMin))
                const B = (256 * (Math.abs(coord[1]-yMin))) / (Math.abs(yMax - yMin))
                return [A,B]
            }

            const tileName = tileCoord.join("/")
            const radius = 100
            const url = evt.map.getLayers().item(0).getProperties().source.tileCache.entries_[tileName].value_.src_

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            const makeThis = this
            img.onload = function(){
                const canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                const colorArray = ctx.getImageData(Math.abs(myPixel(coord)[0]-radius/2),Math.abs(myPixel(coord)[1]-radius/2),radius,radius).data
                
                
                let neighbour = []
                for (let i=0; i<colorArray.length-3; i+=4) {
                    if (colorArray[i] === 255 && colorArray[i+1] === 238 && colorArray[i+2] === 170) {
                        neighbour.push(i/4 + 1)
                    }
                }

                const myPixelNum = myPixel(coord)[0]+myPixel(coord)[1]*radius
                const neighbourDistance = []
                for (let j=0; j<neighbour.length; j++) {
                    const pktX=neighbour[j] % radius
                    const pktY=(neighbour[j]-(neighbour[j] % radius))/radius
                    const distance = Math.sqrt((myPixel(coord)[0]-pktX)**2 + (myPixel(coord)[1]-pktY)**2)
                    neighbourDistance.push([pktX,pktY,distance,neighbour[j]])
                }
                
                neighbourDistance.sort((a, b) => a[2]>b[2] ? 1 : -1)
                const pxToCoord = (pixelCoord) => {
                    const xMin = extent[0]
                    const yMin = extent[3]
                    const xMax = extent[2]
                    const yMax = extent[1]
                    const A = pixelCoord[0] * (xMax-xMin)/256 + coord[0]
                    const B = pixelCoord[1] * (yMax-yMin)/256 + coord[1]
                    return [A,B]
                }
                const nearestCoord = pxToCoord([neighbourDistance[0][0],neighbourDistance[0][1]])
                makeThis.nearest=toLonLat(nearestCoord, 'EPSG:3857')
                console.log(toLonLat(nearestCoord, 'EPSG:3857'))

                // PODGLĄD:
                const canwiz = document.querySelector('.canvaswiz');
                canwiz.width = 100;
                canwiz.height = 100;

                const ctxwiz = canwiz.getContext("2d");
                const img = colorArray

                const palette = ctxwiz.getImageData(0,0,radius,radius);
                palette.data.set(new Uint8ClampedArray(img));
                ctxwiz.putImageData(palette,0,0);
            }
        },
        onMapClick (evt) {
            let features = transform(this.$refs.map.$map.getCoordinateFromPixel(evt.pixel),'EPSG:3857', 'EPSG:4326')
            if (this.n === 1) {
                this.point1=features
                this.n++
            } else {
                this.point2=features
                this.n=1
            }
        },
        selectIcon() {
            return require("@/assets/marker.png")
        },
        pointsStyleFunc () {
            return feature => {
                let baseStyle = new Style({
                    image: new Icon({
                        scale: 0.3,
                        anchor: [0.5, 0.5],
                        src: (function(){
                            if (feature.get('amenity') === "restaurant") {
                                return require("@/assets/restaurant.png")
                            } else {
                                return require("@/assets/marker.png")
                            }
                        }()),
                    }),
                })
                return [baseStyle]
            }
        },
    }
}
</script>

<style lang="scss">
.canvaswiz {
    border: solid 2px black;
    background-color:white;
    position: absolute;
    bottom: 24px;
    transform: scale(2);
    transform-origin: bottom;
}
#app {
    display: flex;
    flex-flow: column;
    align-items: center;
}
.zmienne {
    color: $red;
}

.globalMap {
    width: 100%;
    height: 400px;
}

.popup {
    background-color:green;
    width: 200px;
    height: 100px;
    overflow-y: auto;
}
</style>
