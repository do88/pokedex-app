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
			previousPokemon: {}
		};
	},
	mounted() {
		// Make API for current, next and previous pokemon
		this.asyncFetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then(data => {
			this.currentPokemon = data;
		});
		this.asyncFetch(`https://pokeapi.co/api/v2/pokemon/${this.id + 1}`).then(data => {
			this.nextPokemon = data;
		});
		// Check if its first pokemon or last
		if (this.id > 1) {
			this.asyncFetch(`https://pokeapi.co/api/v2/pokemon/${this.id - 1}`).then(data => {
				this.previousPokemon = data;
			});
		}
	},
	methods: {
		async asyncFetch(apiLink) {
			try {
				const responceData = await axios.get(apiLink);
				console.log(responceData.data);
				return responceData.data;
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
