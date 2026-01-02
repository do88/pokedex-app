<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import type { Pokemon, TypeName } from '@/types/pokemon'
import TypeBadge from '@/components/TypeBadge.vue'
import StatBar from '@/components/StatBar.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const store = usePokemonStore()

const pokemon = ref<Pokemon | null>(null)
const adjacentPokemon = ref<{ prev: Pokemon | null; next: Pokemon | null }>({ prev: null, next: null })

const numericId = computed(() => parseInt(props.id))
const isValidId = computed(() => numericId.value >= 1 && numericId.value <= 151)

const formattedName = computed(() => {
  if (!pokemon.value) return ''
  return pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)
})

const formattedId = computed(() => String(numericId.value).padStart(3, '0'))

const spriteUrl = computed(() => 
  pokemon.value?.sprites.front_default || ''
)

const spriteBackUrl = computed(() => 
  pokemon.value?.sprites.back_default || ''
)

const stats = computed(() => {
  if (!pokemon.value) return []
  return pokemon.value.stats.map(stat => ({
    name: formatStatName(stat.stat.name),
    value: stat.base_stat
  }))
})

function formatStatName(name: string): string {
  const names: Record<string, string> = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD'
  }
  return names[name] || name
}

async function loadPokemon() {
  if (!isValidId.value) {
    router.push({ name: 'home' })
    return
  }

  const result = await store.fetchPokemon(numericId.value)
  pokemon.value = result
  adjacentPokemon.value = await store.fetchAdjacentPokemon(numericId.value)
}

function goToPokemon(id: number) {
  router.push({ name: 'pokemon', params: { id } })
}

function goHome() {
  store.clearCurrent()
  store.clearSelection()
  router.push({ name: 'home' })
}

// Initial load with await for Suspense
await loadPokemon()

// Watch for route changes
watch(() => props.id, loadPokemon)
</script>

