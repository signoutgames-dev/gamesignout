# SIGNOUT — Design System & Screen Specifications

**Mobile-First | Clean Maximalism | Emotionally Warm Social Gaming**

---

## DESIGN PHILOSOPHY

**Clean Maximalism** balances expressive visual richness with refined restraint:

- **Bold without chaos**: Strong colors and oversized elements, but never cluttered
- **Warm but premium**: Emotional resonance meets modern sophistication
- **Controlled abundance**: Every visual element earns its space
- **Tactile minimalism**: Smooth interactions with personality

The product feels like a **contemporary social app** (Instagram meets Wordle meets a warm gathering)—not a game, but a social experience wrapped in interactive moments.

---

## PART 1: GLOBAL DESIGN SYSTEM

### **TYPOGRAPHY DIRECTION**

**Hierarchy Philosophy**: Clear information architecture through scale, weight, and warmth.

```
PRIMARY HEADING (Game Discovery, Section Titles)
├─ Weight: 700 (Bold)
├─ Size: 32px (mobile) / 40px (tablet)
├─ Line Height: 1.2
├─ Warmth: Primary brand color or category color
└─ Purpose: Entry points, visual anchors, emotional tone

SECONDARY HEADING (Card titles, Category labels)
├─ Weight: 600 (Semibold)
├─ Size: 20px
├─ Line Height: 1.3
├─ Warmth: Category-themed or neutral-dark
└─ Purpose: Content structure, scannable sections

BODY TEXT (Descriptions, rules, prompts)
├─ Weight: 500 (Medium) for emphasis, 400 (Regular) for reading
├─ Size: 16px (body), 18px (prompts/challenges)
├─ Line Height: 1.5 (body), 1.6 (prompts)
├─ Warmth: Neutral dark (not pure black)
└─ Purpose: Readable, warm, conversational tone

SUPPORTING TEXT (Meta info, timestamps, tags)
├─ Weight: 500
├─ Size: 13px
├─ Line Height: 1.4
├─ Warmth: Secondary gray, category accents
└─ Purpose: Context, hierarchy, visual rhythm breaks
```

**Font Pairing**:
- **Display/Headlines**: `Inter` or `Poppins` (modern, geometric, warmth through weight)
- **Body**: `Inter` or `Outfit` (consistent, readable, contemporary)
- **Accent**: Consider `Crimson Text` or `Merriweather` for emotional moments (rulebook, sign-in messages)

**Key Principle**: Typography creates rhythm. Generous line heights (1.5+) feel luxurious and readable. Weight variation (not size alone) creates hierarchy.

---

### **SPACING SYSTEM**

**Modular 8px Grid** (mobile-first):

```
xs: 4px    (micro spacing, badges, icons)
sm: 8px    (tight spacing, inline elements)
md: 12px   (comfortable spacing, most components)
lg: 16px   (generous spacing, section breaks)
xl: 24px   (strong breathing room, major sections)
xxl: 32px  (immersive spacing, card tops, headers)
xxxl: 48px (edge case: full sections, splash moments)
```

**Application Pattern**:
- **Cards**: 16px internal padding (top/bottom), 20px (left/right)
- **Between cards**: 12px–16px gap (vertical)
- **Section margins**: 24px top, 16px bottom
- **Header to content**: 32px (creates anchor feeling)
- **Safe edges**: 16px minimum from screen edge
- **Interactive elements**: 44px minimum tap target (touch-friendly)

**Breathing Space Philosophy**: White space is not empty—it's a design material that creates clarity and emotional room. Maximize vertical breathing in the core game experience.

---

### **BORDER RADIUS PHILOSOPHY**

**Hierarchy of Roundness** (creates visual personality):

```
sharp:     0px       (rare—hard edges contradict warmth)
subtle:    4px       (badges, small accents, secondary buttons)
soft:      12px      (input fields, utility components)
warm:      16px      (standard cards, rounded buttons, social elements)
embracing: 20px–24px (hero cards, premium modals, game prompts—main focus)
full:      999px     (pill buttons, small badges, avatars, micro-interactions)
```

**Logic**: Larger, more emotionally important elements get rounder corners. The game prompt card (24px) feels more embracing than a category chip (12px).

**Effect**: Rounded corners soften maximalism—bold colors feel playful, not aggressive.

---

### **MOTION PHILOSOPHY**

**Principle**: Motion enables tactile clarity without distraction.

```
ENTRANCE/EXIT
├─ Timing: 200–300ms (feel responsive, not slow)
├─ Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (slight overshoot, playful)
└─ Effect: Scale + fade (emotionally warm arrival)

CARD TRANSITIONS (Discovery page, rulebook swipes)
├─ Timing: 250–400ms (smooth but snappy)
├─ Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) (smooth linear acceleration)
└─ Movement: Slide + subtle depth (not dramatic, focused)

PROMPT NAVIGATION (Game experience—critical)
├─ Timing: 300–350ms (deliberate, not rushed)
├─ Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce arrival)
└─ Direction: Directional slide (left button → left exit, right → right exit)
└─ Feel: Tactile, like flipping a card smoothly

FEEDBACK MICRO-INTERACTIONS
├─ Timing: 100–150ms (instant acknowledgment)
├─ Easing: cubic-bezier(0.68, -0.55, 0.265, 1.55) (snappy bounce)
└─ Scale: 1 → 1.05 → 1 (satisfying press response)

EXPANSION/COLLAPSE (Modals, overlays)
├─ Timing: 200–250ms
├─ Easing: cubic-bezier(0.23, 1, 0.320, 1) (overshoot pop)
└─ Effect: Backdrop fade + scale-from-bottom
```

**Non-Examples** (Avoid):
- No page transitions that feel like traditional app navigation
- No rapid sequencing that creates visual fatigue
- No animations that feel like they're showing off

**Goal**: Motion should feel like a trusted friend guiding you through an experience, not like a designer showing off.

---

### **COLOR BEHAVIOR**

**Primary Brand**: Warm, accessible, emotionally inclusive

- **Primary**: `#FF6B5B` (coral-warm red) or `#FF6B8A` (playful pink)
- **Secondary**: `#6B8BFF` (cool playful blue)
- **Accent**: `#FFD66B` (warm golden-yellow)

**Category Color System** (each game category gets a personality):

```
COUPLE GAMES:      Warm pink/magenta    (#FF6B8A)  — intimate, flirty
PARTY GAMES:       Vibrant orange       (#FF8C42)  — energetic, fun
FAMILY GAMES:      Warm purple          (#B88BFF)  — inclusive, playful
CONVERSATION:      Soft teal            (#4ECDC4)  — thoughtful, connecting
FRIENDS GAMES:     Bright lime-green    (#A8FF42)  — energetic, bold
```

**Neutral Palette** (readability + elegance):
- **Text Primary**: `#1A1A1A` (not pure black—warmer, easier on eyes)
- **Text Secondary**: `#666666` (meta info, supporting text)
- **Backgrounds**: `#FFFFFF` or `#F8F7F6` (warm white, not clinical)
- **Borders**: `#E8E7E6` or category color at 15% opacity (context-aware)
- **Overlay/Backdrop**: `rgba(0, 0, 0, 0.5)` with slight warm tint for modals

