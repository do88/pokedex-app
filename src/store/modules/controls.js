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
	}
};

export const actions = {
	setLoadingStatus({ commit }, loadingStatus) {
		commit("SET_LOADING_STATUS", loadingStatus);
	},
	setActiveIndex({ commit }, index) {
		if (state.activeIndex === index) {
			commit("UPDATE_ACTIVE_INDEX", null);
		} else {
			commit("UPDATE_ACTIVE_INDEX", index);
		}
	},
	setActiveNavigation(navigationDirection) {
		// 	// Clear selection from index list
		// 	this.$emit("index-cleared");
		// 	// Prime active navigation
		// 	navigationDirection === "next"
		// 		? this.$emit("fetch-next", "prime")
		// 		: this.$emit("fetch-previous", "prime");
	},
	enterButtonAction({ state }) {
		if (state.activeIndex) {
			router.push({ name: "pokemon", params: { id: state.activeIndex } });
		}
		// if (state.selectedNavigation === "next") {
		// 	this.$emit("fetch-next", "fetch");
		// }
		// if (state.selectedNavigation === "previous") {
		// 	this.$emit("fetch-previous", "fetch");
		// }
	}
	// backToListings() {
	// 	if (this.pokemonScreenActive) {
	// 		router.push({ name: "home" });
	// 	}
	// }
};

export const getters = {};
