<template>
	<div class="main-screen">
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
							}}<template v-if="pokemonSingle.currentPokemon.types.length >= 2">, </template>
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
					<router-link
						class="stats-controls__button"
						:to="{ name: 'pokemon', params: { id: pokemonSingle.currentPokemon.id - 1 } }"
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
					</router-link>
				</template>

				<template v-if="pokemonSingle.nextPokemon.sprites">
					<router-link
						class="stats-controls__button"
						:to="{ name: 'pokemon', params: { id: pokemonSingle.currentPokemon.id + 1 } }"
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
					</router-link>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["pokemonSingle"])
	}
};
</script>

<style lang="scss" scoped></style>
