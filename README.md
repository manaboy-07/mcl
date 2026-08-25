# Manifold Computers — Next.js migration

Restructured from the single Figma-export component into an App Router
project. Drop the `src/` folder into your Next.js app (or merge it if you
already have one).

## Assumptions

- **Next.js 13+ App Router, TypeScript.**
- **Path alias `@/*` → `./src/*`.** This is the default for `create-next-app`
  with the `src/` option. If your `tsconfig.json` doesn't have it yet, add:
  ```json
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
  ```
- No Tailwind dependency. The original had two spots using Tailwind
  syntax (the hero SVG's `className` and the contact form's `inputCls`)
  while everything else was inline styles — an inconsistency, and Tailwind
  wasn't actually doing anything for the other 95% of the file. I moved
  those two into CSS Modules as well so the whole thing is self-contained
  and doesn't silently break if Tailwind isn't configured in your project.

## Structure

```
src/
  app/
    layout.tsx        — metadata, Inter font, imports globals.css
    page.tsx           — thin server wrapper around <Home />
    globals.css         — reset only; no page-specific rules
  components/
    Home.tsx            — composes Nav + all five slides, owns contact form state
    Nav.tsx              — logo, progress dots, pause/play
    Slide.tsx            — shared fixed-position slide shell
    HeroIllustration.tsx — the server-rack/cloud/laptop SVG
    slides/
      SlideComingSoon.tsx
      SlideHero.tsx
      SlideSolutions.tsx
      SlidePartners.tsx
      SlideContact.tsx
  hooks/
    useSlideDeck.ts    — all the state: current index, direction, auto-advance
                          + progress ring, wheel/keyboard/touch listeners
  lib/
    constants.ts        — slide order, timing constants (was magic numbers)
  data/
    solutions.ts
    partners.ts
```

## Behavioural changes from the original

1. **Fixed a dead button.** "Contact Us" on the coming-soon slide called
   `document.getElementById("contact-slide")?.click()` — no element with
   that id exists anywhere, so it silently did nothing. It now calls
   `goTo(4)` like the rest of the navigation does.
2. **Hover states moved from JS to CSS.** The solutions cards, partner
   grid cells, and nav pause button drove hover styling with
   `onMouseEnter`/`onMouseLeave` re-renders. They're now plain `:hover` in
   CSS Modules — same look, no re-render on every mouse move.
3. **Keyframes centralized.** `float` and `pulse` were duplicated in a
   `<style>` tag with no scoping (would apply anywhere) — hoisted into the
   CSS Modules that actually use them.
4. **Contact form is typed.** Replaced `Record<string, string>` /
   `(s: any) =>` with a `ContactFormState` interface.

Everything else — layout, copy, colors, spacing, the scroll-hijack
transition logic, the 5s auto-advance with an 8s pause-on-interaction — is
unchanged.

## Worth knowing about

Your other Manifold work uses GSAP + Lenis + ScrollTrigger for scroll
animation. This deck reimplements scroll-hijacking by hand (wheel/touch
listeners + a lock ref + `setTimeout`-driven transitions). It works, but
if you want it to feel identical to the rest of your stack — or want
scroll-jacking that plays nicer with trackpads/momentum scrolling — that
logic in `useSlideDeck.ts` is the piece to swap for Lenis + ScrollTrigger's
`snap` config. Happy to do that pass if you want it.
