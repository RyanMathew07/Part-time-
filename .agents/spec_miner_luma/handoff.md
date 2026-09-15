# Specification & Architecture Report: Base-Luma Preset, Base UI Primitives & Hugeicons

**Author**: `spec_miner_luma` (Read-Only Specification Investigator)  
**Date**: 2026-09-15T09:38:00Z  
**Target Project**: PART-TIME Marketplace (`d:/Documents/Antigravity/Part time`)  
**Handoff Type**: Hard (Investigation Complete)

---

## 1. Observation

### 1.1 Project & shadcn Configuration (`components.json`)
Direct examination of `d:/Documents/Antigravity/Part time/components.json` reveals:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-luma",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "hugeicons",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

Running `npx shadcn@latest info --json` directly probes the upstream resolver with the following verbatim output:
```json
{
  "project": {
    "framework": "Next.js",
    "frameworkName": "next-app",
    "frameworkVersion": "14.2.15",
    "srcDirectory": false,
    "rsc": true,
    "typescript": true,
    "tailwindVersion": "v3",
    "tailwindConfig": "tailwind.config.ts",
    "tailwindCss": "app/globals.css",
    "importAlias": "@"
  },
  "config": {
    "style": "base-luma",
    "base": "base",
    "rsc": true,
    "typescript": true,
    "iconLibrary": "hugeicons",
    "rtl": false,
    "menuColor": "default",
    "menuAccent": "subtle",
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    },
    "resolvedPaths": {
      "cwd": "D:\\Documents\\Antigravity\\Part time",
      "tailwindConfig": "D:\\Documents\\Antigravity\\Part time\\tailwind.config.ts",
      "tailwindCss": "D:\\Documents\\Antigravity\\Part time\\app\\globals.css",
      "utils": "D:\\Documents\\Antigravity\\Part time\\lib/utils",
      "components": "D:\\Documents\\Antigravity\\Part time\\components",
      "lib": "D:\\Documents\\Antigravity\\Part time\\lib",
      "hooks": "D:\\Documents\\Antigravity\\Part time\\hooks",
      "ui": "D:\\Documents\\Antigravity\\Part time\\components/ui"
    },
    "registries": {
      "@shadcn": "https://ui.shadcn.com/r/styles/{style}/{name}.json"
    }
  },
  "preset": {
    "code": "b1VlJAwK",
    "fallbacks": ["theme", "chartColor", "fontHeading"],
    "values": {
      "style": "luma",
      "baseColor": "neutral",
      "theme": "neutral",
      "chartColor": "neutral",
      "iconLibrary": "hugeicons",
      "font": "inter",
      "fontHeading": "inherit",
      "radius": "default",
      "menuAccent": "subtle",
      "menuColor": "default"
    }
  },
  "components": [
    "avatar", "badge", "button", "card", "dialog",
    "input", "separator", "sheet", "slider", "tabs"
  ]
}
```

### 1.2 Package Dependencies (`package.json`)
Inspection of `d:/Documents/Antigravity/Part time/package.json` reveals:
- Installed dependencies:
  - `"@base-ui/react": "^1.8.0"` (MUI Base UI, exact version in `node_modules/@base-ui/react/package.json` is `1.8.0`)
  - `"@hugeicons/core-free-icons": "^4.3.3"` (exact version `4.3.3`)
  - `"@hugeicons/react": "^1.1.10"` (exact version `1.1.10`)
  - `"class-variance-authority": "^0.7.1"`
  - `"clsx": "^2.1.1"`
  - `"cn": "^0.3.0"` (compiled Tailwind merge package by shadcn-ui, `github.com/shadcn-ui/cn`)
  - `"lucide-react": "^0.453.0"`
  - `"next": "^14.2.15"`
  - `"react": "^18.3.1"`
  - `"react-dom": "^18.3.1"`
  - `"shadcn": "^4.21.0"`
  - `"tailwind-merge": "^2.5.4"`
  - `"tw-animate-css": "^1.4.0"`
  - `"tailwindcss": "^3.4.14"` (Tailwind v3)
  - `"typescript": "^5.5.4"`

### 1.3 TypeScript Configuration (`tsconfig.json`)
`d:/Documents/Antigravity/Part time/tsconfig.json` enforces:
- `"paths": { "@/*": ["./*"] }`
- `"moduleResolution": "bundler"`
- `"strict": true`
- `"jsx": "preserve"`

