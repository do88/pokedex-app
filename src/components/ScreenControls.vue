<template>
	<div class="controls">
		<button
			class="controls__enter controls--green"
			:class="{ selected: controls.activeIndex || controls.selectedNavigation }"
			@click="enterButtonAction"
		>
			<span>Enter</span>
		</button>
		<button class="controls__return controls--grey" :class="{ selected: false }" @click="backToListings">
			<span>Return</span>
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	// data() {
	// 	return {
	// 		pokemonScreenActive: this.$route.name === "pokemon"
	// 	};
	// },
	computed: {
		...mapState(["controls"])
	},
	methods: {
		...mapActions("controls", ["enterButtonAction", "backToListings"])
	}
};
</script>
