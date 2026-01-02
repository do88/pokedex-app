<script setup lang="ts">
import type { TypeName } from '@/types/pokemon'

defineProps<{
  type: TypeName
}>()
</script>

<template>
  <span class="type-badge" :class="`type-badge--${type}`">
    {{ type }}
  </span>
</template>

<style lang="scss" scoped>
.type-badge {
  display: inline-block;
  padding: $space-2 $space-3;
  font-family: $font-display;
  font-size: $font-size-sm;
  text-transform: uppercase;
  color: white;
  border-radius: $radius-md;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  &--normal { background: type-color('normal'); }
  &--fire { background: type-color('fire'); }
  &--water { background: type-color('water'); }
  &--electric { background: type-color('electric'); color: #333; }
  &--grass { background: type-color('grass'); }
  &--ice { background: type-color('ice'); color: #333; }
  &--fighting { background: type-color('fighting'); }
  &--poison { background: type-color('poison'); }
  &--ground { background: type-color('ground'); color: #333; }
  &--flying { background: type-color('flying'); }
  &--psychic { background: type-color('psychic'); }
  &--bug { background: type-color('bug'); }
  &--rock { background: type-color('rock'); }
  &--ghost { background: type-color('ghost'); }
  &--dragon { background: type-color('dragon'); }
  &--dark { background: type-color('dark'); }
  &--steel { background: type-color('steel'); color: #333; }
  &--fairy { background: type-color('fairy'); }
}
</style>
