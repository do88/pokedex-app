<template>
	<div class="main-screen">
		<h1 class="main-screen__title">POKEDEX INDEX</h1>
		<template v-if="controls.loading">
			<div>
				<h1>LOADING...</h1>
			</div>
		</template>
		<template v-else>
			<div class="main-screen__controls">
				<button
					@click="setActiveNavigation('previous')"
					:disabled="pokemonListings.endPageNumber <= 20"
					:class="{ selected: controls.selectedNavigation === 'previous' }"
					class="main-screen__button"
				>
					« Previous
				</button>
				<button
					@click="setActiveNavigation('next')"
					:disabled="pokemonListings.endPageNumber >= 150"
					:class="{ selected: controls.selectedNavigation === 'next' }"
					class="main-screen__button"
				>
					Next »
				</button>
				<span class="main-screen__index">
					Showing {{ pokemonListings.startPageNumber }} -
					{{ pokemonListings.endPageNumber > 150 ? 150 : pokemonListings.endPageNumber }} of
					{{ pokemonListings.totalResults }}
				</span>
			</div>
			<ul class="main-screen__list">
				<li
					class="main-screen__list-item"
					v-for="item in reducedArray"
					:class="{ selected: item.indexValue === controls.activeIndex }"
					:key="item.indexValue"
					@click="setActiveIndex(item.indexValue)"
				>
					<span class="main-screen__list-item-prefix">No</span>
					{{ item.indexValue | pad }}:{{ item.name | titleize }}
				</li>
			</ul></template
		>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		reducedArray() {
			return this.pokemonListings.pokemonList.filter(
				item => item.indexValue <= this.pokemonListings.totalResults
			);
		},
		...mapState(["pokemonListings", "controls"])
	},
	methods: {
		...mapActions("controls", ["setActiveIndex", "setActiveNavigation"])
	}
};
</script>