**Application Logic**:
- **Cards**: White background, category color accent (top stripe or icon)
- **Buttons**: Category color fill (primary), white text, 16px rounded
- **Interactive elements**: Category color + hover state (10% darker)
- **Progress**: Gradient category color (visual progression feel)
- **Badges**: Category color background, white text, 12px rounded

**Color Psychology**: Colors aren't just visual—they're emotional cues. Warm colors (coral, pink, orange) feel social and inviting. Cool accents (teal, blue) provide visual rest and sophistication.

---

### **VISUAL RHYTHM & HIERARCHY LOGIC**

**The Grid**:
- **Discovery page**: 2-column card layout on mobile (fills screen width with 16px edge margin)
- **Game experience**: 1 full-bleed focal card (centered, breathing room above/below)
- **Modals**: 90% width on mobile, 16px margin, rounded 24px

**Dominance Pyramid** (what should draw the eye first):
1. **Game prompt text** (largest, warmest color, most breathing space)
2. **Category/theme indicator** (color accent, visual signature)
3. **Supporting metadata** (tags, player count, duration—smaller, secondary color)
4. **Interaction buttons** (bottom of visual hierarchy, always accessible)

**Visual Contrast**:
- Use color saturation (not just tone) to create depth
- Warm colors advance; cooler backgrounds recede
- Hierarchy through size: 24px → 20px → 16px → 14px (clear steps)
- Hierarchy through weight: 700 → 600 → 500 → 400 (distinct jumps)

---

### **INTERACTION CONSISTENCY**

**Button Logic**:
- **Primary CTA** (continue, play, create): Category color fill, white text, 16px rounded, 44px height
- **Secondary** (learn more, skip): Border only (2px category color), transparent fill, category text color, 16px rounded, 44px height
- **Tertiary** (dismiss, not now): Text-only, gray, no background, underline on press

**Interactive States**:
- **Default**: Full opacity, 1px shadow or none
- **Hover**: 10% darker fill, slight scale 1.02x
- **Active**: 20% darker fill, internal shadow
- **Disabled**: 50% opacity, cursor not-allowed, no interaction

**Tap Feedback**: All interactive elements should have subtle tactile response (scale bounce 1.05x + 100ms fade).

**Focus States** (accessibility): 2px focus ring in category color, offset 2px from element.

---

### **ICON STYLE**

**System**: Custom outlined icons (not filled, not geometric, not minimalist).

**Characteristics**:
- **Stroke weight**: 2px (readable, not delicate)
- **Roundness**: 8–12px radius on corners (matches brand warmth)
- **Style**: Modern but friendly, not corporate, not trendy
- **Size palette**: 16px (inline), 20px (supporting), 24px (navigation), 32px (hero moments)

**Icon Usage**:
- Category indicators (game types)
- Rulebook trigger
- Favorite/save
- Navigation (back, forward in game)
- Social proof (players, favorites)
- Progress indicators
- Settings, profile, menu

**Sourcing**: Consider Feather Icons, Heroicons (outline), or custom set designed for warmth.

---

## PART 2: DISCOVERY PAGE

### **PURPOSE & FUNCTION**

Users arrive to explore what games are available. This is the **gateway to engagement**—it should feel welcoming, organized, and playfully abundant without overwhelming.

**Key Goals**:
- Quick visual scanning of game categories
- Immediate discovery of trending/new games
- Social proof driving curiosity ("played by friends")
- Easy filtering/navigation
- Smooth, app-like feel

---

### **LAYOUT STRUCTURE**

```
┌─────────────────────────────────┐
│ STICKY HEADER (Not scrolling)   │  ← Orange/Brand color background
├─────────────────────────────────┤
│ "Signout" logo + profile icon   │   16px padding, 48px height
├─────────────────────────────────┤
│ [STICKY CATEGORY TABS]          │   ← Horizontal scroll, underline indicator
│ All  Couples  Party  Family...  │   16px horizontal margin
├─────────────────────────────────┤
│ SCROLLABLE CONTENT AREA         │
│                                 │
│ ┌─────────┬─────────┐          │   2-column grid
│ │ CARD    │ CARD    │          │   16px margin, 12px gap
│ │ (24px   │ (24px   │          │
│ │ radius) │ radius) │          │
│ ├─────────┼─────────┤          │
│ │ CARD    │ CARD    │          │   Staggered feel
│ └─────────┴─────────┘          │   Category color accent (top stripe)
│                                 │
│ [LOAD MORE / INFINITE SCROLL]  │   At bottom
│                                 │
└─────────────────────────────────┘
```

**Header Behavior**:
- **Sticky positioning**: Header stays at top as content scrolls
- **Height**: 48px (compact, mobile-friendly)
- **Content**: Left—"Signout" wordmark or logo (20px, bold); Right—user profile avatar (32px, circular)
- **Background**: Brand primary color or white with subtle shadow
- **Tap zones**: Logo (home), profile (settings)

**Category Tabs**:
- **Sticky below header** (or sticky with header—depends on design refinement)
- **Style**: Horizontal scrolling chip bar (if many categories)
- **Active indicator**: Underline in category color, text bold
- **Inactive**: Gray text, regular weight
- **Spacing**: 8px between tabs, 16px horizontal margin from edge
- **First tab**: "All" (shows all games), others are category-specific

---

### **CARD DESIGN & VISUAL HIERARCHY**

**Card Structure** (per card):

```
┌──────────────────┐
│ [CATEGORY COLOR] │  ← 4px color stripe (or small accent icon)
│ ┌────────────────┐
│ │ GAME TITLE     │  ← 20px, bold (600), category color text
│ │ "Never Have I" │
│ │                │
│ │ 🎭 Couple game │  ← Tag: category label + emoji/icon
│ │ 👥 2–4 players │  ← Meta info: player count
│ │ ⏱️  5–10 min    │  ← Meta info: duration
│ │                │
│ │ ♡ 234 likes    │  ← Social proof: hearts/favorites
│ │ "Played by     │
│ │  Sarah & Tom"  │  ← Social proof: names (smaller, secondary gray)
│ │                │
│ └────────────────┘
│ ┌────────────────┐
│ │ [TRENDING ⭐]  │  ← Optional badge (top-right corner or inline)
└──────────────────┘
```

**Card Specifications**:
- **Dimensions**: Full width (100%) minus 16px margins on each side, so ~(width - 32px) / 2 per card in 2-column layout
- **Aspect Ratio**: 4:5 (portrait, content-focused)
- **Background**: White (`#FFFFFF`)
- **Border Radius**: 24px (warm, embracing)
- **Shadow**: Subtle (0 2px 8px rgba(0,0,0,0.08)) — elevation without weight
- **Padding**: 16px internal (top/bottom), 20px (left/right)
- **Border**: 2px top stripe in category color OR small icon accent

**Content Hierarchy Within Card**:
1. **Category accent** (visual anchor, ~4–8px top stripe)
2. **Game title** (20px bold, primary color or category color)
3. **Category label** (13px, secondary gray + emoji for warmth)
4. **Meta tags** (13px, secondary gray, icon + text)
5. **Social proof** (12px, secondary gray, secondary icon, warmth through names)
6. **Badge** (optional, "Trending", "New"—position: top-right corner, 8px margin)