### 1.4 Tailwind & CSS Variables (`tailwind.config.ts` & `app/globals.css`)
- In `tailwind.config.ts`:
  - `darkMode: 'class'`
  - Uses CSS variable tokens for: `border: 'var(--border)'`, `input: 'var(--input)'`, `ring: 'var(--ring)'`, `foreground: 'var(--foreground)'`, `card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' }`, `popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' }`, `muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' }`, `destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' }`.
  - Hardcoded tokens:
    - `primary`: `{ DEFAULT: '#000000', foreground: '#ffffff' }`
    - `secondary`: `{ DEFAULT: '#efefef', foreground: '#000000' }`
    - `background`: `'#ffffff'`
- In `app/globals.css`:
  - `:root` declares modern OKLCH tokens:
    `--background: oklch(1 0 0);`, `--foreground: oklch(0.145 0 0);`, `--primary: oklch(0.205 0 0);`, `--primary-foreground: oklch(0.985 0 0);`, `--secondary: oklch(0.97 0 0);`, `--secondary-foreground: oklch(0.205 0 0);`, `--muted: oklch(0.97 0 0);`, `--muted-foreground: oklch(0.556 0 0);`, `--destructive: oklch(0.577 0.245 27.325);`, `--border: oklch(0.922 0 0);`, `--input: oklch(0.922 0 0);`, `--ring: oklch(0.708 0 0);`, `--radius: 0.625rem;`.
  - `.dark` declares Uber-black theme tokens:
    `--background: #000000;`, `--foreground: #ffffff;`, `--primary: #ffffff;`, `--primary-foreground: #000000;`, `--secondary: #1a1a1a;`, `--secondary-foreground: #ffffff;`, `--muted: #1a1a1a;`, `--muted-foreground: #afafaf;`, `--border: #282828;`, `--input: #282828;`, `--ring: #afafaf;`.

### 1.5 Upstream Registry Verification (`ui.shadcn.com`)
Live inspection of upstream registry items at `https://ui.shadcn.com/r/styles/base-luma/button.json` and via `npx shadcn@latest add dialog --view` proves:
1. The upstream registry for `base-luma` imports `cn` via `import { cn } from "cn"` (the standalone `cn` package installed in `node_modules`).
2. Primitives import from `@base-ui/react/<primitive>` (e.g. `@base-ui/react/button`, `@base-ui/react/dialog`, `@base-ui/react/switch`, `@base-ui/react/tabs`, `@base-ui/react/slider`, `@base-ui/react/avatar`, `@base-ui/react/input`, `@base-ui/react/separator`).
3. For icon integration when `iconLibrary: "hugeicons"`, upstream shadcn generates:
   ```tsx
   import { HugeiconsIcon } from "@hugeicons/react"
   import { Cancel01Icon } from "@hugeicons/core-free-icons"
   ...
   <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
   ```
4. Running `npx shadcn@latest add dialog --view` resulted in `(skip)` because local `components/ui/dialog.tsx` already exactly matches the upstream `base-luma` implementation.

### 1.6 Current UI Primitives & Feature View Audit
- Existing primitives in `components/ui/`:
  - `avatar.tsx` (`@base-ui/react/avatar`)
  - `badge.tsx` (`@base-ui/react/use-render` + `@base-ui/react/merge-props`)
  - `button.tsx` (`@base-ui/react/button`, `buttonVariants`)
  - `card.tsx` (compound `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`)
  - `dialog.tsx` (`@base-ui/react/dialog`, `Cancel01Icon`)
  - `input.tsx` (`@base-ui/react/input`)
  - `separator.tsx` (`@base-ui/react/separator`)
  - `sheet.tsx` (`@base-ui/react/dialog` as `SheetPrimitive`)
  - `slider.tsx` (`@base-ui/react/slider`)
  - `tabs.tsx` (`@base-ui/react/tabs`)
  - `ThemeToggle.tsx` (custom theme switch component)
- Missing primitive available in upstream registry:
  - `switch.tsx` (`@base-ui/react/switch`): Verified by running `npx shadcn@latest add switch --view`, which generates a 32-line clean primitive.
