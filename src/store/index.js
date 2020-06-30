import Vue from "vue";
import Vuex from "vuex";
import * as pokemonListings from "@/store/modules/pokemonListings.js";
import * as pokemonSingle from "@/store/modules/pokemonSingle.js";
import * as controls from "@/store/modules/controls.js";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	}
});
