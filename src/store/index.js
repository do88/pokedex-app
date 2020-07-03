import Vue from "vue";
import Vuex from "vuex";
import * as pokemonListings from "@/store/modules/pokemonListings";
import * as pokemonSingle from "@/store/modules/pokemonSingle";
import * as controls from "@/store/modules/controls";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		pokemonListings,
		pokemonSingle,
		controls
	}
});
