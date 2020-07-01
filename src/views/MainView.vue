<template>
	<div class="container">
		<MainScreen />
		<div class="sidebar">
			<SubScreen />
			<StatusBar />
			<ScreenControls />
		</div>
	</div>
</template>
-
<script>
import { mapState, mapActions } from "vuex";
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
	mounted() {
		this.fetchData(this.pokemonListings.firstPage);
	},
	computed: {
		...mapState(["pokemonListings"])
	},
	methods: {
		...mapActions("pokemonListings", ["fetchData"])
	}
};
</script>
