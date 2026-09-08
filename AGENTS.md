# Avatarsverse contributor guide

This file applies to the entire repository.

## Project overview

Avatarsverse is both:

- an ESM TypeScript package that maps a string seed to a deterministic avatar URL; and
- a Next.js App Router site for browsing, previewing, copying, and downloading avatars.

The current avatar category is `voxel`. Image files use mixed `.png`, `.jpg`, and `.jpeg` extensions.

## Important paths

- `index.ts`: public package exports and deterministic URL generation.
- `avatar-manifest.ts`: generated TypeScript manifest used by the package and API.
- `avatars/avatars.json`: generated public manifest.
- `avatars/{category}/`: source avatar images.
- `app/page.tsx`: gallery, progressive loading, copy, and download UI.
- `app/components/AvatarLightbox.tsx`: accessible desktop/mobile preview navigation.
- `app/api/avatars/`: read-only HTTP API routes.
- `app/docs/page.tsx` and `README.md`: user-facing documentation; keep them aligned.

## Commands

Use Node.js 22, matching `.nvmrc` and CI.

- `npm install`: install the locked dependencies.
- `npm run dev`: start the local Next.js server.
- `npm run generate-avatars`: regenerate both manifests after changing avatar files.
- `npm run check`: run lint, package tests, TypeScript compilation, and the production build.
- `npm run format`: format supported source and documentation files.

Run `npm run check` before handing off a change.

## Repository rules

- Do not infer an avatar extension or construct numeric `.png` paths. Resolve filenames from the generated manifest.
- After adding, removing, or renaming an image, run `npm run generate-avatars` and commit both generated manifest files.
- Do not edit `avatar-manifest.ts` or `avatars/avatars.json` manually.
- Keep ESM-relative imports in library code compatible with emitted JavaScript, including required `.js` suffixes.
- Preserve structured JSON errors, CORS headers, cache headers, and content-type detection across API routes.
- Keep downloads on the same-origin image endpoint with the `download` query parameter so browsers receive `Content-Disposition: attachment`.
- Preserve keyboard controls, focus management, mobile swipe navigation, responsive sizing, and accessible labels in the lightbox.
- Keep the gallery progressively rendered in batches; do not mount the complete image library at once.
- Keep `README.md` and the docs page consistent with the implemented package and HTTP APIs.
- Do not commit `.next/`, `dist/`, environment files, or other generated build output.
- `next.config.ts` intentionally sets `agentRules: false`. Keep this repository-owned file as the source of agent guidance and do not add `CLAUDE.md`.
