import axios from "axios";
export const namespaced = true;
const pokemonListLimit = 20;

export const state = {
	firstPage: `https://pokeapi.co/api/v2/pokemon?limit=${pokemonListLimit}`,
	pokemonList: [],
	// This is the last entry in Gen 4 pokemon
	nextPage: null,
	previousPage: null,
	totalResults: 150,
	startPageNumber: 0,
	endPageNumber: pokemonListLimit
};

export const mutations = {
	UPDATE_LISTINGS(state, updatedState) {
		state.pokemonList = updatedState.pokemonList;
		state.nextPage = updatedState.nextPage;
		state.previousPage = updatedState.previousPage;
		state.startPageNumber = updatedState.startPageNumber;
		state.endPageNumber = updatedState.endPageNumber;
	}
};

export const actions = {
	fetchData({ commit, dispatch, state }, apiLink, pageIncrease) {
		dispatch("controls/setLoadingStatus", true, { root: true });
		axios
			.get(apiLink)
			.then(response => {
				// Delay function for loading effects
				setTimeout(() => {
					console.log(response.data);
					// Create new local state object
					let updatedState = state;

					// Update data in state object
					updatedState.pokemonList = response.data.results;
					updatedState.nextPage = response.data.next;
					updatedState.previousPage = response.data.previous;

					// Control page numbers based on back or forward
					if (pageIncrease === "next-page") {
						updatedState.startPageNumber += pokemonListLimit;
						updatedState.endPageNumber += pokemonListLimit;
					}
					if (pageIncrease === "previous-page") {
						updatedState.startPageNumber -= pokemonListLimit;
						updatedState.endPageNumber -= pokemonListLimit;
					}

					// Add index value for each item
					let indexValue = updatedState.startPageNumber;
					updatedState.pokemonList.forEach(item => {
						indexValue++;
						item.indexValue = indexValue;
					});

					commit("UPDATE_LISTINGS", updatedState);
					dispatch("controls/setLoadingStatus", false, { root: true });
				}, 2000);
			})
			.catch(error => {
				console.log(error);
				dispatch("controls/setLoadingStatus", false, { root: true });
			});
	}
	// fetchNextEvent(action) {
	// 	if (action === "prime") {
	// 		this.controls.selectedNavigation = "next";
	// 	}
	// 	if (action === "fetch") {
	// 		this.fetchData(this.pokemonListings.nextPage, "next-page");
	// 		this.controls.selectedNavigation = null;
	// 	}
	// },
	// fetchPrevEvent(action) {
	// 	if (action === "prime") {
	// 		this.controls.selectedNavigation = "previous";
	// 	}
	// 	if (action === "fetch") {
	// 		this.fetchData(this.pokemonListings.previousPage, "previous-page");
	// 		this.controls.selectedNavigation = null;
	// 	}
	// }
};

export const getters = {};
