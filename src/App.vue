<template>
<div class="all" v-cloak>
    <appmenu></appmenu>
    <transition name="slide" mode="out-in" appear v-cloak>
        <router-view class="router"></router-view>
    </transition>
</div>
</template>

<script>
import appmenu from './views/Menu.vue'
import osmtogeojson from 'osmtogeojson/index'
import localForage from "localforage"
import { mapMutations, mapActions} from "vuex";

export default {
    name: 'App',
    data () {
            return {
                test: "test",
            }
    },
    components: {
        appmenu
    },
    methods: {
        ...mapMutations(["switchUseGeoPosition", "updateGeoPosition"]),
        ...mapActions(["getCurrentAdress", "getPoi"]),
        currentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.switchUseGeoPosition(true)
                    this.updateGeoPosition([position.coords.longitude, position.coords.latitude])
                    this.getCurrentAdress([position.coords.longitude, position.coords.latitude])
                })
            }
        },
        setPois() {
            const request = async () => {
                const response = await fetch("https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0Anode%5B~%22%5E%28amenity%7Chistoric%7Cleisure%7Cshop%7Ctourism%29%24%22~%22.%22%5D%2849.74755%2C22.707710%2C49.82137%2C22.86117%29%3B%0Aout%3B")
                const json = await response.json()
                const poi=osmtogeojson(await json).features
                localForage.setItem('poi_date', new Date())
                localForage.setItem('poi', await poi)
                this.getPoi()
            }

            const checkPoiDate = (async () => {
                try {
                    const poiDate = await localForage.getItem('poi_date')
                    const poiFullDate = `${poiDate.getDate()}.${poiDate.getMonth()}.${poiDate.getFullYear()}`
                    const date = new Date()
                    const fullDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

                    if (poiFullDate != fullDate) {
                        request()
                    } else {
                        this.getPoi()
                    }
                }
                catch(err) {
                    request()
                }
            })()
        }
    },
    created() {
        this.currentPosition()
        this.setPois()
        
       /*
       if (navigator.geolocation) {
                let current= null
                const store = this.$store
                navigator.geolocation.watchPosition(function (position) {
                    if (current != position.timestamp) {
                        current = position.timestamp
                        store.commit("updateUserPath", [position.coords.longitude, position.coords.latitude])
                        console.log([position.coords.longitude, position.coords.latitude])
                    }
                })
            }
        */
    },
}
// NEED FOR 100vh ON MOBILE
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

*, *:before, *:after {
	box-sizing: border-box;
}

[v-cloak] {
    display: none;
}

html, body {
    margin: 0;
    padding: 0;
}

.all {
    width: 100vw;
    height: $fullheight;
    overflow: hidden;
    position: relative;
}

.router {
    width: 100vw;
    height: $fullheight;
}

.slide-enter-active, .slide-leave-active {
    transform-origin: bottom;
    transition: transform 0.5s ease-in-out;
}

.slide-enter {
    transform: translateY(100vh);
}

.slide-leave-to {
    transform: translateY(-100vh);
}

@media (min-width: 361px) {
    .all {
        max-width: 360px;
        max-height: 640px;
        margin: 0 auto 0 auto;
    }
    .router {
        width: 100%;
    }
 }

</style>