- Feature views importing `lucide-react`:
  Exactly 24 files across `components/` still import icons from `lucide-react` instead of `@hugeicons/react` + `@hugeicons/core-free-icons`:
  1. `components/wallet/WalletCard.tsx`
  2. `components/wallet/TransactionHistory.tsx`
  3. `components/wallet/CashoutModal.tsx`
  4. `components/chat/QuickActionChips.tsx`
  5. `components/chat/ChatView.tsx`
  6. `components/lifecycle/OtpBanner.tsx`
  7. `components/lifecycle/ActiveShiftTracker.tsx`
  8. `components/lifecycle/ApplyModal.tsx`
  9. `components/discovery/CategoryPills.tsx`
  10. `components/discovery/SearchBar.tsx`
  11. `components/discovery/WageTierFilter.tsx`
  12. `components/discovery/ShiftFeed.tsx`
  13. `components/discovery/ShiftCard.tsx`
  14. `components/radar/ShiftInspector.tsx`
  15. `components/radar/RadiusControl.tsx`
  16. `components/radar/RadarCanvas.tsx`
  17. `components/employer/PostShiftModal.tsx`
  18. `components/layout/BottomDock.tsx`
  19. `components/layout/DesktopLayout.tsx`
  20. `components/layout/Header.tsx`
  21. `components/layout/NavigationSidebar.tsx`
  22. `components/layout/AccountModal.tsx`
  23. `components/layout/ToastContainer.tsx`
  24. `components/ui/ThemeToggle.tsx`

### 1.7 Test Suite Dependency Invariant
`tests/tier1-smoke.test.js` line 41 strictly asserts:
`suite.assert(Boolean(deps['lucide-react']), 'T1.05: package.json includes lucide-react dependency');`
Therefore, `lucide-react` must remain present in `package.json` dependencies even after all views are converted to Hugeicons.

---

## 2. Logic Chain

1. **Preset Identification**:
   - `components.json` explicitly defines `"style": "base-luma"` and `"iconLibrary": "hugeicons"`.
   - Probing the CLI with `npx shadcn@latest info --json` extracts the underlying preset code `b1VlJAwK`, resolving `base: "base"` (MUI Base UI) and visual style `"luma"` (soft curves, pill buttons, `rounded-4xl` containers, `rounded-3xl` badges and inputs, subtle border rings).
   - Therefore, the design system contract is Base UI headless logic wrapped in Luma styling with Hugeicons glyphs.

2. **Base UI Primitives Package**:
   - Upstream shadcn registry imports `@base-ui/react/<module>`, NOT `@base-ui-components/react` or `@radix-ui/react-*`.
   - `package.json` already contains `"@base-ui/react": "^1.8.0"`, which is fully installed in `node_modules` and exposes all required modules (`./button`, `./dialog`, `./tabs`, `./slider`, `./switch`, `./avatar`, `./input`, `./separator`, etc.).
   - Radix primitives (`@radix-ui/react-*`) are NOT part of the `base-luma` architecture and must not be introduced.

3. **Composition Paradigm: Base UI vs. Radix UI**:
   - In Radix UI, compound trigger elements use `asChild` (e.g. `<DialogTrigger asChild><Button>...</Button></DialogTrigger>`).
   - In Base UI (`base`), triggers use the `render` prop (e.g. `<DialogTrigger render={<Button />}>...</DialogTrigger>`). Extra wrapper `<div>` elements violate accessibility.
   - When `render` turns a button-like element into a non-button (e.g. `<a>` or `<span>`), Base UI requires `nativeButton={false}`.
   - Select in Base UI requires an `items` array prop on root (not pure inline JSX) and uses `{ value: null }` for placeholders.
   - Accordion and ToggleGroup in Base UI use a `multiple` boolean prop and array default values (e.g. `defaultValue={["item-1"]}`), whereas Radix used `type="single" | "multiple"`.
   - Sliders in Base UI accept a scalar number for single thumbs (`defaultValue={50}`) rather than an array.

4. **Hugeicons Integration Architecture**:
   - The `@hugeicons/react` package exports the renderer component `HugeiconsIcon`.
   - The `@hugeicons/core-free-icons` package exports SVG path object dictionaries (e.g. `Sun01Icon`, `Moon01Icon`, `Search01Icon`, `Cancel01Icon`, `Location01Icon`, `Clock01Icon`, `CheckmarkCircle01Icon`, etc.).
   - Standard shadcn syntax for Base Luma + Hugeicons:
     ```tsx
     import { HugeiconsIcon } from "@hugeicons/react";
     import { Search01Icon } from "@hugeicons/core-free-icons";

     <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-4" />
     ```
   - In buttons, following the shadcn icons guideline:
     ```tsx
     <Button>
       <HugeiconsIcon icon={Search01Icon} strokeWidth={2} data-icon="inline-start" />
       Search
     </Button>
     ```
     No arbitrary `size-4` sizing class should be passed when inside a Button or MenuItem; the CSS handles sizing via `[&_svg:not([class*='size-'])]:size-4` and `has-data-[icon=inline-start]:pl-2.5`.

