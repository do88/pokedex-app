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
			<button
				@click="goToNextPage"
				class="main-screen__button"
				:disabled="loadingStatus || pokemonAPI.endPageNumber > 150"
			>
				Next »
			</button>
			<span class="main-screen__index">
				Showing {{ pokemonAPI.startPageNumber }} -
				{{ pokemonAPI.endPageNumber > 150 ? 150 : pokemonAPI.endPageNumber }} of
				{{ pokemonAPI.totalResults }}
			</span>
		</div>
		<ul class="main-screen__list">
			<li
				class="main-screen__list-item"
				v-for="(item, index) in reducedArray"
				:class="{ selected: index === activeIndex }"
				:key="index"
				@click="setActive(index)"
			>
				<span class="main-screen__list-item-prefix">No</span>
				{{ pad(item.indexValue, 3) }}:{{ item.name | titleize }}
			</li>
		</ul>
	</div>
</template>

<script>
// on click add active class to element
// set enter button to active
// on click of enter button trigger function
// // Need to know which function, next page, or view pokemon
// // Function will need payload

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
	data() {
		return {
			activeIndex: null
		};
	},
	computed: {
		reducedArray() {
			return this.pokemonAPI.pokemonList.filter(item => item.indexValue <= 150);
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
		},
		setActive(index) {
			if (this.activeIndex === index) {
				this.activeIndex = null;
				this.$emit("index-cleared");
			} else {
				this.activeIndex = index;
				this.$emit("index-selected", index);
			}
		}
	}
};
</script>
