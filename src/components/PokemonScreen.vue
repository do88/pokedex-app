<template>
	<div class="main-screen">
		<template v-if="controls.loading">
			<div>
				<h1>LOADING...</h1>
			</div>
		</template>
		<template v-else>
			<div class="stats">
				<template v-if="pokemonSingle.currentPokemon.sprites">
					<h1 class="title">
						{{ pokemonSingle.currentPokemon.id | pad }}:{{
							pokemonSingle.currentPokemon.name | titleize
						}}
					</h1>
					<div class="stats-image front-image">
						<img :src="pokemonSingle.currentPokemon.sprites.front_default" alt="" />
					</div>

					<div class="stats-image back-image">
						<img :src="pokemonSingle.currentPokemon.sprites.back_default" alt="" />
					</div>

					<div class="stats-overall">
						<div class="stats-entry">
							<span class="stats-prefix">Height:</span>
							{{ pokemonSingle.currentPokemon.height / 10 }} m
						</div>

						<div class="stats-entry">
							<span class="stats-prefix">Weight:</span>
							{{ pokemonSingle.currentPokemon.weight / 10 }} kg
						</div>

						<div class="stats-type">
							<span class="stats-prefix">Type:</span>
							<div v-for="(item, index) in pokemonSingle.currentPokemon.types" :key="index">
								{{ item.type.name
								}}<template v-if="pokemonSingle.currentPokemon.types.length >= 2"
									>,
								</template>
							</div>
						</div>
					</div>

					<ul class="stats-base">
						<li v-for="(item, index) in pokemonSingle.currentPokemon.stats" :key="index">
							{{ item.stat.name }}: {{ item.base_stat }}
						</li>
					</ul>
				</template>

				<div class="stats-controls">
					<template v-if="pokemonSingle.previousPokemon.sprites">
						<button
							class="stats-controls__button"
							@click="setAdjacentPokemon({ nextPokemon: 'previous', id: currentPokemonID - 1 })"
							:class="{ selected: controls.adjacentPokemon === 'previous' }"
						>
							<span class="stats-controls__image">
								<template v-if="pokemonSingle.previousPokemon.sprites">
									<img :src="pokemonSingle.previousPokemon.sprites.front_default" alt="" />
								</template>
							</span>
							<div class="stats-controls__text">
								<span class="stats-controls__navigation">Previous</span>
								<span class="stats-controls__title"
									>{{ pokemonSingle.previousPokemon.id | pad }}:{{
										pokemonSingle.previousPokemon.name | titleize
									}}</span
								>
							</div>
						</button>
					</template>

					<template v-if="pokemonSingle.nextPokemon.sprites">
						<button
							class="stats-controls__button"
							@click="setAdjacentPokemon({ nextPokemon: 'next', id: currentPokemonID + 1 })"
							:class="{ selected: controls.adjacentPokemon === 'next' }"
						>
							<span class="stats-controls__image">
								<template v-if="pokemonSingle.nextPokemon.sprites">
									<img :src="pokemonSingle.nextPokemon.sprites.front_default" alt="" />
								</template>
							</span>
							<div class="stats-controls__text">
								<span class="stats-controls__navigation">Next</span>
								<span class="stats-controls__title"
									>{{ pokemonSingle.nextPokemon.id | pad }}:{{
										pokemonSingle.nextPokemon.name | titleize
									}}</span
								>
							</div>
						</button>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		currentPokemonID() {
			return this.$route.params.id;
		},
		...mapState(["pokemonSingle", "controls"])
	},
	methods: {
		...mapActions("controls", ["setAdjacentPokemon"])
	}
};
</script>

<style lang="scss" scoped></style>