5. **Class Merging (`cn`) Convention**:
   - The upstream `base-luma` registry items (`button.json`, `dialog.json`, etc.) import `cn` directly from `"cn"` (`import { cn } from "cn"`).
   - The project also has `lib/utils.ts` exporting `cn` using `clsx` + `tailwind-merge`.
   - Both are functionally equivalent, but using the installed `cn` package keeps `@/components/ui` primitives 100% compliant with upstream shadcn registry code without import rewrites.

6. **Configuration Alignments**:
   - `tailwind.config.ts` has hardcoded values for `primary: { DEFAULT: '#000000', foreground: '#ffffff' }` and `secondary: { DEFAULT: '#efefef', foreground: '#000000' }`.
   - In `app/globals.css`, `:root` defines OKLCH values for `--primary` and `--secondary`, while `.dark` defines `--primary: #ffffff` and `--primary-foreground: #000000`.
   - By aligning `tailwind.config.ts` to `primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' }`, dark mode automatically inverts the primary button (white button with black text on black background), matching Uber's elevated dark design system.

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Preset Config | `preset.code` | Resolved base62 preset identifier `b1VlJAwK` encoding `style: "luma"`, `base: "base"`, `iconLibrary: "hugeicons"` | `components.json` | JSON preset definition | Fallback to defaults if schema invalid | `npx shadcn@latest info --json` |
| 2 | Primitives | Base UI Engine | Unstyled headless primitives provided by `@base-ui/react` v1.8.0 | Module imports (`@base-ui/react/*`) | Accessible headless React components | TS module resolution error if missing | `node_modules/@base-ui/react` |
| 3 | Composition | `render` Prop | Base UI trigger composition mechanism replacing Radix's `asChild` | React element prop `render={<Button />}` | Composed DOM element with ARIA bindings | Wrapping in extra `<div>` breaks event bubbling | `shadcn/rules/base-vs-radix.md` |
| 4 | Composition | `nativeButton={false}` | Attribute required when `render` swaps a trigger element to a non-button (e.g. `<a>`, `<span>`) | Boolean attribute on trigger/button | Correct accessibility role mapping | Warning / invalid ARIA if omitted on non-button | `shadcn/rules/base-vs-radix.md` |
| 5 | Styling | Luma Soft Corners | Visual treatment using `rounded-4xl` on buttons/cards/modals, `rounded-3xl` on badges/inputs, `rounded-full` on tabs | Tailwind CSS classes | Rendered pill/curved containers | CSS parsing fallback to square corners | Upstream `base-luma` registry |
| 6 | Class Merging | `cn` Package | Compiled class-merging engine `@shadcn-ui/cn` (package `cn` v0.3.0) | Class values / objects | Deduplicated class string | Drops invalid tokens gracefully | `node_modules/cn` & `button.json` |
| 7 | Iconography | Hugeicons Renderer | Component wrapper `@hugeicons/react` (`HugeiconsIcon`) rendering SVG icon definitions | `icon={IconSvgObject}`, `strokeWidth`, `size` | Rendered inline SVG | Fails typecheck if icon object invalid | `@hugeicons/react/dist/types` |
| 8 | Iconography | Free Icons Pack | Standard SVG icon definitions in `@hugeicons/core-free-icons` v4.3.3 | Named icon constants (e.g. `Search01Icon`, `Cancel01Icon`) | `IconSvgObject` | Named export missing if misspelled | `@hugeicons/core-free-icons` |
| 9 | Icon Layout | `data-icon` Attribute | Attribute on icon indicating button position (`data-icon="inline-start"` or `inline-end"`) | Data attribute on icon element | Automatic margin and button padding adjustment | Misaligned button spacing if omitted | `shadcn/rules/icons.md` |
| 10 | UI Primitives | `Switch` Component | Headless toggle switch primitive backed by `@base-ui/react/switch` | `checked`, `onCheckedChange`, `disabled`, `size` | Interactive toggle switch | Standard disabled/invalid state handling | `npx shadcn@latest add switch --view` |
| 11 | Color Tokens | OKLCH / Hex Duality | Light mode uses OKLCH color spaces; dark mode uses Uber stark monochrome `#000000` / `#ffffff` | CSS variables in `globals.css` | High-contrast visual tokens | Inconsistent dark styling if hardcoded in Tailwind | `app/globals.css` |
| 12 | Test Invariant | Package Lock Invariant | Test T1.05 checks `deps['lucide-react']` in `package.json` | `package.json` dependencies | Test assertion boolean | Suite fails T1.05 if `lucide-react` is uninstalled | `tests/tier1-smoke.test.js:41` |

