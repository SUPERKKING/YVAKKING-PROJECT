// ============================================================================
// CEMENTO ROME × SEOUL — FIGMA AUTOMATED DECK GENERATOR
// Compatible with: Figma Plugin Console / Scripter Plugin / Custom Figma Plugin
// Canvas: 1920x1080 (16:9) | 80px Outer Margins | Swiss Bauhaus Typographic Grid
// ============================================================================

(async function generateCementoDeck() {
  console.log("Initializing CEMENTO Deck Generator...");

  // 1. DESIGN TOKENS
  const TOKENS = {
    canvas: { width: 1920, height: 1080, margin: 80 },
    colors: {
      dark: {
        bg: { r: 13 / 255, g: 13 / 255, b: 14 / 255 },         // #0D0D0E
        surface: { r: 24 / 255, g: 24 / 255, b: 26 / 255 },    // #18181A
        surfaceAlt: { r: 19 / 255, g: 19 / 255, b: 21 / 255 }, // #131315
        textPrimary: { r: 1, g: 1, b: 1 },                      // #FFFFFF
        textSecondary: { r: 140 / 255, g: 140 / 255, b: 140 / 255 }, // #8C8C8C
        textTertiary: { r: 85 / 255, g: 85 / 255, b: 88 / 255 },
        border: { r: 46 / 255, g: 46 / 255, b: 50 / 255 },     // #2E2E32
        accent: { r: 255 / 255, g: 59 / 255, b: 20 / 255 }     // #FF3B14 (Vermilion)
      }
    }
  };

  const c = TOKENS.colors.dark;

  // 2. FONT LOADER HELPER
  async function loadRequiredFonts() {
    const fonts = [
      { family: "Inter", style: "Regular" },
      { family: "Inter", style: "Medium" },
      { family: "Inter", style: "Bold" },
      { family: "Space Mono", style: "Regular" },
      { family: "Space Mono", style: "Bold" }
    ];

    for (const font of fonts) {
      try {
        await figma.loadFontAsync(font);
      } catch (err) {
        console.warn(`Font ${font.family} ${font.style} not available, falling back to default.`);
      }
    }
  }

  await loadRequiredFonts();

  // 3. FACTORY HELPERS
  function solidPaint(color, opacity = 1) {
    return [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b }, opacity }];
  }

  function createTextNode(text, size = 16, weight = "Regular", isMono = false, color = c.textPrimary, letterSpacing = 0) {
    const node = figma.createText();
    const family = isMono ? "Space Mono" : "Inter";
    node.fontName = { family: family, style: weight };
    node.characters = text;
    node.fontSize = size;
    node.fills = solidPaint(color);
    if (letterSpacing !== 0) {
      node.letterSpacing = { value: letterSpacing, unit: "PERCENT" };
    }
    return node;
  }

  function createHairlineDivider(width = 1760) {
    const line = figma.createRectangle();
    line.name = "Divider [0.75px Hairline]";
    line.resize(width, 1);
    line.fills = solidPaint(c.border);
    line.opacity = 0.8;
    return line;
  }

  function createBaseFrame(name, xOffset) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(TOKENS.canvas.width, TOKENS.canvas.height);
    frame.x = xOffset;
    frame.y = 0;
    frame.fills = solidPaint(c.bg);
    frame.clipsContent = true;

    // Auto Layout Configuration
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.paddingLeft = TOKENS.canvas.margin;
    frame.paddingRight = TOKENS.canvas.margin;
    frame.paddingTop = TOKENS.canvas.margin;
    frame.paddingBottom = TOKENS.canvas.margin;
    frame.itemSpacing = 28;

    return frame;
  }

  function createHeader(categoryTag, titleTag, slideNum) {
    const header = figma.createFrame();
    header.name = "Header // Meta Bar";
    header.layoutMode = "HORIZONTAL";
    header.primaryAxisAlignItems = "SPACE_BETWEEN";
    header.counterAxisAlignItems = "CENTER";
    header.layoutAlign = "STRETCH";
    header.itemSpacing = 20;
    header.fills = [];

    // Left group
    const leftGroup = figma.createFrame();
    leftGroup.layoutMode = "HORIZONTAL";
    leftGroup.itemSpacing = 14;
    leftGroup.counterAxisAlignItems = "CENTER";
    leftGroup.fills = [];

    const catText = createTextNode(categoryTag, 12, "Bold", true, c.accent);
    const pipe = createTextNode("//", 12, "Regular", true, c.textTertiary);
    const subText = createTextNode(titleTag, 12, "Regular", true, c.textSecondary);
    leftGroup.appendChild(catText);
    leftGroup.appendChild(pipe);
    leftGroup.appendChild(subText);

    // Right group
    const numText = createTextNode(`[ ${slideNum} / 07 ]`, 12, "Bold", true, c.textPrimary);

    header.appendChild(leftGroup);
    header.appendChild(numText);

    return header;
  }

  function createFooter(leftInfo, centerInfo, rightInfo) {
    const footer = figma.createFrame();
    footer.name = "Footer // Metadata";
    footer.layoutMode = "HORIZONTAL";
    footer.primaryAxisAlignItems = "SPACE_BETWEEN";
    footer.counterAxisAlignItems = "CENTER";
    footer.layoutAlign = "STRETCH";
    footer.itemSpacing = 20;
    footer.fills = [];

    const l = createTextNode(leftInfo, 11, "Regular", true, c.textSecondary);
    const m = createTextNode(centerInfo, 11, "Regular", true, c.textTertiary);
    const r = createTextNode(rightInfo, 11, "Regular", true, c.textSecondary);

    footer.appendChild(l);
    footer.appendChild(m);
    footer.appendChild(r);
    return footer;
  }

  const frames = [];
  let currentX = 0;
  const slideGap = 160;

  // ========================================================================
  // SLIDE 01: COVER & MANIFESTO
  // ========================================================================
  {
    const f1 = createBaseFrame("SLIDE 01: COVER & MANIFESTO", currentX);
    f1.appendChild(createHeader("[ CEMENTO : ROME × SEOUL ]", "CONFIDENTIAL STRATEGY 2026-2027", "01"));
    f1.appendChild(createHairlineDivider());

    // Title group
    const titleGroup = figma.createFrame();
    titleGroup.layoutMode = "VERTICAL";
    titleGroup.layoutAlign = "STRETCH";
    titleGroup.itemSpacing = 16;
    titleGroup.fills = [];

    const giantTitle = createTextNode("CEMENTO", 140, "Bold", false, c.textPrimary, -4);
    const subTitle = createTextNode("Bridging International Academies & Seoul's Production Infrastructure", 32, "Regular", false, c.textSecondary);
    const cofounders = createTextNode("Co-founded by Yvannoé Kruger (Ex-POUSH) × Kyeongnan Kim (CEO, D_RECTUS)", 16, "Medium", false, c.accent);

    titleGroup.appendChild(giantTitle);
    titleGroup.appendChild(subTitle);
    titleGroup.appendChild(cofounders);
    f1.appendChild(titleGroup);

    // Spacer
    const spacer = figma.createFrame();
    spacer.layoutAlign = "STRETCH";
    spacer.layoutGrow = 1;
    spacer.fills = [];
    f1.appendChild(spacer);

    f1.appendChild(createHairlineDivider());

    // Bottom Grid
    const botGrid = figma.createFrame();
    botGrid.layoutMode = "HORIZONTAL";
    botGrid.layoutAlign = "STRETCH";
    botGrid.itemSpacing = 32;
    botGrid.fills = [];

    const cols = [
      { label: "[ DURATION & TENURE ]", val: "2026 — 2047\n[ 21-YEAR ANCHOR ]" },
      { label: "[ DUAL GEOGRAPHY ]", val: "VIA CASILINA, PIGNETO (ROME)\n× SEOUL SATELLITE HUB" },
      { label: "[ OPERATING MODEL ]", val: "1:1 RECIPROCAL PRODUCTION\n& ATELIER ROTATION" },
      { label: "[ CLASSIFICATION ]", val: "PERMANENT INFRASTRUCTURE\nSTRATEGY SPEC.01" }
    ];

    cols.forEach(col => {
      const colFrame = figma.createFrame();
      colFrame.layoutMode = "VERTICAL";
      colFrame.layoutGrow = 1;
      colFrame.itemSpacing = 8;
      colFrame.fills = [];

      const l = createTextNode(col.label, 11, "Regular", true, c.textSecondary);
      const v = createTextNode(col.val, 13, "Bold", true, c.textPrimary);
      colFrame.appendChild(l);
      colFrame.appendChild(v);
      botGrid.appendChild(colFrame);
    });

    f1.appendChild(botGrid);
    f1.appendChild(createFooter("© 2026 CEMENTO CONSORTIUM", "FORM FOLLOWS INFRASTRUCTURE", "PIGNETO, ROMA × SEOUL"));
    frames.push(f1);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 02: THE CORE DEFICIT & THE SHIFT
  // ========================================================================
  {
    const f2 = createBaseFrame("SLIDE 02: PROBLEM & THE SHIFT", currentX);
    f2.appendChild(createHeader("[ 01. CONTEXT & STRUCTURAL NEED ]", "PARADIGM SHIFT // SYSTEM DEFICIT", "02"));
    f2.appendChild(createHairlineDivider());

    // Title
    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("Beyond the Ephemeral: From Temporary Fairs to Long-Term Infrastructure", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("The global contemporary art circuit remains trapped in fleeting commercial fairs. Asian creative practitioners in Europe face insurmountable fabrication costs and zero institutional continuity.", 18, "Regular", false, c.textSecondary));
    f2.appendChild(titleBox);

    // 2-Col Comparison Frame
    const compGrid = figma.createFrame();
    compGrid.layoutMode = "HORIZONTAL";
    compGrid.layoutAlign = "STRETCH";
    compGrid.layoutGrow = 1;
    compGrid.itemSpacing = 32;
    compGrid.fills = [];

    // Left: Status Quo
    const leftCol = figma.createFrame();
    leftCol.layoutMode = "VERTICAL";
    leftCol.layoutGrow = 1;
    leftCol.paddingLeft = 24;
    leftCol.paddingRight = 24;
    leftCol.paddingTop = 24;
    leftCol.paddingBottom = 24;
    leftCol.itemSpacing = 16;
    leftCol.fills = solidPaint(c.surfaceAlt);
    leftCol.strokes = solidPaint(c.border);
    leftCol.strokeWeight = 1;

    leftCol.appendChild(createTextNode("THE STATUS QUO // SYSTEMIC BOTTLENECK", 13, "Bold", true, c.accent));
    leftCol.appendChild(createTextNode("01 / SHORT-TERM ART FAIRS\nEphemeral 5-day sales bursts without establishing production roots.", 14, "Regular", false, c.textSecondary));
    leftCol.appendChild(createTextNode("02 / THE FABRICATION BOTTLENECK\nProhibitive studio rents and machine shortages force small-scale compromises.", 14, "Regular", false, c.textSecondary));
    leftCol.appendChild(createTextNode("03 / STRUCTURAL ISOLATION\nComplete isolation of Asian creators from elite historic European academies.", 14, "Regular", false, c.textSecondary));
    compGrid.appendChild(leftCol);

    // Right: CEMENTO Solution
    const rightCol = figma.createFrame();
    rightCol.layoutMode = "VERTICAL";
    rightCol.layoutGrow = 1.15;
    rightCol.paddingLeft = 24;
    rightCol.paddingRight = 24;
    rightCol.paddingTop = 24;
    rightCol.paddingBottom = 24;
    rightCol.itemSpacing = 16;
    rightCol.fills = solidPaint(c.surface);
    rightCol.strokes = solidPaint(c.border);
    rightCol.strokeWeight = 1;

    rightCol.appendChild(createTextNode("THE CEMENTO SOLUTION // PERMANENT ANCHOR", 13, "Bold", true, c.accent));
    rightCol.appendChild(createTextNode("01 / 21-YEAR PERMANENT ANCHOR\nSecured industrial site tenure at Via Casilina in Rome, operating as an unshakeable bridgehead.", 14, "Regular", false, c.textPrimary));
    rightCol.appendChild(createTextNode("02 / HEAVY INDUSTRIAL MACHINERY\nShared community-scale fabrication floor (steel, timber, 3D printing, casting) removing scale barriers.", 14, "Regular", false, c.textPrimary));
    rightCol.appendChild(createTextNode("03 / RECIPROCAL ACADEMY ACCESS\nDirect institutional corridor connecting with Villa Médicis, Villa Massimo, and Circolo Scandinavo.", 14, "Regular", false, c.textPrimary));
    compGrid.appendChild(rightCol);

    f2.appendChild(compGrid);
    f2.appendChild(createHairlineDivider());
    f2.appendChild(createFooter("CEMENTO ARCHITECTURE", "INFRASTRUCTURE OVER EPHEMERALITY", "ROME // SEOUL"));
    frames.push(f2);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 03: ROME ANCHOR: THE CEMENTO SPECIFICATION
  // ========================================================================
  {
    const f3 = createBaseFrame("SLIDE 03: ROME HUB SPECIFICATION", currentX);
    f3.appendChild(createHeader("[ 02. ROME HUB : VIA CASILINA ]", "INDUSTRIAL ARCHITECTURE SPECIFICATION", "03"));
    f3.appendChild(createHairlineDivider());

    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("The Machine Hall & The Integrated Community", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("Repurposing Rome's industrial heritage into a monumental production machine and cross-continental campus.", 18, "Regular", false, c.textSecondary));
    f3.appendChild(titleBox);

    // 3 Cards
    const cardsRow = figma.createFrame();
    cardsRow.layoutMode = "HORIZONTAL";
    cardsRow.layoutAlign = "STRETCH";
    cardsRow.layoutGrow = 1;
    cardsRow.itemSpacing = 28;
    cardsRow.fills = [];

    const specs = [
      {
        tag: "[ 21-YEAR ANCHOR ]",
        title: "Former Lancia/Fiat Site",
        sub: "1,000+ SQM RAW ARCHITECTURE",
        desc: "Secured tenure in Pigneto. Raw concrete spans, high-clearance overhead cranes, and natural sawtooth illumination built for heavy material manipulation and large spatial works."
      },
      {
        tag: "[ THE MACHINE HALL ]",
        title: "Heavy Production Floor",
        sub: "COMMUNITY-SCALE FABRICATION",
        desc: "Equipped with industrial CNC milling, robotic welding, heavy woodwork, large-volume casting, and 3D additive stations operated under resource-pooling."
      },
      {
        tag: "[ GLOBAL ACADEMY HUB ]",
        title: "Academy Nexus",
        sub: "DIRECT WORKSPACE INTEGRATION",
        desc: "Direct diplomatic and production workspace nexus with Villa Médicis, Circolo Scandinavo, Villa Massimo, and the American Academy in Rome."
      }
    ];

    specs.forEach((item, idx) => {
      const card = figma.createFrame();
      card.layoutMode = "VERTICAL";
      card.layoutGrow = 1;
      card.paddingLeft = 28;
      card.paddingRight = 28;
      card.paddingTop = 28;
      card.paddingBottom = 28;
      card.itemSpacing = 14;
      card.fills = solidPaint(c.surface);
      card.strokes = solidPaint(c.border);
      card.strokeWeight = 1;

      card.appendChild(createTextNode(item.tag, 11, "Bold", true, c.accent));
      card.appendChild(createTextNode(item.title, 26, "Bold", false, c.textPrimary));
      card.appendChild(createTextNode(item.sub, 11, "Regular", true, c.textSecondary));
      card.appendChild(createTextNode(item.desc, 14, "Regular", false, c.textSecondary));

      const num = createTextNode(`0${idx + 1}`, 36, "Bold", true, c.border);
      card.appendChild(num);

      cardsRow.appendChild(card);
    });

    f3.appendChild(cardsRow);
    f3.appendChild(createHairlineDivider());
    f3.appendChild(createFooter("SITE: VIA CASILINA, PIGNETO, ROMA", "POUSH METHODOLOGY APPLIED", "TENURE: 21-YEAR HORIZON"));
    frames.push(f3);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 04: SEOUL SATELLITE: URBAN REGENERATION
  // ========================================================================
  {
    const f4 = createBaseFrame("SLIDE 04: SEOUL SATELLITE HUB", currentX);
    f4.appendChild(createHeader("[ 03. SEOUL SATELLITE HUB ]", "URBAN REGENERATION SPECIFICATION", "04"));
    f4.appendChild(createHairlineDivider());

    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("Not Just Another Residency. A Self-Sustaining Atelier of Freedom.", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("A hybrid public-private venue built on industrial or transport idle land (KORAIL/KTX assets or municipal brownfields).", 18, "Regular", false, c.textSecondary));
    f4.appendChild(titleBox);

    // 2x2 Grid using 2 rows
    const gridContainer = figma.createFrame();
    gridContainer.layoutMode = "VERTICAL";
    gridContainer.layoutAlign = "STRETCH";
    gridContainer.layoutGrow = 1;
    gridContainer.itemSpacing = 20;
    gridContainer.fills = [];

    const quadItems = [
      [
        { code: "SPEC.01", title: "50% Korean / 50% International Fellows", desc: "Strict cohort balance generating intense cross-continental peer friction between Korean creators and Rome academy fellows." },
        { code: "SPEC.02", title: "24/7 Sovereign Atelier Access", desc: "Round-the-clock unconstrained operating hours engineered for uninterrupted casting, fabrication, and conceptualization runs." }
      ],
      [
        { code: "SPEC.03", title: "Transport Brownfield Repurposing", desc: "Strategic activation of underutilized rail depots and industrial idle parcels into high-density international cultural landmarks." },
        { code: "SPEC.04", title: "Self-Sustaining F&B & Fashion Events", desc: "Integrated commercial hospitality, design retail, and brand events generate circular revenue to fund artist production directly." }
      ]
    ];

    quadItems.forEach(rowItems => {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.layoutAlign = "STRETCH";
      row.layoutGrow = 1;
      row.itemSpacing = 20;
      row.fills = [];

      rowItems.forEach(q => {
        const box = figma.createFrame();
        box.layoutMode = "VERTICAL";
        box.layoutGrow = 1;
        box.paddingLeft = 24;
        box.paddingRight = 24;
        box.paddingTop = 20;
        box.paddingBottom = 20;
        box.itemSpacing = 10;
        box.fills = solidPaint(c.surface);
        box.strokes = solidPaint(c.border);
        box.strokeWeight = 1;

        box.appendChild(createTextNode(q.code, 11, "Bold", true, c.accent));
        box.appendChild(createTextNode(q.title, 22, "Bold", false, c.textPrimary));
        box.appendChild(createTextNode(q.desc, 14, "Regular", false, c.textSecondary));
        row.appendChild(box);
      });

      gridContainer.appendChild(row);
    });

    f4.appendChild(gridContainer);
    f4.appendChild(createHairlineDivider());
    f4.appendChild(createFooter("OPERATING MODEL: PUBLIC-PRIVATE PARTNERSHIP", "AUTONOMY // PRODUCTION // SUSTAINABILITY", "SEOUL METROPOLITAN AREA"));
    frames.push(f4);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 05: STRATEGIC IMPACT: PUBLIC VALUE & CSR ROI
  // ========================================================================
  {
    const f5 = createBaseFrame("SLIDE 05: STRATEGIC IMPACT & ROI", currentX);
    f5.appendChild(createHeader("[ 04. STRATEGIC VALUE & SPONSORSHIP ]", "DUAL-TRACK VALUE & CSR ROI MATRIX", "05"));
    f5.appendChild(createHairlineDivider());

    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("Value Proposition for Public Institutions & Corporate Partners", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("A tailored dual-track architecture delivering diplomatic sovereignty for institutions and high-yield placemaking for enterprises.", 18, "Regular", false, c.textSecondary));
    f5.appendChild(titleBox);

    const dualRow = figma.createFrame();
    dualRow.layoutMode = "HORIZONTAL";
    dualRow.layoutAlign = "STRETCH";
    dualRow.layoutGrow = 1;
    dualRow.itemSpacing = 28;
    dualRow.fills = [];

    // Track A
    const tA = figma.createFrame();
    tA.layoutMode = "VERTICAL";
    tA.layoutGrow = 1;
    tA.paddingLeft = 28;
    tA.paddingRight = 28;
    tA.paddingTop = 24;
    tA.paddingBottom = 24;
    tA.itemSpacing = 14;
    tA.fills = solidPaint(c.surface);
    tA.strokes = solidPaint(c.border);
    tA.strokeWeight = 1;

    tA.appendChild(createTextNode("TRACK 01 // PUBLIC & DIPLOMATIC CORPS", 12, "Bold", true, c.accent));
    tA.appendChild(createTextNode("MCST / ARKO / KAMS / ITALIAN EMBASSY / EUNIC", 11, "Regular", true, c.textSecondary));
    tA.appendChild(createTextNode("• Permanent Footprint in Rome's Elite Academy Circuit\nFirst permanent sovereign year-round Korean studio footprint alongside Villa Médicis.", 14, "Regular", false, c.textPrimary));
    tA.appendChild(createTextNode("• Reciprocal Bilateral Fellowship Channels\nFormalized exchange channels channeling European master creators into Korea's ecosystem.", 14, "Regular", false, c.textPrimary));
    tA.appendChild(createTextNode("• 4× Public Fund Efficiency Multiplier\nDirect infrastructure empowerment rather than ephemeral commercial booth rentals.", 14, "Regular", false, c.textPrimary));
    dualRow.appendChild(tA);

    // Track B
    const tB = figma.createFrame();
    tB.layoutMode = "VERTICAL";
    tB.layoutGrow = 1;
    tB.paddingLeft = 28;
    tB.paddingRight = 28;
    tB.paddingTop = 24;
    tB.paddingBottom = 24;
    tB.itemSpacing = 14;
    tB.fills = solidPaint(c.surface);
    tB.strokes = solidPaint(c.border);
    tB.strokeWeight = 1;

    tB.appendChild(createTextNode("TRACK 02 // PRIVATE CORPORATE & ESG CSR", 12, "Bold", true, c.accent));
    tB.appendChild(createTextNode("REAL ESTATE PLACEMAKERS / MOBILITY / ESG PATRONAGE", 11, "Regular", true, c.textSecondary));
    tB.appendChild(createTextNode("• Transformational Urban Placemaking\nConverting dormant industrial parcels into high-density cultural flagships with strong foot traffic.", 14, "Regular", false, c.textPrimary));
    tB.appendChild(createTextNode("• Authentic ESG & Cultural Brand Association\nDirect alignment with sustainable architectural preservation and international creator support.", 14, "Regular", false, c.textPrimary));
    tB.appendChild(createTextNode("• Priority Commercial & Brand Showcases\nExclusive access for product presentations, design weeks, and VIP collector previews.", 14, "Regular", false, c.textPrimary));
    dualRow.appendChild(tB);

    f5.appendChild(dualRow);
    f5.appendChild(createHairlineDivider());
    f5.appendChild(createFooter("DIPLOMATIC & ECONOMIC ALIGNMENT", "SYMMETRIC VALUE CREATION", "CEMENTO PARTNERSHIP FRAMEWORK"));
    frames.push(f5);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 06: GOVERNANCE & 1:1 RECIPROCAL MODEL
  // ========================================================================
  {
    const f6 = createBaseFrame("SLIDE 06: GOVERNANCE & FINANCES", currentX);
    f6.appendChild(createHeader("[ 05. OPERATIONAL FRAMEWORK & FINANCES ]", "1:1 RECIPROCAL MODEL & CURATORIAL CHARTER", "06"));
    f6.appendChild(createHairlineDivider());

    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("Equitable In-Kind Structure & Curatorial Autonomy", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("Eliminating cross-border cash drain through mirror in-kind resource provisioning, backed by bilateral curatorial co-direction.", 18, "Regular", false, c.textSecondary));
    f6.appendChild(titleBox);

    const pillarsRow = figma.createFrame();
    pillarsRow.layoutMode = "HORIZONTAL";
    pillarsRow.layoutAlign = "STRETCH";
    pillarsRow.layoutGrow = 1;
    pillarsRow.itemSpacing = 28;
    pillarsRow.fills = [];

    const pData = [
      {
        num: "01",
        label: "[ LOCAL HOST PRINCIPLE ]",
        title: "Symmetric In-Kind Provisioning",
        desc: "No money cross-flows. Seoul provides housing, ateliers, and PR for European fellows. In mirror symmetry, CEMENTO Rome provides equivalent facilities and academy network access for Korean fellows."
      },
      {
        num: "02",
        label: "[ TRAVEL & LOGISTICS ]",
        title: "Sending-Nation Public Grants",
        desc: "Airfares, living stipends, and shipping costs are underwritten by sending nations' cultural bodies (ARKO, KAMS, Institut Français, Goethe-Institut), creating zero international cross-debt."
      },
      {
        num: "03",
        label: "[ GOVERNANCE & CURATION ]",
        title: "Curatorial Autonomy & Co-Direction",
        desc: "Independent selection committees in Seoul and Rome. Equal co-chairmanship: Yvannoé Kruger (Rome operations) and Kyeongnan Kim (Seoul satellite) with mandatory co-crediting."
      }
    ];

    pData.forEach(p => {
      const col = figma.createFrame();
      col.layoutMode = "VERTICAL";
      col.layoutGrow = 1;
      col.paddingLeft = 28;
      col.paddingRight = 28;
      col.paddingTop = 28;
      col.paddingBottom = 28;
      col.itemSpacing = 14;
      col.fills = solidPaint(c.surface);
      col.strokes = solidPaint(c.border);
      col.strokeWeight = 1;

      col.appendChild(createTextNode(p.num, 32, "Bold", true, c.accent));
      col.appendChild(createTextNode(p.label, 11, "Bold", true, c.textSecondary));
      col.appendChild(createTextNode(p.title, 22, "Bold", false, c.textPrimary));
      col.appendChild(createTextNode(p.desc, 14, "Regular", false, c.textSecondary));
      pillarsRow.appendChild(col);
    });

    f6.appendChild(pillarsRow);
    f6.appendChild(createHairlineDivider());
    f6.appendChild(createFooter("CHARTER: D_RECTUS × YVANNOÉ KRUGER", "ZERO CURRENCY CROSS-EXCHANGE", "BILATERAL CURATORIAL INTEGRITY"));
    frames.push(f6);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // ========================================================================
  // SLIDE 07: ROADMAP & STRATEGIC MILESTONES
  // ========================================================================
  {
    const f7 = createBaseFrame("SLIDE 07: ROADMAP & MILESTONES", currentX);
    f7.appendChild(createHeader("[ 06. EXECUTION TIMELINE ]", "STRATEGIC MILESTONES // 2026 — 2027", "07"));
    f7.appendChild(createHairlineDivider());

    const titleBox = figma.createFrame();
    titleBox.layoutMode = "VERTICAL";
    titleBox.layoutAlign = "STRETCH";
    titleBox.itemSpacing = 8;
    titleBox.fills = [];
    titleBox.appendChild(createTextNode("Phased Execution (2026 — 2027)", 44, "Bold", false, c.textPrimary, -2));
    titleBox.appendChild(createTextNode("A disciplined, step-function deployment ensuring legal anchor validation, academy cohort onboarding, and satellite scaling.", 18, "Regular", false, c.textSecondary));
    f7.appendChild(titleBox);

    const timelineRow = figma.createFrame();
    timelineRow.layoutMode = "HORIZONTAL";
    timelineRow.layoutAlign = "STRETCH";
    timelineRow.layoutGrow = 1;
    timelineRow.itemSpacing = 28;
    timelineRow.fills = [];

    const phases = [
      {
        step: "PHASE 01 [ACTIVE]",
        period: "Q3 — Q4 2026",
        title: "Formalization & Site Scouting",
        items: "• Formalization of bilateral LOI (D_RECTUS × Kruger)\n• Architectural blueprinting of Via Casilina Machine Hall\n• Public grant alignment (ARKO, KAMS, Italian Embassy)\n• Scouting Seoul transport/railway idle parcels"
      },
      {
        step: "PHASE 02 [SCHEDULED]",
        period: "MARCH 2027",
        title: "Rome Opening & Cohort 01",
        items: "• Inauguration of CEMENTO Rome Machine Hall\n• Deployment of 1st Korean cohort (6 fellows)\n• Inaugural symposium with Villa Médicis & Massimo\n• Finalizing Seoul site concession agreement"
      },
      {
        step: "PHASE 03 [PROJECTED]",
        period: "LATE 2027",
        title: "Seoul Satellite Launch",
        items: "• Grand opening of CEMENTO Seoul Hub\n• Launch of public fabrication workshops\n• Bilateral joint exhibition in Rome and Seoul\n• Activation of self-sustaining commercial F&B loops"
      }
    ];

    phases.forEach(ph => {
      const phBox = figma.createFrame();
      phBox.layoutMode = "VERTICAL";
      phBox.layoutGrow = 1;
      phBox.paddingLeft = 28;
      phBox.paddingRight = 28;
      phBox.paddingTop = 24;
      phBox.paddingBottom = 24;
      phBox.itemSpacing = 12;
      phBox.fills = solidPaint(c.surface);
      phBox.strokes = solidPaint(c.border);
      phBox.strokeWeight = 1;

      phBox.appendChild(createTextNode(ph.step, 11, "Bold", true, c.accent));
      phBox.appendChild(createTextNode(ph.period, 12, "Regular", true, c.textSecondary));
      phBox.appendChild(createTextNode(ph.title, 22, "Bold", false, c.textPrimary));
      phBox.appendChild(createTextNode(ph.items, 13, "Regular", false, c.textSecondary));
      timelineRow.appendChild(phBox);
    });

    f7.appendChild(timelineRow);
    f7.appendChild(createHairlineDivider());
    f7.appendChild(createFooter("INAUGURATION: MARCH 2027 (ROME) // LATE 2027 (SEOUL)", "STATUS: ON TRACK", "D_RECTUS × KRUGER"));
    frames.push(f7);
    currentX += TOKENS.canvas.width + slideGap;
  }

  // Zoom into view
  figma.currentPage.selection = frames;
  figma.viewport.scrollAndZoomIntoView(frames);
  console.log("Successfully generated all 7 CEMENTO presentation frames!");
})();
