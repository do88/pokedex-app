<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'

const router = useRouter()
const route = useRoute()
const store = usePokemonStore()

const isHome = computed(() => route.name === 'home')
const hasSelection = computed(() => store.selectedPokemonId !== null)

function handleEnter() {
  if (isHome.value && hasSelection.value) {
    // Navigate to selected Pokemon
    router.push({ name: 'pokemon', params: { id: store.selectedPokemonId } })
    store.clearSelection()
  }
}

function handleReturn() {
  if (!isHome.value) {
    store.clearCurrent()
    store.clearSelection()
    router.push({ name: 'home' })
  } else if (hasSelection.value) {
    // Deselect on home page
    store.clearSelection()
  }
}
</script>

<template>
  <div class="controls">
    <button 
      class="btn btn--green controls__btn"
      :class="{ 'btn--active': hasSelection && isHome }"
      :disabled="!hasSelection || !isHome"
      @click="handleEnter"
    >
      Enter
    </button>
    <button 
      class="btn btn--grey controls__btn"
      :class="{ 'btn--active': !isHome || hasSelection }"
      :disabled="isHome && !hasSelection"
      @click="handleReturn"
    >
      Return
    </button>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-3;
  padding: $space-4;
  background: $color-device-dark;
  border-radius: $radius-md;
  
  &__btn {
    padding: $space-4 $space-4;
  }
}

.btn--active {
  animation: pulse-button 1s ease-in-out infinite;
}

@keyframes pulse-button {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
