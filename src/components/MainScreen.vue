<template>
	<div class="main-screen">
		<h1 class="main-screen__title">POKEDEX INDEX</h1>
		<div class="main-screen__controls">
			<button
				@click="goToPreviousPage"
				v-if="apiLinks.previousPage"
				class="main-screen_button"
			>
				« Previous
			</button>
			<button @click="goToNextPage" class="main-screen_button">
				Next »
			</button>
		</div>
		<ul class="main-screen__list">
			<li class="main-screen__list-item" v-for="(item, index) in pokemonList" :key="index">
				<span class="main-screen__list-item-prefix">No</span>
				{{ item.name | titleize }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		pokemonList: {
			type: Array,
			required: true
		},
		apiLinks: {
			type: Object,
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
		}
	}
};
</script>