**Card Interaction**:
- **Tap**: Navigate to game experience / start game
- **Hover** (desktop): Scale 1.02x, shadow deepens slightly
- **Feedback**: Scale feedback (1.05x) on press

---

### **SPACING STRATEGY**

- **Vertical gap between card rows**: 12px (tight but breathing)
- **Horizontal gap between columns**: 12px (compact, focused)
- **Top margin** (below category tabs): 24px
- **Bottom margin** (infinite scroll trigger): 48px
- **Text spacing within card**: 8px between title and tags, 8px between tags

**Why This Spacing**:
- Tight gaps keep focus on cards without claustrophobia
- Generous vertical margins (top/bottom) provide immersive entering/exiting
- Internal card spacing creates sub-hierarchy (title → meta → social proof)

---

### **COLOR APPLICATION**

- **Header**: Brand color (`#FF6B5B` or category-dynamic)
- **Card accent**: Category-specific color (4px stripe or icon)
- **Title text**: Category color (tinted 20% darker than accent for contrast)
- **Meta text**: Secondary gray (`#666666`)
- **Social proof**: Softer gray (`#999999`)
- **Badges**: Category color background, white text

**Color Rhythm**: Eyes follow color. Each card's accent immediately signals its category before reading. This creates visual rhythm and scanability.

---

### **SCROLLING BEHAVIOR**

- **Momentum scrolling**: Native mobile feel (smooth, not sticky)
- **Infinite scroll trigger**: 60% down the page (load next batch)
- **No pagination buttons**: Feels dated; infinite scroll is modern
- **Loading state**: Subtle skeleton cards (placeholder gray cards) appear below
- **Pull-to-refresh** (optional): Refresh game feed

**Gesture Support**:
- **Swipe down** on header: Potentially pull-to-refresh (but optional)
- **Tap category chip**: Filter cards by category (optional smoothness: fade-in new cards)

---

### **DESIGN DIRECTION SUMMARY**

| Aspect | Direction |
|--------|-----------|
| **Visual Dominance** | Cards are the hero; header is minimal context |
| **Hierarchy** | Title → Tags → Meta → Social proof (clear reading order) |
| **Spacing Rhythm** | Tight horizontal (12px gaps), generous vertical (24px sections) |
| **Color Behavior** | Each category has a signature color that identifies game type |
| **Movement** | Smooth momentum, no stickiness, immersive scrolling |
| **Card Design** | Large, rounded, white, with color accent stripe (warm, not cold) |
| **What Should Dominate** | The grid of cards; the layout is a gallery, not a UI |
| **Simplicity** | No clutter: title + category + meta + social proof. Nothing else. |
| **App Feel** | Native mobile scrolling, no web-like pagination, modern proportions |

---

## PART 3: RULEBOOK PAGE / OVERLAY (LIGHTWEIGHT MODAL)

### **PURPOSE & FUNCTION**

Users need to understand game rules quickly *without* leaving the discovery flow. This is a **lightweight interrupt**—it should feel like a helpful friend leaning over to explain, not a heavy form.

**Key Goals**:
- Teach game rules in <30 seconds of reading
- Non-intimidating, warm tone
- Easy to dismiss/close
- Maintains immersion in the game exploration flow
- Mobile-optimized (bottom sheet style)

---

### **INTERACTION & BEHAVIOR**

**Trigger Point**:
- Small info icon (ⓘ or ?) on game card
- Or "How to Play" link within game experience

**Overlay Style**: **Bottom Sheet Modal**
- Appears from bottom of screen
- Covers ~70% of screen height (not full screen)
- Semi-transparent black backdrop (0.5 opacity)
- Can dismiss by:
  - Swiping down
  - Tapping backdrop (outside modal)
  - Tapping close button (top-right X)

---

### **LAYOUT STRUCTURE**

```
┌─────────────────────────────────────┐
│  [Backdrop - semi-transparent]      │  ← Tappable to dismiss
├─────────────────────────────────────┤
│         [BOTTOM SHEET RISES]        │
│ ┌──────────────────────────────────┐│
│ │ ▬▬▬▬▬ [DRAG HANDLE]             ││  ← Indicates swipe-down dismissal
│ │ ┌────────────────────────────────┤│
│ │ │ Game Name                      ││  ← 28px bold, brand/category color
│ │ │ "Never Have I"                 ││
│ │ │                                ││
│ │ │ HOW TO PLAY                    ││  ← 14px all-caps, secondary gray
│ │ │ ─────────────────────────────── ││  ← Divider line
│ │ │                                ││
│ │ │ 1. One person asks the group  ││  ← Step 1: 16px, bold "1."
│ │ │    a "never have I" question  ││     Body text: 16px regular, 1.5 line-height
│ │ │    to spark conversation      ││
│ │ │                                ││  ← 12px gap between steps
│ │ │ 2. Others share if they have  ││
│ │ │    done it, or pass if not    ││
│ │ │                                ││
│ │ │ 3. Take turns asking until    ││
│ │ │    conversations get deeper   ││
│ │ │                                ││
│ │ │ 💡 TIP                         ││  ← Lightbulb icon + warmth
│ │ │ These questions are about     ││     "TIP" label: 14px bold, category color
│ │ │ getting to know each other,   ││     Tip text: 14px, italic or lighter weight
│ │ │ not judgment. Have fun! 😊    ││
│ │ │                                ││
│ │ │ ┌──────────────────────────────┤│  ← CTA buttons
│ │ │ │ [CLOSE] [READY TO PLAY >]   ││  ← Two buttons or single confirm
│ │ │ └──────────────────────────────┤│
│ │ └────────────────────────────────┤│
│ └──────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

### **COMPONENT SPECIFICATIONS**

**Modal Container**:
- **Height**: 65–75% of viewport (enough for 3–4 steps + tip)
- **Width**: 100% on mobile
- **Border Radius**: 24px top only (bottom edges hidden off-screen)
- **Background**: White (`#FFFFFF`)
- **Elevation**: Shadow cast upward (0 -4px 12px rgba(0,0,0,0.15))
- **Padding**: 24px top/bottom, 20px left/right

**Drag Handle**:
- **Position**: Top center, inside modal
- **Style**: Rounded bar (4px height, 40px width, `#DDD` color)
- **Purpose**: Visual cue that this is swipeable/dismissible
- **Margin**: 8px top inside modal

**Typography**:
- **Game Title**: 28px bold, category color
- **Section Label** ("HOW TO PLAY"): 14px all-caps, secondary gray, 8px letter-spacing, 24px margin-top
- **Divider**: 1px border-bottom, `#E8E7E6`
- **Step Number**: 20px bold, category color
- **Step Text**: 16px regular, `#1A1A1A`, 1.5 line-height
- **Tip Label**: 14px bold, category color
- **Tip Text**: 14px regular (or italic), `#666666`, 1.5 line-height

**Spacing**:
- **Between steps**: 16px gap
- **Between "HOW TO PLAY" label and first step**: 16px
- **Between last step and "TIP"**: 24px
- **Between tip and buttons**: 24px

