<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import type { PokemonListItem } from '@/types/pokemon'

const props = defineProps<{
  pokemon: PokemonListItem
}>()

const router = useRouter()
const store = usePokemonStore()

const pokemonId = computed(() => props.pokemon.id)
const formattedId = computed(() => String(pokemonId.value).padStart(3, '0'))
const formattedName = computed(() => 
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
)

const isSelected = computed(() => store.selectedPokemonId === pokemonId.value)

function handleClick() {
  store.selectPokemon(pokemonId.value)
}

function handleDoubleClick() {
  router.push({ name: 'pokemon', params: { id: pokemonId.value } })
}
</script>

<template>
  <li 
    class="card" 
    :class="{ 'card--selected': isSelected }"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <span class="card__id">No{{ formattedId }}</span>
    <span class="card__divider">:</span>
    <span class="card__name">{{ formattedName }}</span>
  </li>
</template>

<style lang="scss" scoped>
.card {
  font-family: $font-display;
  font-size: $font-size-base;
  border-bottom: 2px dotted darken($color-screen-bg, 15%);
  transition: all $transition-fast;
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: $space-2;
  padding: $space-3 $space-3;
  color: $color-screen-text;
  
  &:hover {
    background: darken($color-screen-bg, 5%);
    border-bottom-color: $color-button-green;
    
    .card__name {
      color: darken($color-button-green, 10%);
    }
  }
  
  &--selected {
    background: darken($color-screen-bg, 10%);
    border-bottom-color: $color-accent-blue;
    
    .card__name {
      color: $color-accent-blue-dark;
    }
    
    &::before {
      content: '►';
      margin-right: $space-1;
      color: $color-accent-blue-dark;
    }
  }
  
  &__id {
    font-size: $font-size-sm;
    color: $color-screen-text-light;
    text-transform: uppercase;
  }
  
  &__divider {
    color: $color-screen-text-light;
  }
  
  &__name {
    text-transform: capitalize;
    transition: color $transition-fast;
    font-size: $font-size-base;
  }
}
</style>
