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
  });
}

// ---------- 5. Mnemonic reveal (OSI post) ----------
const mnemonicBtn = document.getElementById('mnemonic-btn');
const mnemonicAnswer = document.getElementById('mnemonic-answer');

if (mnemonicBtn && mnemonicAnswer) {
  mnemonicBtn.addEventListener('click', () => {
    const isHidden = mnemonicAnswer.style.display !== 'block';
    mnemonicAnswer.style.display = isHidden ? 'block' : 'none';
    mnemonicBtn.textContent = isHidden ? 'Hide the mnemonic' : 'Reveal the mnemonic';
  });
}