---

### **BUTTON LAYOUT**

**Two-Button Design** (if multiple actions):
- **Left**: [CLOSE] (secondary button—white border, gray text, 44px height)
- **Right**: [READY TO PLAY >] (primary button—category color fill, white text, 44px height)
- **Gap between**: 12px
- **Both**: 16px rounded, font 16px bold

**Alternative** (single button):
- Just [READY TO PLAY] centered, full width

**Interaction**:
- Both buttons tap to dismiss modal + trigger action
- Backdrop tap dismisses without action

---

### **OVERLAY BEHAVIOR & MOTION**

**Entrance Animation** (250ms):
- Modal slides up from bottom (translate Y: 100% → 0%)
- Backdrop fades in (opacity: 0 → 0.5)
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce arrival)

**Exit Animation** (200ms):
- Modal slides down (translate Y: 0% → 100%)
- Backdrop fades out (opacity: 0.5 → 0)
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) (smooth linear)

**Swipe-Down Gesture**:
- User drags modal down from top (drag handle or anywhere in modal)
- Modal follows finger (translate Y increases)
- If >30% dragged, snaps closed on release
- If <30% dragged, snaps back open
- Feels tactile, not forced

---

### **READABILITY STRATEGY**

- **Max line length**: ~50–60 characters (mobile optimized)
- **Step numbers** (1, 2, 3) are large and colored, creating visual anchors
- **Short paragraphs**: Each step is 1–2 sentences max
- **Generous line-height** (1.5): Breathing room, easy to scan
- **Tip callout**: Different visual treatment (icon + color) signals "pro tip" feeling
- **No wall of text**: Information is chunked into digestible pieces

---

### **INFORMATION GROUPING**

```
GROUP 1: Title (emotional, game-specific)
GROUP 2: Section label + divider (structural marker)
GROUP 3: Numbered steps (sequential instructions)
GROUP 4: Tip section (bonus wisdom, friendly tone)
GROUP 5: Action buttons (clear CTAs)
```

Each group has visual separation (spacing or divider) so the eye knows when one section ends and another begins.

---

### **DESIGN DIRECTION SUMMARY**

| Aspect | Direction |
|--------|-----------|
| **Feel** | Lightweight, helpful, not intrusive |
| **Interaction** | Bottom sheet (modern mobile pattern), swipe-dismissible |
| **Tone** | Conversational, warm, brief (not tutorial-heavy) |
| **Typography** | Large title, bold step numbers, easy-to-scan body text |
| **Spacing** | Generous (24px sections), readable paragraphs (50–60 char width) |
| **Motion** | Smooth slide + fade, bounce arrival, tactile swipe |
| **Readability** | Short steps, step numbers as visual anchors, tip callout stands out |
| **Simplicity** | No complex illustrations; text-driven with icons for warmth |
| **Dismissal** | Three ways: close button, swipe down, tap backdrop |
| **Immersion** | Feels like part of the game flow, not a separate "help" layer |

---

## PART 4: GAME EXPERIENCE PAGE (CORE PRODUCT — MOST IMPORTANT)

### **PURPOSE & FUNCTION**

This is where the magic happens. Users engage with prompts, questions, or challenges. This experience must feel:
- **Immersive**: Full attention on the content, not the UI
- **Tactile**: Interactions feel natural and responsive
- **Emotional**: Warm, inviting, not clinical
- **Focused**: One prompt at a time, minimal distractions
- **Socially Fun**: Encourages sharing and connection

**Critical Success**: Users forget they're using an app and feel like they're in a social moment.

---

### **LAYOUT STRUCTURE**

```
┌─────────────────────────────────────┐
│ [TOP NAVIGATION BAR]                │  ← Minimal, contextual
├─────────────────────────────────────┤
│ [GAME TITLE / CATEGORY]             │  ← Category color, 16px
├─────────────────────────────────────┤
│                                     │
│          [BREATHING SPACE]          │  ← 24px vertical margin
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║                               ║   │  Focused card container
│ ║    [CATEGORY COLOR ACCENT]    ║   │
│ ║                               ║   │
│ ║  PROMPT CARD                  ║   │  ← This is the star
│ ║  (Oversized, warm,            ║   │     24px radius border
│ ║   emotionally rich)            ║   │     Large breathing space
│ ║                               ║   │
│ ║  "What would make             ║   │  ← 32–36px text
│ ║   this moment perfect?"        ║   │     Conversational tone
│ ║                               ║   │  ← 8px padding top/bottom
│ ║  [GAME EMOJI/ICON]            ║   │     for emphasis
│ ║                               ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│          [BREATHING SPACE]          │  ← 32px (generous)
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  [◄ PREV]      [NEXT ►]         │ │  ← Navigation buttons
│ │  Centered, secondary placement  │ │     16px rounded, white + outline
│ └─────────────────────────────────┘ │
│                                     │
│  ┌──┐        PROGRESS BAR        ┌──┐ │  ← Linear progress at bottom
│  │ ♡│ 23/50 cards │████░░░░░│  │≡ │ │     Icons: heart (fav), menu
│  └──┘                            └──┘ │
│                                     │
└─────────────────────────────────────┘
```

---

### **TOP NAVIGATION BAR**

**Purpose**: Minimal context + quick exits

**Contents**:
- **Left**: Back arrow (←) to exit game
- **Center**: Game title (14px, secondary gray, optional)
- **Right**: Rulebook icon (ⓘ, triggers modal)

**Specifications**:
- **Height**: 44px
- **Padding**: 8px top/bottom, 16px left/right
- **Background**: White or transparent (depends on fullscreen mode)
- **Border-bottom**: Subtle 1px divider (`#E8E7E6`)
- **Icon size**: 24px (tappable 44px zone)
- **Tap feedback**: Icons scale 0.95x on press

**Behavior**:
- **Back arrow**: Confirm exit dialog (optional) or direct exit to discovery
- **Rulebook icon**: Opens bottom sheet modal (rulebook page)
- Both icons always accessible, non-intrusive

---

### **CATEGORY INDICATOR (BELOW HEADER)**

**Purpose**: Remind users which game category they're playing

**Content**:
- **Left icon**: Category emoji (🎭 for couples, 👥 for party, etc.)
- **Text**: Category name (14px, secondary gray)
- **Optional**: Player count or difficulty badge

**Specifications**:
- **Height**: 32px
- **Padding**: 8px left/right
- **Position**: Just below header, full width background (optional subtle category color at 10% opacity)
- **Font**: 14px medium, secondary gray

**Example**: "🎭 Couple Games" or "👥 Party • 4 players"

---

### **BREATHING SPACE (CRITICAL)**

**Top Breathing Space** (Header to card):
- **Margin**: 32px (creates anchor, signals "important content below")
- **Purpose**: Eyes rest before focusing on prompt

**Side Breathing Space**:
- **Margin**: 20px left/right (card width = 100% - 40px)
- **Purpose**: Card feels centered, focused, not edge-to-edge

**Bottom Breathing Space** (Card to buttons):
- **Margin**: 32px (generous, signal that buttons are secondary)
- **Purpose**: Card content has plenty of room; buttons feel separate but accessible

