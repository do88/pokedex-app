<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { PokemonListItem } from '@/types/pokemon'

const props = defineProps<{
  pokemon: PokemonListItem
}>()

const isLoaded = ref(false)
const isHovered = ref(false)

const pokemonId = computed(() => props.pokemon.id)
const formattedId = computed(() => `#${String(pokemonId.value).padStart(3, '0')}`)
const formattedName = computed(() => 
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
)

const imageUrl = computed(() => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.value}.png`
)

const fallbackUrl = computed(() =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`
)

function onImageLoad() {
  isLoaded.value = true
}

function onImageError(e: Event) {
  const img = e.target as HTMLImageElement
  if (img.src !== fallbackUrl.value) {
    img.src = fallbackUrl.value
  }
}
</script>

<template>
  <RouterLink 
    :to="{ name: 'pokemon', params: { id: pokemonId } }"
    class="card"
    :class="{ 'card--loaded': isLoaded, 'card--hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card__bg" />
    <div class="card__glow" />
    
    <div class="card__id">{{ formattedId }}</div>
    
    <div class="card__image-wrapper">
      <div v-if="!isLoaded" class="card__placeholder">
        <div class="card__placeholder-icon" />
      </div>
      <img
        :src="imageUrl"
        :alt="pokemon.name"
        class="card__image"
        loading="lazy"
        @load="onImageLoad"
        @error="onImageError"
      />
    </div>

    <div class="card__info">
      <h3 class="card__name">{{ formattedName }}</h3>
    </div>

    <div class="card__shine" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $space-4;
  border-radius: $radius-xl;
  overflow: hidden;
  cursor: pointer;
  transition: transform $transition-spring, box-shadow $transition-base;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  // Glass background
  &__bg {
    position: absolute;
    inset: 0;
    @include glass;
    border-radius: $radius-xl;
    transition: all $transition-base;

    .card:hover & {
      @include glass-hover;
    }
  }

  // Glow effect on hover
  &__glow {
    position: absolute;
    inset: -1px;
    border-radius: $radius-xl;
    opacity: 0;
    transition: opacity $transition-base;
    background: linear-gradient(
      135deg,
      rgba($color-accent-cyan, 0.4),
      rgba($color-accent-magenta, 0.4)
    );
    filter: blur(20px);
    z-index: -1;

    .card:hover & {
      opacity: 0.6;
    }
  }

  // Pokemon ID badge
  &__id {
    position: absolute;
    top: $space-3;
    right: $space-3;
    padding: $space-1 $space-2;
    font-family: $font-mono;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-muted;
    background: rgba(0, 0, 0, 0.3);
    border-radius: $radius-md;
    z-index: 2;
    transition: color $transition-fast;

    .card:hover & {
      color: $color-accent-cyan;
    }
  }

  // Image container
  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 60%;
      height: 60%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 25%,
        rgba(255, 255, 255, 0.08) 50%,
        rgba(255, 255, 255, 0.03) 75%
      );
      background-size: 200% 100%;
      border-radius: $radius-full;
      animation: shimmer 1.5s infinite;
    }
  }

  &__image {
    width: 85%;
    height: 85%;
    object-fit: contain;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    transition: transform $transition-spring, filter $transition-base;
    opacity: 0;

    .card--loaded & {
      opacity: 1;
    }

    .card:hover & {
      transform: scale(1.1) translateY(-5px);
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
    }
  }

  // Info section
  &__info {
    width: 100%;
    text-align: center;
    z-index: 1;
    padding-top: $space-2;
  }

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    transition: color $transition-fast;
    
    @include respond-to($breakpoint-md) {
      font-size: $font-size-lg;
    }

    .card:hover & {
      @include text-gradient($color-accent-cyan, $color-accent-magenta);
    }
  }

  // Shine effect overlay
  &__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 55%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: none;
    z-index: 3;
    pointer-events: none;
    border-radius: $radius-xl;

    .card:hover & {
      transform: translateX(100%);
      transition: transform 0.6s ease;
    }
  }
}
</style>

