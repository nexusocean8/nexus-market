# Nexus Market

**Nexus NFTs, The Next Generation Of Digital Assets**

A modern NFT marketplace built with React, Vite, and TypeScript, featuring a comprehensive suite of tools for creating, exploring, and managing digital collectibles.

## Prerequisites

- Node.js 22 or higher
- pnpm package manager

## Getting Started

### Installation

Install dependencies using pnpm with a frozen lockfile to ensure consistent installations:

```bash
pnpm i --frozen-lockfile
```

### Development

Start the development server:

```bash
pnpm dev
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## Project Structure

The project follows a component-based architecture with clear separation of concerns:

### Pages

Each route in the application has its own page component located in the `pages` directory:

- [x] `home.tsx` - Landing page and marketplace overview
- [x] `explore.tsx` - Browse and discover NFTs
- [ ] `collection.tsx` - View collection details
- [ ] `nft-details.tsx` - Individual NFT details page
- [x] `create-nft.tsx` - NFT creation interface
- [x] `create-collection.tsx` - Collection creation interface
- [ ] `edit-collection.tsx` - Edit existing collections
- [x] `profile.tsx` - User profile page
- [x] `edit-profile.tsx` - Profile editing interface
- [x] `account.tsx` - Account management
- [ ] `activity.tsx` - Transaction and activity history
- [x] `contact.tsx` - Contact form and support
- [x] `missing.tsx` - 404 error page

### Components

Components are organized into two categories:

1. **Page-specific components**: Located in folders corresponding to each page, these components are specific to a single route
2. **Global components**: Reusable components that exist outside of page-specific folders and can be used throughout the application

## Styling

The project uses **Tailwind CSS 4** with a custom theming system that supports both light and dark modes. The theme is based on a provided branding kit to ensure consistent visual identity across the platform.

## Code Quality

All code committed to the repository is automatically linted and formatted using pre-commit hooks:

- **Prettier** formats code for consistent style
- **ESLint** checks for code quality and potential issues

The pre-commit hook runs automatically when you commit changes, ensuring all code meets the project's quality standards.

## Technologies

- **React** - UI library
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **pnpm** - Fast, disk space efficient package manager
- **Reown AppKit** - Web3 wallet integration
