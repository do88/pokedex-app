<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

const store = usePokemonStore()
const searchInput = ref(store.searchQuery)

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
  <div class="search">
    <label class="search__label">Search</label>
    <div class="search__input-wrapper">
      <input
        v-model="searchInput"
        type="text"
        class="search__input"
        placeholder="Name or #..."
      />
      <button 
        v-if="searchInput" 
        class="search__clear"
        @click="clearSearch"
        type="button"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  background: $color-device-dark;
  padding: $space-4;
  border-radius: $radius-md;
  
  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: rgba(white, 0.9);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: $space-3;
  }
  
  &__input-wrapper {
    position: relative;
  }
  
  &__input {
    width: 100%;
    padding: $space-3 $space-4;
    padding-right: $space-10;
    font-family: $font-display;
    font-size: $font-size-base;
    color: $color-screen-text;
    background: $color-screen-bg;
    border: 3px solid $color-screen-border;
    border-radius: $radius-sm;
    box-shadow: $shadow-screen-inset;
    
    &::placeholder {
      color: $color-screen-text-light;
    }
    
    &:focus {
      outline: none;
      border-color: $color-accent-blue;
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
    font-size: $font-size-xl;
    font-weight: bold;
    color: $color-screen-text-light;
    background: darken($color-screen-bg, 10%);
    border: none;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all $transition-fast;
    
    &:hover {
      background: darken($color-screen-bg, 20%);
      color: $color-screen-text;
    }
  }
}
</style>
