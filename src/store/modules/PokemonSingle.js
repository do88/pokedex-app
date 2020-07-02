export const namespaced = true;

export const state = {
	currentPokemon: {},
	nextPokemon: {},
	previousPokemon: {},
	apiError: false
};

export const mutations = {};

export const actions = {
	axiosAPICall(endpoint, dataObject) {
		axios
			.get(endpoint)
			.then(response => {
				if (dataObject === "current") this.pokemonSingle.currentPokemon = response.data;
				if (dataObject === "next") this.pokemonSingle.nextPokemon = response.data;
				if (dataObject === "previous") this.pokemonSingle.previousPokemon = response.data;
			})
			.catch(error => {
				this.pokemonSingle.apiError = true;
				console.log(error);
				console.log(dataObject);
			});
	},
	fetchDataSingle(pokeID) {
		setTimeout(() => {
			// Delay function for loading effects
			this.controls.loading = true;
			this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, "current");

			// Error handeling for first and last listings
			if (pokeID > 1) {
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID - 1}`, "previous");
			} else {
				this.pokemonSingle.previousPokemon = {};
			}
			if (pokeID <= 150) {
				this.axiosAPICall(`https://pokeapi.co/api/v2/pokemon/${pokeID + 1}`, "next");
			} else {
				this.pokemonSingle.nextPokemon = {};
			}

			// End of function
			if (!this.pokemonSingle.apiError) this.controls.loading = false;
		}, 2000);
	}
};

export const getters = {};
