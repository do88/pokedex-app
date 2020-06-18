<template>
	<div class="main-screen">
		<div class="main-screen__stats">
			<h1 class="main-screen__title">{{ currentPokemon.name }}</h1>

			<template v-if="currentPokemon.sprites">
				<div class="main-screen__stats-image front-image">
					<img :src="currentPokemon.sprites.front_default" alt="" />
				</div>
				<div class="main-screen__stats-image back-image">
					<img :src="currentPokemon.sprites.back_default" alt="" />
				</div>
			</template>

			<div class="main-screen__stats-overall">
				<div class="main-screen__stats-entry">
					<span class="main-screen__stats-prefix">Height:</span>
					{{ currentPokemon.height }}
				</div>

				<div class="main-screen__stats-entry">
					<span class="main-screen__stats-prefix">Weight:</span>
					{{ currentPokemon.weight }}
				</div>

				<div class="main-screen__stats-entry">
					<span class="main-screen__stats-prefix">Type:</span>
					<div
						class="main-screen__stats-type"
						v-for="(item, index) in currentPokemon.types"
						:key="index"
					>
						{{ item.type.name }}
					</div>
				</div>

				<ul class="main-screen__stats-base">
					<li v-for="(item, index) in currentPokemon.stats" :key="index">
						{{ item.stat.name }} : {{ item.base_stat }}
					</li>
				</ul>
			</div>

			<div class="main-screen__stats-controls">
				<button class="main-screen__stats-controls__button">
					<span class="main-screen__stats-controls__image">
						<template v-if="previousPokemon.sprites">
							<img :src="previousPokemon.sprites.front_default" alt="" />
						</template>
					</span>
					<span class="main-screen__stats-controls__navigation">Previous</span>
					<span class="main-screen__stats-controls__title"
						>{{ pad(previousPokemon.id, 3) }}:{{ previousPokemon.name }}</span
					>
				</button>

				<button class="main-screen__stats-controls__button">
					<span class="main-screen__stats-controls__image">
						<template v-if="nextPokemon.sprites">
							<img :src="nextPokemon.sprites.front_default" alt="" />
						</template>
					</span>
					<span class="main-screen__stats-controls__navigation">Next</span>
					<span class="main-screen__stats-controls__title"
						>{{ pad(nextPokemon.id, 3) }}:{{ nextPokemon.name }}</span
					>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		currentPokemon: {
			type: Object,
			required: true
		},
		nextPokemon: {
			type: Object,
			required: true
		},
		previousPokemon: {
			type: Object,
			required: true
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

<style lang="scss" scoped></style>
