<template>
	<div class="container">
		<PokemonViewScreen />
		<div class="sidebar">
			<div>{{ id }}</div>
			<SubScreen />
			<StatusBar />
			<ScreenControls />
		</div>
	</div>
</template>

<script>
import axios from "axios";
import PokemonViewScreen from "@/components/PokemonViewScreen.vue";
import SubScreen from "@/components/SubScreen.vue";
import StatusBar from "@/components/StatusBar.vue";
import ScreenControls from "@/components/ScreenControls.vue";

const pokemonListLimit = 60;

export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},
	components: {
		PokemonViewScreen,
		SubScreen,
		StatusBar,
		ScreenControls
	},
	methods: {}
};
</script>
