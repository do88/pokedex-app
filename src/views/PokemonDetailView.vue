<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import type { Pokemon, TypeName } from '@/types/pokemon'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import StatBar from '@/components/StatBar.vue'
import TypeBadge from '@/components/TypeBadge.vue'
import NavigationCard from '@/components/NavigationCard.vue'

const props = defineProps<{
  id: string
}>()

const route = useRoute()
const router = useRouter()
const store = usePokemonStore()

const pokemon = ref<Pokemon | null>(null)
const adjacentPokemon = ref<{ prev: Pokemon | null; next: Pokemon | null }>({ prev: null, next: null })
const isImageLoaded = ref(false)

const numericId = computed(() => parseInt(props.id))
const isValidId = computed(() => numericId.value >= 1 && numericId.value <= 151)

const primaryType = computed((): TypeName => {
  return (pokemon.value?.types[0]?.type.name as TypeName) || 'normal'
})

const formattedName = computed(() => {
  if (!pokemon.value) return ''
  return pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)
})

const formattedId = computed(() => `#${String(numericId.value).padStart(3, '0')}`)

const artworkUrl = computed(() => 
  pokemon.value?.sprites.other['official-artwork'].front_default ||
  pokemon.value?.sprites.front_default ||
  ''
)

const stats = computed(() => {
  if (!pokemon.value) return []
  return pokemon.value.stats.map(stat => ({
    name: formatStatName(stat.stat.name),
    value: stat.base_stat,
    maxValue: 255
  }))
})

const totalStats = computed(() => 
  stats.value.reduce((sum, stat) => sum + stat.value, 0)
)

function formatStatName(name: string): string {
  const names: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  }
  return names[name] || name
}

async function loadPokemon() {
  if (!isValidId.value) {
    router.push({ name: 'home' })
    return
  }

  isImageLoaded.value = false
  const result = await store.fetchPokemon(numericId.value)
  pokemon.value = result

  // Load adjacent pokemon for navigation
  adjacentPokemon.value = await store.fetchAdjacentPokemon(numericId.value)
}

onMounted(loadPokemon)

watch(() => props.id, loadPokemon)
</script>

