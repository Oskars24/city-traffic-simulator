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
  }
}
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
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.slide-enter-active, .slide-leave-active {
    transform-origin: bottom;
    transition: transform 0.5s ease-in-out;
}

.slide-enter {
    transform: translateY(-100vh);
}

.slide-leave-to {
    transform: translateY(-100vh);
}
</style>
