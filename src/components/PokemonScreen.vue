<template>
	<div class="main-screen">
		<template v-if="currentPokemon.sprites">
			<div class="stats">
				<h1 class="title">{{ currentPokemon.name }}</h1>

				<div class="stats-image front-image">
					<img :src="currentPokemon.sprites.front_default" alt="" />
				</div>
				<div class="stats-image back-image">
					<img :src="currentPokemon.sprites.back_default" alt="" />
				</div>

				<div class="stats-overall">
					<div class="stats-entry">
						<span class="stats-prefix">Height:</span>
						{{ currentPokemon.height / 10 }} m
					</div>

					<div class="stats-entry">
						<span class="stats-prefix">Weight:</span>
						{{ currentPokemon.weight / 10 }} kg
					</div>

					<div class="stats-entry">
						<span class="stats-prefix">Type:</span>
						<div class="stats-type" v-for="(item, index) in currentPokemon.types" :key="index">
							{{ item.type.name
							}}<template v-if="currentPokemon.types.length >= 2">, </template>
						</div>
					</div>

					<ul class="stats-base">
						<li v-for="(item, index) in currentPokemon.stats" :key="index">
							{{ item.stat.name }} : {{ item.base_stat }}
						</li>
					</ul>
				</div>

				<div class="stats-controls">
					<button class="stats-controls__button">
						<span class="stats-controls__image">
							<template v-if="previousPokemon.sprites">
								<img :src="previousPokemon.sprites.front_default" alt="" />
							</template>
						</span>
						<span class="stats-controls__navigation">Previous</span>
						<span class="stats-controls__title"
							>{{ pad(previousPokemon.id, 3) }}:{{ previousPokemon.name }}</span
						>
					</button>

					<button class="stats-controls__button">
						<span class="stats-controls__image">
							<template v-if="nextPokemon.sprites">
								<img :src="nextPokemon.sprites.front_default" alt="" />
							</template>
						</span>
						<span class="stats-controls__navigation">Next</span>
						<span class="stats-controls__title"
							>{{ pad(nextPokemon.id, 3) }}:{{ nextPokemon.name }}</span
						>
					</button>
				</div>
			</div>
		</template>
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
