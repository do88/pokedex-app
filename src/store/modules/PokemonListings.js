export const namespaced = true;

const pokemonListLimit = 20;

export const state = {
	firstPage: `https://pokeapi.co/api/v2/pokemon?limit=${pokemonListLimit}`,
	pokemonList: [],
	// This is the last entry in Gen 4 pokemon
	nextPage: null,
	previousPage: null,
	totalResults: 150,
	startPageNumber: 0,
	endPageNumber: pokemonListLimit
};

export const mutations = {};

export const actions = {};

export const getters = {};
