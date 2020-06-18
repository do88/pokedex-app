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
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, "current");
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`, "next");
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`, "previous");
				// End of function
				if (!this.apiError) this.loading = false;
			}, 3000);
		},
		axiosAPICall(endpoint, dataObject) {
			axios
				.get(endpoint)
				.then(response => {
					if (dataObject === "current") this.currentPokemon = response.data;
					if (dataObject === "next") this.nextPokemon = response.data;
					if (dataObject === "previous") this.previousPokemon = response.data;
				})
				.catch(error => {
					this.apiError = true;
					console.log(error);
				});
		}
	}
};

// need to make three calls each time
// need to check if its first/last listing and not make request
// need to make sure all calls work
// need to delay whole thing by 2s
</script>