---

### **PROMPT CARD (HERO ELEMENT)**

This is the **focal point of the entire experience**. Every design decision should support this card's primacy.

**Structure**:

```
┌──────────────────────────────────┐
│ [CATEGORY COLOR TOP ACCENT]      │  ← 8px height, full width
├──────────────────────────────────┤
│                                  │  ← 24px padding (top/bottom)
│  [GAME ICON - OPTIONAL]          │     32px padding (left/right)
│  (Emoji or small icon, 32px)     │
│                                  │
│  "What would make this           │  ← 32–36px font size
│   moment perfect?"               │     700 weight (bold)
│                                  │     Line-height: 1.4 (tight, powerful)
│  [Optional: subtitle or          │     Color: Primary text (`#1A1A1A`)
│   context text below]            │     Conversational, warm tone
│                                  │
│  [OPTIONAL: SECONDARY TEXT]      │  ← 16px, secondary gray
│  e.g., "For 2–4 players"         │     Provides context
│                                  │
└──────────────────────────────────┘
```

**Card Specifications**:
- **Dimensions**: 100% width - 40px (20px margin each side)
- **Height**: Auto (content-driven, typically 180–240px)
- **Aspect Ratio**: None (height varies by prompt length)
- **Background**: White (`#FFFFFF`)
- **Border Radius**: 24px (warm, embracing)
- **Shadow**: Moderate (0 4px 16px rgba(0,0,0,0.1)) — premium elevation
- **Padding**: 24px top/bottom, 32px left/right
- **Border-top**: 8px solid category color (visual signature)

**Content Hierarchy**:
1. **Icon** (optional, 32px, category emoji or illustration)—sets tone
2. **Prompt text** (32–36px bold)—main content, highest contrast
3. **Subtitle/context** (16px secondary gray)—supporting info

---

### **TYPOGRAPHY WITHIN PROMPT CARD**

**Prompt Text**:
- **Size**: 32–36px (oversized, immersive)
- **Weight**: 700 (bold, commanding attention)
- **Color**: `#1A1A1A` (not pure black, warmer)
- **Line-height**: 1.4 (tight vertical rhythm, powerful delivery)
- **Letter-spacing**: 0 (normal, conversational)
- **Tone**: Direct, warm, conversational (not clinical or robotic)

**Examples** (good vs. bad):
- ✅ "What would make this moment perfect?" (warm, open-ended, inclusive)
- ✅ "Describe a time you felt truly seen." (emotional, specific, engaging)
- ❌ "Question: Describe your ideal scenario." (clinical, corporate tone)

**Subtitle/Context Text**:
- **Size**: 14–16px
- **Weight**: 500 (medium, less prominent than title)
- **Color**: `#666666` (secondary gray)
- **Line-height**: 1.5
- **Purpose**: Provide game type, player count, or difficulty hint

---

### **BUTTON PLACEMENT & INTERACTION**

**Navigation Buttons** (Below prompt card):

```
┌─────────────────────────────────┐
│                                 │
│    [◄ PREVIOUS]  [NEXT ►]       │  ← Centered layout
│                                 │
│    Each button: 140px width     │
│    Height: 44px                 │
│    Radius: 16px                 │
│    Gap between: 20px            │
│                                 │
└─────────────────────────────────┘
```

**Button Specifications**:

| State | Style |
|-------|-------|
| **Default** | White background, 2px category color border, category color text, 16px font bold |
| **Hover** | 10% darker category color fill, white text (on desktop) |
| **Active/Press** | 20% darker category color fill, white text, internal shadow |
| **Disabled** | 50% opacity (if no prev/next), cursor not-allowed |

**Interaction Behavior**:
- **Left button** (Previous): Disabled on first prompt, enabled after
- **Right button** (Next): Active always (except last card → "Finish" button)
- **Tap feedback**: Scale 1.05x on press (100–150ms duration)
- **Transition**: On tap, prompt card animates slide-exit (300–350ms)

**Keyboard Support** (desktop):
- **Arrow Left**: Trigger previous
- **Arrow Right** or **Space**: Trigger next
- **Escape**: Exit game

---

### **TRANSITION BEHAVIOR (CRITICAL)**

**Card-to-Card Navigation** (When user taps NEXT or PREVIOUS):

**Animation Sequence** (350ms total):

1. **Current prompt exit** (0–150ms):
   - Slides out in direction of navigation (right button → slide right off screen)
   - Fades out (opacity: 1 → 0)
   - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

2. **New prompt entrance** (150–350ms):
   - Slides in from opposite direction (if going right, comes from left)
   - Fades in (opacity: 0 → 1)
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce arrival)
   - Slight scale animation (0.95 → 1.0) for bounce effect

**Why Directional Movement**:
- **Semantic meaning**: Left button → left motion, right button → right motion
- **Tactile clarity**: User understands direction of navigation
- **Psychological**: Feels like flipping through a deck

**NOT Tinder-like swipes** (as requested):
- No full-screen card swipes
- No draggable cards
- Interaction is button-driven, not gesture-driven
- Buttons are in fixed position (thumb-friendly)

---

### **PROGRESS INDICATOR**

**Purpose**: Show users where they are in the game (out of 25 or 50 prompts)

**Style**: Bottom status bar

```
┌──────────────────────────────────┐
│ ♡ 23/50 cards  [████░░░░░]  ≡   │  ← Fixed at bottom during play
│ Left: Heart icon + count         │
│ Center: Linear progress bar      │
│ Right: Menu icon (settings)      │
└──────────────────────────────────┘
```

**Specifications**:
- **Position**: Fixed at bottom of screen (doesn't scroll)
- **Height**: 44px
- **Background**: Subtle gray or category color at 10% opacity
- **Padding**: 8px
- **Content spacing**: 16px between elements

**Left Icon (Heart/Favorite)**:
- **Icon**: Heart shape (24px)
- **Color**: Category color (or solid red `#FF6B5B`)
- **Tap behavior**: Toggles favorite (fills/unfills heart)
- **Counter**: "X/50" (showing current card / total cards)
- **Font**: 14px bold

**Progress Bar**:
- **Style**: Linear bar (2px height) with rounded ends
- **Fill**: Category color gradient (optional subtle animation)
- **Width**: ~60% of screen width
- **Background**: `#E8E7E6` (unfilled portion)

**Right Menu**:
- **Icon**: Three horizontal lines (hamburger or ≡)
- **Tap behavior**: Opens settings menu (optional: sound on/off, exit game, share)

---

### **FULLSCREEN MODE (OPTIONAL ENHANCEMENT)**

**Trigger**: Double-tap card or fullscreen icon

**Behavior**:
- Hides header, category indicator, progress bar
- Expands card to near-fullscreen (still maintains margins for thumb comfort)
- Card becomes the entire experience
- Tap card to exit fullscreen, or swipe down (optional)

**Specifications**:
- **Height**: ~85% of viewport (leaving room for top/bottom breathing)
- **Animation**: Smooth expand (200ms)
- **Exit**: Tap + fade out, or swipe down

---

### **MOTION PHILOSOPHY (DEEP DIVE)**

**Principle**: Motion serves **tactile clarity** and **emotional warmth**, not spectacle.

**Card Entry** (When game loads or navigation occurs):
- Duration: 300–350ms
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (slight overshoot—feels welcoming)
- Movement: Slide + scale (1.05 → 1.0)
- Effect: Card feels like it's being offered, not just appearing

**Card Exit** (On navigation):
- Duration: 200–250ms
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) (smooth deceleration)
- Movement: Directional slide (left/right based on button tapped)
- Effect: Card moves smoothly out of view, not jarring

