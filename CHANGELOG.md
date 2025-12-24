# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Added

- Added new `kokimoki/sdk` usage examples in template

### Changed

- Updated `kokimoki-sdk.instructions.md` and `kokimoki-shared.instructions.md` with extra context
- Improved template layout and styles
- Updated `@kokimoki/app` to `2.0.2`
- Updated `@kokimoki/kit` to `1.6.7`
- Updated `@kokimoki/shared` to `1.10.0`

### Removed

- Removed `valtio` and `zod` packages, now provided by `@kokimoki/app` and `@kokimoki/kit` respectively

## [1.0.3] - 2025-11-25

### Added

- Added `AGENTS.md` file with project overview, build commands, instruction references, and common tasks
- Added `dynamic-stores.instructions.md` comprehensive documentation for room-based state management with `useDynamicStore` hook

### Changed

- Updated `kokimoki-shared.instructions.md` with more detailed component usage guidelines and decision framework
- Updated `kokimoki-sdk.instructions.md` to remove redundant documentation and improve clarity
- Updated `host-starter-template.instructions.md` with additional patterns and examples
- Updated `@kokimoki/app` to `2.0.0`
- Updated `@kokimoki/shared` to `1.0.8`
- Refactored `useDynamicStore` hook to use single `ConnectionState` object instead of separate state variables for better state management consistency

## [1.0.2] - 2025-10-17

### Changed

- Updated `host-starter-template.instructions` to remove references to `daisyui` package
- Simplified `host-starter-template.instructions` by removing tuplicates from `kokimoki-sdk.instructions`
- Simplified `reactjs.instructions`, and renamed to `react.instructions`
- Simplified `kokimoki-shared.instructions` by removing full `llms.txt` and added link to external docs
- Updated `host-starter-template` by removing `daisyui` classes from components and styles

### Removed

- Removed `daisyui` package
- Removed `themes` system (temporary)

## [1.0.1] - 2025-10-09

### Changed

- Updated `host-starter-template.instructions` with more examples and template patterns
- Updated Kokimoki Awareness section in `kokimoki-sdk.instructions`
- Removed redundant example views and replaced them with cleaner, more focused components
- Updated state management to remove unused properties and simplify the global store
- Refactored imports/exports to use named exports consistently and established proper module patterns

## [1.0.0] - 2025-10-03

### Added

- Initial `host-starter-template` setup

### Changed

- Updated `kokimoki-sdk.instructions` with API methods documentation
