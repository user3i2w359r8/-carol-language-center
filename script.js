/* Progressive enhancement only. Course content, directions and contact links
   remain available when JavaScript is disabled. No analytics or storage. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = (open, restoreFocus = false) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false,true);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header') && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    // If the layout returns to desktop, reset the mobile toggle state.
    const desktop = window.matchMedia('(min-width: 921px)');
    if (desktop.addEventListener) desktop.addEventListener('change', event => { if (event.matches) setOpen(false); });
  }

  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const language = document.getElementById('enquiry-language');
  const goal = document.getElementById('enquiry-goal');
  const fallback = document.getElementById('enquiry-fallback');
  const ar = document.documentElement.lang === 'ar';
  const query = new URLSearchParams(window.location.search).get('language');
  if (query) {
    const option = [...language.options].find(option => option.dataset.slug === query);
    if (option) language.value = option.value;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const lines = [ar ? 'مرحباً كارول!' : 'Hello Carol!'];
    lines.push(language.value ? (ar ? 'أنا مهتم/ة بتعلّم '+language.value+'.' : 'I am interested in learning '+language.value+'.') : (ar ? 'حابب/ة أعرف أكثر عن دورات اللغات عندكم.' : 'I would like to ask about your language courses.'));
    if (goal.value.trim()) lines.push(goal.value.trim());
    lines.push(ar ? 'ممكن أعرف ما هي الخيارات المتاحة؟' : 'Could you tell me about the available course options?');
    window.location.assign('https://wa.me/'+form.dataset.whatsapp+'?text='+encodeURIComponent(lines.join('\n\n')));
  });
  form.hidden = false;
  if (fallback) fallback.hidden = true;
})();
