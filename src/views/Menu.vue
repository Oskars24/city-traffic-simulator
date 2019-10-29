<template>
  <div class="container" @click.stop="menuClick" :class="{'translate':menuToggle}">
	<nav class="menu">
		<router-link to="/" tag="div" class="menu__item">
			<div class="menu__item--title bg-grey">Home</div>
			<div>
				<img class="menu__item--img" src="../assets/fakephoto.png">
			</div>
		</router-link>
		<router-link to="/miejsca" tag="div" class="menu__item">
			<div class="menu__item--title bg-blue">Miejsca</div>
			<div>
				<img class="menu__item--img" src="../assets/fakephoto.png">
			</div>
		</router-link>
		<router-link to="/trasy" tag="div" class="menu__item">
			<div class="menu__item--title bg-yellow">Trasy</div>
			<div>
				<img class="menu__item--img" src="../assets/fakephoto.png">
			</div>
		</router-link>
		<router-link to="/mapa" tag="div" class="menu__item">
			<div class="menu__item--title bg-green">Mapa</div>
			<div>
				<img class="menu__item--img" src="../assets/fakephoto.png">
			</div>
		</router-link>
		<router-link to="/mojplan" tag="div" class="menu__item">
			<div class="menu__item--title bg-red">Mój plan</div>
			<div>
				<img class="menu__item--img" src="../assets/fakephoto.png">
			</div>
		</router-link>
		<div class="menu__bottom" @click.stop="menuBottomClick">
			<span class="menu__bottom--title">Aktualna lokalizacja:</span>
			<span class="menu__bottom--address">{{ currentAdress }}</span>
			<svg class="menu__bottom--img"><use xlink:href="#settings"/></svg>
			<div class="menu__bottom--settings" :class="{'translateZero':menuBottomToggle}">
				<div class="menu__bottom--settings-div">
					<span class="menu__bottom--settings-title">Wybierz lokalizację: </span>
					<svg class="menu__bottom--settings-close"><use xlink:href="#close"/></svg>
				</div>
				<div class="menu__bottom--settings-button" name="current" @click.stop="selectLocal">Obecna lokalizacja</div>
				<div class="menu__bottom--settings-button" name="map" @click.stop="selectLocal">Wskaż na mapie</div>
				<div class="menu__bottom--settings-button" name="pkp" @click.stop="selectLocal">Dworzec PKP</div>
				<div class="menu__bottom--settings-button" name="pks" @click.stop="selectLocal">Dworzec PKS</div>
				<div class="menu__bottom--settings-button" name="center" @click.stop="selectLocal">Centrum (Rynek)</div>
				<div class="menu__bottom--settings-button" name="polonia" @click.stop="selectLocal">Parking Polonia</div>
			</div>
		</div>
	</nav>
	<svg display="none">
		<symbol viewBox="0 0 24 24" id="settings">
			<path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
		</symbol>

		<symbol viewBox="0 0 24 24" id="close">
			<path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
		</symbol>
	</svg>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions} from "vuex";
