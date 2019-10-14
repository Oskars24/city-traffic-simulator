import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLayers from 'vuelayers'
import polyline from 'google-polyline'

Vue.config.productionTip = false

Vue.use(VueLayers, {
    dataProjection: 'EPSG:4326',
})

Vue.prototype.$polyline = polyline

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
