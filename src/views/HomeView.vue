<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import PokemonCard from '@/components/PokemonCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = usePokemonStore()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemonList()
  }
})

const displayedPokemon = computed(() => store.filteredPokemon)
</script>

<template>
  <div class="home" ref="containerRef">
    <section class="home__hero">
      <h1 class="home__title">
        <span class="home__title-main">Discover</span>
        <span class="home__title-accent">Pokémon</span>
      </h1>
      <p class="home__description">
        Explore the original 151 Pokémon from the Kanto region. 
        Click on any Pokémon to view detailed stats and information.
      </p>
    </section>

    <SearchBar />

    <section class="home__stats">
      <div class="home__stat">
        <span class="home__stat-value">{{ store.totalCount }}</span>
        <span class="home__stat-label">Total Pokémon</span>
      </div>
      <div class="home__stat">
        <span class="home__stat-value">{{ displayedPokemon.length }}</span>
        <span class="home__stat-label">Showing</span>
      </div>
    </section>

    <Transition name="fade" mode="out-in">
      <div v-if="store.isLoading && store.pokemonList.length === 0" class="home__loading">
        <LoadingSpinner size="lg" />
        <p>Loading Pokémon...</p>
      </div>

      <div v-else-if="store.error" class="home__error">
        <div class="home__error-icon">⚠️</div>
        <p>{{ store.error }}</p>
        <button @click="store.fetchPokemonList()" class="home__retry">
          Try Again
        </button>
      </div>

      <div v-else-if="displayedPokemon.length === 0" class="home__empty">
        <div class="home__empty-icon">🔍</div>
        <p>No Pokémon found matching "{{ store.searchQuery }}"</p>
        <button @click="store.setSearchQuery('')" class="home__clear">
          Clear Search
        </button>
      </div>

      <TransitionGroup 
        v-else
        name="list" 
        tag="div" 
        class="home__grid"
      >
        <PokemonCard
          v-for="(pokemon, index) in displayedPokemon"
          :key="pokemon.id"
          :pokemon="pokemon"
          :style="{ '--delay': `${Math.min(index * 30, 600)}ms` }"
        />
      </TransitionGroup>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: $space-8;
  
  &__hero {
    text-align: center;
    padding: $space-8 0 $space-4;
  }

  &__title {
    display: flex;
    flex-direction: column;
    font-size: $font-size-4xl;
    line-height: 1;
    margin-bottom: $space-4;

    @include respond-to($breakpoint-md) {
      font-size: $font-size-5xl;
      flex-direction: row;
      justify-content: center;
      gap: $space-3;
    }
  }

  &__title-main {
    color: $color-text-primary;
  }

  &__title-accent {
    @include text-gradient($color-accent-cyan, $color-accent-magenta);
  }

  &__description {
    max-width: 600px;
    margin: 0 auto;
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }

  &__stats {
    display: flex;
    justify-content: center;
    gap: $space-8;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-1;
  }

  &__stat-value {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    font-family: $font-mono;
    @include text-gradient($color-accent-cyan, $color-accent-green);
  }

  &__stat-label {
    font-size: $font-size-sm;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: $space-4;

    @include respond-to($breakpoint-sm) {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: $space-5;
    }

    @include respond-to($breakpoint-md) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: $space-6;
    }

    @include respond-to($breakpoint-lg) {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  &__loading,
  &__error,
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    min-height: 300px;
    text-align: center;
    color: $color-text-secondary;
  }

  &__error-icon,
  &__empty-icon {
    font-size: 3rem;
  }

  &__retry,
  &__clear {
    padding: $space-3 $space-6;
    font-family: inherit;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    background: linear-gradient(135deg, rgba($color-accent-cyan, 0.2), rgba($color-accent-magenta, 0.2));
    border: 1px solid rgba($color-accent-cyan, 0.3);
    border-radius: $radius-lg;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      background: linear-gradient(135deg, rgba($color-accent-cyan, 0.3), rgba($color-accent-magenta, 0.3));
      transform: translateY(-2px);
    }
  }
}

// Staggered animation for cards
.list-enter-active {
  animation: fade-up 0.4s ease forwards;
  animation-delay: var(--delay, 0ms);
  opacity: 0;
}
</style>

