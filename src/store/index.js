import Vue from "vue";
import Vuex from "vuex";
import * as PokemonListings from "@/store/modules/PokemonListings.js";
import * as PokemonSingle from "@/store/modules/PokemonSingle.js";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		PokemonListings,
		PokemonSingle
	}
});
