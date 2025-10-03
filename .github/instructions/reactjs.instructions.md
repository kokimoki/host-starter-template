---
description: 'ReactJS development standards and best practices'
applyTo: '**/*.jsx,**/*.tsx,**/*.js,**/*.ts,**/*.css,**/*.scss'
---

# ReactJS Development Instructions

Instructions for building high-quality ReactJS applications with modern patterns, hooks, and best practices following the official React documentation at <https://react.dev>.

## Development Standards

### Architecture

- Use functional components with hooks as the primary pattern
- Implement component composition over inheritance
- Organize components by feature or domain for scalability
- Separate presentational and container components clearly
- Use custom hooks for reusable stateful logic
- Implement proper component hierarchies with clear data flow
- Organize code by feature: components in `src/components/`, hooks in `src/hooks/`, state in `src/state/`, services in `src/services/`, and views in `src/views/`

### TypeScript Integration

- Use TypeScript interfaces for props, state, and component definitions
- Define proper types for event handlers and refs
- Implement generic components where appropriate
- Leverage React's built-in types (`React.FC`, `React.ComponentProps`, etc.)
- Create union types for component variants and states
- Define TypeScript interfaces and types in `src/types/`

### Component Design

- ALWAYS check if existing [@kokimoki/shared](./kokimoki-shared.instructions.md) components can be used FIRST before creating new components
- Follow the single responsibility principle for components
- Use descriptive and consistent naming conventions
- Implement proper prop validation with TypeScript or PropTypes
- Design components to be testable and reusable
- Keep components small and focused on a single concern
- Use composition patterns (render props, children as functions)

### State Management

- Use `useState` for local component state
- Leverage `useContext` for sharing state across component trees
- Consider state management by [Kokimoki SDK](./kokimoki-sdk.instructions.md) stores for game state
- Implement proper state normalization and data structures

### Hooks and Effects

- Use `useEffect` with proper dependency arrays to avoid infinite loops
- Implement cleanup functions in effects to prevent memory leaks
- Use `useMemo` and `useCallback` for performance optimization when needed
- Create custom hooks for reusable stateful logic
- Follow the rules of hooks (only call at the top level)
- Use `useRef` for accessing DOM elements and storing mutable values

### Styling

- Use Tailwind CSS classes and [DaisyUI components](./daisyui.instructions.md) for styling
- Use utility function [cn](../../src/utils/cn.ts) for conditional class names
- Implement responsive design with mobile-first approach
- Implement consistent spacing, typography, and color systems
- Ensure accessibility with proper ARIA attributes and semantic HTML

### Performance Optimization

- Use `React.memo` for component memoization when appropriate
- Implement code splitting with `React.lazy` and `Suspense`
- Optimize bundle size with tree shaking and dynamic imports
- Use `useMemo` and `useCallback` judiciously to prevent unnecessary re-renders
- Implement virtual scrolling for large lists
- Profile components with React DevTools to identify performance bottlenecks

### Error Handling

- Log errors appropriately for debugging
- Handle async errors in effects and event handlers

## Additional Guidelines

- Follow React's naming conventions (PascalCase for components, camelCase for functions)
- Implement proper code splitting and lazy loading strategies

## Common Patterns

- Higher-Order Components (HOCs) for cross-cutting concerns
- Render props pattern for component composition
- Compound components for related functionality
- Provider pattern for context-based state sharing
- Container/Presentational component separation
- Custom hooks for reusable logic extraction
