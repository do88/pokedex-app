<template>
	<div class="container">
		<MainScreen
			:pokemonList="pokemonList"
			:apiLinks="pokemonAPI"
			:totalResults="totalResults"
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

// showing (startNumber) - (endNumber) of (total)
// startNumber needs to be 1 to start with and then add the listLimit each time next page is clicked
// endNumber needs to be 1+listLimit start with and then add the listLimit each time next page is clicked

const pokemonListLimit = 60;

export default {
	components: {
		MainScreen,
		SubScreen,
		StatusBar,
		ScreenControls
	},
	data() {
		return {
			pokemonAPI: {
				firstPage: `https://pokeapi.co/api/v2/pokemon?limit=${pokemonListLimit}`,
				nextPage: null,
				previousPage: null
			},
			pokemonList: [],
			totalResults: 0,
			loading: false
		};
	},
	mounted() {
		this.fetchData(this.pokemonAPI.firstPage);
		console.log(pokemonListLimit);
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
						this.totalResults = response.data.count;
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
