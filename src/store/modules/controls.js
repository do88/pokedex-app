import router from "../../router";
export const namespaced = true;

export const state = {
	loading: false,
	activeIndex: null,
	selectedNavigation: null,
	adjacentPokemon: null,
	activePokemonID: null
};

export const mutations = {
	SET_LOADING_STATUS(state, loadingState) {
		state.loading = loadingState;
	},
	UPDATE_ACTIVE_INDEX(state, newIndex) {
		state.activeIndex = newIndex;
	},
	SET_NAVIGATION(state, navigationDirection) {
		state.selectedNavigation = navigationDirection;
	},
	SET_ADJACENT_POKEMON(state, pokemon) {
		state.adjacentPokemon = pokemon;
	},
	SET_ACTIVE_POKEMON(state, id) {
		state.activePokemonID = id;
	}
};

export const actions = {
	setLoadingStatus({ commit }, loadingStatus) {
		commit("SET_LOADING_STATUS", loadingStatus);
	},
	setActiveIndex({ commit, state }, index) {
		commit("SET_NAVIGATION", null);
		commit("UPDATE_ACTIVE_INDEX", state.activeIndex === index ? null : index);
	},
	setActiveNavigation({ commit, state }, navigationDirection) {
		commit("UPDATE_ACTIVE_INDEX", null);
		commit(
			"SET_NAVIGATION",
			state.selectedNavigation === navigationDirection ? null : navigationDirection
		);
	},
	setAdjacentPokemon({ commit, state }, { nextPokemon, id }) {
		commit("SET_ACTIVE_POKEMON", state.activePokemonID === id ? null : id);
		commit("SET_ADJACENT_POKEMON", state.adjacentPokemon === nextPokemon ? null : nextPokemon);
	},
	enterButtonAction({ state, dispatch, commit }) {
		if (state.activeIndex) {
			router.push({ name: "pokemon", params: { id: state.activeIndex } });
			commit("UPDATE_ACTIVE_INDEX", null);
		}
		if (state.selectedNavigation) {
			state.selectedNavigation === "next"
				? dispatch("pokemonListings/fetchNextEvent", null, { root: true })
				: dispatch("pokemonListings/fetchPrevEvent", null, { root: true });
			state.selectedNavigation = null;
		}
		if (state.adjacentPokemon && state.activePokemonID) {
			router.push({ name: "pokemon", params: { id: state.activePokemonID } });
			commit("SET_ACTIVE_POKEMON", null);
			commit("SET_ADJACENT_POKEMON", null);
		}
	},
	backToListings({ commit }, routerInfo) {
		if (routerInfo != "home") {
			router.push({ name: "home" });
			commit("SET_ADJACENT_POKEMON", null);
		}
	}
};

export const getters = {};
