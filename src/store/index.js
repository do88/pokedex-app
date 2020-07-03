import Vue from "vue";
import Vuex from "vuex";
import pokemonListings from "./modules/pokemonListings";
import pokemonSingle from "./modules/pokemonSingle";
import controls from "./modules/controls";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	}
});
