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
		async function fetch(pokeID) {
			try {
				const current = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
				commit("UPDATE_CURRENT_POKEMON", current.data);

				if (pokeID > 1) {
					const previous = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`);
					commit("UPDATE_PREVIOUS_POKEMON", previous.data);
				} else {
					commit("UPDATE_PREVIOUS_POKEMON", {});
				}

				if (pokeID < 150) {
					const next = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`);
					commit("UPDATE_NEXT_POKEMON", next.data);
				} else {
					commit("UPDATE_NEXT_POKEMON", {});
				}

				// End of function and error check
				dispatch("controls/setLoadingStatus", false, { root: true });
			} catch (error) {
				dispatch("controls/setErrorStatus", true, { root: true });
				console.log(error);
			}
		}

		fetch(pokeID);
	},
	clearStoredData({ commit }) {
		commit("UPDATE_CURRENT_POKEMON", {});
		commit("UPDATE_NEXT_POKEMON", {});
		commit("UPDATE_PREVIOUS_POKEMON", {});
	}
};

export const getters = {};
