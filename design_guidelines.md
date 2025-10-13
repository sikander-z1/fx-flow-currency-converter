# FxFlow PWA - Design Guidelines

## Design Philosophy
Minimalist and modern mobile-first currency converter with smooth animations, rounded aesthetics, and consistent spacing. The design prioritizes clarity, quick interactions, and a premium feel through thoughtful motion and depth.

## Color Palette

### Primary Colors
- **Dark Blue**: `10 46% 11%` (Primary brand color #0A1931)
- **White**: `0 0% 100%` (Clean background)

### Theme Implementation
**Light Mode:**
- Background: White
- Cards/Surfaces: `210 30% 96%` (subtle off-white)
- Text Primary: Dark Blue
- Text Secondary: `215 25% 27%`
- Borders: `215 25% 87%`

**Dark Mode:**
- Background: Dark Blue with slight variation `210 46% 8%`
- Cards/Surfaces: `210 40% 14%`
- Text Primary: White
- Text Secondary: `210 20% 80%`
- Borders: `210 30% 20%`

### Accent Colors
- **Success**: `142 71% 45%` (for save confirmations)
- **Error**: `0 72% 51%` (for delete actions)
- **Info**: `199 89% 48%` (for loading states)

## Typography

**Font Family**: 'Poppins' (primary) with 'Inter' as fallback
- Load via Google Fonts: 300, 400, 500, 600, 700 weights

**Type Scale:**
- Hero/Display: text-5xl md:text-6xl, font-bold (60px/72px)
- Page Titles: text-3xl md:text-4xl, font-semibold (36px/48px)
- Section Headers: text-xl md:text-2xl, font-semibold (24px/30px)
- Card Titles: text-lg font-medium (18px)
- Body Text: text-base (16px)
- Small/Meta: text-sm (14px)
- Micro/Labels: text-xs (12px)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 md:p-8
- Card spacing: space-y-6
- Section gaps: gap-8 md:gap-12
- Page margins: mx-4 md:mx-8 lg:mx-auto max-w-7xl

**Container Widths:**
- Mobile: Full width with px-4
- Tablet: max-w-2xl
- Desktop: max-w-7xl
- Converter Form: max-w-md centered
- Cards: Full width within container constraints

## Component Library

### Splash Screen
- Full viewport height with centered logo
- Logo: 120px × 120px with rounded-3xl container
- Brand name below logo in text-4xl font-bold
- Fade-in animation (0.8s) → Hold (2s) → Fade-out to Home (0.8s)
- Background: Subtle gradient from Dark Blue to slightly lighter shade

### Navigation
- **Bottom Navigation Bar** (mobile) / **Top Header** (desktop)
- Floating bottom bar: rounded-t-3xl, elevation shadow, blur backdrop
- Icons: 24px from lucide-react with labels
- Tabs: Home, Converter, Favorites, Settings
- Active state: filled icon + primary color
- Inactive state: outline icon + secondary text color

### Cards & Surfaces
- Border radius: rounded-2xl (default), rounded-3xl (emphasis)
- Shadow: Soft elevation `shadow-lg` or `shadow-xl` for modals
- Padding: p-6 for content
- Background: Card color with subtle border
- Hover state: slight scale (scale-[1.02]) + shadow increase (200ms ease)

### Buttons
**Primary Button:**
- Gradient background: `bg-gradient-to-r from-[#0A1931] to-[#1a3a52]`
- Text: White, font-semibold
- Padding: px-8 py-3
- Rounded: rounded-xl
- Hover: brightness-110 + slight lift (translateY(-1px))
- Active: scale-[0.98]

**Secondary/Outline Button:**
- Border: 2px solid current color
- Background: transparent or subtle blur if on images
- Hover: fill background with subtle color

**Icon Buttons:**
- Size: 44px × 44px (touch target)
- Rounded: rounded-full
- Hover: background opacity change

### Input Fields
**Currency Dropdowns:**
- Height: h-14
- Rounded: rounded-xl
- Border: 2px solid border color
- Focus: ring-2 ring-primary with border color shift
- Padding: px-4
- Font: text-base font-medium
- Icon: Chevron down, absolute positioned right

**Amount Input:**
- Same styling as dropdowns
- Type: number with step="0.01"
- Placeholder: "Enter amount"
- Large text for entered value (text-2xl when filled)

### Result Card
- Prominent display card with rounded-3xl
- Large converted value: text-4xl md:text-5xl font-bold
- Currency code: text-lg font-medium below value
- Exchange rate info: text-sm text-secondary
- Background: Gradient or solid with stronger shadow
- Padding: p-8

### Favorites List
- Grid layout: grid-cols-1 md:grid-cols-2 gap-4
- Each item: Card with currency pair, rate, timestamp
- Remove button: Positioned top-right, small icon button
- Empty state: Centered message with icon

### Settings Controls
**Dark Mode Toggle:**
- Custom switch component: w-14 h-8
- Rounded: rounded-full
- Background: Dark Blue (on) / gray (off)
- Thumb: w-6 h-6 white circle with shadow
- Smooth transition: 200ms ease
- Icon indicators: Sun/Moon inside thumb

**Clear Favorites Button:**
- Destructive style: red text/border
- Confirmation modal before action

## Animations

### Page Transitions (Framer Motion)
```
Initial: { opacity: 0, x: 20 }
Animate: { opacity: 1, x: 0 }
Exit: { opacity: 0, x: -20 }
Duration: 0.3s ease-out
```

### Loading States
**Shimmer Animation:**
- Skeleton screens with animated gradient
- Move from left to right
- Duration: 1.5s infinite
- Colors: `bg-gradient-to-r from-transparent via-white/10 to-transparent`

### Success Animations
- Checkmark icon with scale-in spring animation
- Background pulse: scale 1 → 1.1 → 1 (500ms)
- Color flash: Success green fading in/out

### Card Entrance
- Stagger children by 0.1s
- Fade in + translateY(-10px → 0)
- Spring animation for smoothness

### Micro-interactions
- Button press: scale-[0.98]
- Hover lift: translateY(-2px)
- Icon spins on refresh: rotate 360° (500ms)
- Heart icon save: scale pulse + color change to red

## Images

### Splash Screen
- **FxFlow Logo**: Clean currency/exchange icon (coins, arrows, or FX lettermark)
- Style: Minimal line art or solid icon
- Placement: Center of screen, 120×120px
- Background: None or subtle glow effect

### Home Screen
- **Hero Section**: NO large hero image - keep minimal with gradient background
- **Feature Icons**: Small illustrative icons for "Fast Conversion" and "Save Favorites" features (32×32px)
- Style: Outline or duotone icons matching brand colors

### Converter Screen
- **Currency Flag Icons**: Small flags next to currency codes in dropdowns (20×20px)
- Source: Country flag emoji or icon library
- Placement: Left side of dropdown items

### Favorites Screen
- **Empty State Illustration**: Simple icon or mini illustration when no favorites exist
- Size: 160×160px centered
- Style: Outlined icon with brand colors

### Settings Screen
- **Profile/Avatar Placeholder** (optional): If user accounts added later
- **App Icon Display**: Show app icon with version info (48×48px)

**Note**: All images should be SVG or optimized PNG/WebP. Icons from lucide-react or heroicons preferred for consistency. No stock photography - keep the design icon and illustration-based for modern minimalist aesthetic.

## Responsive Behavior

**Mobile (< 768px):**
- Single column layouts
- Bottom floating navigation
- Full-width cards
- Larger touch targets (min 44px)
- Reduced text scales

**Tablet (768px - 1024px):**
- Two-column favorites grid
- Side-by-side converter inputs
- Top navigation option

**Desktop (> 1024px):**
- Centered content with max-w-7xl
- Hover states active
- Larger spacing and typography
- Sidebar navigation option

## PWA Specific

**Install Prompt:**
- Subtle banner at top or bottom
- Dismiss option
- Brand colored background

**Offline State:**
- Clear messaging when API unavailable
- Show cached favorites with timestamp
- Retry button

**App Icon:**
- Clean FX or currency symbol
- Dark Blue background with white icon
- Sizes: 192×192, 512×512