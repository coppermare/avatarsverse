# Changelog

All notable changes to Avatarverse will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Initial release
- Voxel avatar style with deterministic trait selection
- `createAvatar(style, seed, options)` - main API
- `render`, `getStyle`, `createRandom` - low-level exports
- HTTP API: `GET /api/avatar/:style?seed=...&size=64&radius=0`
- Next.js playground app
- Size range 16-512, radius 0-50
- Five color palettes for voxel style
