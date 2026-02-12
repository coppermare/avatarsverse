# Avatar File Naming Guide

Avatars are organized by **category** in subfolders. Each category uses **sequential numbers** for index-based selection.

## Structure

```
avatars/
├── voxel/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   └── ...
├── (future: minimal/, cartoon/, etc.)
├── avatars.json
└── README.md
```

## Required Naming Convention (per category)

Inside each category folder, name PNG files as:

```
1.png
2.png
3.png
4.png
5.png
...
50.png
```

- **Start at 1** (not 0)
- **No leading zeros required** (1.png not 01.png)
- **Continuous sequence** – if you have 50 avatars in voxel, use 1.png through 50.png
- **Lowercase .png** extension

## Example: Voxel Category

```
avatars/voxel/
├── 1.png
├── 2.png
├── 3.png
├── 4.png
├── 5.png
├── ...
├── 49.png
└── 50.png
```

## Adding a New Category

1. Create a new folder: `avatars/{category-name}/`
2. Add PNG files named `1.png`, `2.png`, ...
3. Run `npm run generate-avatars`
4. The manifest will include the new category

## Verification

After adding files, run:

```bash
npm run generate-avatars
```

This updates `avatars.json`. Use each category's `count` in your `avatarUrl(seed, category, count)` calls.
