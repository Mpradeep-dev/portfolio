# Portfolio Glassmorphism UI Redesign

**Date:** 2026-03-14
**Status:** Approved
**Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion 12

---

## Goal

Redesign the existing portfolio UI with true interactive glassmorphism. All existing content and data is preserved. Only the visual layer changes.

---

## Architecture

No new npm packages required. All interactive effects use Framer Motion (`useMotionValue`, `useSpring`, `useTransform`) and vanilla JS cursor tracking.

### New files
- `src/hooks/useCursorSpot.js` — cursor tracker hook
- `src/components/AuroraBackground.jsx` — animated floating orb background
- `src/components/GlassCard.jsx` — full rewrite with 3D tilt (replaces existing)
- `src/components/Navbar.jsx` — always-glass floating pill (replaces existing)
- `src/components/Hero.jsx` — spinning avatar ring, parallax (replaces existing)
- `src/components/Skills.jsx` — glass pill tags (replaces existing)
- `src/components/Experience.jsx` — neon timeline layout (replaces existing)
- `src/components/Projects.jsx` — 3D tilt cards, GitHub API preserved (replaces existing)
- `src/components/Hobbies.jsx` — RAWG game covers, PC tech card (replaces existing)
- `src/components/Contact.jsx` — floating label glass form (replaces existing)

### Modified files
- `src/App.jsx` — mount `AuroraBackground` + inline `CursorSpotlight` div
- `src/index.css` — update `@theme` block; remove wallpaper from `body`; add font imports; update `.glass`; add keyframes at top level
- `src/data/portfolio_data.js` — **update** games list and tech description (changes are pending, not yet applied — implementer must apply them)

---

## Design Tokens (`@theme` block in `index.css`)

All tokens go inside the existing `@theme { }` block — not in `:root` — so they are available as Tailwind utility classes.

```css
@theme {
  --color-neon-blue: #00f3ff;
  --color-neon-purple: #9d00ff;
  --color-neon-pink: #ff00aa;
  --color-glass-bg: rgba(255, 255, 255, 0.04);      /* was 0.03 — value updated */
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-highlight: rgba(255, 255, 255, 0.12);
  --color-cursor-glow: rgba(0, 243, 255, 0.06);
  --color-dark-bg: #050505;
}
```

**Note:** `--color-glass-bg` token name is kept; only its value changes from `0.03` to `0.04`. The `.glass` utility continues referencing `var(--color-glass-bg)` with no rename.

---

## Updated `.glass` Utility

Replace the existing `.glass` utility in `index.css`:

```css
.glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--color-glass-border);
  box-shadow:
    inset 0 1px 0 var(--color-glass-highlight),
    0 8px 40px rgba(0, 0, 0, 0.4);
}
```

---

## CSS Keyframes

All `@keyframes` blocks must be placed at the **top level** of `index.css` — **not** inside any `@layer` block. Tailwind CSS 4 (Lightning CSS engine) does not support `@keyframes` inside `@layer`.

```css
/* --- Aurora float animations --- */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(80px, -60px); }
  66%       { transform: translate(-40px, 80px); }
}
@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(-100px, 60px); }
}
@keyframes float-3 {
  0%, 100% { transform: translate(0, 0); }
  40%       { transform: translate(60px, 40px); }
  80%       { transform: translate(-30px, -50px); }
}

/* --- Hero avatar ring --- */
@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

`spin-ring` usage: applied to an absolutely-positioned wrapper div (conic-gradient border, not a CSS border) around the avatar image. `animation: spin-ring 4s linear infinite`.

---

## Typography

Add to the very top of `index.css` (before any other content):

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');
```

Update `body` in `@layer base`:
- `font-family: 'DM Sans', system-ui, sans-serif`
- Remove `background-image: url('/bg-wallpaper.jpg')`, `background-size`, `background-position`, `background-attachment`

All section headings use `font-family: 'Syne'` via Tailwind class `font-['Syne']`.

---

## `useCursorSpot` Hook (`src/hooks/useCursorSpot.js`)

Two responsibilities:

1. **Returns** Framer Motion `MotionValue` objects (`cursorX`, `cursorY`) normalized to range –1…1 of viewport width/height.

2. **Side effect:** On each `mousemove`, writes `--cx` and `--cy` to `document.documentElement` **as pixel values with `px` suffix**:
```js
document.documentElement.style.setProperty('--cx', e.clientX + 'px');
document.documentElement.style.setProperty('--cy', e.clientY + 'px');
```
The fallback values in the CursorSpotlight gradient (`50%`) are intentionally in `%` and are only active before the first `mousemove`. The unit difference is expected and valid for `radial-gradient`'s `circle at` position.