**Button Press Feedback**:
- Duration: 100–150ms
- Easing: cubic-bezier(0.68, -0.55, 0.265, 1.55) (snappy bounce)
- Movement: Scale 1 → 1.05 → 1 (satisfying tactile response)
- Effect: Confirms interaction immediately

**Favorite Toggle** (Heart icon):
- Duration: 150–200ms
- Effect: Heart scales + tints color (if filling)
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

**What to Avoid**:
- ❌ Spinning or rotating cards (too playful for core experience)
- ❌ Fade-only transitions (no tactile quality)
- ❌ Slow animations >400ms (feels sluggish)
- ❌ Rapid sequencing (creates cognitive load)
- ❌ Parallax or complex timing (distracts from content)

**Motion Principle**: The app should feel like a trusted guide moving cards into view. Not a performer, but a facilitator of an experience.

---

### **BUTTON PLACEMENT & THUMB ZONES**

**Mobile Thumb Comfort** (Critical for one-handed play):

```
┌─────────────────────────┐  ← Top: Hard to reach
│ [HEADER]                │
├─────────────────────────┤
│                         │  ← Upper third: Reachable but strained
│                         │
│  [PROMPT CARD]          │  ← Middle: Prime real estate
│  (Centered, primary)    │
│                         │
│                         │  ← Lower third: Comfortable one-handed
│  [◄ PREV] [NEXT ►]      │  ← Bottom: PERFECT ZONE
│                         │
│  [PROGRESS BAR]         │  ← Very bottom: Secondary
└─────────────────────────┘
```

**Button Placement Logic**:
- **Buttons at bottom**: Easy to reach with thumb (sweet spot)
- **Buttons centered horizontally**: Reduces stretch
- **Button size**: 44px height (standard tap target, no strain)
- **Spacing between**: 20px (prevents accidental mis-taps)

**Effect**: User can play one-handed, comfortably, without fatigue. Premium mobile UX.

---

### **IMMERSION STRATEGY**

**How to Make This Feel Immersive**:

1. **Breathing Space**: Generous margins create focus. User sees only the prompt, nothing else matters.

2. **Minimal UI**: Header is hidden or minimal. Progress bar is subtle. Buttons are secondary. Content is hero.

3. **Warm Typography**: Large, bold text feels like being spoken to directly. Not clinical, but conversational.

4. **Smooth Motion**: Transitions feel natural, not mechanical. Directionality (left/right) is intuitive.

5. **Tactile Feedback**: Button presses have satisfying scale responses. Heart toggle animates. Interactions feel real.

6. **Category Immersion**: Color accent on card reminds user of game type without breaking immersion.

7. **No Distractions**: No ads, no notifications, no social media feeds—just the prompt and their experience.

8. **Progress Subtle**: Progress bar doesn't shout; it exists but doesn't demand attention. Users know progress without obsessing over it.

---

### **EMOTIONAL UX STRATEGY**

**Warm Moments** (Deliberate design for emotional connection):

- **Oversized typography**: Feels like being spoken to warmly, not directed
- **Rounded corners**: Soft, embracing, not harsh
- **Generous spacing**: Breathing room feels luxurious, premium
- **Category color accent**: Personal touch (game has a personality)
- **Optional emoji**: Adds playfulness without trying too hard
- **Bounce motion**: Arrival feels welcoming, not sudden
- **Favorite heart**: Small but present—feels like you're "collecting" moments
- **Conversational language**: Prompts feel like a friend asking, not a quiz

**Avoid**:
- ❌ Aggressive CTAs
- ❌ Pressure-driven design
- ❌ Generic corporate tone
- ❌ Cluttered information
- ❌ Fast, jarring animations

---

### **DESIGN DIRECTION SUMMARY**

| Aspect | Direction |
|--------|-----------|
| **Focal Point** | Oversized prompt card, centered, breathing room above/below |
| **Typography** | 32–36px bold prompt, conversational tone, warm colors |
| **Spacing** | 32px breathing (top/bottom), 20px side margins, generous internal padding |
| **Navigation** | Button-driven (not swipes), left/right + tactile feedback |
| **Motion** | Smooth, directional, tactile bounce (not flashy) |
| **Progress** | Subtle bar at bottom, not attention-seeking |
| **Buttons** | Thumb-zone friendly, secondary visual hierarchy |
| **Immersion** | Minimal UI, full focus on content, premium mobile feel |
| **Emotional Tone** | Warm, conversational, inviting (not pressuring) |
| **One-Handed Play** | Easy to reach buttons, comfortable thumb zones |
| **Fullscreen Option** | Hide non-essential UI, expand card, maintain breathing |

---

## PART 5: SIGN-IN / SUBSCRIPTION PANEL (SOFT NUDGE AFTER 25 CARDS)

### **PURPOSE & FUNCTION**

After ~25 cards, users have invested time and (presumably) enjoyed the experience. Now is the moment to invite them to create an account—not to paywall, but to **unlock continuity**: save favorites, track progress, get personalized recommendations, maintain their streak.

**Critical Framing**: This is not a payment wall. This is an **invitation to deepen the experience**.

**Key Goals**:
- Feel rewarding, not punishing
- Maintain warm tone (no FOMO-tactics)
- Quick, lightweight sign-in (Google/Apple)
- Optional: Show progress preview (favorites, streak, unlocked games)
- Easy to dismiss and continue (no aggressive lock)

---

### **INTERACTION TRIGGER**

**When**:
- User completes their 25th card
- Soft fade-in of overlay (backdrop + modal)
- Game does NOT stop; user can still see cards behind overlay

**How to Dismiss** (User agency is critical):
- Tap "Continue Playing Without Account"
- Tap backdrop (outside modal)
- Tap X button (top-right)
- After account creation, redirects to game experience

---

### **LAYOUT STRUCTURE**

