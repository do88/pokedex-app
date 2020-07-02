import axios from "axios";
export const namespaced = true;

export const state = {
	currentPokemon: {},
	nextPokemon: {},
	previousPokemon: {},
	apiError: false
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
	},
	UPDATE_ERROR_STATUS(state, error) {
		state.apiError = error;
	}
};

export const actions = {
	fetchDataSingle({ state, dispatch, commit }, pokeID) {
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
					commit("UPDATE_ERROR_STATUS", true);
					console.log(error);
					console.log(dataObject);
				});
		};

		// Delay function for loading effects
		dispatch("controls/setLoadingStatus", true, { root: true });
		setTimeout(() => {
			axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, "current");

			// Error handling for first and last listings
			pokeID > 1
				? axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`, "previous")
				: commit("UPDATE_PREVIOUS_POKEMON", {});
			pokeID < 150
				? axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`, "next")
				: commit("UPDATE_NEXT_POKEMON", {});

			// End of function and error check
			if (!state.apiError) dispatch("controls/setLoadingStatus", false, { root: true });
		}, 500);
	}
};

export const getters = {};
