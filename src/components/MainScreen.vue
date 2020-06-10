<template>
	<div class="main-screen">
		<h1 class="main-screen__title">POKEDEX INDEX</h1>
		<ul class="main-screen__list">
			<li class="main-screen__list-item" v-for="(item, index) in pokemonList" :key="index">
				<span class="main-screen__list-item-prefix">No</span>
				{{ pad(index, 3) }}:{{ item.name | titleize }}
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
		}
	},
	filters: {
		titleize(value) {
			return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
		}
	},
	methods: {
		pad(n, width, z) {
			z = z || "0";
			n = n + "";
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}
	}
};
</script>
