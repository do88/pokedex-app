import axios from "axios";
export const namespaced = true;

// Set how many results are viewed at a time
const pokemonListLimit = 20;

export const state = {
	apiLink: "https://pokeapi.co/api/v2/pokemon",
	pokemonList: [],
	pokemonListLimit: pokemonListLimit,
	startPageNumber: 0,
	endPageNumber: pokemonListLimit,
	totalResults: 150 // This is the last entry in Gen 4 pokemon
};

export const mutations = {
	UPDATE_LISTINGS(state, updatedState) {
		state.pokemonList = updatedState.pokemonList;
		state.startPageNumber = updatedState.startPageNumber;
		state.endPageNumber = updatedState.endPageNumber;
	}
};

export const actions = {
	fetchData({ commit, dispatch, state }, payload) {
		dispatch("controls/setLoadingStatus", true, { root: true });

		let updatedState = state;

		// Control page numbers based on back or forward
		if (payload === "next-page") {
			updatedState.startPageNumber += state.pokemonListLimit;
			updatedState.endPageNumber += state.pokemonListLimit;
		}
		if (payload === "previous-page") {
			updatedState.startPageNumber -= state.pokemonListLimit;
			updatedState.endPageNumber -= state.pokemonListLimit;
		}

		axios
			.get(state.apiLink, {
				params: {
					offset: state.startPageNumber,
					limit: state.pokemonListLimit
				}
			})
			.then(response => {
				// Delay function for loading effects
				setTimeout(() => {
					// Create new local state object
					let updatedState = state;

					// Update data in state object
					updatedState.pokemonList = response.data.results;

					// Add index value for each item
					let indexValue = updatedState.startPageNumber;
					updatedState.pokemonList.forEach(item => {
						indexValue++;
						item.indexValue = indexValue;
					});

					commit("UPDATE_LISTINGS", updatedState);
					dispatch("controls/setLoadingStatus", false, { root: true });
				}, 500);
			})
			.catch(() => {
				dispatch("controls/setErrorStatus", true, { root: true });
			});
	},
	fetchNextEvent({ dispatch }) {
		dispatch("fetchData", "next-page");
	},
	fetchPrevEvent({ dispatch }) {
		dispatch("fetchData", "previous-page");
	}
};

export const getters = {};
