<template>
	<div class="container">
		<PokemonScreen
			:currentPokemon="currentPokemon"
			:nextPokemon="nextPokemon"
			:previousPokemon="previousPokemon"
		/>
		<div class="sidebar">
			<SubScreen />
			<StatusBar />
			<ScreenControls />
		</div>
	</div>
</template>

<script>
import axios from "axios";
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
	data() {
		return {
			loading: false,
			currentPokemon: {},
			nextPokemon: {},
			previousPokemon: {},
			apiError: false
		};
	},
	mounted() {
		this.fetchData(parseInt(this.id));
	},
	methods: {
		fetchData(pokeID) {
			this.loading = true;
			// Delay function for loading effects
			setTimeout(() => {
				// Make API calls
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, this.currentPokemon);
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`, this.nextPokemon);
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`, this.previousPokemon);
				// End of function
				if (!this.apiError) this.loading = false;
			}, 3000);
		},
		axiosAPICall(endpoint, dataObject) {
			axios
				.get(endpoint)
				.then(response => {
					console.log(response.data);
					dataObject = response.data;
				})
				.catch(error => {
					this.apiError = true;
					console.log(error);
				});
		}
	}
};
</script>
