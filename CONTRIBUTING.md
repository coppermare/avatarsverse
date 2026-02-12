# Contributing to Avatarverse

Thank you for your interest in contributing to Avatarverse. This document provides guidelines for contributing.

## Code of Conduct

Please be respectful and constructive. We aim for an inclusive and welcoming community.

## How to Contribute

### Reporting Bugs

- Use the [GitHub Issues](https://github.com/coppermare/avatarverse/issues) page
- Include steps to reproduce, expected vs actual behavior, and your environment (Node version, OS)

### Suggesting Features

- Open an issue with the "enhancement" or "idea" label
- Describe the use case and why it would benefit the library

### Pull Requests

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name` or `fix/bug-description`
3. **Develop**: Make your changes, run `npm run build:lib` and `npm run lint`
4. **Commit**: Use clear, descriptive commit messages
5. **Push** and open a Pull Request

### Adding New Avatar Styles

Avatarverse supports multiple styles. To add a new style:

1. Create a new folder under `core/styles/` (e.g. `core/styles/neon/`)
2. Implement the style interface:
   - `render(seed: string, options: Record<string, unknown>): string` - returns SVG string
   - `metadata` with `name`, `version`, `defaults`
3. Register the style in `core/styles/registry.ts`
4. Add the style name to `STYLES` in `index.ts`
5. Add tests for determinism (same seed = same output)

See `core/styles/voxel/` for a reference implementation.

### Development Setup

```bash
git clone https://github.com/coppermare/avatarverse.git
cd avatarverse
npm install
npm run dev          # Start playground at http://localhost:3000
npm run build:lib    # Build the library for publishing
```

### Determinism Requirement

Avatarverse generates deterministic avatars: the same seed and options must always produce the same SVG output. Any PR that changes rendering logic must not break determinism. Add or update tests when modifying style code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
