/* ============================================================
   Hafiz's Desk — script.js
   Every feature here is written plainly on purpose (no build
   tools, no libraries) so it's easy to read and modify later.
   Each block only runs if the elements it needs exist on the
   current page, so this one file can be shared across all pages.
   ============================================================ */

// ---------- 1. Category filter buttons (homepage) ----------
// Clicking a filter button hides any post card whose data-category
// doesn't match, and marks the clicked button as active.
const filterBar = document.getElementById('filters');

if (filterBar) {
  const buttons = filterBar.querySelectorAll('button');
  const cards = document.querySelectorAll('#post-grid .card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // swap the active class to whichever button was clicked
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

// ---------- 2. Random study tip widget (homepage) ----------
const tipBtn = document.getElementById('tip-btn');
const tipText = document.getElementById('tip-text');

if (tipBtn && tipText) {
  const tips = [
    "Study in 25-minute blocks with a 5-minute break. It's easier to start something that only lasts 25 minutes.",
    "Explain the topic out loud like you're teaching a friend. If you get stuck, that's exactly what to re-read.",
    "Put your phone in another room, not just face-down on the desk.",
    "Do the hardest subject first, while your focus is freshest.",
    "Rewrite your notes in your own words instead of just re-reading them — it forces your brain to actually process it.",
    "Test yourself before you feel ready. Recall beats re-reading, every time.",
    "Pick tomorrow's first task before you go to bed tonight. Future-you will thank you."
  ];

  tipBtn.addEventListener('click', () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = randomTip;
  });
}

// ---------- 3. Reading progress bar (post pages) ----------
const progressBar = document.getElementById('progress-bar');

if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = percent + '%';
  });
}

// ---------- 4. Dark mode toggle (every page) ----------
// The theme is stored in localStorage so it stays picked
// across pages and after the reader closes the tab.
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement; // the <html> element

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// On page load, use the saved theme (default: light)
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
    updateGiscusTheme(next);
  });
}

// ---------- 6. Decimal-to-binary live converter (binary post) ----------
const decimalInput = document.getElementById('decimal-input');
const binaryOutput = document.getElementById('binary-output');

if (decimalInput && binaryOutput) {
  decimalInput.addEventListener('input', () => {
    const value = decimalInput.value.trim();

    if (value === '') {
      binaryOutput.textContent = '—';
      return;
    }

    const num = Number(value);

    if (isNaN(num) || num < 0) {
      binaryOutput.textContent = '—';
      return;
    }

    if (!Number.isInteger(num)) {
      binaryOutput.textContent = 'whole numbers only';
      return;
    }

    // Numbers bigger than this lose precision in JavaScript, so the
    // conversion would be wrong (not just long) past this point.
    if (num > Number.MAX_SAFE_INTEGER) {
      binaryOutput.textContent = 'too large — try something under 9 quadrillion';
      return;
    }

    // toString(2) converts a number to a base-2 (binary) string
    binaryOutput.textContent = num.toString(2);
  });
}

// ---------- 8. Contact form (contact page) ----------
// EDIT THIS: put your real email address here before publishing.
const CONTACT_EMAIL = 'rootno.17@gmail.com';

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the normal page-reload submit

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const status = document.getElementById('contact-status');

    const subject = encodeURIComponent(`Message from ${name} via Hafiz's Desk`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    // Building the mailto link ourselves (rather than a form action)
    // works consistently across real browsers.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (status) {
      status.style.display = 'block';
      status.textContent = 'Opening your email app now — if nothing happens, make sure you\'re viewing this in a real browser, not a code-editor preview.';
    }
  });
}

// ---------- 10. Giscus comments (post pages) ----------
// Built with createElement (instead of a plain <script> tag in the HTML)
// so we can set its theme to match whatever theme this page already has,
// instead of giscus's own OS-based guess.
const giscusContainer = document.getElementById('giscus-container');

if (giscusContainer) {
  const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  const giscusScript = document.createElement('script');
  giscusScript.src = 'https://giscus.app/client.js';
  giscusScript.setAttribute('data-repo', 'RootNo7/Student-Blog-Web');
  giscusScript.setAttribute('data-repo-id', 'R_kgDOUWSRJw');
  giscusScript.setAttribute('data-category', 'Announcements');
  giscusScript.setAttribute('data-category-id', 'DIC_kwDOUWSRJ84DFYQ2');
  giscusScript.setAttribute('data-mapping', 'title');
  giscusScript.setAttribute('data-strict', '0');
  giscusScript.setAttribute('data-reactions-enabled', '1');
  giscusScript.setAttribute('data-emit-metadata', '0');
  giscusScript.setAttribute('data-input-position', 'bottom');
  giscusScript.setAttribute('data-theme', currentTheme);
  giscusScript.setAttribute('data-lang', 'en');
  giscusScript.setAttribute('crossorigin', 'anonymous');
  giscusScript.async = true;

  giscusContainer.appendChild(giscusScript);
}

// Tells the already-loaded giscus iframe to switch theme live —
// called whenever the site's own dark mode toggle is clicked.
function updateGiscusTheme(theme) {
  const giscusFrame = document.querySelector('iframe.giscus-frame');
  if (!giscusFrame) return;
  giscusFrame.contentWindow.postMessage(
    { giscus: { setConfig: { theme } } },
    'https://giscus.app'
  );
}

// ---------- 11. Mnemonic reveal (OSI post) ----------
const mnemonicBtn = document.getElementById('mnemonic-btn');
const mnemonicAnswer = document.getElementById('mnemonic-answer');

if (mnemonicBtn && mnemonicAnswer) {
  mnemonicBtn.addEventListener('click', () => {
    const isHidden = mnemonicAnswer.style.display !== 'block';
    mnemonicAnswer.style.display = isHidden ? 'block' : 'none';
    mnemonicBtn.textContent = isHidden ? 'Hide the mnemonic' : 'Reveal the mnemonic';
  });
}