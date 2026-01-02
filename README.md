# Pokédex

A modern, stunning Pokédex application showcasing the original 151 Pokémon from the Kanto region.

![Pokédex App](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## ✨ Features

- 🎨 **Stunning Cyberpunk Design** - Dark theme with glassmorphism, neon accents, and smooth animations
- 🔍 **Instant Search** - Filter Pokémon by name or number with debounced search
- 📊 **Detailed Stats** - View base stats with animated progress bars
- 🎭 **Type Badges** - Color-coded type indicators for each Pokémon
- 🧭 **Easy Navigation** - Navigate between Pokémon with prev/next cards
- 📱 **Fully Responsive** - Beautiful on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Built with Vite for instant hot reload and optimized builds

## 🛠️ Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Pinia** - Modern state management
- **Vue Router 4** - Client-side routing
- **Vite** - Next-generation frontend tooling
- **SCSS** - Advanced styling with variables and mixins
- **PokéAPI** - Pokémon data source

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppHeader.vue       # Navigation header
│   ├── LoadingSpinner.vue  # Animated Pokéball loader
│   ├── NavigationCard.vue  # Prev/Next navigation
│   ├── PokemonCard.vue     # Pokemon grid card
│   ├── SearchBar.vue       # Search input
│   ├── StatBar.vue         # Animated stat bars
│   └── TypeBadge.vue       # Type indicator badges
├── router/              # Vue Router configuration
├── stores/              # Pinia stores
│   └── pokemon.ts          # Pokemon state management
├── styles/              # Global SCSS
│   ├── _variables.scss     # Design tokens
│   └── main.scss           # Global styles
├── types/               # TypeScript definitions
│   └── pokemon.ts          # Pokemon interfaces
├── views/               # Route components
│   ├── HomeView.vue        # Pokemon list view
│   └── PokemonDetailView.vue # Pokemon detail view
├── App.vue              # Root component
└── main.ts              # Application entry
```

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `$color-accent-cyan` | `#00d4ff` | Primary accent, links |
| `$color-accent-magenta` | `#ff00aa` | Secondary accent |
| `$color-accent-green` | `#00ff88` | Success states |
| `$color-accent-yellow` | `#ffd700` | Warnings, highlights |

### Typography

- **Primary Font**: Outfit (headings, body)
- **Monospace Font**: JetBrains Mono (numbers, code)

## 📦 API

Data sourced from [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API.

## 🎉 What's New (v2.0)

Complete rewrite from Vue 2 to Vue 3:

- ✅ Migrated from Vue CLI to Vite
- ✅ Converted to TypeScript
- ✅ Replaced Vuex with Pinia
- ✅ New glassmorphic UI design
- ✅ Added search functionality
- ✅ Animated stat bars
- ✅ Improved responsive design
- ✅ Enhanced navigation system
- ✅ Loading states with Pokéball spinner
- ✅ Type-based color theming

## 📄 License

MIT © 2026

---

Made with ❤️ and ⚡ by a Pokémon fan
