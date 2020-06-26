<template>
	<div class="container">
		<MainScreen
			:pokemonAPI="PokemonListings"
			:loadingStatus="loading"
			@fetch-next="fetchNextEvent"
			@fetch-previous="fetchPrevEvent"
			@index-cleared="indexCleared"
			@index-selected="indexSelected"
		/>
		<div class="sidebar">
			<SubScreen />
			<StatusBar />
			<ScreenControls
				:selectedIndex="selectedIndex"
				:selectedNavigation="selectedNavigation"
				@fetch-next="fetchNextEvent"
				@fetch-previous="fetchPrevEvent"
			/>
		</div>
	</div>
</template>
-
<script>
import { mapState } from "vuex";
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
			// PokemonListings: {
			// 	firstPage: `https://pokeapi.co/api/v2/pokemon?limit=${pokemonListLimit}`,
			// 	pokemonList: [],
			// 	// This is the last entry in Gen 4 pokemon
			// 	nextPage: null,
			// 	previousPage: null,
			// 	totalResults: 150,
			// 	startPageNumber: 0,
			// 	endPageNumber: pokemonListLimit
			// },
			loading: false,
			selectedIndex: null,
			selectedNavigation: null
		};
	},
	mounted() {
		console.log(this.PokemonListings.firstPage);
		// this.fetchData(this.PokemonListings.firstPage);
	},
	computed: {
		...mapState(["PokemonListings"])
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
						this.PokemonListings.pokemonList = response.data.results;
						this.PokemonListings.nextPage = response.data.next;
						this.PokemonListings.previousPage = response.data.previous;

						// Control page numbers based on back or forward
						if (pageIncrease === "next-page") {
							this.PokemonListings.startPageNumber += pokemonListLimit;
							this.PokemonListings.endPageNumber += pokemonListLimit;
						}
						if (pageIncrease === "previous-page") {
							this.PokemonListings.startPageNumber -= pokemonListLimit;
							this.PokemonListings.endPageNumber -= pokemonListLimit;
						}

						// Add index value for each item
						let indexValue = this.PokemonListings.startPageNumber;
						this.PokemonListings.pokemonList.forEach(item => {
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
		fetchNextEvent(action) {
			if (action === "prime") {
				console.log(action, "next set as navigation");
				this.selectedNavigation = "next";
				console.log(this.selectedNavigation);
			}
			if (action === "fetch") {
				this.fetchData(this.PokemonListings.nextPage, "next-page");
				this.selectedNavigation = null;
			}
		},
		fetchPrevEvent(action) {
			if (action === "prime") {
				this.selectedNavigation = "previous";
			}
			if (action === "fetch") {
				this.fetchData(this.PokemonListings.previousPage, "previous-page");
				this.selectedNavigation = null;
			}
		},
		indexCleared() {
			this.selectedIndex = null;
		},
		indexSelected(index) {
			this.selectedIndex = index;
		}
	}
};
</script>
