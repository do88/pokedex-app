<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

const store = usePokemonStore()
const searchInput = ref(store.searchQuery)
const isFocused = ref(false)

// Debounce search
let timeout: ReturnType<typeof setTimeout>
watch(searchInput, (value) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    store.setSearchQuery(value)
  }, 200)
})

function clearSearch() {
  searchInput.value = ''
  store.setSearchQuery('')
}
</script>

<template>
  <div class="search" :class="{ 'search--focused': isFocused }">
    <div class="search__icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    </div>
    
    <input
      v-model="searchInput"
      type="text"
      class="search__input"
      placeholder="Search by name or number..."
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <Transition name="fade">
      <button 
        v-if="searchInput" 
        class="search__clear"
        @click="clearSearch"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </Transition>

    <div class="search__glow" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  max-width: 500px;
  margin: 0 auto;

  &__icon {
    position: absolute;
    left: $space-4;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: $color-text-muted;
    transition: color $transition-fast;
    pointer-events: none;

    .search--focused & {
      color: $color-accent-cyan;
    }
  }

  &__input {
    width: 100%;
    padding: $space-4 $space-12 $space-4 $space-12;
    font-family: inherit;
    font-size: $font-size-base;
    color: $color-text-primary;
    background: $color-surface-glass;
    border: 1px solid $color-surface-glass-border;
    border-radius: $radius-xl;
    outline: none;
    transition: all $transition-fast;

    &::placeholder {
      color: $color-text-muted;
    }

    &:hover {
      background: $color-surface-glass-hover;
      border-color: rgba(255, 255, 255, 0.12);
    }

    &:focus {
      background: rgba($color-accent-cyan, 0.05);
      border-color: rgba($color-accent-cyan, 0.3);
    }
  }

  &__clear {
    position: absolute;
    right: $space-3;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text-muted;
    background: transparent;
    border: none;
    border-radius: $radius-full;
    cursor: pointer;
    transition: all $transition-fast;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: $color-text-primary;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__glow {
    position: absolute;
    inset: -2px;
    border-radius: $radius-xl;
    opacity: 0;
    pointer-events: none;
    transition: opacity $transition-base;
    background: linear-gradient(135deg, $color-accent-cyan, $color-accent-magenta);
    filter: blur(15px);
    z-index: -1;

    .search--focused & {
      opacity: 0.15;
    }
  }
}
</style>