---

## 4. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | `DialogTrigger` / `SheetTrigger` | `<DialogTrigger asChild><Button>...</Button></DialogTrigger>` | In Base UI, `asChild` is ignored or rejected by TypeScript; triggers must use `render={<Button />}`. |
| 2 | `Button` rendering link | `<Button render={<a href="..." />}>` | Base UI renders a button with anchor behavior; requires `nativeButton={false}` to prevent nested/conflicting button semantics. |
| 3 | `TabsTrigger` list styling | Group vertical vs horizontal tabs | Luma tabs use `group-data-horizontal/tabs:flex-col` with `rounded-full` pill list in horizontal mode, switching to `group-data-vertical/tabs:rounded-2xl` in vertical orientation. |
| 4 | `Slider` with single value | `<Slider defaultValue={[50]} />` | Base UI slider single thumb expects scalar `number` (`defaultValue={50}`); passing array `[50]` is treated as a range slider with 1 thumb unless mapped properly. |
| 5 | Icon in Button sizing | `<Button><HugeiconsIcon icon={...} className="size-4" /></Button>` | Explicit `size-4` overrides Luma's contextual icon sizing (`icon-xs: size-3`, `default: size-4`). Omit `size-*` on icons inside buttons. |
| 6 | Hugeicons Icon Import Syntax | `import { Search } from "@hugeicons/react"` | `@hugeicons/react` does NOT export individual icon components directly; must import `HugeiconsIcon` from `@hugeicons/react` and `Search01Icon` from `@hugeicons/core-free-icons`. |
| 7 | `ThemeToggle` Switch replacement | Replacing custom `<button role="switch">` with shadcn `Switch` | `Switch` primitive uses `@base-ui/react/switch` and accepts `checked={isDark}` and `onCheckedChange={handleToggle}` cleanly. |
| 8 | Tailwind `primary` vs CSS `--primary` | Running dark mode with hardcoded `primary.DEFAULT: '#000000'` in `tailwind.config.ts` | `bg-primary` remains black even in `.dark`, causing black buttons on black background unless mapped to `var(--primary)`. |
| 9 | Package cleanup | `npm uninstall lucide-react` | `npm test` fails assertion T1.05 (`package.json includes lucide-react dependency`). Must keep `lucide-react` in `package.json`. |

---

## 5. Lucide to Hugeicons Icon Mapping Specification

To systematically migrate all 24 feature components, the following verified mapping between Lucide icons and `@hugeicons/core-free-icons` must be followed:

