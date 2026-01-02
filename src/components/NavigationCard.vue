<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Pokemon } from '@/types/pokemon'

const props = defineProps<{
  pokemon: Pokemon
  direction: 'prev' | 'next'
}>()

const formattedName = computed(() => 
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
)

const formattedId = computed(() => 
  `#${String(props.pokemon.id).padStart(3, '0')}`
)

const spriteUrl = computed(() =>
  props.pokemon.sprites.other['official-artwork'].front_default ||
  props.pokemon.sprites.front_default
)
</script>

<template>
  <RouterLink 
    :to="{ name: 'pokemon', params: { id: pokemon.id } }"
    class="nav-card"
    :class="`nav-card--${direction}`"
  >
    <div class="nav-card__content">
      <span class="nav-card__direction">
        {{ direction === 'prev' ? '← Previous' : 'Next →' }}
      </span>
      <span class="nav-card__id">{{ formattedId }}</span>
      <span class="nav-card__name">{{ formattedName }}</span>
    </div>
    <div class="nav-card__image-wrapper">
      <img 
        :src="spriteUrl" 
        :alt="pokemon.name"
        class="nav-card__image"
      />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.nav-card {
  display: flex;
  align-items: center;
  padding: $space-4;
  @include glass;
  border-radius: $radius-xl;
  transition: all $transition-fast;
  overflow: hidden;

  &:hover {
    @include glass-hover;
    transform: translateY(-2px);
  }

  &--prev {
    flex-direction: row;
    text-align: left;

    .nav-card__image-wrapper {
      order: 1;
      margin-right: $space-3;
    }

    .nav-card__content {
      order: 2;
    }
  }

  &--next {
    flex-direction: row;
    text-align: right;
    justify-content: flex-end;

    .nav-card__content {
      order: 1;
    }

    .nav-card__image-wrapper {
      order: 2;
      margin-left: $space-3;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    flex: 1;
    min-width: 0;
  }

  &__direction {
    font-size: $font-size-xs;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__id {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: $color-accent-cyan;
  }

  &__name {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include respond-to($breakpoint-sm) {
      font-size: $font-size-lg;
    }
  }

  &__image-wrapper {
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    @include respond-to($breakpoint-sm) {
      width: 60px;
      height: 60px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: transform $transition-fast;

    .nav-card:hover & {
      transform: scale(1.1);
    }
  }
}
</style>

