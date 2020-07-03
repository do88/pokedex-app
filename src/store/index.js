import Vue from "vue";
import Vuex from "vuex";
import * as pokemonListings from "./pokemonListings";
import * as pokemonSingle from "./pokemonSingle";
import * as controls from "./controls";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	}
});
