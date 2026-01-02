# Pokédex

A skeuomorphic Pokédex application that looks and feels like the real device from the Pokémon series! Showcasing the original 151 Pokémon from the Kanto region.

![Pokédex](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)

## ✨ Design

This Pokédex features a **modern skeuomorphic design** that recreates the iconic red device:

- 🔴 **Red Device Casing** - 3D depth with highlights and shadows
- 🔵 **Indicator Light** - Pulsing blue gem that glows when loading
- 🟢🔴🟡 **Status Lights** - Load, Error, and Power indicators
- 📺 **LCD Screen** - Beige/green tint with scanline effects
- 🔤 **VCR Font** - Retro monospace typography
- 🕹️ **Physical Buttons** - 3D push buttons with press effects
- 🔊 **Speaker Grille** - Classic device detail

## 🛠️ Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Pinia** - Modern state management
- **Vue Router 4** - Client-side routing
- **Vite** - Lightning-fast builds
- **SCSS** - Skeuomorphic styling with mixins
- **PokéAPI** - Pokémon data source

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/
│   └── fonts/          # VCR OSD Mono font
├── components/
│   ├── ControlPanel.vue    # Enter/Return buttons
│   ├── PokemonCard.vue     # List item in LCD style
│   ├── SearchBar.vue       # Search input panel
│   ├── StatBar.vue         # Stat display
│   └── TypeBadge.vue       # Type indicator
├── router/
├── stores/
│   └── pokemon.ts          # Pinia store
├── styles/
│   ├── _variables.scss     # Colors, fonts, mixins
│   └── main.scss           # Global styles
├── types/
├── views/
│   ├── HomeView.vue        # Pokémon list
│   └── PokemonDetailView.vue
├── App.vue                 # Pokédex device shell
└── main.ts
```

## 🎨 Design Details

### Colors

| Element | Color |
|---------|-------|
| Device Shell | `#dc2626` (Red) |
| Screen BG | `#d4d4aa` (Beige-green) |
| Indicator Light | `#0ea5e9` (Blue) |
| Enter Button | `#22c55e` (Green) |
| Return Button | `#6b7280` (Grey) |

### Fonts

- **Display**: VCR OSD Mono (custom retro font)
- **UI**: Nunito (clean, modern sans-serif)

## 📦 API

Data sourced from [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API.

## 📄 License

MIT

---

Built with ❤️ for Pokémon fans everywhere
