<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="slide-up" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: $space-4;

  @include respond-to($breakpoint-md) {
    padding: $space-6;
  }

  @include respond-to($breakpoint-lg) {
    padding: $space-8;
  }
}
</style>
