/**
 * CEMENTO Rome × Seoul — Presentation Controller & Figma Integration Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const scalers = document.querySelectorAll('.slide-scaler');
  const slideFrames = document.querySelectorAll('.slide-frame');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const slideIndicator = document.getElementById('slide-indicator');
  const btnModeStream = document.getElementById('btn-mode-stream');
  const btnModePresenter = document.getElementById('btn-mode-presenter');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnFitScreen = document.getElementById('btn-fit-screen');
  const btnPrint = document.getElementById('btn-print');
  const btnOpenFigma = document.getElementById('btn-open-figma');
  const modal = document.getElementById('figma-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCodeDisplay = document.getElementById('modal-code-display');
  const tabBtnScript = document.getElementById('tab-btn-script');
  const tabBtnJson = document.getElementById('tab-btn-json');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnDownloadJson = document.getElementById('btn-download-json');
  const copyStatus = document.getElementById('copy-status');

  let currentSlide = 1;
  const totalSlides = slideFrames.length;
  let isPresenterMode = false;
  let currentTheme = 'dark';
  let activeTab = 'script';
  let cachedJsonData = null;
  let cachedFigmaScript = null;

  // 1. AUTO-SCALE 1920x1080 SLIDES TO FIT CURRENT VIEWPORT
  function adjustSlideScale() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const baseWidth = 1920;
    const baseHeight = 1080;

    let targetScale = 1;

    if (isPresenterMode) {
      // Calculate scale to fit within viewport keeping 16:9 aspect ratio
      const scaleX = (windowWidth - 40) / baseWidth;
      const scaleY = (windowHeight - 40) / baseHeight;
      targetScale = Math.min(scaleX, scaleY);
    } else {
      // Stream view: scale based on available width with horizontal margins
      const maxStreamWidth = Math.min(windowWidth - 80, 1920);
      targetScale = Math.min(maxStreamWidth / baseWidth, 1);
    }

    scalers.forEach(scaler => {
      scaler.style.transform = `scale(${targetScale})`;
      scaler.style.marginBottom = `${(baseHeight * targetScale) - baseHeight}px`;
      if (!isPresenterMode) {
        scaler.style.marginRight = `${(baseWidth * targetScale) - baseWidth}px`;
      } else {
        scaler.style.marginRight = '0px';
      }
    });
  }

  // 2. SLIDE NAVIGATION (PRESENTER MODE & STREAM SCROLL)
  function goToSlide(index) {
    if (index < 1) index = 1;
    if (index > totalSlides) index = totalSlides;
    currentSlide = index;

    slideIndicator.textContent = `SLIDE 0${currentSlide} / 0${totalSlides}`;

    if (isPresenterMode) {
      slideFrames.forEach((frame, idx) => {
        if (idx + 1 === currentSlide) {
          frame.classList.add('current-active');
        } else {
          frame.classList.remove('current-active');
        }
      });
    } else {
      // In stream mode, scroll smoothly to the targeted slide
      const targetScaler = document.querySelector(`.slide-scaler[data-slide-index="${currentSlide}"]`);
      if (targetScaler) {
        targetScaler.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
  btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));

  // 3. VIEW MODE TOGGLE
  btnModeStream.addEventListener('click', () => {
    isPresenterMode = false;
    document.body.classList.remove('mode-presenter');
    btnModeStream.classList.add('active');
    btnModePresenter.classList.remove('active');
    slideFrames.forEach(f => f.classList.remove('current-active'));
    adjustSlideScale();
    goToSlide(currentSlide);
  });

  btnModePresenter.addEventListener('click', () => {
    isPresenterMode = true;
    document.body.classList.add('mode-presenter');
    btnModePresenter.classList.add('active');
    btnModeStream.classList.remove('active');
    adjustSlideScale();
    goToSlide(currentSlide);
  });

  // 4. THEME TOGGLE (CARBON DARK VS CONCRETE WHITE)
  btnThemeToggle.addEventListener('click', () => {
    if (currentTheme === 'dark') {
      currentTheme = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
      btnThemeToggle.textContent = 'Theme: Light';
    } else {
      currentTheme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
      btnThemeToggle.textContent = 'Theme: Dark';
    }
  });

  // 5. FIT SCREEN BUTTON
  btnFitScreen.addEventListener('click', () => {
    if (!isPresenterMode) {
      btnModePresenter.click();
    } else {
      adjustSlideScale();
    }
  });

  // 6. PRINT TO PDF
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // 7. KEYBOARD SHORTCUTS
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'Escape') modalClose.click();
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        goToSlide(currentSlide + 1);
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        goToSlide(currentSlide - 1);
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        break;
    }
  });

  // 8. FIGMA EXPORT MODAL LOGIC
  async function loadDataAndScript() {
    try {
      if (!cachedJsonData) {
        const res = await fetch('deck-data.json');
        cachedJsonData = await res.text();
      }
      if (!cachedFigmaScript) {
        const res2 = await fetch('figma-importer.js');
        cachedFigmaScript = await res2.text();
      }
    } catch (err) {
      console.warn("Local fetch warning, using embedded fallback", err);
    }
  }

  btnOpenFigma.addEventListener('click', async () => {
    await loadDataAndScript();
    modal.classList.add('active');
    updateModalDisplay();
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  tabBtnScript.addEventListener('click', () => {
    activeTab = 'script';
    tabBtnScript.classList.add('active');
    tabBtnJson.classList.remove('active');
    updateModalDisplay();
  });

  tabBtnJson.addEventListener('click', () => {
    activeTab = 'json';
    tabBtnJson.classList.add('active');
    tabBtnScript.classList.remove('active');
    updateModalDisplay();
  });

  function updateModalDisplay() {
    if (activeTab === 'script') {
      modalCodeDisplay.textContent = cachedFigmaScript || "// Figma importer script loading...";
    } else {
      modalCodeDisplay.textContent = cachedJsonData || "// JSON schema loading...";
    }
  }

  btnCopyCode.addEventListener('click', () => {
    const textToCopy = modalCodeDisplay.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyStatus.style.display = 'inline';
      setTimeout(() => {
        copyStatus.style.display = 'none';
      }, 2500);
    });
  });

  btnDownloadJson.addEventListener('click', () => {
    const blob = new Blob([cachedJsonData || ''], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cemento-figma-deck.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Window resize handler
  window.addEventListener('resize', adjustSlideScale);

  // Initial setup
  adjustSlideScale();
  loadDataAndScript();
});
