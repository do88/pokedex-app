<template>
	<div class="controls">
		<button
			class="controls__enter controls--green"
			:class="{ selected: controls.activeIndex || controls.selectedNavigation }"
			@click="enterButtonAction"
		>
			<span>Enter</span>
		</button>
		<button
			class="controls__return controls--grey"
			:class="{ selected: currentRouteName != 'home' }"
			@click="backToListings(currentRouteName)"
		>
			<span>Return</span>
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
		...mapState(["controls"])
	},
	methods: {
		...mapActions("controls", ["enterButtonAction", "backToListings"])
	}
};
</script>
