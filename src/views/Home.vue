<template>
	<div class="container">
		<MainScreen
			:pokemonList="pokemonList"
			:apiLinks="pokemonAPI"
			@fetch-next="fetchNextEvent"
			@fetch-prev="fetchPrevEvent"
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
import MainScreen from "@/components/MainScreen.vue";
import SubScreen from "@/components/SubScreen.vue";
import StatusBar from "@/components/StatusBar.vue";
import ScreenControls from "@/components/ScreenControls.vue";

export default {
	components: {
		MainScreen,
		SubScreen,
		StatusBar,
		ScreenControls
	},
	data() {
		return {
			pokemonListLimit: 26,
			pokemonAPI: {
				firstPage: `https://pokeapi.co/api/v2/pokemon?limit=26${this.pokemonListLimit}`,
				nextPage: null,
				previousPage: null
			},
			pokemonList: [],
			loading: false
		};
	},
	mounted() {
		this.fetchData(this.pokemonAPI.firstPage);
	},
	methods: {
		fetchData(apiLink) {
			this.loading = true;
			axios
				.get(apiLink)
				.then(response => {
					setTimeout(() => {
						console.log(response.data);
						this.pokemonList = response.data.results;
						this.pokemonAPI.nextPage = response.data.next;
						this.pokemonAPI.previousPage = response.data.previous;
					}, 300);
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
				});
		},
		fetchNextEvent() {
			this.fetchData(this.pokemonAPI.nextPage);
		},
		fetchPrevEvent() {
			this.fetchData(this.pokemonAPI.previousPage);
		}
	}
};
</script>