```
┌─────────────────────────────────────┐
│  [Backdrop - semi-transparent]      │  ← Tappable to dismiss
├─────────────────────────────────────┤
│      [MODAL - CENTERED CARD]        │
│ ┌──────────────────────────────────┐│
│ │ [X] Close button (top-right)      ││
│ │                                  ││
│ │ 🎉 OR EMOJI CELEBRATING MOMENT   ││  ← Warmth, celebration
│ │                                  ││
│ │ "You're On Fire! 🔥"             ││  ← 28px bold, warm tone
│ │                                  ││
│ │ "25 cards played. Save your      ││  ← 16px, secondary gray
│ │  favorites and unlock more."     ││     Warm, conversational
│ │                                  ││
│ │ ─────────────────────────────── ││  ← Divider
│ │                                  ││
│ │ [PROGRESS PREVIEW] (optional)   ││  ← Show:
│ │ ♡ 5 favorites saved             ││     - Favorites count
│ │ 🎮 3 new games unlocked          ││     - Achievements
│ │ 🔥 5-game streak                 ││     - Streak
│ │                                  ││  ← 14px, category colors
│ │ ─────────────────────────────── ││
│ │                                  ││
│ │ [GOOGLE SIGN-IN BUTTON]          ││  ← 44px height
│ │                                  ││     Google blue + icon
│ │                                  ││
│ │ [APPLE SIGN-IN BUTTON]           ││  ← 44px height
│ │                                  ││     Black + icon
│ │                                  ││
│ │ ┌────────────────────────────────┤│  ← Secondary CTA
│ │ │ Continue Playing Without      ││
│ │ │ Signing Up                    ││
│ │ └────────────────────────────────┤│
│ │                                  ││
│ └──────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

### **MODAL SPECIFICATIONS**

**Container**:
- **Dimensions**: ~90% width on mobile, max 420px (tablet-friendly)
- **Height**: Auto (content-driven, typically 380–450px)
- **Border-radius**: 24px (warm, embracing)
- **Background**: White (`#FFFFFF`)
- **Shadow**: Substantial (0 8px 24px rgba(0,0,0,0.2))—premium elevation
- **Padding**: 32px top/bottom, 28px left/right

**Position**: Centered on screen (absolute/fixed positioning)

**Backdrop**:
- **Color**: `rgba(0, 0, 0, 0.6)` (darker than rulebook, more prominent)
- **Blur**: Optional 8px background blur (premium feel)
- **Tappable**: Yes—dismisses modal

---

### **CLOSE BUTTON**

**Position**: Top-right corner of modal, inside padding

**Style**:
- **Icon**: X (simple lines, 24px)
- **Color**: Secondary gray (`#999999`)
- **Size**: 32px tappable zone (centered 24px icon)
- **Interaction**: Tap to close modal + dismiss overlay
- **Hover**: Icon darkens (20%), subtle scale 0.95x

---

### **CELEBRATION/HEADING SECTION**

**Emoji/Icon**:
- Optional celebratory emoji (🎉 or 🔥)
- 40–48px size
- Category color or warm gold
- Positioned above heading

**Main Heading**:
- **Text**: "You're On Fire!" or "Milestone Unlocked!" or "You're Crushing It!"
- **Size**: 28px bold
- **Weight**: 700
- **Color**: Category color or brand warm color
- **Tone**: Celebratory, warm, encouraging (not clickbait)

**Supporting Text**:
- **Text**: "25 cards played. Save your favorites and unlock more."
- **Size**: 16px regular
- **Weight**: 500
- **Color**: Secondary gray (`#666666`)
- **Line-height**: 1.5
- **Tone**: Warm, inviting, conversational

---

### **PROGRESS PREVIEW** (Optional but Recommended)

**Purpose**: Show what they've accomplished + what they can unlock

**Content** (3 items, each on new line):
- ♡ X favorites saved
- 🎮 X new games unlocked
- 🔥 X-game streak

**Specifications**:
- **Each line**: 14px medium, secondary gray
- **Icons**: 16px, category color
- **Spacing**: 8px between lines
- **Background**: Optional subtle gray background (12px padding, 8px radius)

**Example**:
```
♡ 5 favorites saved
🎮 3 new games unlocked
🔥 5-game streak
```

**Why Include**: Shows concrete progress. Users see they've "saved" things and built a "streak." Psychologically rewarding, makes signing in feel like protecting their progress.

---

### **DIVIDERS**

**Visual**: Thin line, `#E8E7E6` color

**Placement**:
- Between heading + progress preview
- Between progress preview + sign-in buttons

**Purpose**: Chunking information into digestible sections

---

### **SIGN-IN BUTTONS**

**Layout**: Stacked vertically (two buttons, full width each)

**Google Sign-In Button**:
- **Label**: "Sign In with Google"
- **Icon**: Google logo (left, 20px)
- **Background**: Google blue (`#4285F4`)
- **Text**: White, 16px bold
- **Height**: 44px
- **Radius**: 16px
- **Spacing below**: 12px

**Apple Sign-In Button**:
- **Label**: "Sign In with Apple"
- **Icon**: Apple logo (left, 20px)
- **Background**: Black (`#000000`)
- **Text**: White, 16px bold
- **Height**: 44px
- **Radius**: 16px
- **Spacing below**: 16px

**Interaction**:
- **Hover** (desktop): Buttons brighten slightly (10% lighter)
- **Press**: Scale 0.98x + internal shadow
- **Tap feedback**: 100ms scale response

**Accessibility**: Clear, official social sign-in patterns. No custom UI confusion.

---

### **SECONDARY CTA (CONTINUE WITHOUT SIGNING UP)**

**Label**: "Continue Playing Without Signing Up"

**Style**:
- **Background**: Transparent
- **Text**: Secondary gray (`#666666`), underline, 14px
- **Height**: 44px (tap-friendly)
- **Interaction**: Tap dismisses modal + resumes game

**Placement**: Below sign-in buttons, centered

**Purpose**: User agency. No force. Game continues. Sign-in is invited, not mandatory. (This distinction is critical for soft-conversion UX.)

---

### **UX PSYCHOLOGY & CONVERSION STRATEGY**

**Why This Design Converts Without Aggression**:

1. **Celebration Frame**: "You're On Fire!" positions sign-in as a reward, not a restriction
2. **Progress Visibility**: Showing favorites saved / streak built makes account feel valuable
3. **Easy Social Auth**: Google/Apple one-tap sign-in (no forms, no passwords)
4. **Clear Escape Route**: "Continue Without Signing Up" means no player feels trapped
5. **Warmth Over Pressure**: Emoji, conversational tone, soft backdrop (not red/aggressive)
6. **Timing**: After 25 cards (enough investment to feel rewarding, not too early to irritate)
7. **No Payment Talk**: Zero mention of pricing, premium features, or limitations (removes friction)

**Psychological Hooks** (Ethical, not manipulative):
- **Progress**: Show what they've built (social proof: "5 favorites")
- **Streak**: Remind them of their investment ("5-game streak")
- **Social Validation**: Sign in with Google/Apple (familiar, trusted)
- **Framing**: "Unlock more" (positive, exploratory) vs. "Limited access" (negative, restrictive)

**Conversion Path**:
1. User completes 25th card
2. Modal appears (celebration + progress preview)
3. User taps Google/Apple sign-in
4. OAuth flow (standard social login)
5. Account created/linked
6. Redirect back to game experience
7. User can now save favorites, continue streak, etc.

---

### **MOTION & OVERLAY BEHAVIOR**

**Entrance Animation** (300ms):
- Modal slides up from bottom (translate Y: 100% → 0%)
- Scales in slightly (0.95 → 1.0)
- Backdrop fades in (0 → 0.6 opacity)
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

**Exit Animation** (200ms):
- Modal slides down (translate Y: 0% → 100%)
- Fades out (1 → 0 opacity)
- Backdrop fades (0.6 → 0 opacity)
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

