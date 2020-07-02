<template>
	<div class="container">
		<PokemonScreen
			:currentPokemon="pokemonSingle.currentPokemon"
			:nextPokemon="pokemonSingle.nextPokemon"
			:previousPokemon="pokemonSingle.previousPokemon"
		/>
		<div class="sidebar">
			<SubScreen />
			<StatusBar />
			<ScreenControls />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PokemonScreen from "@/components/PokemonScreen.vue";
import SubScreen from "@/components/SubScreen.vue";
import StatusBar from "@/components/StatusBar.vue";
import ScreenControls from "@/components/ScreenControls.vue";

const pokemonListLimit = 60;

export default {
	props: {
		id: {
			type: [String, Number],
			required: true
		}
	},
	components: {
		PokemonScreen,
		SubScreen,
		StatusBar,
		ScreenControls
	},
	beforeRouteUpdate(to, from, next) {
		this.fetchDataSingle(parseInt(to.params.id));
		next();
	},
	mounted() {
		this.fetchDataSingle(parseInt(this.id));
	},
	computed: {
		...mapState(["pokemonSingle", "controls"])
	},
	methods: {
		...mapActions("pokemonSingle", ["axiosAPICall", "fetchDataSingle"])
	}
};
</script>
