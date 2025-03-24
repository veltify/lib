# Technical Context

## Technologies Used
- **Svelte 5**: Core framework for building reactive components
  - Uses new features like `$props()`, `$derived`, and `$bindable()`
  - Leverages `{@render}` for slot rendering
  - Utilizes Svelte's reactivity system for state management
- **TypeScript**: For type safety and developer experience
  - Strict typing for component props
  - Type definitions for helper functions
- **Tailwind CSS 4**: For utility-first styling
  - CSS-based configuration (not tailwind.config.js)
  - Uses `@theme` directive for defining theme variables
  - Leverages `@apply` for composing utility classes
  - Supports dark mode with `@custom-variant`
- **CSS Modules**: For component-specific styling
  - Each component has its own CSS file
  - Styles are scoped to components
  - Common styles are shared through Base.css

## Development Setup
- **SvelteKit**: Used for development environment
- **Vite**: For fast development and optimized builds
- **pnpm**: Package manager for dependency management
- **ESLint/Prettier**: For code quality and formatting
- **TypeScript**: For type checking and IDE support

## Technical Constraints
- **Browser Compatibility**: Must support modern browsers (Chrome, Firefox, Safari, Edge)
- **Bundle Size**: Core bundle must be under 50kb gzipped
- **Accessibility**: Must meet WCAG 2.1 AA standards
- **Performance**: Theme switching must be under 10ms
- **SSR Compatibility**: Components must work in server-side rendering environments
- **Tree-Shaking**: Components must be individually importable and tree-shakable

## Dependencies
- **Minimal External Dependencies**: Focus on using native browser capabilities
- **No Runtime CSS-in-JS**: All styles are pre-compiled
- **No State Management Libraries**: Uses Svelte's built-in reactivity

## Recent Changes
- Added a "danger" color to the theme system, set to Tailwind's default red
- Updated component styles to use theme colors instead of black, white, and gray
- Implemented theme variables for consistent styling across components