<template>
  <div class="detail">
    <!-- Main Screen -->
    <div class="screen screen--main">
      <template v-if="store.error">
        <div class="detail__error">
          <span class="screen-text">ERROR: {{ store.error }}</span>
        </div>
      </template>

      <template v-else-if="pokemon">
        <div class="detail__content">
          <!-- Header -->
          <div class="detail__header">
            <h1 class="screen-title">
              {{ formattedId }}:{{ formattedName }}
            </h1>
          </div>

          <!-- Sprites -->
          <div class="detail__sprites">
            <div class="detail__sprite">
              <img :src="spriteUrl" :alt="pokemon.name" />
            </div>
            <div class="detail__sprite">
              <img :src="spriteBackUrl" :alt="pokemon.name + ' back'" />
            </div>
          </div>

          <!-- Info Grid -->
          <div class="detail__info">
            <div class="detail__info-row">
              <span class="detail__label">Height:</span>
              <span class="detail__value">{{ (pokemon.height / 10).toFixed(1) }} m</span>
            </div>
            <div class="detail__info-row">
              <span class="detail__label">Weight:</span>
              <span class="detail__value">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
            </div>
            <div class="detail__info-row">
              <span class="detail__label">Type:</span>
              <span class="detail__value detail__types">
                <TypeBadge 
                  v-for="typeInfo in pokemon.types" 
                  :key="typeInfo.slot"
                  :type="typeInfo.type.name as TypeName"
                />
              </span>
            </div>
          </div>

          <!-- Stats -->
          <div class="detail__stats">
            <StatBar 
              v-for="stat in stats" 
              :key="stat.name"
              :name="stat.name"
              :value="stat.value"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Sidebar -->
    <aside class="detail__sidebar">
      <!-- Navigation Screen -->
      <div class="screen screen--sub">
        <div class="detail__nav-info">
          <p class="screen-text" v-if="pokemon">
            Pokémon #{{ formattedId }}<br>
            {{ formattedName }}
          </p>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="detail__nav-controls">
        <button 
          class="detail__nav-btn"
          :disabled="!adjacentPokemon.prev"
          @click="adjacentPokemon.prev && goToPokemon(adjacentPokemon.prev.id)"
        >
          <template v-if="adjacentPokemon.prev">
            <img :src="adjacentPokemon.prev.sprites.front_default" class="detail__nav-sprite" />
            <span class="detail__nav-label">
              « {{ adjacentPokemon.prev.name }}
            </span>
          </template>
          <template v-else>
            <span class="detail__nav-label">---</span>
          </template>
        </button>

        <button 
          class="detail__nav-btn"
          :disabled="!adjacentPokemon.next"
          @click="adjacentPokemon.next && goToPokemon(adjacentPokemon.next.id)"
        >
          <template v-if="adjacentPokemon.next">
            <img :src="adjacentPokemon.next.sprites.front_default" class="detail__nav-sprite" />
            <span class="detail__nav-label">
              {{ adjacentPokemon.next.name }} »
            </span>
          </template>
          <template v-else>
            <span class="detail__nav-label">---</span>
          </template>
        </button>
      </div>

      <!-- Control Buttons -->
      <div class="detail__controls">
        <button class="btn btn--green" disabled>Enter</button>
        <button class="btn btn--grey" @click="goHome">Return</button>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: grid;
  gap: $space-4;
  
  @include respond-to($breakpoint-md) {
    grid-template-columns: 1fr 280px;
  }
  
  &__loading,
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
  
  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    animation: content-appear 0.4s ease-out;
  }
  
  &__header {
    border-bottom: 2px dotted darken($color-screen-bg, 20%);
    padding-bottom: $space-2;
  }
  
  &__sprites {
    display: flex;
    justify-content: center;
    gap: $space-4;
  }
  
  &__sprite {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: darken($color-screen-bg, 5%);
    border: 2px dotted darken($color-screen-bg, 15%);
    border-radius: $radius-md;
    animation: sprite-scan 0.6s ease-out;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      image-rendering: pixelated;
      filter: grayscale(100%);
      mix-blend-mode: multiply;
      animation: sprite-fade 0.3s ease-out 0.3s both;
    }
  }
  
  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    font-family: $font-display;
    font-size: $font-size-lg;
    animation: info-slide 0.5s ease-out 0.2s both;
  }
  
  &__info-row {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 0;
    border-bottom: 2px dotted darken($color-screen-bg, 10%);
  }
  
  &__label {
    text-transform: uppercase;
    font-size: $font-size-base;
    color: $color-screen-text-light;
    min-width: 100px;
  }
  
  &__value {
    font-weight: $font-weight-regular;
    font-size: $font-size-lg;
  }
  
  &__types {
    display: flex;
    gap: $space-2;
  }
  
  &__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-2 $space-4;
    animation: stats-appear 0.5s ease-out 0.4s both;
    
    @include respond-to($breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    animation: sidebar-slide 0.4s ease-out 0.1s both;
  }
  
  &__nav-info {
    text-align: center;
  }
  
  &__nav-controls {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }
  
  &__nav-btn {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3;
    font-family: $font-display;
    font-size: $font-size-base;
    text-transform: capitalize;
    color: $color-screen-text;
    background: $color-screen-bg;
    border: 3px solid $color-screen-border;
    border-radius: $radius-md;
    box-shadow: $shadow-screen-inset;
    cursor: pointer;
    transition: all $transition-fast;
    
    &:hover:not(:disabled) {
      background: darken($color-screen-bg, 5%);
      border-color: $color-button-green;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__nav-sprite {
    width: 48px;
    height: 48px;
    image-rendering: pixelated;
    filter: grayscale(100%);
    mix-blend-mode: multiply;
  }
  
  &__nav-label {
    flex: 1;
    text-align: left;
    font-size: $font-size-base;
  }
  
  &__controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-3;
    padding: $space-3;
    background: $color-device-dark;
    border-radius: $radius-md;
  }
}

// Detail view animations
@keyframes content-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sprite-scan {
  0% {
    background: linear-gradient(
      180deg,
      darken($color-screen-bg, 5%) 0%,
      darken($color-screen-bg, 15%) 50%,
      darken($color-screen-bg, 5%) 100%
    );
  }
  50% {
    background: linear-gradient(
      180deg,
      $color-button-green 0%,
      darken($color-screen-bg, 5%) 50%,
      $color-button-green 100%
    );
  }
  100% {
    background: darken($color-screen-bg, 5%);
  }
}

@keyframes sprite-fade {
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes info-slide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stats-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sidebar-slide {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
