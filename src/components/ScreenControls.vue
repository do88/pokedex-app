<template>
	<div class="controls">
		<button
			class="controls__enter controls--green"
			:class="{ selected: selectedIndex || selectedNavigation }"
			@click="enterButtonAction"
		>
			<span>Enter</span>
		</button>
		<button
			class="controls__return controls--grey"
			:class="{ selected: pokemonScreenActive }"
			@click="backToListings"
		>
			<span>Return</span>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		selectedIndex: {
			type: Number,
			default: null
		},
		selectedNavigation: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			pokemonScreenActive: this.$route.name === "pokemon"
		};
	},
	methods: {
		goToPokemonPage(index) {
			if (this.selectedIndex) {
				this.$router.push({ name: "pokemon", params: { id: this.selectedIndex } });
			}
		},
		enterButtonAction() {
			if (this.selectedIndex) {
				this.$router.push({ name: "pokemon", params: { id: this.selectedIndex } });
			}
			if (this.selectedNavigation === "next") {
				this.$emit("fetch-next", "fetch");
			}
			if (this.selectedNavigation === "previous") {
				this.$emit("fetch-previous", "fetch");
			}
		},
		backToListings() {
			if (this.pokemonScreenActive) {
				this.$router.push({ name: "home" });
			}
		}
	}
};
</script>
