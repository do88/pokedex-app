<template>
	<div class="container">
		<MainScreen
			:pokemonAPI="pokemonAPI"
			:loadingStatus="loading"
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

const pokemonListLimit = 20;

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
				pokemonList: [],
				// This is the last entry in Gen 4 pokemon
				nextPage: null,
				previousPage: null,
				totalResults: 150,
				startPageNumber: 0,
				endPageNumber: pokemonListLimit
			},
			loading: false
		};
	},
	mounted() {
		this.fetchData(this.pokemonAPI.firstPage);
	},
	methods: {
		fetchData(apiLink, pageIncrease) {
			this.loading = true;
			axios
				.get(apiLink)
				.then(response => {
					// Delay function for loading effects
					setTimeout(() => {
						console.log(response.data);

						// Set data in the local object
						this.pokemonAPI.pokemonList = response.data.results;
						this.pokemonAPI.nextPage = response.data.next;
						this.pokemonAPI.previousPage = response.data.previous;

						// Control page numbers based on back or forward
						if (pageIncrease === "next-page") {
							this.pokemonAPI.startPageNumber += pokemonListLimit;
							this.pokemonAPI.endPageNumber += pokemonListLimit;
						}
						if (pageIncrease === "previous-page") {
							this.pokemonAPI.startPageNumber -= pokemonListLimit;
							this.pokemonAPI.endPageNumber -= pokemonListLimit;
						}

						// Add index value for each item
						let indexValue = this.pokemonAPI.startPageNumber;
						this.pokemonAPI.pokemonList.forEach(item => {
							indexValue++;
							item.indexValue = indexValue;
						});

						// End of function
						this.loading = false;
					}, 100);
				})
				.catch(error => {
					console.log(error);
					this.loading = true;
				});
		},
		fetchNextEvent() {
			this.fetchData(this.pokemonAPI.nextPage, "next-page");
		},
		fetchPrevEvent() {
			this.fetchData(this.pokemonAPI.previousPage, "previous-page");
		}
	}
};
</script>
