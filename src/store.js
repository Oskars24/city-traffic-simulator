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
    getters: {
        countDistance(state) {
            return coords => {
                let x=0
                let y=0
                if (typeof coords[0] != "number") {
                    x = coords[0][0][0]
                    y = coords[0][0][1]
                } else {
                    x = coords[0]
                    y = coords[1]
                }
                let a = state.choosenPosition[0]
                let b = state.choosenPosition[1]

                if (state.useGeoPosition) {
                    a = state.geoPosition[0]
                    b = state.geoPosition[1]
                }
                const calculate = Math.sqrt(((a - x)**2) + (Math.cos(x * Math.PI/180) * (b - y))**2) * 40075.704/360
                return calculate
            }
        },
        
        addUnits(state) {
            return distance => {
                if (distance < 1) {
                    return `${Math.round(distance*1000)} m`
                } else {
                    return `${Math.round(distance*100)/100} km`
                }
            }
        },

        atrakcje(state, getters) {
            const atrakcje = state.poi.filter(function(el) {
                const prop = el.properties
                const amenity_tags = ["casino", "cinema", "fountain", "planetarium", "theatre", "monastery", "place_of_worship"]
                const historic_tags = ["aircraft","aqueduct","battlefield","cannon","castle","castle_wall","church","city_gate","citywalls","farm","fort","manor","memorial","monument","ruins","rune_stone","ship","tomb","tower"]
                const leisure_tags =["beach_resort", "bowling_alley", "dance", "disc_golf_course", "escape_game", "golf_course", "horse_riding", "ice_rink", "marina", "miniature_golf", "nature_reserve", "park", "sauna", "swimming_area", "swimming_pool", "water_park"]
                const tourism_tags = ["aquarium", "artwork", "attraction", "gallery", "museum", "theme_park", "viewpoint", "zoo"]
                const attraction_tags = ["amusement_ride","animal", "big_wheel", "bumper_car", "bungee_jumping", "carousel", "dark_ride", "drop_tower", "log_flume", "maze", "pirate_ship", "river_rafting", "roller_coaster", "summer_toboggan", "swing_carousel", "train", "water_slide"]
                if ("amenity" in prop) {
                    return amenity_tags.includes(prop.amenity)
                } else if ("historic" in prop) {
                    return historic_tags.includes(prop.historic)
                } else if ("leisure" in prop) {
                    return leisure_tags.includes(prop.leisure)
                } else if ("tourism" in prop) {
                    return tourism_tags.includes(prop.tourism)
                } else if ("attraction" in prop) {
                    return attraction_tags.includes(prop.attraction)
                }
            })
            
            atrakcje.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return atrakcje
        },

        rekreacja(state, getters) {
            const rekreacja = state.poi.filter(function(el) {
                const prop = el.properties
                const leisure_tags = ["beach_resort", "bowling_alley", "firepit", "pitch", "fitness_centre", "golf_course", "horse_riding", "ice_rink", "miniature_golf", "sauna", "sports_centre", "stadium", "swimming_area", "swimming_pool", "trampoline_park", "water_park"]
                const sport_tags = ["shooting", "bowling", "icerink", "free_flying", "skiing", "kayak", "tennis"]
                const attraction_tags = ["summer_toboggan"]
                if ("leisure" in prop) {
                    return leisure_tags.includes(prop.leisure) && prop.amenity != "school"
                } else if ("sport" in prop) {
                    return sport_tags.includes(prop.sport) && prop.route != "piste"
                } else if ("attraction" in prop) {
                    return attraction_tags.includes(prop.attraction)
                }
            })
            
            rekreacja.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return rekreacja
        },

        gastronomia(state, getters) {
            const gastronomia = state.poi.filter(function(el) {
                const prop = el.properties
                const amenity_tags = ["bbq", "biergarten", "cafe", "fast_food", "food_court", "restaurant"]
                if ("amenity" in prop) {
                    return amenity_tags.includes(prop.amenity)
                }
            })
            
            gastronomia.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return gastronomia
        },

        noclegi(state, getters) {
            const noclegi = state.poi.filter(function(el) {
                const prop = el.properties
                const tourism_tags = ["hotel", "chalet", "guest_house", "hostel", "camp_site", "motel"]
                if ("tourism" in prop) {
                    return tourism_tags.includes(prop.tourism)
                } 
            })
            noclegi.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return noclegi
        },

        puby(state, getters) {
            const puby = state.poi.filter(function(el) {
                const prop = el.properties
                const amenity_tags = ["bar", "pub", "nightclub"]
                if ("amenity" in prop) {
                    return amenity_tags.includes(prop.amenity)
                }
            })
            
            puby.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return puby
        },

        tereny_zielone(state, getters) {
            const tereny_zielone = state.poi.filter(function(el) {
                const prop = el.properties
                const leisure_tags = ["garden", "nature_reserve", "park"]
                if ("leisure" in prop) {
                    return leisure_tags.includes(prop.leisure)
                }
            })
            
            tereny_zielone.sort((a, b) => (getters.countDistance(a.geometry.coordinates) > getters.countDistance(b.geometry.coordinates)) ? 1 : -1)
            return tereny_zielone
        },
        
        
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
