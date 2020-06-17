<template>
	<div class="main-screen">
		<h1 class="main-screen__title">POKEDEX INDEX</h1>
		<div class="main-screen__controls">
			<button
				@click="goToPreviousPage"
				:disabled="!pokemonAPI.previousPage || loadingStatus"
				class="main-screen__button"
			>
				« Previous
			</button>
			<button @click="goToNextPage" class="main-screen__button" :disabled="loadingStatus">
				Next »
			</button>
			<span class="main-screen__index">
				Showing {{ pokemonAPI.startPageNumber }} - {{ pokemonAPI.endPageNumber }} of
				{{ pokemonAPI.totalResults }}
			</span>
		</div>
		<ul class="main-screen__list">
			<li
				class="main-screen__list-item"
				v-for="(item, index) in pokemonAPI.pokemonList"
				:key="index"
			>
				<router-link :to="{ name: 'pokemon', params: { id: item.indexValue } }">
					<span class="main-screen__list-item-prefix">No</span>
					{{ pad(item.indexValue, 3) }}:{{ item.name | titleize }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
// start with pageStartNumber - 1 and then loop for the pokemonAPI.pokemonList.length adding one each timee

export default {
	props: {
		pokemonAPI: {
			type: Object,
			required: true
		},
		loadingStatus: {
			type: Boolean,
			required: true
		}
	},
	filters: {
		titleize(value) {
			return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
		}
	},
	methods: {
		goToPreviousPage() {
			this.$emit("fetch-prev");
		},
		goToNextPage() {
			this.$emit("fetch-next");
		},
		pad(n, width, z) {
			z = z || "0";
			n = n + "";
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}
	}
};
</script>
