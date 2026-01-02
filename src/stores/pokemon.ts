import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Pokemon, PokemonListItem, PokemonListResponse } from '@/types/pokemon'

const API_BASE = 'https://pokeapi.co/api/v2'
const POKEMON_LIMIT = 151 // Gen 1

export const usePokemonStore = defineStore('pokemon', () => {
  // State
  const pokemonList = ref<PokemonListItem[]>([])
  const currentPokemon = ref<Pokemon | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const selectedType = ref<string | null>(null)
  const viewMode = ref<'grid' | 'list'>('grid')
  const selectedPokemonId = ref<number | null>(null)

  // Getters
  const filteredPokemon = computed(() => {
    let filtered = pokemonList.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.id.toString().includes(query)
      )
    }

    return filtered
  })

  const totalCount = computed(() => pokemonList.value.length)

  // Actions
  async function fetchPokemonList() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}/pokemon?limit=${POKEMON_LIMIT}`)
      const data: PokemonListResponse = await response.json()
      
      pokemonList.value = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1
      }))
    } catch (e) {
      error.value = 'Failed to load Pokémon list'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPokemon(idOrName: string | number): Promise<Pokemon | null> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}/pokemon/${idOrName}`)
      if (!response.ok) throw new Error('Pokemon not found')
      
      const data: Pokemon = await response.json()
      currentPokemon.value = data
      return data
    } catch (e) {
      error.value = `Failed to load Pokémon #${idOrName}`
      console.error(e)
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAdjacentPokemon(id: number): Promise<{ prev: Pokemon | null; next: Pokemon | null }> {
    const [prev, next] = await Promise.all([
      id > 1 ? fetchPokemonData(id - 1) : Promise.resolve(null),
      id < POKEMON_LIMIT ? fetchPokemonData(id + 1) : Promise.resolve(null)
    ])
    return { prev, next }
  }

  async function fetchPokemonData(id: number): Promise<Pokemon | null> {
    try {
      const response = await fetch(`${API_BASE}/pokemon/${id}`)
      if (!response.ok) return null
      return await response.json()
    } catch {
      return null
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedType(type: string | null) {
    selectedType.value = type
  }

  function setViewMode(mode: 'grid' | 'list') {
    viewMode.value = mode
  }

  function clearCurrent() {
    currentPokemon.value = null
  }

  function selectPokemon(id: number | null) {
    selectedPokemonId.value = selectedPokemonId.value === id ? null : id
  }

  function clearSelection() {
    selectedPokemonId.value = null
  }

  return {
    // State
    pokemonList,
    currentPokemon,
    isLoading,
    error,
    searchQuery,
    selectedType,
    viewMode,
    selectedPokemonId,
    // Getters
    filteredPokemon,
    totalCount,
    // Actions
    fetchPokemonList,
    fetchPokemon,
    fetchAdjacentPokemon,
    setSearchQuery,
    setSelectedType,
    setViewMode,
    clearCurrent,
    selectPokemon,
    clearSelection
  }
})

