<template>
    <div class="szczegolyPage">
        <div class="pageTitle bg-blue">
            <router-link :to="'/'" tag="span" class="pageTitle__prev">⇠</router-link>
            <span class="pageTitle__title">{{ place.properties.name }}</span>
        </div>
        <img class="pageImg" src="../assets/fakebigphoto.png">
        <div class="place">
            <span class="place__title">{{ place.properties.name }}</span>
            <span class="place__open" v-if="place.properties.opening_hours">Otwarte</span>
            <div class="place__icons">
                <a class="place__icons--div">
                    <img class="place__icons--div-img" src="../assets/icons/address.svg">
                </a>
                <a class="place__icons--div" :href="'tel:'+place.properties.phone" v-if="place.properties.phone">
                    <img class="place__icons--div-img" src="../assets/icons/phone.svg">
                </a>
                <a class="place__icons--div" :href="'mailto:'+place.properties.email" v-if="place.properties.email">
                    <img class="place__icons--div-img" src="../assets/icons/email.svg">
                </a>
                <a class="place__icons--div" :href="place.properties.website" target="_blank" v-if="place.properties.website">
                    <img class="place__icons--div-img" src="../assets/icons/www.svg">
                </a>
            </div>
            <div class="place__desc">{{ place.properties.description }}</div>
            <br>
            <br>
            <br>
            <a :href="'https://www.openstreetmap.org/'+place.id" target="_blank">Otwórz w OSM</a><br>
            <a :href="'https://www.openstreetmap.org/edit?'+place.id.replace('/','=')" target="_blank">Edytuj w OSM</a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: 'szczegoly',
    computed: {
        ...mapGetters(["addUnits", "countDistance"]),
        ...mapState(["poi"]),
        placeId() {
            return this.$route.params.id.replace("_", "/")
        },
        place() {
            return this.poi.filter(el => {
                return el.id===this.placeId
            })[0]
        }
    },
}
</script>

<style lang="scss" scoped>
.szczegolyPage {
    display: flex;
    flex-flow: column;
    overflow-y: auto;
}

.pageTitle {
    height: 45px;
    display: flex;
    align-items: center;
    color: white;
    border-top: $border-grey;
    border-radius: 0 0 7px 7px;

    &__prev {
        font: $h0;
        padding-left: 10px;
        padding-bottom: 5px;
    }

     &__title {
        font: $h1;
        padding: 0 10px 0 10px;
        margin: auto;
        text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
    }
}

.pageImg {
    width: 100%;
    max-height: 360px;
}

.place {
    display: flex;
    flex-flow: column;
    margin: 5px 10px 5px 10px;

    &__title {
        font: $h2;
    }

    &__open {
        font: $h3;
        color: $green;
    }

    &__icons {
        display: flex;
        flex-flow: row;

        &--div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            background-color: white;
            border-radius: 100%;
            border: $border-light-grey;
            margin: 5px 10px 5px 0;

            &-img {
                width: 70%
            }
        }
    }

    &__desc {
        font: $h3;
    }
}
</style>