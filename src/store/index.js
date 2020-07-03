import Vue from "vue";
import Vuex from "vuex";
import * as pokemonListings from "./modules/pokemonListings";
import * as pokemonSingle from "./modules/pokemonSingle";
import * as controls from "./modules/controls";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	}
});
