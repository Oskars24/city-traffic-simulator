import Vue from 'vue'
import Vuex from 'vuex'
import localForage from "localforage"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        poi: [],
        startTracking: false,
        enableTracking: false,
        useGeoPosition: false,
        geoPosition: [22.7690175, 49.7824746],
        choosenPosition: [22.7690175, 49.7824746],
        currentAdress: "",
        userPath: []
    },
    mutations: {
        setPoi(state, payload) {
            state.poi=payload
        },
        switchStartTracking(state, payload) {
            state.startTracking=payload
        },
        switchEnableTracking(state, payload) {
            state.enableTracking=payload
        },
        switchUseGeoPosition(state, payload) {
            state.useGeoPosition=payload
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
            if (payload.empty != null) {
                state.userPath.push(payload.empty)
            }
            state.userPath[state.userPath.length-1].push(payload.coords)
        },
        reduceUserPath(state, payload) {
            const reduce = state.userPath.filter(el => {
                return el.length > payload
            })
            state.userPath = reduce
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
        },
        getPoi(context, payload) {
            const request = async () => {
                const response = await localForage.getItem('poi')
                context.commit("setPoi", await response)
            }
            request();
        },
    }
})
