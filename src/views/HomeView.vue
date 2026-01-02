<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import PokemonCard from '@/components/PokemonCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import ControlPanel from '@/components/ControlPanel.vue'

const store = usePokemonStore()

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemonList()
  }
})

const displayedPokemon = computed(() => store.filteredPokemon)

const selectedPokemon = computed(() => {
  if (!store.selectedPokemonId) return null
  return store.pokemonList.find(p => p.id === store.selectedPokemonId)
})

const selectedName = computed(() => {
  if (!selectedPokemon.value) return ''
  return selectedPokemon.value.name.charAt(0).toUpperCase() + selectedPokemon.value.name.slice(1)
})

const selectedId = computed(() => {
  if (!store.selectedPokemonId) return ''
  return String(store.selectedPokemonId).padStart(3, '0')
})
</script>

<template>
  <div class="home">
    <!-- Main Screen -->
    <div class="screen screen--main">
      <h1 class="screen-title">Pokédex Index</h1>
      
      <template v-if="store.isLoading && store.pokemonList.length === 0">
        <div class="home__loading">
          <span class="screen-text blink">Loading data...</span>
        </div>
      </template>

      <template v-else-if="store.error">
        <div class="home__error">
          <span class="screen-text">ERROR: {{ store.error }}</span>
          <button @click="store.fetchPokemonList()" class="btn btn--green">
            Retry
          </button>
        </div>
      </template>

      <template v-else-if="displayedPokemon.length === 0 && store.searchQuery">
        <div class="home__empty">
          <span class="screen-text">No Pokémon found for "{{ store.searchQuery }}"</span>
          <button @click="store.setSearchQuery('')" class="btn btn--grey">
            Clear
          </button>
        </div>
      </template>

      <template v-else>
        <div class="home__stats">
          <span class="screen-text">
            Showing {{ displayedPokemon.length }} of {{ store.totalCount }}
          </span>
        </div>
        
        <TransitionGroup name="list" tag="ul" class="home__list">
          <PokemonCard
            v-for="pokemon in displayedPokemon"
            :key="pokemon.id"
            :pokemon="pokemon"
          />
        </TransitionGroup>
      </template>
    </div>

    <!-- Sidebar: Sub screen + Controls -->
    <aside class="home__sidebar">
      <div class="screen screen--sub">
        <template v-if="selectedPokemon">
          <p class="screen-text screen-text--selected">
            <span class="home__selected-label">Selected:</span><br>
            <span class="home__selected-id">#{{ selectedId }}</span>
            <span class="home__selected-name">{{ selectedName }}</span>
          </p>
          <p class="screen-text home__hint">
            Press ENTER to view
          </p>
        </template>
        <template v-else>
          <p class="screen-text">
            Welcome to the Pokédex. Click a Pokémon to select it, then press ENTER.
          </p>
        </template>
      </div>
      
      <SearchBar />
      <ControlPanel />
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: grid;
  gap: $space-4;
  animation: home-appear 0.4s ease-out;
  
  @include respond-to($breakpoint-md) {
    grid-template-columns: 1fr 280px;
  }
  
  &__loading,
  &__error,
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    min-height: 200px;
  }
  
  &__stats {
    padding: $space-2 0;
    border-bottom: 2px dotted darken($color-screen-bg, 20%);
    margin-bottom: $space-3;
    animation: stats-slide 0.3s ease-out 0.1s both;
  }
  
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: $space-2;
    list-style: none;
  }
  
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    animation: sidebar-appear 0.4s ease-out 0.15s both;
  }
  
  &__selected-label {
    font-size: $font-size-sm;
    color: $color-screen-text-light;
    text-transform: uppercase;
  }
  
  &__selected-id {
    color: $color-accent-blue-dark;
    margin-right: $space-2;
  }
  
  &__selected-name {
    text-transform: capitalize;
    font-size: $font-size-lg;
  }
  
  &__hint {
    margin-top: $space-3;
    font-size: $font-size-sm;
    color: $color-screen-text-light;
    animation: blink 1.5s step-end infinite;
  }
}

// List transitions
.list-enter-active {
  transition: all 0.3s ease-out;
}

.list-leave-active {
  transition: all 0.2s ease-in;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.list-move {
  transition: transform 0.3s ease;
}

// Page animations
@keyframes home-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes stats-slide {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sidebar-appear {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
