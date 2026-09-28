# CEMENTO : ROME × SEOUL — PRESENTATION DECK SYSTEM
> **Art Direction & Design System**: Bauhaus-meets-Brutalist Contemporary  
> **Canvas Dimensions**: 1920 × 1080 px (16:9 Aspect Ratio)  
> **Outer Padding**: 80px (Strict Bauhaus Negative Space)  
> **Hairline Borders**: 0.75px — 1.0px  
> **Typography**: Inter Tight (Display / Titles) + Space Mono (Metadata / Numbers) + Inter (Body Copy)  

---

## 1. Executive Summary & Curatorial Philosophy

**CEMENTO** is a permanent institutional alliance co-founded by **Yvannoé Kruger** (Ex-POUSH Artistic Director) and **Kyeongnan Kim** (CEO, D_RECTUS). It bridges the centuries-old cultural academy constellation of Rome (Villa Médicis, American Academy, Villa Massimo, Circolo Scandinavo) directly with Seoul's cutting-edge production infrastructure.

The presentation system is designed following the **Swiss International Style & Bauhaus Functionalism** ("Form follows function"), embracing raw structural honesty, strict modular grid discipline, technical bracketed metadata syntax (`[01. STRATEGY]`), and monolithic asymmetric hierarchy.

---

## 2. Design Tokens & Bauhaus Grid Specifications

| Element | Specification | Rationale / Reference |
| :--- | :--- | :--- |
| **Canvas Dimensions** | `1920 × 1080 px` (16:9) | Standard high-resolution presentation screen and native Figma presentation frame. |
| **Outer Margin** | `80px` (Top / Bottom / Left / Right) | Creates generous, deliberate negative space characteristic of Swiss posters and industrial drafting plates. |
| **Background (Dark)** | `#0D0D0E` (Off-Matte Carbon) | Primary immersive theme for digital screening and architectural presentations. |
| **Background (Light)** | `#F4F4F1` (Warm Concrete White) | Secondary theme optimized for public institution dossiers, printouts, and daylight environments. |
| **Surface Cards** | `#18181A` (Dark) / `#ECECE8` (Light) | Subtle contrast plane for structural content blocks and comparison matrices. |
| **Technical Accent** | `#FF3B14` (Bauhaus Vermilion) | Strictly utilized for delimiters, active tags, and indices (≤ 5% total surface area). |
| **Structural Hairline** | `0.75px` — `1.0px` solid `#2E2E32` | Replaces heavy decorative shadows with crisp engineering schematics and dividers. |
| **Display Font** | `Inter Tight Bold` / `Neue Haas Grotesk` | Neutral grotesque with tight tracking and high impact. |
| **Metadata Font** | `Space Mono` / `JetBrains Mono` | Bracketed technical syntax simulating machine logs and factory blueprints. |
| **Body Font** | `Inter` (Regular / Light, line-height 1.5) | Clean, legible sans-serif for programmatic copy. |

---

## 3. The 7-Slide Programmatic Structure

- **Slide 01: [ COVER & MANIFESTO ]**  
  Massive brutalist title (`CEMENTO`), red technical square accent, dual geography coordinates, and 4 modular metadata columns (21-Year Anchor tenure, Rome × Seoul geography, bilateral operating model, spec code).
- **Slide 02: [ 01. CONTEXT & STRUCTURAL NEED ]**  
  Asymmetric 2-column comparative layout contrasting **The Status Quo** (ephemeral 5-day fairs, high European studio costs, academy isolation) with **The CEMENTO Solution** (21-year tenure, heavy machine hall, reciprocal academy gateway).
- **Slide 03: [ 02. ROME HUB : VIA CASILINA ]**  
  3 structural cards with hairline dividers detailing the former Lancia/Fiat industrial site in Pigneto (1,000+ sqm), community-scale fabrication machinery (CNC, welding, 3D printing), and direct academy nexus (Villa Médicis, Villa Massimo, American Academy).
- **Slide 04: [ 03. SEOUL SATELLITE HUB ]**  
  Quadrant matrix (2×2) breaking down the Seoul satellite specification: 50:50 reciprocal fellowship parity, 24/7 unrestricted atelier access, idle transport brownfield repurposing (KORAIL/municipal assets), and self-sustaining F&B / brand event circular funding.
- **Slide 05: [ 04. STRATEGIC VALUE & SPONSORSHIP ]**  
  Dual-track value matrix detailing **Track 01 (Public/Diplomatic Corps: MCST, ARKO, KAMS, Italian Embassy)** for sovereign cultural presence vs **Track 02 (Private/Corporate CSR: Mobility, ESG, Real Estate Placemakers)** for asset valuation and authentic cultural capital.
- **Slide 06: [ 05. OPERATIONAL FRAMEWORK & FINANCES ]**  
  3-pillar governance matrix: Local Host Principle (1:1 in-kind exchange, zero cross-border cash drain), Sending-Nation Public Grants for travel, and Equal Curatorial Autonomy under Kruger × Kim.
- **Slide 07: [ 06. EXECUTION TIMELINE ]**  
  Horizontal modular axis with 3 phased milestones from Q3 2026 LOI formalization to March 2027 CEMENTO Rome grand opening and Late 2027 Seoul satellite launch.

---

## 4. Figma Connection & Automated Generation

### Method 1: Direct Figma Script Execution (Fastest & Native)
1. In Figma, open a new or existing document.
2. Open the **Scripter** plugin (or Figma's built-in Developer Console via `Cmd + Option + I`).
3. Paste the contents of [`figma-importer.js`](file:///Users/d_rectus/Documents/Nabi%20School/CEMENTO/figma-importer.js) into the editor/console.
4. Hit **Run**.
5. Figma will immediately generate all 7 frames at **1920 × 1080 px** with AutoLayout, exact hex colors, 80px margins, and typography loaded automatically.

### Method 2: Structured JSON Schema
The repository includes [`deck-data.json`](file:///Users/d_rectus/Documents/Nabi%20School/CEMENTO/deck-data.json), a complete programmatic schema containing all text nodes, layout classifications, design tokens, and metadata columns ready for ingestion into custom Figma plugins or CI/CD pipelines via the Figma REST API.

### Method 3: HTML-to-Figma / Browser Copy
Launch the presentation in your browser, click **Export to Figma** in the top navigation bar, and copy the formatted code snippet or download the JSON schema directly.

---

## 5. Local Viewing & Presentation Controls

### Running Locally:
You can preview the presentation locally by opening `index.html` in any modern browser, or by starting a local HTTP server:
```bash
# Using Python
python3 -m http.server 8080

# Or using npx
npx -y serve .
```

### Keyboard Shortcuts:
- `→` / `Page Down` / `Space`: Next slide
- `←` / `Page Up`: Previous slide
- `Home` / `End`: Jump to first / last slide
- `F`: Toggle Fullscreen Presentation Mode
- `Cmd + P`: Export all 7 slides to vector PDF with 1920×1080 landscape page breaks
