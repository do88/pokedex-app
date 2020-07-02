import router from "../../router";
export const namespaced = true;

export const state = {
	loading: false,
	activeIndex: null,
	selectedNavigation: null
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
	}
};

export const actions = {
	setLoadingStatus({ commit }, loadingStatus) {
		commit("SET_LOADING_STATUS", loadingStatus);
	},
	setActiveIndex({ commit }, index) {
		commit("SET_NAVIGATION", null);
		commit("UPDATE_ACTIVE_INDEX", state.activeIndex === index ? null : index);
	},
	setActiveNavigation({ commit }, navigationDirection) {
		commit("UPDATE_ACTIVE_INDEX", null);
		commit(
			"SET_NAVIGATION",
			state.selectedNavigation === navigationDirection ? null : navigationDirection
		);
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
	},
	backToListings({}, routerInfo) {
		if (routerInfo != "home") {
			router.push({ name: "home" });
		}
	}
};

export const getters = {};
