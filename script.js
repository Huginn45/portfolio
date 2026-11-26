/* ==========================================================================
   Lee Wesley Fortuna — Portfolio Interactivity (Specimen Edition)
   Includes: Project Index / Proof Sheet Toggle, Case Study Modal,
   Screenshot Lightbox, Discipline Filter, Hover Split Comparison Slider,
   EnerSave ESP8266 Relay Simulator, Theme Toggle, Copy Actions, Mailto Form,
   Active Nav State & Reliable Scroll-to-Top
   ========================================================================== */

(() => {
  'use strict';

  const CASE_STUDIES = {
    citeflow: {
      eyebrow: '2026 to Present, Quality Assurance Engineer',
      title: 'CiteFlow: Institutional Administrative and Faculty Management System',
      screenshots: [
        { src: 'assets/citeflow-dashboard.webp', caption: 'Admin Dashboard with live KPIs and monthly activity trends', w: 939, h: 476 },
        { src: 'assets/citeflow-submissions.webp', caption: 'Workflow submissions and two-stage review queue', w: 941, h: 469 },
        { src: 'assets/citeflow-architecture.webp', caption: 'Three-tier web architecture on Supabase Cloud', w: 1200, h: 712 }
      ],
      context:
        'Built for the College of Technology and Engineering (COTE) at Cebu Technological University, Argao Campus and presented at Cyber Days 2026 (BSIT Research Congress). CiteFlow replaces fragmented spreadsheets, paper 201 folders, and manual compliance tracking with a centralized 12-module web portal.',
      architecture:
        'Three-tier web architecture built with HTML5, Tailwind CSS, JavaScript, and Node.js backed by Supabase Cloud, featuring a 37-table normalized PostgreSQL database with Role-Based Access Control (RBAC), Row-Level Security (RLS), JWT Auth, Realtime updates, and isolated Storage Buckets.',
      contributions: [
        'Designed and executed structured test plans, test cases, and bug-tracking logs across end-to-end user workflows for Faculty, Chairpersons, the College Secretary, and the Dean.',
        'Conducted functional, system, and user acceptance testing (UAT) validating interface layout, two-stage approval locks, data consistency, and citation formatting accuracy.',
        'Partnered directly with developers to isolate UI edge cases, prioritize severity fixes, and verify release readiness ahead of institutional evaluation.'
      ],
      outcomes:
        'Evaluated by 40 COTE stakeholders and IT experts: 4.46 / 5.00 overall ISO/IEC 25010:2023 software quality mean, 4.56 objective fulfillment mean, and 80.0 mean System Usability Scale (SUS) score.',
      stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Supabase and PostgreSQL', 'RBAC and RLS', 'ISO/IEC 25010 QA']
    },
    hover: {
      eyebrow: '2026, Lead Developer',
      title: 'Hover: Desktop Screenshot and Visual Referencing Utility',
      screenshots: [
        { src: 'assets/hover.webp', caption: 'Hover v1.0 floating toolbar and pinned reference overlay on Windows', w: 1200, h: 490 }
      ],
      context:
        'Multi-window design reviews, coding alongside specifications, and visual QA routinely suffer from constant Alt-Tab context switching. Hover was built as a lightweight Windows desktop utility that keeps pinned references floating above active workspaces.',
      architecture:
        'Event-driven desktop architecture engineered for low-friction overlay management, custom canvas rendering, global snip shortcuts (Ctrl+Shift+S), adjustable window opacity, and OS-level click-through event pass-through.',
      contributions: [
        'Led end-to-end architecture, interaction design, and Windows packaging focused on zero-clutter visual referencing.',
        'Built a real-time split visual comparison slider allowing side-by-side pixel inspection between reference captures and live screens.',
        'Implemented click-through transparency mode and custom on-canvas annotation tools so users can inspect or trace without losing focus in underlying apps.'
      ],
      outcomes:
        'Shipped as a standalone Windows productivity utility designed to remove screen-switching friction across design, QA, and development workflows.',
      stack: ['Desktop utility', 'Event-driven architecture', 'Interactive canvas', 'Visual comparison slider', 'Click-through overlay']
    },
    apir: {
      eyebrow: '2026, Creator and Developer',
      title: 'Apir: Adaptive Presentation Interface and Remote (QR Pairing Edition)',
      screenshots: [
        { src: 'assets/apir.webp', caption: 'Apir High-Five QR and PIN pairing window', portrait: true, w: 377, h: 602 }
      ],
      context:
        'Named after the Filipino word apir (high-five), Apir turns a mobile phone into a wireless presentation remote and adaptive companion for a Windows PC without manual IP setup or cloud logins.',
      architecture:
        'Desktop pairing host generating live session QR codes paired with a rotatable 4-digit security PIN and selectable network adapter binding supporting local Wi-Fi and tunnel interfaces such as Cloudflare WARP.',
      contributions: [
        'Designed and built the High-Five Pairing desktop window supporting instant scanning via a phone camera or the companion Apir App.',
        'Implemented one-click PIN regeneration (New PIN) to keep phone-to-PC remote presentation sessions verified and secure.',
        'Added network interface selection so presenters can switch cleanly between local Wi-Fi adapters and VPN or WARP interfaces on campus.'
      ],
      outcomes:
        'Open-sourced at github.com/Huginn45/Apir as a fast, Filipino-inspired mobile presentation remote with zero-friction QR pairing.',
      stack: ['Desktop utility', 'Presentation remote', 'QR and PIN pairing', 'Network interface binding', 'Cross-device UX']
    },
    enersave: {
      eyebrow: '2026, Co-Developer and Firmware Engineer',
      title: 'EnerSave: Intelligent IoT Energy Monitoring and Automation System',
      screenshots: [
        { src: 'assets/enersave.webp', caption: 'EnerSave live classroom demo with ESP8266 control rig and 3-bulb fixture', portrait: true, w: 277, h: 527 }
      ],
      context:
        'Indoor rooms and classrooms waste electricity when lighting fixtures remain powered while unoccupied. EnerSave combines microcontroller firmware, environmental sensing, voice assistants, and a responsive web SPA to automate room lighting.',
      architecture:
        'ESP8266 (NodeMCU and WeMos D1 Mini) hardware stack wiring an Ultrasonic motion sensor (about 100 cm range), DHT11 environmental sensor, and a 4-channel relay module (pins D1, D5, D6) controlling 220 V lighting fixtures, bridged to SinricPro for Alexa and Google Home voice commands and a real-time SPA web dashboard.',
      contributions: [
        'Engineered ESP8266 firmware handling sensor polling, relay switching logic, and cloud state synchronization.',
        'Programmed adaptive operating modes: Standard Mode (motion-triggered auto-control) and Night Mode (manual-priority override with ultrasonic auto-off disabled).',
        'Integrated hands-free voice control via SinricPro alongside manual overrides and live telemetry on the web dashboard.'
      ],
      outcomes:
        'Delivered a working multi-modal IoT prototype combining manual, voice, and sensor-driven room energy management.',
      stack: ['ESP8266 firmware', 'Ultrasonic and DHT11 sensors', '4-channel relay', 'SinricPro voice control', 'Web SPA dashboard']
    },
    parsershub: {
      eyebrow: '2026, Technical Writer and Systems Analyst',
      title: 'Parsers Hub 2.0: Adaptive Learning Ecosystem',
      context:
        'Static learning repositories often fail to address accumulated programming-logic backlogs among BSIT students. Parsers Hub 2.0 updates CTU Argao’s LMS into an adaptive ecosystem combining academic performance analytics with AI-driven tutoring.',
      architecture:
        'Structured around an Input-Process-Output (IPO) framework executed in Agile SDLC sprints, unifying web and mobile access, multimedia learning modules, performance dashboards, and an AI tutoring engine.',
      contributions: [
        'Authored comprehensive system documentation, conceptual frameworks, IPO and process models, Gantt schedules, and formal defense manuscripts.',
        'Evaluated frontend user flows and system architecture to maintain clarity across adaptive learning modules.',
        'Structured the quantitative evaluation design aligned with ISO 9126 quality standards and the Technology Acceptance Model (TAM) for 180 BSIT students and 15 IT experts.'
      ],
      outcomes:
        'Produced complete technical blueprints, defense pitch materials, and user-centered system architecture validated for institutional readiness.',
      stack: ['Systems analysis', 'Technical documentation', 'IPO and process modeling', 'ISO 9126 and TAM', 'Agile SDLC']
    },
    ssgmom: {
      eyebrow: '2026 to 2027, Deputy Executive and Legislative Secretary',
      title: 'SSG MoM Generator: AI-Powered Legislative Minutes Generator',
      screenshots: [
        { src: 'assets/ssg-mom.webp', caption: 'SSG MoM Generator live at ssg-mom-generator.vercel.app', w: 1200, h: 545 }
      ],
      context:
        'Student government secretariats produce high volumes of recurring official documents (Minutes of the Meeting, Notices, Memorandums, Request Letters, Parent’s Consents and Waivers, and Accomplishment Reports) where formatting errors slow approvals.',
      architecture:
        'AI-powered web workspace deployed on Vercel (ssg-mom-generator.vercel.app) featuring 1-click Meeting Recipes (Legislative, Executive, Emergency), drag-and-drop .docx upload, fast shorthand and dictation input, side-by-side Formatted Minutes and Markdown editing, plus Google Docs, Markdown, and PDF export.',
      contributions: [
        'Built and deployed the AI-powered SSG MoM Generator with Legislative, Executive, and Emergency presets to convert rough shorthand notes or existing .docx drafts into structured official minutes.',
        'Integrated quick export options (Copy, Google Docs, Markdown, and PDF) alongside official CTU Argao SSG formatting.',
        'Maintained official secretariat archives and streamlined recurring paperwork across Request Letters, Parent’s Consents and Waivers, and Accomplishment Reports.'
      ],
      outcomes:
        'Live in production at ssg-mom-generator.vercel.app and open-sourced at github.com/Huginn45/ssg-mom-generator.',
      stack: ['AI workflow automation', 'Meeting recipes', '.docx upload', 'Markdown, GDocs, and PDF export', 'Vercel']
    }
  };

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Theme Toggle (Oat Paper Light / Warm Charcoal Dark)
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
          '<circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6" fill="none"/>' +
          '<path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>';
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeBtn) themeBtn.setAttribute('aria-pressed', 'false');
      if (themeIcon) {
        themeIcon.innerHTML =
          '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>';
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
     Case Study Modal & Screenshot Zoom Lightbox
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
            <h4>Project captures (select any image to zoom)</h4>
            <div class="modal__gallery">
              ${study.screenshots
                .map(
                  (shot) => `
                <button type="button" class="modal__thumb ${shot.portrait ? 'modal__thumb--portrait' : ''}" data-lightbox-src="${shot.src}" data-lightbox-caption="${shot.caption}">
                  <img src="${shot.src}" width="${shot.w}" height="${shot.h}" alt="${shot.caption}" loading="lazy">
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
        <h4>Overview and context</h4>
        <p>${study.context}</p>
      </div>
      <div class="modal__section">
        <h4>Architecture and technical scope</h4>
        <p>${study.architecture}</p>
      </div>
      <div class="modal__section">
        <h4>Key contributions</h4>
        <ul class="project-highlights">
          ${study.contributions.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="modal__section">
        <h4>Verified outcome</h4>
        <p>${study.outcomes}</p>
      </div>
      <ul class="spec-tags">
        ${study.stack.map((tech) => `<li>${tech}</li>`).join('')}
      </ul>
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
     Specimen Project Index: Row Index / Proof Sheet Toggle & Keyboard Open
     ------------------------------------------------------------------------ */
  const indexStage = document.getElementById('freeform-stage');
  const resetIndexBtn = document.getElementById('canvas-reset-btn');
  const toggleLayoutBtn = document.getElementById('canvas-layout-toggle');
  const indexItems = indexStage ? Array.from(indexStage.querySelectorAll('[data-canvas-item]')) : [];

  indexItems.forEach((item) => {
    const studyId = item.getAttribute('data-canvas-study');
    if (!studyId) return;
    item.addEventListener('click', () => openModal(studyId, item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(studyId, item);
      }
    });
  });

  if (toggleLayoutBtn && indexStage) {
    toggleLayoutBtn.addEventListener('click', () => {
      const sheetOn = indexStage.classList.toggle('is-sheet-mode');
      toggleLayoutBtn.setAttribute('aria-pressed', String(sheetOn));
      toggleLayoutBtn.textContent = sheetOn ? 'Index rows' : 'Proof sheet';
    });
  }

  if (resetIndexBtn && indexStage) {
    resetIndexBtn.addEventListener('click', () => {
      indexStage.classList.remove('is-sheet-mode');
      if (toggleLayoutBtn) {
        toggleLayoutBtn.setAttribute('aria-pressed', 'false');
        toggleLayoutBtn.textContent = 'Proof sheet';
      }
      showToast('Project index view reset.');
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
      power: 'Load: 24 W, Auto-Off ON'
    },
    night: {
      roomAttr: 'night',
      relays: { d1: false, d5: false, d6: true },
      sensor: 'Ultrasonic: Auto-Off paused',
      power: 'Load: 9 W, Night mode'
    },
    voice: {
      roomAttr: 'standard',
      relays: { d1: true, d5: true, d6: true },
      sensor: 'SinricPro: “All lights on”',
      power: 'Load: 36 W, Voice sync'
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
     Mailto Message Composer with Accessible Inline Validation
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const contactHelp = document.getElementById('contact-help');

  if (contactForm) {
    const nameEl = document.getElementById('sender-name');
    const subjectEl = document.getElementById('sender-subject');
    const messageEl = document.getElementById('sender-message');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (nameEl?.value || '').trim();
      const subject = (subjectEl?.value || 'IT, Web Dev, or Multimedia Internship Inquiry').trim();
      const message = (messageEl?.value || '').trim();

      if (nameEl) nameEl.setAttribute('aria-invalid', String(!name));
      if (messageEl) messageEl.setAttribute('aria-invalid', String(!message));

      if (!name || !message) {
        if (contactHelp) {
          contactHelp.textContent = 'Enter your name and a brief message to prepare the draft.';
        }
        const firstInvalid = !name ? nameEl : messageEl;
        if (firstInvalid) {
          if (contactHelp) firstInvalid.setAttribute('aria-describedby', contactHelp.id);
          firstInvalid.focus();
        }
        return;
      }

      if (contactHelp) contactHelp.textContent = '';
      const body = `Hi Lee Wesley,\n\n${message}\n\nBest regards,\n${name}`;
      window.location.href = `mailto:fortwesley237@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening your email client with the draft ready.');
    });
  }

  /* ------------------------------------------------------------------------
     Active Navigation Section Tracking
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length) {
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
  }

  /* ------------------------------------------------------------------------
     Reliable Scroll-to-Top for Brand Logo and Back-to-Top Links
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
