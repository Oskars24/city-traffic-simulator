import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        geoTracking: false,
        geoPosition: [22.7690175, 49.7824746],
        choosenPosition: [22.7690175, 49.7824746],
        currentAdress: "",
        userPath: []
    },
    mutations: {
        switchGeoTracking(state, payload) {
            state.geoTracking=payload
        },
        updateGeoPosition(state, payload) {
            state.geoPosition=payload
        },
        updateChoosenPosition(state, payload) {
            state.choosenPosition=payload
        },
        updateCurrentAdress(state, payload) {
            state.currentAdress=payload
        },
        updateUserPath(state, payload) {
            state.userPath.push(payload)
        }
    },
    actions: {
        getCurrentAdress(context, payload) {
            const request = async () => {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${payload[1]}&lon=${payload[0]}`);
                const json = await response.json();
                const city = json.address.county
                const street = json.address.road === undefined ? json.address.footway : json.address.road
                const number = json.address.house_number === undefined ? "" : json.address.house_number
                context.commit("updateCurrentAdress", `${street} ${number}, ${city}`)
            }
            request();
        },
        useGeoPosition(context) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    context.commit("updateChoosenPosition",[position.coords.longitude, position.coords.latitude])
                })
            }
        }
    }
})