<template>
  <div class="detail" :class="`detail--type-${primaryType}`">
    <Transition name="fade" mode="out-in">
      <div v-if="store.isLoading && !pokemon" class="detail__loading">
        <LoadingSpinner size="lg" />
        <p>Loading Pokémon data...</p>
      </div>

      <div v-else-if="store.error" class="detail__error">
        <div class="detail__error-icon">⚠️</div>
        <p>{{ store.error }}</p>
        <RouterLink to="/" class="detail__back-btn">
          Back to List
        </RouterLink>
      </div>

      <div v-else-if="pokemon" class="detail__content">
        <!-- Hero Section -->
        <section class="detail__hero">
          <div class="detail__hero-bg">
            <div class="detail__hero-glow" />
            <div class="detail__hero-pattern" />
          </div>

          <div class="detail__hero-content">
            <div class="detail__header">
              <span class="detail__id">{{ formattedId }}</span>
              <h1 class="detail__name">{{ formattedName }}</h1>
              <div class="detail__types">
                <TypeBadge 
                  v-for="typeInfo in pokemon.types" 
                  :key="typeInfo.slot"
                  :type="typeInfo.type.name as TypeName"
                />
              </div>
            </div>

            <div class="detail__image-container">
              <div class="detail__image-glow" />
              <Transition name="scale">
                <img
                  v-show="isImageLoaded"
                  :src="artworkUrl"
                  :alt="pokemon.name"
                  class="detail__image"
                  @load="isImageLoaded = true"
                />
              </Transition>
              <div v-if="!isImageLoaded" class="detail__image-placeholder">
                <LoadingSpinner size="md" />
              </div>
            </div>
          </div>
        </section>

        <!-- Info Grid -->
        <section class="detail__info-grid">
          <!-- Physical Stats -->
          <div class="detail__card">
            <h2 class="detail__card-title">Physical</h2>
            <div class="detail__physical">
              <div class="detail__physical-item">
                <span class="detail__physical-label">Height</span>
                <span class="detail__physical-value">{{ (pokemon.height / 10).toFixed(1) }} m</span>
              </div>
              <div class="detail__physical-item">
                <span class="detail__physical-label">Weight</span>
                <span class="detail__physical-value">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
              </div>
            </div>
          </div>

          <!-- Abilities -->
          <div class="detail__card">
            <h2 class="detail__card-title">Abilities</h2>
            <div class="detail__abilities">
              <div 
                v-for="ability in pokemon.abilities" 
                :key="ability.slot"
                class="detail__ability"
                :class="{ 'detail__ability--hidden': ability.is_hidden }"
              >
                <span class="detail__ability-name">
                  {{ ability.ability.name.replace('-', ' ') }}
                </span>
                <span v-if="ability.is_hidden" class="detail__ability-tag">Hidden</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Base Stats -->
        <section class="detail__stats">
          <div class="detail__card detail__card--full">
            <div class="detail__stats-header">
              <h2 class="detail__card-title">Base Stats</h2>
              <div class="detail__stats-total">
                <span class="detail__stats-total-label">Total</span>
                <span class="detail__stats-total-value">{{ totalStats }}</span>
              </div>
            </div>
            <div class="detail__stats-list">
              <StatBar 
                v-for="(stat, index) in stats" 
                :key="stat.name"
                :name="stat.name"
                :value="stat.value"
                :max-value="stat.maxValue"
                :index="index"
              />
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <section class="detail__navigation">
          <NavigationCard
            v-if="adjacentPokemon.prev"
            :pokemon="adjacentPokemon.prev"
            direction="prev"
          />
          <div v-else class="detail__nav-placeholder" />

          <NavigationCard
            v-if="adjacentPokemon.next"
            :pokemon="adjacentPokemon.next"
            direction="next"
          />
          <div v-else class="detail__nav-placeholder" />
        </section>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  min-height: calc(100vh - 200px);
  
  &__loading,
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    min-height: 400px;
    text-align: center;
    color: $color-text-secondary;
  }

  &__error-icon {
    font-size: 3rem;
  }

  &__back-btn {
    padding: $space-3 $space-6;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    @include glass;
    border-radius: $radius-lg;
    transition: all $transition-fast;

    &:hover {
      @include glass-hover;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-6;

    @include respond-to($breakpoint-md) {
      gap: $space-8;
    }
  }

  // Hero Section
  &__hero {
    position: relative;
    border-radius: $radius-2xl;
    overflow: hidden;
    @include glass;
  }

  &__hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  &__hero-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(var(--type-color-rgb, 0, 212, 255), 0.15) 0%,
      transparent 50%
    );
    animation: rotate 20s linear infinite;
  }

  &__hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  &__hero-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $space-6;
    padding: $space-6;

    @include respond-to($breakpoint-md) {
      flex-direction: row;
      align-items: center;
      padding: $space-8;
    }
  }

  &__header {
    flex: 1;
    text-align: center;

    @include respond-to($breakpoint-md) {
      text-align: left;
    }
  }

  &__id {
    display: inline-block;
    padding: $space-1 $space-3;
    font-family: $font-mono;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-accent-cyan;
    background: rgba($color-accent-cyan, 0.1);
    border-radius: $radius-md;
    margin-bottom: $space-2;
  }

  &__name {
    font-size: $font-size-4xl;
    font-weight: $font-weight-black;
    text-transform: capitalize;
    margin-bottom: $space-4;
    @include text-gradient($color-text-primary, $color-text-secondary);

    @include respond-to($breakpoint-md) {
      font-size: $font-size-5xl;
    }
  }

  &__types {
    display: flex;
    gap: $space-2;
    justify-content: center;

    @include respond-to($breakpoint-md) {
      justify-content: flex-start;
    }
  }

  &__image-container {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;

    @include respond-to($breakpoint-md) {
      width: 280px;
      height: 280px;
      margin: 0;
    }
  }

  &__image-glow {
    position: absolute;
    inset: 10%;
    background: radial-gradient(
      circle,
      rgba($color-accent-cyan, 0.3) 0%,
      transparent 70%
    );
    filter: blur(30px);
    animation: pulse-glow 3s ease-in-out infinite;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
    animation: float 4s ease-in-out infinite;
  }

  &__image-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // Info Grid
  &__info-grid {
    display: grid;
    gap: $space-4;

    @include respond-to($breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    @include glass;
    border-radius: $radius-xl;
    padding: $space-5;

    &--full {
      @include respond-to($breakpoint-sm) {
        grid-column: 1 / -1;
      }
    }
  }

  &__card-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $space-4;
  }

  &__physical {
    display: flex;
    gap: $space-6;
  }

  &__physical-item {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__physical-label {
    font-size: $font-size-sm;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__physical-value {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    font-family: $font-mono;
    color: $color-text-primary;
  }

  &__abilities {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__ability {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-3;
    background: rgba(255, 255, 255, 0.05);
    border-radius: $radius-md;

    &--hidden {
      border: 1px dashed rgba($color-accent-magenta, 0.3);
    }
  }

  &__ability-name {
    font-size: $font-size-sm;
    text-transform: capitalize;
  }

  &__ability-tag {
    font-size: $font-size-xs;
    padding: $space-1 $space-2;
    color: $color-accent-magenta;
    background: rgba($color-accent-magenta, 0.1);
    border-radius: $radius-sm;
  }

  // Stats
  &__stats-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-4;
  }

  &__stats-total {
    display: flex;
    align-items: baseline;
    gap: $space-2;
  }

  &__stats-total-label {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__stats-total-value {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    font-family: $font-mono;
    @include text-gradient($color-accent-cyan, $color-accent-green);
  }

  &__stats-list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  // Navigation
  &__navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-4;
  }

  &__nav-placeholder {
    min-height: 80px;
  }
}
</style>