Full implementation contract:
```js
export function useCursorSpot() {
  const cursorX = useMotionValue(0); // range –1 to 1
  const cursorY = useMotionValue(0); // range –1 to 1

  useEffect(() => {
    const handler = (e) => {
      document.documentElement.style.setProperty('--cx', e.clientX + 'px');
      document.documentElement.style.setProperty('--cy', e.clientY + 'px');
      cursorX.set((e.clientX / window.innerWidth) * 2 - 1);
      cursorY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler); // cleanup required
  }, []);

  return { cursorX, cursorY };
}
```

---

## CursorSpotlight (inline in `App.jsx`)

Not a separate component file. Rendered as a plain `div` inside `App.jsx`:

```jsx
<div
  className="pointer-events-none fixed inset-0 z-[1]"
  style={{
    background: 'radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), rgba(0,243,255,0.06), transparent 80%)'
  }}
/>
```

---

## Background: Floating Aurora Orbs (`AuroraBackground.jsx`)

Fixed, full-screen, `z-index: 0`, `pointer-events: none`.

**Animation approach:** CSS `animation` handles the float keyframe. Framer Motion `x`/`y` motion values handle mouse parallax on a per-orb wrapping `motion.div`. These do not conflict because CSS `animation` owns `transform` while Framer Motion uses `x`/`y` (separate CSS properties via `translateX`/`translateY` via `will-change: transform` on the wrapper).

Structure per orb:
```jsx
// In AuroraBackground:
const { cursorX, cursorY } = useCursorSpot();

// Per orb (different multipliers = depth illusion)
const parallaxX = useTransform(cursorX, [-1, 1], [-multiplier, multiplier]);
const parallaxY = useTransform(cursorY, [-1, 1], [-multiplier, multiplier]);

<motion.div style={{ x: parallaxX, y: parallaxY }}> {/* Framer Motion parallax wrapper */}
  <div style={{ animation: 'float-1 18s ease-in-out infinite' }} /> {/* CSS float */}
</motion.div>
```

| Orb | Color | Size | Keyframe | Duration | Parallax multiplier |
|-----|-------|------|----------|----------|---------------------|
| 1 | `#00f3ff` | 600×600px | `float-1` | 18s | 30px |
| 2 | `#9d00ff` | 500×500px | `float-2` | 22s | 50px |
| 3 | `#ff00aa` | 400×400px | `float-3` | 15s | 20px |

Each orb div: `border-radius: 50%`, `filter: blur(120px)`, `opacity: 0.35`.

Background base: `#050505` (no wallpaper).

---

## Navbar

- **Always glass** — `.glass` applied unconditionally. The `scrolled` state is kept but used only for padding: `py-4` when scrolled, `py-6` when at top. Do not gate `.glass` on scroll.
- `backdrop-filter: blur(24px)` — override via inline style or a modifier class on the navbar container
- Active section tracked via `IntersectionObserver` with `threshold: 0` and `rootMargin: '-40% 0px -55% 0px'` so the active section changes at roughly the middle of the viewport
- Active link indicator: a `<span className="block w-1 h-1 rounded-full bg-[var(--color-neon-blue)] mx-auto mt-1" />` below the link text
- Mobile: glass drawer slides down, same behavior as existing

---

## GlassCard Rewrite

**Remove entirely:** `whileHover` prop for scale/y-lift — not kept, not combined. The 3D tilt is the sole hover interaction.

**Remove:** `overflow-hidden` from the base className. Use `clip-path: inset(0 round inherit)` instead if child clipping is needed, because `overflow-hidden` flattens `preserve-3d` in all browsers (WebKit/Blink known behavior).

**3D tilt implementation:**
```jsx
const ref = useRef(null);
const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

function onMouseMove(e) {
  const rect = ref.current.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -12);
  rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 12);
}
function onMouseLeave() {
  rotateX.set(0);
  rotateY.set(0);
}
```

Motion div style:
```jsx
style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
```

**Glass reflection layer** inside the card (uses `--color-glass-highlight` token):
```jsx
<div
  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  style={{ background: 'linear-gradient(105deg, var(--color-glass-highlight) 0%, transparent 60%)' }}
/>
```

---

## Hero

- Avatar: spinning gradient ring — a `div` with `conic-gradient(from 0deg, #00f3ff, #9d00ff, #00f3ff)` as background, `border-radius: 50%`, positioned around the avatar with `animation: spin-ring 4s linear infinite`
- Main glass card: `cursorX`/`cursorY` from `useCursorSpot` drive translate via `useTransform` at multiplier 10px max
- Staggered entrance: avatar (0s) → name (0.2s) → title (0.3s) → summary (0.4s) → buttons (0.5s) → socials (0.7s)
- Buttons: glass pills, hover triggers neon `box-shadow` pulse

