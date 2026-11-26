/* ==========================================================================
   Lee Wesley Fortuna — Portfolio Interactivity
   Includes: Fast Preloader, Bounded Draggable Freeform Polaroid Canvas,
   Grid Fallback Toggle, Case Study Modal, Hover Slider, EnerSave Simulator,
   Theme Switching, Filtering, Clipboard Copy & Mailto Composer
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     Project Case Study Data (Verified & Preserved Intact)
     ------------------------------------------------------------------------ */
  const CASE_STUDIES = {
    citeflow: {
      eyebrow: '2026 – Present · Quality Assurance Engineer',
      title: 'CiteFlow — Institutional Administrative & Faculty Management System',
      screenshots: [
        { src: 'assets/citeflow-dashboard.webp', caption: 'Admin Dashboard — Live KPIs & Monthly Trends' },
        { src: 'assets/citeflow-submissions.webp', caption: 'Workflow Submissions & Two-Stage Review Queue' },
        { src: 'assets/citeflow-architecture.webp', caption: 'Three-Tier Web Architecture (Supabase Cloud)' }
      ],
      context:
        'Built for the College of Technology and Engineering (COTE) at Cebu Technological University – Argao Campus and presented at Cyber Days 2026 (BSIT Research Congress). CiteFlow replaces fragmented spreadsheets, paper 201 folders, and manual compliance tracking with a centralized 12-module web portal.',
      architecture:
        'Three-tier web architecture built with HTML5, Tailwind CSS, JavaScript, and Node.js backed by Supabase Cloud — featuring a 37-table normalized PostgreSQL database with Role-Based Access Control (RBAC), Row-Level Security (RLS), JWT Auth, Realtime updates, and isolated Storage Buckets.',
      contributions: [
        'Designed and executed structured test plans, test cases, and bug-tracking logs across end-to-end user workflows for Faculty, Chairpersons, the College Secretary, and the Dean.',
        'Conducted functional, system, and user acceptance testing (UAT) validating interface layout, two-stage approval locks, data consistency, and citation/document formatting accuracy.',
        'Partnered directly with developers to isolate UI edge cases, prioritize severity fixes, and verify release readiness ahead of institutional evaluation.'
      ],
      outcomes:
        'Evaluated by 40 COTE stakeholders and IT experts: 4.46 / 5.00 overall ISO/IEC 25010:2023 software quality mean, 4.56 objective fulfillment mean, and 80.0 mean System Usability Scale (SUS) score.',
      stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Supabase / PostgreSQL', 'RBAC & RLS', 'ISO/IEC 25010 QA']
    },
    hover: {
      eyebrow: '2026 · Lead Developer',
      title: 'Hover — Desktop Screenshot & Visual Referencing Utility',
      screenshots: [
        { src: 'assets/hover.webp', caption: 'Hover v1.0 Floating Toolbar & Pinned Overlay in Action' }
      ],
      context:
        'Multi-window design reviews, coding alongside specifications, and visual QA routinely suffer from constant Alt-Tab context switching. Hover was built as a lightweight Windows desktop utility (Hover v1.0) that keeps pinned references floating seamlessly above active workspaces.',
      architecture:
        'Event-driven desktop architecture engineered for low-friction overlay management, custom canvas rendering, global snip shortcuts (Ctrl+Shift+S), adjustable window opacity, and OS-level click-through event pass-through.',
      contributions: [
        'Led end-to-end architecture, interaction design, and Windows packaging (Hover v1.0) focused on zero-clutter visual referencing.',
        'Built a real-time split visual comparison slider allowing side-by-side pixel inspection between reference captures and live screens.',
        'Implemented click-through transparency mode and custom on-canvas annotation/drawing tools so users can inspect or trace without losing focus in underlying apps.'
      ],
      outcomes:
        'Shipped as a standalone Windows productivity utility designed to eliminate screen-switching friction across design, QA, and development workflows.',
      stack: ['Desktop Utility', 'Event-Driven Architecture', 'Interactive Canvas', 'Visual Comparison Slider', 'Click-Through Overlay']
    },
    apir: {
      eyebrow: '2026 · Creator & Developer',
      title: 'Apir — Adaptive Presentation Interface & Remote (QR Pairing Edition)',
      screenshots: [
        { src: 'assets/apir.webp', caption: 'Apir — High-Five QR & PIN Pairing Window', portrait: true }
      ],
      context:
        'Named after the Filipino "apir" (high-five), Apir (Adaptive Presentation Interface & Remote) turns a mobile phone into a wireless presentation remote and adaptive companion for a Windows PC without manual IP setup or cloud logins.',
      architecture:
        'Desktop pairing host generating live session QR codes paired with a rotatable 4-digit security PIN and selectable network adapter binding (supporting local Wi-Fi and tunnel interfaces such as Cloudflare WARP).',
      contributions: [
        'Designed and built the High-Five Pairing desktop window supporting instant scanning via a phone camera or the companion Apir App.',
        'Implemented one-click PIN regeneration ("New PIN") to keep phone-to-PC remote presentation sessions verified and secure.',
        'Added network interface selection so presenters can switch cleanly between local Wi-Fi adapters and VPN/WARP interfaces on campus.'
      ],
      outcomes:
        'Open-sourced at github.com/Huginn45/Apir as a fast, Filipino-inspired mobile presentation remote with zero-friction QR pairing.',
      stack: ['Desktop Utility', 'Presentation Remote', 'QR & PIN Pairing', 'Network Interface Binding', 'Cross-Device UX']
    },
    enersave: {
      eyebrow: '2026 · Co-Developer & Firmware Engineer',
      title: 'EnerSave — Intelligent IoT Energy Monitoring & Automation System',
      screenshots: [
        { src: 'assets/enersave.webp', caption: 'EnerSave Live Demo — ESP8266 Control Rig & 3-Bulb Fixture', portrait: true }
      ],
      context:
        'Indoor rooms and classrooms frequently waste electricity when lighting fixtures remain powered while unoccupied. EnerSave combines microcontroller firmware, environmental sensing, voice assistants, and a responsive web SPA to automate room lighting responsibly.',
      architecture:
        'ESP8266 (NodeMCU / WeMos D1 Mini) hardware stack wiring an Ultrasonic motion sensor (~100 cm detection range), DHT11 environmental sensor, and a 4-channel relay module (pins D1, D5, D6) controlling 220V lighting fixtures, bridged to SinricPro for Alexa/Google Home voice commands and a real-time SPA web dashboard.',
      contributions: [
        'Engineered ESP8266 firmware handling sensor polling, relay switching logic, and cloud state synchronization.',
        'Programmed adaptive automated operating modes — Standard Mode (motion-triggered auto-control) and Night Mode (manual-priority override with ultrasonic auto-off disabled).',
        'Integrated hands-free voice control via SinricPro alongside manual overrides and real-time analytics on the responsive web monitoring dashboard.'
      ],
      outcomes:
        'Delivered a working multi-modal IoT prototype combining manual, voice, and sensor-driven room energy management.',
      stack: ['ESP8266 Firmware', 'Ultrasonic & DHT11 Sensors', '4-Channel Relay', 'SinricPro Voice Control', 'Web SPA Dashboard']
    },
    parsershub: {
      eyebrow: '2026 · Technical Writer & Systems Analyst',
      title: 'Parsers Hub 2.0 — Adaptive Learning Ecosystem',
      context:
        'Static learning repositories often fail to address accumulated programming-logic backlogs among BSIT students. Parsers Hub 2.0 reimagines CTU–Argao’s LMS into an adaptive ecosystem combining academic performance analytics with AI-driven tutoring.',
      architecture:
        'Structured around an Input–Process–Output (IPO) framework executed in Agile SDLC sprints, unifying web/mobile access, multimedia learning modules, performance dashboards, and an AI tutoring engine.',
      contributions: [
        'Authored comprehensive end-to-end system documentation, conceptual frameworks, IPO/process models, Gantt schedules, and formal defense manuscripts.',
        'Acted as System Architect & Analyst evaluating frontend user flows and system architecture to maintain clarity across learning modules.',
        'Structured the quantitative evaluation design aligned with ISO 9126 quality standards and the Technology Acceptance Model (TAM) for 180 BSIT students and 15 IT experts.'
      ],
      outcomes:
        'Produced complete technical blueprints, investor/defense pitch materials, and user-centered system architecture validated for institutional readiness.',
      stack: ['Systems Analysis', 'Technical Documentation', 'IPO & Process Modeling', 'ISO 9126 & TAM', 'Agile SDLC']
    },
    ssgmom: {
      eyebrow: '2026 – 2027 · Deputy Executive & Legislative Secretary',
      title: 'SSG MoM Generator — AI-Powered Legislative Minutes Generator',
      screenshots: [
        { src: 'assets/ssg-mom.webp', caption: 'SSG MoM Generator — Live at ssg-mom-generator.vercel.app' }
      ],
      context:
        'Student government secretariats produce high volumes of recurring official documents — Minutes of the Meeting, Notices, Memorandums, Request Letters, Parent’s Consents/Waivers, and Accomplishment Reports — where formatting errors slow approvals.',
      architecture:
        'AI-powered web workspace deployed on Vercel (ssg-mom-generator.vercel.app) featuring 1-click Meeting Recipes (Legislative, Executive, Emergency), drag-and-drop .docx upload, fast shorthand/dictation input, side-by-side Formatted Minutes and Markdown editing, plus Google Docs, Markdown, and PDF export.',
      contributions: [
        'Built and deployed the AI-powered SSG MoM Generator with Legislative, Executive, and Emergency presets to turn rough shorthand notes or existing .docx drafts into structured official Minutes of the Meeting.',
        'Integrated quick export options (Copy, Google Docs, Markdown, and PDF) alongside official CTU–Argao SSG branding.',
        'Maintained official secretariat archives and streamlined recurring paperwork across Request Letters, Parent’s Consents/Waivers, and Accomplishment Reports.'
      ],
      outcomes:
        'Live in production at ssg-mom-generator.vercel.app and open-sourced at github.com/Huginn45/ssg-mom-generator.',
      stack: ['AI Workflow Automation', 'Meeting Recipes', '.docx Upload', 'Markdown / GDocs / PDF Export', 'Vercel']
    }
  };

  /* ------------------------------------------------------------------------
     Fast, Respectful Initial Preloader
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderPct = document.getElementById('preloader-pct');
  const preloaderSkip = document.getElementById('preloader-skip');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function dismissPreloader() {
    if (!preloader || preloader.classList.contains('is-done')) return;
    preloader.classList.add('is-done');
    preloader.setAttribute('aria-hidden', 'true');
  }

  if (preloader) {
    if (prefersReducedMotion) {
      dismissPreloader();
    } else {
      let progress = 0;
      const tick = setInterval(() => {
        progress = Math.min(100, progress + 18);
        if (preloaderFill) preloaderFill.style.width = `${progress}%`;
        if (preloaderPct) preloaderPct.textContent = `${String(progress).padStart(2, '0')}%`;
        if (progress >= 100) {
          clearInterval(tick);
          setTimeout(dismissPreloader, 160);
        }
      }, 85);

      if (preloaderSkip) {
        preloaderSkip.addEventListener('click', () => {
          clearInterval(tick);
          dismissPreloader();
        });
      }
      // Failsafe so preloader never hangs
      setTimeout(() => {
        clearInterval(tick);
        dismissPreloader();
      }, 1200);
    }
  }

  /* ------------------------------------------------------------------------
     Theme Toggle (Light Editorial / Dark Ink)
     ------------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
      if (themeIcon) {
        themeIcon.innerHTML =
          '<circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8" fill="none"/>' +
          '<path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeBtn) themeBtn.setAttribute('aria-pressed', 'false');
      if (themeIcon) {
        themeIcon.innerHTML =
          '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>';
      }
    }
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('lwf-theme');
  } catch (_) {}
  applyTheme(savedTheme || 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('lwf-theme', next);
      } catch (_) {}
    });
  }

  /* ------------------------------------------------------------------------
     Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('primary-nav');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     Toast Feedback Helper
     ------------------------------------------------------------------------ */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2600);
  }

  /* ------------------------------------------------------------------------
     Copy-to-Clipboard Actions
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied';
      if (!value) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          const ta = document.createElement('textarea');
          ta.value = value;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast(`${label} copied: ${value}`);
      } catch (_) {
        showToast(`${label}: ${value}`);
      }
    });
  });

  /* ------------------------------------------------------------------------
     Case Study Modal (Opened from Both Polaroid Canvas & Structured Work)
     ------------------------------------------------------------------------ */
  const modalBackdrop = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalEyebrow = document.getElementById('modal-eyebrow');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  let lastTrigger = null;

  const lightboxEl = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  let lastLightboxTrigger = null;

  function openLightbox(src, caption, triggerEl) {
    if (!lightboxEl || !lightboxImg || !src) return;
    lastLightboxTrigger = triggerEl || document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Project screenshot preview';
    if (lightboxCap) lightboxCap.textContent = caption || '';
    lightboxEl.classList.add('is-open');
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    lightboxEl.setAttribute('aria-hidden', 'true');
    if (!modalBackdrop || !modalBackdrop.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') {
      lastLightboxTrigger.focus();
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxEl) {
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (!trigger) return;
    e.preventDefault();
    openLightbox(
      trigger.getAttribute('data-lightbox-src'),
      trigger.getAttribute('data-lightbox-caption') || '',
      trigger
    );
  });

  function openModal(projectId, triggerEl) {
    const study = CASE_STUDIES[projectId];
    if (!study || !modalBackdrop) return;
    lastTrigger = triggerEl || document.activeElement;

    const galleryHtml =
      study.screenshots && study.screenshots.length
        ? `<div class="modal__section">
            <h4>Project Screenshots (Click to Zoom)</h4>
            <div class="modal__gallery">
              ${study.screenshots
                .map(
                  (shot) => `
                <button type="button" class="modal__thumb ${shot.portrait ? 'modal__thumb--portrait' : ''}" data-lightbox-src="${shot.src}" data-lightbox-caption="${shot.caption}">
                  <img src="${shot.src}" alt="${shot.caption}" loading="lazy">
                  <span class="modal__thumb-cap">${shot.caption}</span>
                </button>`
                )
                .join('')}
            </div>
          </div>`
        : '';

    modalEyebrow.textContent = study.eyebrow;
    modalTitle.textContent = study.title;
    modalBody.innerHTML = `
      ${galleryHtml}
      <div class="modal__section">
        <h4>Overview &amp; Context</h4>
        <p>${study.context}</p>
      </div>
      <div class="modal__section">
        <h4>Architecture &amp; Technical Scope</h4>
        <p>${study.architecture}</p>
      </div>
      <div class="modal__section">
        <h4>Key Contributions</h4>
        <ul class="project-highlights">
          ${study.contributions.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="modal__section">
        <h4>Verified Outcome</h4>
        <p>${study.outcomes}</p>
      </div>
      <div class="tag-row" style="margin-bottom:0;">
        ${study.stack.map((tech) => `<span class="tag">${tech}</span>`).join('')}
      </div>
    `;

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  }

  document.querySelectorAll('[data-open-study]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.getAttribute('data-open-study'), btn);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxEl && lightboxEl.classList.contains('is-open')) {
        closeLightbox();
      } else if (modalBackdrop && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    }
  });

  /* ------------------------------------------------------------------------
     Tightened Bounded Freeform Polaroid Canvas
     - Clamped cleanly to stage bounds on drag AND resize
     - Drag threshold (6px) guarantees crisp click-to-open Case Study modal
     - Keyboard accessible (Enter/Space opens study, Arrow keys nudge within bounds)
     - Grid / Freeform view switcher + Reset Layout
     ------------------------------------------------------------------------ */
  const canvasStage = document.getElementById('freeform-stage');
  const resetCanvasBtn = document.getElementById('canvas-reset-btn');
  const toggleLayoutBtn = document.getElementById('canvas-layout-toggle');
  const canvasItems = canvasStage ? Array.from(canvasStage.querySelectorAll('[data-canvas-item]')) : [];
  let topZ = 20;
  const PAD = 14;
  const BOTTOM_SAFE = 44; // keeps coordinate footer legible

  function isGridMode() {
    if (!canvasStage) return true;
    return canvasStage.classList.contains('is-grid-mode') || window.innerWidth <= 760;
  }

  function clampPosition(el, left, top) {
    const stageRect = canvasStage.getBoundingClientRect();
    const elW = el.offsetWidth || 224;
    const elH = el.offsetHeight || 200;
    const maxLeft = Math.max(PAD, stageRect.width - elW - PAD);
    const maxTop = Math.max(PAD, stageRect.height - elH - BOTTOM_SAFE);
    return {
      left: Math.max(PAD, Math.min(maxLeft, Math.round(left))),
      top: Math.max(PAD, Math.min(maxTop, Math.round(top)))
    };
  }

  function layoutCanvasDefault() {
    if (!canvasStage || isGridMode()) return;
    const stageRect = canvasStage.getBoundingClientRect();
    if (stageRect.width < 100) return;

    canvasItems.forEach((el, idx) => {
      const rx = parseFloat(el.getAttribute('data-x') || '0.05');
      const ry = parseFloat(el.getAttribute('data-y') || '0.1');
      const targetLeft = rx * stageRect.width;
      const targetTop = ry * stageRect.height;
      const pos = clampPosition(el, targetLeft, targetTop);
      el.style.left = `${pos.left}px`;
      el.style.top = `${pos.top}px`;
      el.style.zIndex = String(10 + idx);
    });
  }

  function keepAllInBounds() {
    if (!canvasStage || isGridMode()) return;
    canvasItems.forEach((el) => {
      const curLeft = parseFloat(el.style.left || '0');
      const curTop = parseFloat(el.style.top || '0');
      const pos = clampPosition(el, curLeft, curTop);
      el.style.left = `${pos.left}px`;
      el.style.top = `${pos.top}px`;
    });
  }

  if (canvasStage && canvasItems.length) {
    // Initial bounded layout
    layoutCanvasDefault();

    canvasItems.forEach((el) => {
      const studyId = el.getAttribute('data-canvas-study');
      let startX = 0;
      let startY = 0;
      let origLeft = 0;
      let origTop = 0;
      let moved = false;
      let pointerActive = false;

      el.addEventListener('pointerdown', (e) => {
        if (isGridMode()) return;
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        pointerActive = true;
        moved = false;
        topZ += 1;
        el.style.zIndex = String(topZ);
        startX = e.clientX;
        startY = e.clientY;
        origLeft = parseFloat(el.style.left || '0');
        origTop = parseFloat(el.style.top || '0');
        el.setPointerCapture(e.pointerId);
      });

      el.addEventListener('pointermove', (e) => {
        if (!pointerActive || isGridMode()) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!moved && Math.hypot(dx, dy) > 6) {
          moved = true;
          el.classList.add('is-dragging');
        }
        if (moved) {
          const pos = clampPosition(el, origLeft + dx, origTop + dy);
          el.style.left = `${pos.left}px`;
          el.style.top = `${pos.top}px`;
        }
      });

      const endPointer = (e) => {
        if (!pointerActive) return;
        pointerActive = false;
        el.classList.remove('is-dragging');
        if (el.hasPointerCapture && el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
        // Clean click (did not drag past threshold) -> open full case study
        if (!moved && studyId) {
          openModal(studyId, el);
        }
      };

      el.addEventListener('pointerup', endPointer);
      el.addEventListener('pointercancel', endPointer);

      // Click handler when in Grid mode / mobile fallback
      el.addEventListener('click', () => {
        if (isGridMode() && studyId) {
          openModal(studyId, el);
        }
      });

      // Keyboard access: Enter/Space opens study, Arrows nudge within bounds
      el.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && studyId) {
          e.preventDefault();
          openModal(studyId, el);
          return;
        }
        if (isGridMode()) return;
        const step = e.shiftKey ? 36 : 16;
        let dx = 0;
        let dy = 0;
        if (e.key === 'ArrowLeft') dx = -step;
        if (e.key === 'ArrowRight') dx = step;
        if (e.key === 'ArrowUp') dy = -step;
        if (e.key === 'ArrowDown') dy = step;
        if (dx || dy) {
          e.preventDefault();
          topZ += 1;
          el.style.zIndex = String(topZ);
          const pos = clampPosition(
            el,
            parseFloat(el.style.left || '0') + dx,
            parseFloat(el.style.top || '0') + dy
          );
          el.style.left = `${pos.left}px`;
          el.style.top = `${pos.top}px`;
        }
      });
    });

    if (resetCanvasBtn) {
      resetCanvasBtn.addEventListener('click', () => {
        canvasStage.classList.remove('is-grid-mode');
        if (toggleLayoutBtn) {
          toggleLayoutBtn.setAttribute('aria-pressed', 'false');
          toggleLayoutBtn.textContent = 'Grid View';
        }
        layoutCanvasDefault();
        showToast('Canvas layout reset.');
      });
    }

    if (toggleLayoutBtn) {
      toggleLayoutBtn.addEventListener('click', () => {
        const gridOn = canvasStage.classList.toggle('is-grid-mode');
        toggleLayoutBtn.setAttribute('aria-pressed', String(gridOn));
        toggleLayoutBtn.textContent = gridOn ? 'Freeform View' : 'Grid View';
        if (!gridOn) {
          requestAnimationFrame(layoutCanvasDefault);
        }
      });
    }

    let resizeRaf = null;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (!isGridMode()) keepAllInBounds();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Project Discipline Filter Tabs
     ------------------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      filterTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      projectCards.forEach((card) => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        card.classList.toggle('is-hidden', filter !== 'all' && !cats.includes(filter));
      });
    });
  });

  /* ------------------------------------------------------------------------
     Interactive Specimen: Hover Real-Time Comparison Slider
     ------------------------------------------------------------------------ */
  const hoverRange = document.getElementById('hover-slider-range');
  const hoverStage = document.getElementById('hover-stage');
  const hoverBefore = document.getElementById('hover-before-layer');
  const hoverDivider = document.getElementById('hover-divider');
  const hoverReadout = document.getElementById('hover-split-readout');

  function setHoverSplit(pct) {
    const clamped = Math.max(8, Math.min(92, Math.round(pct)));
    if (hoverBefore) hoverBefore.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    if (hoverDivider) hoverDivider.style.left = `${clamped}%`;
    if (hoverRange) hoverRange.value = String(clamped);
    if (hoverReadout) hoverReadout.textContent = `${clamped}%`;
  }

  if (hoverRange) {
    hoverRange.addEventListener('input', (e) => setHoverSplit(Number(e.target.value)));
  }

  if (hoverStage) {
    let dragging = false;
    const updateFromPointer = (clientX) => {
      const rect = hoverStage.getBoundingClientRect();
      setHoverSplit(((clientX - rect.left) / rect.width) * 100);
    };
    hoverStage.addEventListener('pointerdown', (e) => {
      dragging = true;
      hoverStage.setPointerCapture(e.pointerId);
      updateFromPointer(e.clientX);
    });
    hoverStage.addEventListener('pointermove', (e) => {
      if (dragging) updateFromPointer(e.clientX);
    });
    hoverStage.addEventListener('pointerup', () => { dragging = false; });
    hoverStage.addEventListener('pointercancel', () => { dragging = false; });
  }

  /* ------------------------------------------------------------------------
     Interactive Specimen: EnerSave Operating Mode Simulator
     ------------------------------------------------------------------------ */
  const enerRoom = document.getElementById('enersave-room');
  const enerTelemetry = document.getElementById('enersave-telemetry');
  const modeButtons = document.querySelectorAll('[data-ener-mode]');
  const relayNodes = document.querySelectorAll('[data-relay]');

  const ENER_MODES = {
    standard: {
      roomAttr: 'standard',
      relays: { d1: true, d5: true, d6: false },
      sensor: 'Ultrasonic: Active (64 cm)',
      power: 'Est. Load: 24 W · Auto-Off ON'
    },
    night: {
      roomAttr: 'night',
      relays: { d1: false, d5: false, d6: true },
      sensor: 'Ultrasonic: Auto-Off Paused',
      power: 'Est. Load: 9 W · Night Mode'
    },
    voice: {
      roomAttr: 'standard',
      relays: { d1: true, d5: true, d6: true },
      sensor: 'SinricPro: "All Lights On"',
      power: 'Est. Load: 36 W · Voice Sync'
    }
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modeKey = btn.getAttribute('data-ener-mode');
      const cfg = ENER_MODES[modeKey];
      if (!cfg || !enerRoom) return;
      enerRoom.setAttribute('data-mode', cfg.roomAttr);
      relayNodes.forEach((node) => {
        const isOn = Boolean(cfg.relays[node.getAttribute('data-relay')]);
        node.classList.toggle('is-on', isOn);
        const stateEl = node.querySelector('.relay-node__state');
        if (stateEl) stateEl.textContent = isOn ? 'ON' : 'OFF';
      });
      if (enerTelemetry) {
        enerTelemetry.innerHTML = `<span>${cfg.sensor}</span><span>${cfg.power}</span>`;
      }
      modeButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });

  /* ------------------------------------------------------------------------
     Quick Mailto Message Composer
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('sender-name')?.value || '').trim();
      const subject = (document.getElementById('sender-subject')?.value || 'IT / Web Dev / Multimedia Internship Inquiry').trim();
      const message = (document.getElementById('sender-message')?.value || '').trim();
      if (!name || !message) {
        showToast('Please enter your name and a brief message.');
        return;
      }
      const body = `Hi Lee Wesley,\n\n${message}\n\nBest regards,\n${name}`;
      window.location.href = `mailto:fortwesley237@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening your email client with the draft ready.');
    });
  }

  /* ------------------------------------------------------------------------
     Scroll Reveal & Active Nav Highlighting
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-link');
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach((a) => {
              a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((sec) => navObs.observe(sec));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------------
     Reliable Scroll-to-Top for Brand Logo & Back-to-Top Links
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      if (window.history && window.history.replaceState && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });
})();