**Backdrop Interaction**:
- Clicking backdrop triggers exit animation
- Feels dismissible, not trapped

**Game Behind Modal**:
- Remains visible (slightly blurred or dimmed by backdrop)
- Reminds user they can resume immediately
- Non-intrusive visual language

---

### **DESIGN DIRECTION SUMMARY**

| Aspect | Direction |
|--------|-----------|
| **Tone** | Rewarding, warm, inviting (not pushy) |
| **Framing** | "You're crushing it" + "unlock more" (positive language) |
| **Conversion Hook** | Progress preview + celebration + easy social auth |
| **Escape Route** | Clear "continue without signing up" (user agency) |
| **Visual Hierarchy** | Celebration > progress > sign-in buttons > skip CTA |
| **Motion** | Smooth slide + fade, welcoming entrance |
| **No Payment Language** | Zero mention of pricing or premium tiers |
| **Social Auth Only** | Google + Apple (no email forms, no passwords) |
| **Duration** | 25 cards is the trigger (sweet spot: invested but not fatigued) |
| **Optional Preview** | Show achievements to validate decision to sign in |
| **Dismissal** | Tap X, tap backdrop, or "continue without signup" |

---

## PART 6: GLOBAL DESIGN SYSTEM RECAP

### **VISUAL HIERARCHY PYRAMID**

```
┌─────────────────────────────┐
│  PRIMARY: Game Prompts      │  Largest, most color, most breathing space
│  Oversized, centered, warm  │
├─────────────────────────────┤
│  SECONDARY: Category info   │  Medium size, category color, context
│  Tags, metadata, rules      │
├─────────────────────────────┤
│  TERTIARY: Actions/buttons  │  Medium size, secondary styling
│  Navigation, CTAs, options  │
├─────────────────────────────┤
│  QUATERNARY: Supporting UI  │  Smaller, minimal color, contextual
│  Headers, dividers, progress│
├─────────────────────────────┤
│  BACKGROUND: Navigation     │  Minimal, doesn't dominate
│  Menus, settings, utilities │
└─────────────────────────────┘
```

### **CONSISTENT DESIGN PRINCIPLES**

| Principle | Application |
|-----------|-------------|
| **Breathing Space** | 24px+ margins between major sections; generous internal padding on cards |
| **Color as Signal** | Each category has a signature color; color conveys game type instantly |
| **Rounded Warmth** | 24px+ radius on hero elements; smaller radius on utilities (16px, 12px) |
| **Readable Scale** | Hierarchy through size jumps (32px → 20px → 16px → 14px); never intermediate sizes |
| **Smooth Motion** | All animations 200–350ms; bounce easing for arrivals; linear easing for exits |
| **Tactile Feedback** | Every interactive element responds to touch (scale, color, shadow) |
| **Conversational Tone** | Language is warm, direct, never corporate or robotic |
| **Minimal UI** | Hide non-essentials; surface only what users need in this moment |
| **One-Handed Play** | Buttons in thumb-zone; no reaching or strain |
| **Social First** | Design encourages sharing, connection, group play |

---

## PART 7: COMPONENT LIBRARY (QUICK REFERENCE)

### **BUTTON VARIANTS**

```
PRIMARY (Main CTAs)
├─ Background: Category color
├─ Text: White, 16px bold
├─ Height: 44px
├─ Radius: 16px
├─ State (hover): 10% darker
└─ State (active): 20% darker + internal shadow

SECONDARY (Alternative actions)
├─ Background: Transparent
├─ Border: 2px category color
├─ Text: Category color, 16px bold
├─ Height: 44px
├─ Radius: 16px
└─ State (hover): Light category color background

TERTIARY (Dismiss/skip)
├─ Background: Transparent
├─ Text: Secondary gray, 14px, underline
├─ Height: 44px
├─ Radius: 0 (no border)
└─ State (hover): Text darkens

PILL (Small tags/badges)
├─ Background: Category color
├─ Text: White, 12px bold
├─ Height: 28px
├─ Radius: 999px (full roundness)
└─ Padding: 8px horizontal
```

### **CARD VARIANTS**

```
HERO CARD (Game prompt)
├─ Border-radius: 24px
├─ Padding: 24px top/bottom, 32px left/right
├─ Border-top: 8px category color
├─ Shadow: 0 4px 16px rgba(0,0,0,0.1)
├─ Background: White
└─ Content: Oversized typography, centered

DISCOVERY CARD (Game list)
├─ Border-radius: 24px
├─ Padding: 16px top/bottom, 20px left/right
├─ Border-top: 4px category color (or small icon)
├─ Shadow: 0 2px 8px rgba(0,0,0,0.08)
├─ Background: White
└─ Content: Title + meta + social proof

MODAL CARD (Sign-in, rules)
├─ Border-radius: 24px top (if bottom sheet) or all corners
├─ Padding: 24–32px
├─ Shadow: Substantial (0 8px 24px rgba(0,0,0,0.2))
├─ Background: White
└─ Content: Structured sections with dividers
```

### **TEXT STYLES**

```
DISPLAY (Hero headings)
├─ Size: 32–40px
├─ Weight: 700
├─ Line-height: 1.2
└─ Color: Category color or primary text

HEADING 1 (Page titles, major sections)
├─ Size: 28px
├─ Weight: 700
├─ Line-height: 1.3
└─ Color: Primary text

HEADING 2 (Card titles, subsections)
├─ Size: 20px
├─ Weight: 600
├─ Line-height: 1.3
└─ Color: Category color or primary text

BODY (Main content, readable text)
├─ Size: 16px
├─ Weight: 400–500
├─ Line-height: 1.5–1.6
└─ Color: Primary text or secondary gray

SMALL (Supporting text, metadata)
├─ Size: 13–14px
├─ Weight: 500
├─ Line-height: 1.4
└─ Color: Secondary gray

CAPTION (Minimal supporting info)
├─ Size: 11–12px
├─ Weight: 500
├─ Line-height: 1.3
└─ Color: Tertiary gray
```

---

## SUMMARY: THE SIGNOUT DESIGN LANGUAGE

**In one paragraph**: Signout is a premium, mobile-first social gaming experience designed with **clean maximalism**—bold category colors, oversized expressive typography, and large rounded cards create visual warmth and personality, balanced by generous breathing space, minimal clutter, and smooth tactile interactions. Every screen prioritizes immersion (game prompts) or clarity (discovery, sign-in) through careful hierarchy, readable spacing, and motion that feels like a trusted guide. The product feels like a modern social app (Instagram's simplicity meets Wordle's focus) with emotionally warm UX that encourages connection, replay, and social sharing.

---

**This design system provides**: 
- ✅ Clear layout structure for each screen
- ✅ Detailed visual direction (colors, spacing, typography)
- ✅ Motion philosophy (smooth, tactile, not flashy)
- ✅ Interaction logic (button placement, thumb zones, gestures)
- ✅ Emotional UX strategy (warmth, celebration, no hard-selling)
- ✅ Component library for consistency
- ✅ Design principles to guide future decisions

Use this as your **north star** when designing detailed screens, creating prototypes, or building UI components. Every decision should ladder back to these principles: warmth, clarity, immersion, and emotional connection.