---

## Skills

**Known existing bug in old code:** `Math.random()` called on every render caused mismatched labels/bars. Replaced entirely.

Glass pill tags replace progress bars:
```jsx
<span className="glass px-3 py-1 text-sm rounded-full border border-[var(--color-neon-blue)]/20 hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_8px_rgba(0,243,255,0.4)] transition-all cursor-default">
  {skill}
</span>
```
No percentage numbers displayed.

---

## Experience

- Center timeline line: `width: 2px`, `background: linear-gradient(to bottom, #00f3ff, #9d00ff)`
- Each role: glass card left-aligned, neon dot (`w-3 h-3 rounded-full bg-[var(--color-neon-blue)] shadow-[0_0_8px_rgba(0,243,255,0.6)]`) on the timeline
- Hovered card: `border-left: 2px solid #00f3ff`, 3D tilt from GlassCard
- Tech stack tags as glass pills at card bottom

---

## Projects

- GitHub API fetch preserved: `https://api.github.com/users/Mpradeep-dev/repos?sort=updated`
- Full 3D tilt via updated GlassCard
- Language color map (local constant in component):
  ```js
  const LANG_COLORS = { Python: '#3572A5', Java: '#b07219', JavaScript: '#f1e05a', TypeScript: '#3178c6', Dart: '#00B4AB' };
  ```
- Category filter pills: glass toggle style
- Loading: neon spinner

---

## Hobbies

### `portfolio_data.js` changes (implementer must apply)

**Update** the Gaming hobby entry to:
```js
{
  name: "Gaming",
  description: "Playing strategy and action games",
  icon: "Gamepad2",
  games: [
    { title: "Days Gone", rawgSlug: "days-gone" },
    { title: "Cyberpunk 2077", rawgSlug: "cyberpunk-2077" },
    { title: "Resident Evil 4", rawgSlug: "resident-evil-4" },
    { title: "Resident Evil 7 Biohazard", rawgSlug: "resident-evil-7-biohazard" },
  ]
}
```

**Update** Technology exploration entry:
```js
{
  name: "Technology exploration",
  description: "Deep dives into PC hardware, silicon architecture, and performance tuning",
  icon: "Cpu"
}
```

### Gaming Carousel

**Remove** the existing `defaultGames` local constant in `Hobbies.jsx` entirely. Replace with RAWG fetch.

**RAWG API key is required.** Store as `VITE_RAWG_API_KEY` in `.env`. If the env var is absent or the fetch fails, each slide renders a styled gradient card (gradient color derived from game index: `from-cyan-500 to-purple-600`, `from-yellow-400 to-red-500`, etc.) with the game title centered in Syne font. The fallback must look polished.

Fetch per game on component mount:
```
GET https://api.rawg.io/api/games/{rawgSlug}?key={VITE_RAWG_API_KEY}
```
Use `data.background_image` as the cover `<img>` src.

Carousel:
- 4 slides, auto-advances every 4s, pauses on hover
- `AnimatePresence` with `x` slide transition
- Frosted glass panel overlay at bottom: game title (Syne) + genre tags
- Dot indicators + prev/next buttons on hover

### Crypto Trading
- Glass card with 5 static decorative SVG candlestick bars
- Lucide `Bitcoin` icon
- Description preserved from data

### PC Tech Exploration
- Glass card: Lucide icons `Cpu`, `Monitor`, `MemoryStick`, `Layers`
- Mini spec-sheet aesthetic with monospace labels
- Description from updated `portfolio_data.js`

### AI Experimentation
- Existing description and icon preserved

---

## Contact

- Glass form container using GlassCard (3D tilt)
- Inputs: glass bg, floating label (`position: absolute`, transitions up + smaller on `:focus` / `:not(:placeholder-shown)`)
- Submit: neon gradient button with `box-shadow` pulse on hover
- Fields: Name, Email, Message (textarea)
- **Submission:** UI-only. `onSubmit` prevents default and shows an inline success message ("Message sent!") replacing the button text for 3 seconds. No backend or third-party service used.

---

## Build Notes

- RAWG API key: register free at rawg.io → add `VITE_RAWG_API_KEY=your_key` to `.env`
- All Framer Motion APIs used (`useMotionValue`, `useSpring`, `useTransform`) are available in v12
- `backdrop-filter` works in all modern browsers; no polyfill needed
- `public/bg-wallpaper.jpg` can be kept but is no longer referenced
