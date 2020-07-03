import Vue from "vue";
import Vuex from "vuex";
import * as pokemonListings from "./modules/pokemonListings";
import * as pokemonSingle from "./modules/pokemonSingle";
import * as controls from "./modules/controls";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	},
	strict: debug
});
