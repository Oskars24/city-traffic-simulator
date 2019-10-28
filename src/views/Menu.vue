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
			<img class="menu__bottom--img" src="../assets/icons/settings.svg">
			<div class="menu__bottom--settings" :class="{'translateZero':menuBottomToggle}">
				<div class="menu__bottom--settings-div">
					<span class="menu__bottom--settings-title">Wybierz lokalizację: </span>
					<img class="menu__bottom--settings-close" src="../assets/icons/close.svg">
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
			filter: invert(1);
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