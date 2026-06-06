# ETRA v2.0 — Figma parity checklist (Section 14)

Align Figma file / variables with CSS custom properties in `src/theme/tokens.css`.

## 00_Design System

- [ ] Color variables: `color-primary`, `color-secondary`, `color-gradient`, backgrounds `bg-page`, `bg-section-alt`, `bg-section-gray`, table/tags, text, borders, status, shadows
- [ ] Typography: Cairo weights 400–800; scale Display / H1–H4 / Body-L / Body / Small / XS / Label; JetBrains Mono for code
- [ ] Icons: line/outlined style library
- [ ] Components: Navbar (public), Sidebar (dashboard), Cards, Buttons (primary / gradient / secondary / ghost / danger), Inputs, Select, Checkbox, Table, Badges, Progress bar, Modal, Avatar, Skeleton, Empty state, Course card, Stat card

## 01_Public (P-1–P-9)

- [ ] P-1 Landing · P-2 About · P-3 Pricing · P-4 Products · P-5 Blog list · P-6 Blog detail · P-7 Register · P-8 Login · P-9 Reset password

## 02_Student (S-1–S-18)

- [ ] Routes mirror `/student/...` in `AppRoutes.tsx`

## 03_Mentor (M-1–M-10)

- [ ] Routes mirror `/mentor/...`

## 04_Ambassador (A-1–A-5)

- [ ] Routes mirror `/ambassador/...`

## 05_Admin (AD-1–AD-18)

- [ ] Routes mirror `/admin/...` including `users/students/:id`, `users/mentors/:id`, `users/ambassadors/:id`

## 06_Shared (E-1–E-5)

- [ ] 404 · 500 · Maintenance · Skeleton variants · Empty states (see `/dev/ui-states`)

## 07_User flows

- [ ] Annotate flows from plan Section 10 on frames

## 08_Responsive

- [ ] 1440 · 1280 · 1024 · 768 — match `index.css` layout helpers and sidebar behavior

---

CSS token names use kebab-case with `--` prefix in code; in Figma use the same name without `--` (e.g. `color-primary`).
