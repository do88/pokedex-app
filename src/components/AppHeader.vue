<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <header class="header">
    <div class="header__container">
      <RouterLink to="/" class="header__logo">
        <div class="header__logo-icon">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="6" />
            <path d="M5 50h35M60 50h35" stroke="currentColor" stroke-width="6" />
            <circle cx="50" cy="50" r="15" fill="currentColor" />
            <circle cx="50" cy="50" r="8" fill="#0a0a0f" />
          </svg>
        </div>
        <div class="header__logo-text">
          <span class="header__title">Pokédex</span>
          <span class="header__subtitle">Gen I Collection</span>
        </div>
      </RouterLink>

      <nav class="header__nav">
        <RouterLink 
          v-if="!isHome" 
          to="/" 
          class="header__back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to List</span>
        </RouterLink>
        
        <a 
          href="https://pokeapi.co" 
          target="_blank" 
          rel="noopener"
          class="header__link"
        >
          <span>PokéAPI</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: $z-sticky;
  @include glass;
  border: none;
  border-bottom: 1px solid $color-surface-glass-border;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: $space-4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;

    @include respond-to($breakpoint-md) {
      padding: $space-4 $space-6;
    }

    @include respond-to($breakpoint-lg) {
      padding: $space-4 $space-8;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: $color-text-primary;
    transition: transform $transition-fast;

    &:hover {
      transform: scale(1.02);
    }
  }

  &__logo-icon {
    width: 40px;
    height: 40px;
    color: $color-accent-cyan;
    filter: drop-shadow(0 0 10px rgba($color-accent-cyan, 0.4));
    transition: all $transition-base;

    .header__logo:hover & {
      color: $color-accent-magenta;
      filter: drop-shadow(0 0 10px rgba($color-accent-magenta, 0.4));
    }

    @include respond-to($breakpoint-md) {
      width: 48px;
      height: 48px;
    }
  }

  &__logo-text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    @include text-gradient($color-accent-cyan, $color-accent-magenta);
    letter-spacing: -0.02em;

    @include respond-to($breakpoint-md) {
      font-size: $font-size-2xl;
    }
  }

  &__subtitle {
    font-size: $font-size-xs;
    color: $color-text-muted;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $space-2;

    @include respond-to($breakpoint-md) {
      gap: $space-4;
    }
  }

  &__back {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    @include glass;
    border-radius: $radius-full;
    transition: all $transition-fast;

    svg {
      width: 18px;
      height: 18px;
    }

    span {
      display: none;

      @include respond-to($breakpoint-sm) {
        display: inline;
      }
    }

    &:hover {
      color: $color-accent-cyan;
      @include glass-hover;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $space-1;
    padding: $space-2 $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-muted;
    transition: all $transition-fast;

    svg {
      width: 14px;
      height: 14px;
      opacity: 0;
      transform: translateX(-4px);
      transition: all $transition-fast;
    }

    &:hover {
      color: $color-accent-cyan;

      svg {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>