export default {
	name: 'appmenu',
	data () {
			return {
				menuToggle: true,
				menuBottomToggle: false,
			}
	},
	computed: {
		...mapState(["currentAdress"])
	},
	methods: {
		...mapMutations(["switchUseGeoPosition", "updateChoosenPosition", "updateCurrentAdress"]),
		...mapActions(["useGeoPosition"]),
		menuClick() {
				this.menuToggle ? this.menuToggle = false : this.menuToggle = true
		},
		menuBottomClick() {
			this.menuBottomToggle ? this.menuBottomToggle = false : this.menuBottomToggle=true;
		},
		selectLocal(e) {
			const name = e.srcElement.getAttribute('name')
			switch (name) {
				case "current":
					if (navigator.geolocation) {
						this.switchUseGeoPosition(true)
					} else {
						this.useGeoPosition()
					}
					break;
				case "map":
					console.log("map")
					break;
				case "pkp":
					this.switchUseGeoPosition(false)
					this.updateChoosenPosition([22.7764096, 49.7832626])
					this.updateCurrentAdress("Dworzec Główny PKP, Przemyśl")
					break;
				case "pks":
					this.switchUseGeoPosition(false)
					this.updateChoosenPosition([22.7756452, 49.7840627])
					this.updateCurrentAdress("Dworzec PKS, Przemyśl")
					break;
				case "polonia":
					this.switchUseGeoPosition(false)
					this.updateChoosenPosition([22.7591040, 49.7798144])
					this.updateCurrentAdress("Parking Polonia, Przemyśl")
					break;
				default:
					this.switchUseGeoPosition(false)
					this.updateChoosenPosition([22.7695915, 49.7822044])
					this.updateCurrentAdress("Rynek, Przemyśl")
			}
			this.menuBottomToggle = false;
		}
	},

	watch: {
		$route (to, from){
			this.menuBottomToggle = false;
			if (to.name === "home") {
				this.menuToggle = false
			}
		}
	},
		
	created() {
		if (this.$route.fullPath === "/") {
			this.menuToggle = false
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	width: 100%;
	bottom: 0;
	z-index: 10;
	transform: translateY(0);
	pointer-events: none;
	transition: transform 0.5s ease-in-out;
}

.router-link-exact-active {
	display: none;
}

.menu {
	position: relative;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	justify-items: center;
	background-color: white;
	border-top: $border-light-grey;
	padding-top: 10px;

	&:before {
		content: "•••";
		font: $h3;
		width: 90px;
		height: 45px;
		position: absolute;
		text-align: center;
		color: $grey;
		background-color: white;
		border: $border-light-grey;
		border-radius: 45px 45px 0 0;
		top: -26px;
		z-index: -1;
		pointer-events: auto;
	}

	&:after {
		content: "";
		width: 75px;
		height: 4px;
		position: absolute;
		background-color: white;
		border-radius: 2px;
		top: -3px;
		z-index: 1;
	}

	&__item {
		max-width: 75px;
		margin: 10px 0 10px 0;
		padding: 0 5px 0 5px;
		pointer-events: auto;

		&--title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 30px;
			font: $h4;
			color: white;
			border-radius: 10px 10px 0 0;
		}

		&--img {
			width: 100%;
			border-radius: 0 0 10px 10px;
			border: solid 2px $grey;
			border-top: 0px;
		}
	}

	&__bottom {
		width: 100%;
		height: 60px;
		background-color: $dark-blue;
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		pointer-events: auto;
		padding: 0 10px 0 10px;

		&--title {
			grid-column: 1/2;
			grid-row: 1/2;
			font: $h4;
			color: white;
			margin-top: auto;
		}

		&--address {
			grid-column: 1/2;
			grid-row: 2/3;
			font: $h3;
			color: white;
			margin-bottom: auto;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&--img {
			grid-column: 2/3;
			grid-row: 1/3;
			margin-left: auto;
			height: 40px;
			width: 40px;
			fill: white;
		}
		
		&--settings {
			position: absolute;
			background-color: white;
			width: 100%;
			bottom: 0;
			z-index: 11;
			transform: translateY(100%);
			display: grid;
			grid-gap: 10px;
			grid-template-columns: 100%;
			justify-content: center;
			justify-items: center;
			align-content: start;
			padding: 10px;
			border-top: $border-light-grey;
			transition: transform 0.5s ease-in-out;
			
			&-div {
				width: 100%;
				display: grid;
				grid-template-columns: auto auto;
				align-items: center;
			}

			&-title {
				grid-column: 1/2;
				font: $h2;
			}

			&-close {
				grid-column: 2/3;
				height: 30px;
				margin-left: auto;
			}

			&-button {
				width: 100%;
				font: $h2;
				background-color: $grey;
				border: $border-light-grey;
				color: white;
				padding: 10px;
				text-align: center;
			}
		}
	}
}

.translate {
	transform: translateY(100%);
}

.translateZero {
	transform: translateY(0);
}
</style>