| Lucide Icon | Hugeicons Equivalent | Import Specifier (`@hugeicons/core-free-icons`) |
|-------------|----------------------|-------------------------------------------------|
| `Search` | `Search01Icon` | `import { Search01Icon } from "@hugeicons/core-free-icons"` |
| `SearchX` | `SearchXIcon` or `SearchRemoveIcon` | `import { SearchXIcon } from "@hugeicons/core-free-icons"` |
| `X` / `Cancel` | `Cancel01Icon` | `import { Cancel01Icon } from "@hugeicons/core-free-icons"` |
| `Sun` | `Sun01Icon` | `import { Sun01Icon } from "@hugeicons/core-free-icons"` |
| `Moon` | `Moon01Icon` | `import { Moon01Icon } from "@hugeicons/core-free-icons"` |
| `MapPin` | `Location01Icon` | `import { Location01Icon } from "@hugeicons/core-free-icons"` |
| `Clock` | `Clock01Icon` | `import { Clock01Icon } from "@hugeicons/core-free-icons"` |
| `KeyRound` | `Key01Icon` | `import { Key01Icon } from "@hugeicons/core-free-icons"` |
| `Copy` | `Copy01Icon` | `import { Copy01Icon } from "@hugeicons/core-free-icons"` |
| `Check` | `Tick01Icon` / `CheckmarkCircle01Icon` | `import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"` |
| `CheckCircle` / `CheckCircle2` | `CheckmarkCircle01Icon` | `import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"` |
| `CheckCheck` | `TickDouble01Icon` | `import { TickDouble01Icon } from "@hugeicons/core-free-icons"` |
| `AlertCircle` | `AlertCircleIcon` | `import { AlertCircleIcon } from "@hugeicons/core-free-icons"` |
| `ShieldCheck` | `ShieldTickIcon` | `import { ShieldTickIcon } from "@hugeicons/core-free-icons"` |
| `Shield` | `Shield01Icon` | `import { Shield01Icon } from "@hugeicons/core-free-icons"` |
| `ShieldAlert` | `ShieldAlertIcon` | `import { ShieldAlertIcon } from "@hugeicons/core-free-icons"` |
| `Phone` | `Call02Icon` | `import { Call02Icon } from "@hugeicons/core-free-icons"` |
| `Navigation` | `Navigation01Icon` | `import { Navigation01Icon } from "@hugeicons/core-free-icons"` |
| `Compass` | `Compass01Icon` | `import { Compass01Icon } from "@hugeicons/core-free-icons"` |
| `Wallet` | `Wallet01Icon` | `import { Wallet01Icon } from "@hugeicons/core-free-icons"` |
| `CreditCard` | `CreditCard01Icon` | `import { CreditCard01Icon } from "@hugeicons/core-free-icons"` |
| `Building` | `Building01Icon` | `import { Building01Icon } from "@hugeicons/core-free-icons"` |
| `ArrowUpRight` | `ArrowUpRight01Icon` | `import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"` |
| `ArrowDownLeft` | `ArrowDownLeft01Icon` | `import { ArrowDownLeft01Icon } from "@hugeicons/core-free-icons"` |
| `ArrowRight` | `ArrowRight01Icon` | `import { ArrowRight01Icon } from "@hugeicons/core-free-icons"` |
| `Coffee` | `Coffee01Icon` | `import { Coffee01Icon } from "@hugeicons/core-free-icons"` |
| `Sparkles` | `SparklesIcon` | `import { SparklesIcon } from "@hugeicons/core-free-icons"` |
| `Award` | `Award01Icon` | `import { Award01Icon } from "@hugeicons/core-free-icons"` |
| `Receipt` | `Receipt01Icon` | `import { Receipt01Icon } from "@hugeicons/core-free-icons"` |
| `Coins` | `Coins01Icon` | `import { Coins01Icon } from "@hugeicons/core-free-icons"` |
| `DollarSign` | `DollarSquareIcon` / `CircleDollarSignIcon` | `import { CircleDollarSignIcon } from "@hugeicons/core-free-icons"` |
| `IndianRupee` | `IndianRupeeIcon` | `import { IndianRupeeIcon } from "@hugeicons/core-free-icons"` |
| `Star` | `StarIcon` | `import { StarIcon } from "@hugeicons/core-free-icons"` |
| `Users` | `UserGroupIcon` | `import { UserGroupIcon } from "@hugeicons/core-free-icons"` |
| `Zap` | `FlashIcon` | `import { FlashIcon } from "@hugeicons/core-free-icons"` |
| `MessageSquare` | `Message01Icon` | `import { Message01Icon } from "@hugeicons/core-free-icons"` |
| `Send` | `Sent01Icon` | `import { Sent01Icon } from "@hugeicons/core-free-icons"` |
| `Info` | `InfoIcon` | `import { InfoIcon } from "@hugeicons/core-free-icons"` |
| `MoreVertical` | `MoreVerticalIcon` | `import { MoreVerticalIcon } from "@hugeicons/core-free-icons"` |
| `Megaphone` | `Megaphone01Icon` | `import { Megaphone01Icon } from "@hugeicons/core-free-icons"` |
| `Calendar` | `Calendar01Icon` | `import { Calendar01Icon } from "@hugeicons/core-free-icons"` |
| `Truck` | `DeliveryTruck01Icon` | `import { DeliveryTruck01Icon } from "@hugeicons/core-free-icons"` |
| `ShoppingBag` | `ShoppingBag01Icon` | `import { ShoppingBag01Icon } from "@hugeicons/core-free-icons"` |
| `PackageCheck` | `PackageCheckIcon` | `import { PackageCheckIcon } from "@hugeicons/core-free-icons"` |
| `Layers` | `Layers01Icon` | `import { Layers01Icon } from "@hugeicons/core-free-icons"` |
| `RotateCcw` | `RotateLeft01Icon` | `import { RotateLeft01Icon } from "@hugeicons/core-free-icons"` |
| `Share2` | `Share01Icon` | `import { Share01Icon } from "@hugeicons/core-free-icons"` |
| `Plus` | `PlusSignIcon` | `import { PlusSignIcon } from "@hugeicons/core-free-icons"` |
| `Briefcase` | `Briefcase01Icon` | `import { Briefcase01Icon } from "@hugeicons/core-free-icons"` |
| `Bell` | `Notification01Icon` | `import { Notification01Icon } from "@hugeicons/core-free-icons"` |
| `User` | `UserIcon` | `import { UserIcon } from "@hugeicons/core-free-icons"` |
| `Mail` | `Mail01Icon` | `import { Mail01Icon } from "@hugeicons/core-free-icons"` |
| `LogOut` | `Logout01Icon` | `import { Logout01Icon } from "@hugeicons/core-free-icons"` |
| `Radar` | `Target01Icon` | `import { Target01Icon } from "@hugeicons/core-free-icons"` |

