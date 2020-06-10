<template>
	<div class="container">
		<MainScreen :pokemonList="pokemonList" />
		<div class="sidebar">
			<SubScreen />
			<StatusBar />
			<ScreenControls />
		</div>
		<button @click="fetchNext">Next</button>
		<button @click="fetchPrev">Previous</button>
	</div>
</template>

<script>
import axios from "axios";
import MainScreen from "@/components/MainScreen.vue";
import SubScreen from "@/components/SubScreen.vue";
import StatusBar from "@/components/StatusBar.vue";
import ScreenControls from "@/components/ScreenControls.vue";

export default {
	components: {
		MainScreen,
		SubScreen,
		StatusBar,
		ScreenControls
	},
	data() {
		return {
			pokemonAPI: "https://pokeapi.co/api/v2/pokemon?limit=26",
			nextLink: null,
			prevLink: null,
			pokemonList: [],
			loading: false
		};
	},
	mounted() {
		this.fetchData(this.pokemonAPI);
	},
	methods: {
		fetchData(apiLink) {
			this.loading = true;
			axios
				.get(apiLink)
				.then(response => {
					setTimeout(() => {
						console.log(response.data);
						this.pokemonList = response.data.results;
						this.nextLink = response.data.next;
						this.prevLink = response.data.previous;
					}, 300);
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
				});
		},
		fetchNext() {
			this.fetchData(this.nextLink);
		},
		fetchPrev() {
			this.fetchData(this.prevLink);
		}
	}
};
</script>
