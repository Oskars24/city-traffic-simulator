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
			<span class="menu__bottom--title">Wybierz lokalizację</span>
			<img class="menu__bottom--img" src="../assets/fakeicon.png">
			<div class="menu__bottom--settings" :class="{'translateZero':menuBottomToggle}">

			</div>
		</div>
	</nav>
  </div>
</template>

<script>
export default {
	name: 'appmenu',
	data () {
			return {
				menuToggle: true,
				menuBottomToggle: false,
				currentRoute: this.$route.name
			}
	},
	methods: {
		menuClick() {
			if (this.currentRoute === "home") {
				this.$router.push('/mapa').catch(err => {})
			}
			if (this.$route.name != "home") {
				this.menuToggle ? this.menuToggle = false : this.menuToggle = true
			}
			this.currentRoute = this.$route.name
		},
		menuBottomClick() {
			this.menuBottomToggle ? this.menuBottomToggle = false : this.menuBottomToggle=true;
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
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	background-color: white;
	border-top: $border-grey;
	padding-top: 10px;

	&:before {
		content: "menu";
		font: $h3;
		width: 90px;
		height: 45px;
		position: absolute;
		text-align: center;
		background-color: white;
		border: $border-grey;
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
		max-width: 140px;
		margin: 10px 0 10px 0;
		padding: 0 5px 0 5px;
		pointer-events: auto;

		&--title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 30px;
			font: $h2;
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
		display: flex;
		align-items: center;
		justify-content: space-around;
		pointer-events: auto;

		&--title {
			font: $h2;
			color: white;
		}
		
		&--settings {
			position: absolute;
			background-color: white;
			opacity: 0.75;
			width: 100vw;
			height: 100vh;
			bottom: 0;
			z-index: 11;
			transform: translateY(100%);
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