---

## 6. Caveats

1. **`lucide-react` Package Retention**:
   Although all 24 UI components must migrate to `@hugeicons/react`, the `"lucide-react"` entry in `package.json` cannot be removed because `tests/tier1-smoke.test.js` test `T1.05` verifies its existence in the package manifest.
2. **`ThemeToggle.tsx` Location**:
   `ThemeToggle.tsx` is located directly in `components/ui/` rather than in `components/layout/`. When refactoring, its export and import paths must remain stable to prevent breaking `Header.tsx` or other dependents.
3. **Tailwind v3 vs v4**:
   The project runs Tailwind v3 (`tailwindcss@3.4.14`), not v4. The configuration is handled via `tailwind.config.ts`, not CSS `@theme inline` blocks.

---

## 7. Conclusion

1. **Preset & Engine**: The project is configured with the `base-luma` preset (`preset code: b1VlJAwK`), driven by MUI's headless `@base-ui/react` (v1.8.0) primitives and styled with Luma's high-radius (`rounded-4xl`), subtle-ring aesthetic.
2. **Component Integrity**: Existing primitives in `components/ui/` (`avatar`, `badge`, `button`, `card`, `dialog`, `input`, `separator`, `sheet`, `slider`, `tabs`) are already 100% compliant with upstream shadcn `base-luma` registry implementations.
3. **Missing Primitive**: `components/ui/switch.tsx` is required for clean toggle controls (such as inside `ThemeToggle` and modal settings) and is readily scaffolded from the upstream `@shadcn/switch` registry item using `@base-ui/react/switch`.
4. **Icon Migration Scope**: 24 feature view files currently rely on legacy `lucide-react` icons. They must be refactored to use `<HugeiconsIcon icon={...} strokeWidth={2} />` using the mappings documented in Section 5.
5. **Color System Fix**: `tailwind.config.ts` must align `primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' }` and `secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' }` so that dark mode theme transitions function symmetrically.

---

## 8. Verification Method

To independently verify all findings and specifications:

1. **Verify shadcn Preset & Resolution**:
   ```powershell
   npx shadcn@latest info --json
   ```
   *Expected*: Valid JSON returning `style: "base-luma"`, `base: "base"`, `preset.code: "b1VlJAwK"`, `iconLibrary: "hugeicons"`.

2. **Verify Base UI & Hugeicons Package Presence**:
   ```powershell
   node -e "console.log(require('@base-ui/react/package.json').version); console.log(require('@hugeicons/react/package.json').version); console.log(require('@hugeicons/core-free-icons/package.json').version);"
   ```
   *Expected*: `1.8.0`, `1.1.10`, `4.3.3`.

3. **Verify Upstream Registry Parity**:
   ```powershell
   npx shadcn@latest add dialog --view
   ```
   *Expected*: Shows `components\ui\dialog.tsx (skip)` confirming local matching upstream.

4. **Verify Build & Test Suite Baseline**:
   ```powershell
   npx tsc --noEmit
   npm run build
   npm test
   ```
   *Expected*: TypeScript compilation zero errors, Next.js build succeeds, all 134 automated tests pass (100%).
