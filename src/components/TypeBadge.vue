<script setup lang="ts">
import type { TypeName } from '@/types/pokemon'

defineProps<{
  type: TypeName
  size?: 'sm' | 'md'
}>()

const typeColors: Record<TypeName, string> = {
  normal: '#a8a878',
  fire: '#ff6b35',
  water: '#3b9dff',
  electric: '#ffd93d',
  grass: '#00c853',
  ice: '#6fdfff',
  fighting: '#d63031',
  poison: '#b44ac0',
  ground: '#e2bf65',
  flying: '#8eb8ff',
  psychic: '#ff6b9d',
  bug: '#a8b820',
  rock: '#b69e31',
  ghost: '#7b62a3',
  dragon: '#7038f8',
  dark: '#4a4a6a',
  steel: '#b8b8d0',
  fairy: '#ff9edf'
}
</script>

<template>
  <span 
    class="type-badge" 
    :class="[`type-badge--${type}`, size ? `type-badge--${size}` : '']"
    :style="{ '--type-color': typeColors[type] }"
  >
    {{ type }}
  </span>
</template>

<style lang="scss" scoped>
.type-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $space-2 $space-4;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  text-transform: capitalize;
  color: white;
  background: var(--type-color);
  border-radius: $radius-full;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &--sm {
    padding: $space-1 $space-3;
    font-size: $font-size-xs;
  }

  &--md {
    padding: $space-2 $space-4;
    font-size: $font-size-sm;
  }
}
</style>

