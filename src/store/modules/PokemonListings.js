import axios from "axios";
export const namespaced = true;
const pokemonListLimit = 20;

export const state = {
	pokemonListLimit: pokemonListLimit,
	firstPage: `https://pokeapi.co/api/v2/pokemon?limit=${pokemonListLimit}`,
	pokemonList: [],
	nextPage: null,
	previousPage: null,
	totalResults: 150, // This is the last entry in Gen 4 pokemon
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
	fetchData({ commit, dispatch, state }, payload) {
		dispatch("controls/setLoadingStatus", true, { root: true });
		axios
			.get(payload.link)
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
					if (payload.direction === "next-page") {
						updatedState.startPageNumber += state.pokemonListLimit;
						updatedState.endPageNumber += state.pokemonListLimit;
					}
					if (payload.direction === "previous-page") {
						updatedState.startPageNumber -= state.pokemonListLimit;
						updatedState.endPageNumber -= state.pokemonListLimit;
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
	},
	fetchNextEvent({ dispatch, state }) {
		dispatch("fetchData", { link: state.nextPage, direction: "next-page" });
	},
	fetchPrevEvent({ dispatch, state }) {
		dispatch("fetchData", { link: state.previousPage, direction: "previous-page" });
	}
};

export const getters = {};