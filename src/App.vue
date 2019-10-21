<template>
<div class="all" v-cloak>
    <appmenu></appmenu>
    <transition name="slide" mode="out-in" appear>
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import appmenu from './views/Menu.vue'

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
        currentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.$store.commit("switchUseGeoPosition", true)
                    this.$store.commit("updateGeoPosition", [position.coords.longitude, position.coords.latitude])
                    this.$store.dispatch("getCurrentAdress", [position.coords.longitude, position.coords.latitude])
                })
            }
        }
    },
    created() {
        this.currentPosition()
        
        
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
</style>
