<script setup lang="ts">
import { RouterView } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { computed } from 'vue'

const store = usePokemonStore()
const isLoading = computed(() => store.isLoading)
const hasError = computed(() => store.error)
</script>

<template>
  <div class="pokedex">
    <!-- Top Section: Big indicator light and status lights -->
    <header class="pokedex__header">
      <div class="indicator-light" :class="{ pulsing: isLoading }" />
      
      <div class="status-lights">
        <div class="status-light">
          <div 
            class="status-light__bulb status-light__bulb--green"
            :class="{ active: isLoading }"
          />
          <span class="status-light__label">Load</span>
        </div>
        <div class="status-light">
          <div 
            class="status-light__bulb status-light__bulb--red"
            :class="{ active: hasError }"
          />
          <span class="status-light__label">Error</span>
        </div>
        <div class="status-light">
          <div class="status-light__bulb status-light__bulb--yellow active" />
          <span class="status-light__label">Power</span>
        </div>
      </div>
    </header>

    <!-- Main Content Area with Transitions -->
    <main class="pokedex__body">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || 'screen-fade'" mode="out-in">
          <Suspense>
            <template #default>
              <component :is="Component" :key="route.path" />
            </template>
            <template #fallback>
              <div class="loading-screen">
                <div class="loading-screen__content">
                  <div class="loading-screen__scanner" />
                  <p class="loading-screen__text">
                    <span class="loading-screen__dots">Accessing data</span>
                  </p>
                </div>
              </div>
            </template>
          </Suspense>
        </Transition>
      </RouterView>
    </main>

    <!-- Speaker grille decoration -->
    <div class="pokedex__speaker">
      <div class="pokedex__speaker-line" v-for="n in 4" :key="n" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokedex {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  
  &__header {
    display: flex;
    align-items: flex-start;
    gap: $space-6;
    margin-bottom: $space-6;
    padding-top: $space-4;
  }
  
  &__body {
    display: grid;
    gap: $space-4;
    min-height: 500px;
  }
  
  &__speaker {
    display: flex;
    gap: 6px;
    margin-top: $space-6;
    margin-left: auto;
    width: 80px;
  }
  
  &__speaker-line {
    flex: 1;
    height: 40px;
    background: linear-gradient(
      180deg,
      $color-device-dark 0%,
      $color-device-shadow 50%,
      $color-device-dark 100%
    );
    border-radius: 2px;
  }
}

// Loading Screen
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  @include screen-surface;
  border: 4px solid $color-screen-border;
  border-radius: $radius-lg;
  
  &__content {
    text-align: center;
  }
  
  &__scanner {
    width: 120px;
    height: 120px;
    margin: 0 auto $space-6;
    border: 4px solid $color-screen-text;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 4px;
      background: linear-gradient(
        90deg,
        transparent,
        $color-button-green,
        transparent
      );
      transform-origin: left center;
      animation: scan-rotate 2s linear infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      inset: 8px;
      border: 2px dashed $color-screen-text-light;
      border-radius: 50%;
      animation: pulse-border 1s ease-in-out infinite;
    }
  }
  
  &__text {
    font-family: $font-display;
    font-size: $font-size-lg;
    color: $color-screen-text;
  }
  
  &__dots::after {
    content: '';
    animation: loading-dots 1.5s steps(4) infinite;
  }
}

@keyframes scan-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-border {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes loading-dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
}

// Page Transitions
.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: all 0.3s ease;
}

.screen-fade-enter-from {
  opacity: 0;
  filter: brightness(2);
}

.screen-fade-leave-to {
  opacity: 0;
  filter: brightness(0.5);
}

// Slide transitions
.screen-slide-enter-active,
.screen-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.screen-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.screen-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// Scan transition (for entering detail view)
.screen-scan-enter-active {
  transition: all 0.5s ease;
}

.screen-scan-leave-active {
  transition: all 0.3s ease;
}

.screen-scan-enter-from {
  opacity: 0;
  clip-path: inset(50% 0 50% 0);
}

.screen-scan-enter-to {
  clip-path: inset(0 0 0 0);
}

.screen-scan-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
