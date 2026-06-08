# FlowCart

A premium modern e-commerce landing page built with Next.js 15, TypeScript, Tailwind CSS, GSAP, TanStack Query, Zustand, Lucide React, and Shadcn UI.

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Animations
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Lucide React** - Icons
- **Recharts** - Charts

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.ts      # Mock API for products
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main landing page
│   ├── providers.tsx         # TanStack Query provider
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── Hero.tsx              # Hero section
│   ├── Categories.tsx        # Categories section
│   ├── ProductCard.tsx       # Product card component
│   ├── ProductSkeleton.tsx   # Loading skeleton
│   ├── FeaturedProducts.tsx  # Featured products section
│   ├── QuickViewModal.tsx    # Quick view modal
│   ├── PromotionalBanner.tsx # Promotional banner
│   ├── Testimonials.tsx      # Testimonials section
│   ├── FAQ.tsx               # FAQ accordion
│   ├── Newsletter.tsx        # Newsletter section
│   └── Footer.tsx            # Footer
├── store/
│   └── index.ts              # Zustand store
└── types/
    └── index.ts              # TypeScript interfaces
```

## State Management (Zustand)

The Zustand store manages:
- `cart` - Shopping cart items
- `wishlist` - Wishlisted products
- `quickViewProduct` - Product for quick view modal
- `isQuickViewOpen` - Quick view modal state
- `isMobileMenuOpen` - Mobile menu state

## Data Fetching (TanStack Query)

Products are fetched from a mock API route using TanStack Query with:
- Stale time: 60 seconds
- Loading skeletons
- Error handling

## Animations (GSAP)

GSAP is used for:
- Hero section stagger animations
- Scroll-triggered reveal animations
- Modal open/close animations
- Card hover effects

## Design Decisions

1. **Dark Theme** - Premium black background with subtle gradients
2. **Typography** - System font stack with strong hierarchy
3. **Spacing** - Generous padding and margins for clean layout
4. **Responsive** - Mobile-first design with Tailwind breakpoints
5. **Accessibility** - Semantic HTML and proper contrast ratios

## Future Improvements

- [ ] Add user authentication
- [ ] Implement real checkout process
- [ ] Add product filtering and sorting
- [ ] Implement search functionality
- [ ] Add reviews and ratings system
- [ ] Connect to real database/API
- [ ] Add CMS integration
- [ ] Implement SEO optimization
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline

