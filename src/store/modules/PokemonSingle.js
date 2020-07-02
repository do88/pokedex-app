import axios from "axios";
export const namespaced = true;

export const state = {
	currentPokemon: {},
	nextPokemon: {},
	previousPokemon: {}
};

export const mutations = {
	UPDATE_CURRENT_POKEMON(state, newData) {
		state.currentPokemon = newData;
	},
	UPDATE_NEXT_POKEMON(state, newData) {
		state.nextPokemon = newData;
	},
	UPDATE_PREVIOUS_POKEMON(state, newData) {
		state.previousPokemon = newData;
	}
};

export const actions = {
	fetchDataSingle({ dispatch, commit }, pokeID) {
		// Local error check
		let error = false;

		// Define API call function
		const axiosAPICall = (endpoint, dataObject) => {
			axios
				.get(endpoint)
				.then(response => {
					if (dataObject === "current") commit("UPDATE_CURRENT_POKEMON", response.data);
					if (dataObject === "next") commit("UPDATE_NEXT_POKEMON", response.data);
					if (dataObject === "previous") commit("UPDATE_PREVIOUS_POKEMON", response.data);
				})
				.catch(error => {
					dispatch("controls/setErrorStatus", true, { root: true });
					error = true;
					console.log(error);
				});
		};

		// Start loading
		dispatch("controls/setLoadingStatus", true, { root: true });

		// Delay function for loading effects
		setTimeout(() => {
			axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, "current");

			// Error handling for first  listings
			pokeID > 1
				? axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`, "previous")
				: commit("UPDATE_PREVIOUS_POKEMON", {});

			// Error handling for last listings
			pokeID < 150
				? axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`, "next")
				: commit("UPDATE_NEXT_POKEMON", {});

			// End of function and error check
			if (!error) dispatch("controls/setLoadingStatus", false, { root: true });
		}, 500);
	}
};

export const getters = {};
