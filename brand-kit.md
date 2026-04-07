# Prospera Analytics — Brand Identity Guide

**Version 1.0 · April 2026 · Confidential**

---

## 1. Colour Palette

| Token | Name | Hex |
|-------|------|-----|
| `--color-primary` | Primary Blue | `#1A56DB` |
| `--color-accent` | Accent Teal | `#0D9488` |
| `--color-tertiary` | Growth Green | `#059669` |
| `--color-primary-container` | Blue Container | `#E8EEFF` |
| `--color-on-surface` | Text Dark | `#101C2E` |
| `--color-on-surface-variant` | Text Variant | `#4A5568` |
| `--color-surface` | Surface | `#F8F9FC` |
| White | White | `#FFFFFF` |
| `--gradient-brand` | Brand Gradient | `135deg · #1A56DB → #0D9488 → #059669` |

**Usage rules:**
- Primary Blue is used for interactive elements (buttons, links, active states).
- Accent Teal is used for secondary CTAs, highlights, and illustrations.
- Growth Green is used for positive metrics (MoM growth, upward trends).
- The Brand Gradient is used for primary CTA buttons, the logo background, and hero accent elements.
- Never use low-contrast combinations. Minimum AA contrast ratio (4.5:1) on all text.

---

## 2. Typography

### Display — Instrument Serif
- **Use for:** Hero headlines, feature section titles, large pull quotes
- **Weights:** Regular (400), Italic
- **Characteristics:** Elegant, slightly editorial; contrasts with the more structured UI fonts
- **Google Fonts:** `Instrument+Serif:ital@0;1`

**Type scale:**
| Size | Use |
|------|-----|
| 52px | Page hero headline |
| 40px | Section title |
| 28px | Card or block headline |

### Heading — Poppins
- **Use for:** Section subheadings, navigation labels, badges, button labels, UI text
- **Weights:** SemiBold (600), Bold (700), ExtraBold (800)
- **Characteristics:** Geometric, precise, professional

### Body — Inter
- **Use for:** Body copy, descriptions, data labels, form text, footnotes
- **Weights:** Light (300) through Bold (700)
- **Characteristics:** Highly legible at all sizes; industry standard for data-heavy interfaces

---

## 3. Logo & Wordmark

The Prospera mark consists of:
1. The **P-icon** — a square icon with a rounded `P` or abstract financial mark
2. The **wordmark** — "Prospera Analytics" in Poppins ExtraBold (800)

**Placement:**
- Icon left, wordmark right, aligned centre
- Minimum clear space: equal to the height of the icon on all sides
- Minimum size: 24px icon height

**Approved backgrounds:**
- White (`#FFFFFF`) — primary usage
- Dark Navy (`#06101F`) — for dark mode or dark marketing materials
- Brand Gradient — acceptable for reversed/promotional uses

**Prohibited:**
- Do not recolour, distort, rotate, or modify the logo
- Do not place on low-contrast, busy, or patterned backgrounds
- Do not use the icon alone as a standalone marketing brand mark
- Do not substitute the Poppins wordmark with any other typeface

---

## 4. Spacing System

Based on an **8px base grid**. Always use these tokens — no arbitrary pixel values.

| Token | Value | Use |
|-------|-------|-----|
| `xxs` | 4px | Icon gaps, tight UI spacing |
| `xs` | 8px | Inline element gaps |
| `sm` | 16px | Component padding, card inner spacing |
| `md-` | 24px | Between related elements |
| `md` | 32px | Card-to-card gaps, section padding |
| `lg-` | 48px | Section top/bottom padding |
| `lg` | 64px | Major section breaks |
| `xl` | 80px | Page-level section spacing |

**Border Radius:**

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Tags, small chips |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Feature cards, modals |
| `--radius-full` | 9999px | Badges, pills |

---

## 5. Core Components

### Buttons

**Primary CTA:**
```css
background: linear-gradient(135deg, #1a56db, #0d9488);
color: #fff;
font-family: 'Poppins', sans-serif;
font-weight: 600;
padding: 12px 24px;
border-radius: 8px;
```

**Secondary (Outline):**
```css
background: transparent;
border: 1.5px solid #1a56db;
color: #1a56db;
font-family: 'Poppins', sans-serif;
font-weight: 600;
```

**Ghost:**
```css
background: #f8f9fc;
border: 1px solid #e2e8f0;
color: #101c2e;
```

### Badges

| Variant | Background | Text |
|---------|-----------|------|
| Primary | `#E8EEFF` | `#1A56DB` |
| Accent  | `#CCFBF1` | `#0F766E` |
| Success | `#D1FAE5` | `#065F46` |
| Warning | `#FFF3CD` | `#92400E` |

### Metric Cards

```
┌──────────────────────────────┐
│ MONTHLY CASH RUNWAY          │  ← 10px Poppins SemiBold, muted
│                              │
│ 8.2 mo                       │  ← 28px Inter ExtraBold, dark
│ ↑ +1.4 mo vs last quarter    │  ← 11px Inter SemiBold, green
│ Based on current burn rate   │  ← 12px Inter Regular, muted
└──────────────────────────────┘
```

---

## 6. Brand Voice & Tone

### Core Attributes

**Confident, Not Arrogant**
State facts and insights plainly. Let the data speak. Avoid superlatives, hype, or vague claims like "world-class" or "revolutionary".

**Clear, Not Simple**
Respect the intelligence of users. Explain financial concepts accessibly without dumbing them down. Jargon is fine when it's the most precise word.

**Reassuring, Not Alarmist**
Risk language should be informative, not fear-inducing. Frame risk as something to understand and manage — not something to dread.

**Singapore-First**
Reference local context: SGD, MAS regulations, local market conditions, and Singapore's business landscape wherever relevant.

### Writing Principles

| Do | Don't |
|----|-------|
| Use active voice ("Prospera tracks your cash flow") | Use passive voice ("Cash flow is tracked") |
| Be specific ("Save 3 hours per week") | Be vague ("Save time") |
| Name the geography ("Singapore SMEs") | Use generic global language |
| State the metric ("Avg 8.4% reduction in risk exposure") | Use unsupported claims |
| Write in complete, clear sentences | Use excessive bullet points as a crutch |

### Legal Disclaimer (Required in Financial Contexts)

> Prospera provides financial analytics for informational purposes only. Nothing on this platform constitutes financial advice, investment recommendations, or solicitation. Prospera is not licensed by the Monetary Authority of Singapore (MAS) to provide financial advisory services. All investment decisions remain solely with the user.

---

*Prospera Analytics © 2026 — Confidential & Proprietary · hello@prospera.io*
