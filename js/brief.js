/* Project brief wizard + call booking (start-project.html).
   EDIT THE CONFIG BLOCK ONLY. Guide: PHASE2-README.md */
(() => {
  const CONFIG = {
    briefEndpoint: 'netlify',   // 'netlify', a Formspree URL, or any URL that accepts a JSON POST
    bookingUrl: 'https://cal.com/discovery-call-lwyh',   // your Cal.com or Calendly link
    whatsapp: 'https://wa.me/2348135306540',
    fallbackEmail: 'dataanddesigngeeks@gmail.com',
    cooldownMs: 30000,
    timeoutMs: 12000
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const configured = u => !!u && !/YOUR[-_]/.test(u);
  const form = $('#brief-form'); if (!form) return;
  const panels = $$('.step', form), dots = $$('#steps-nav li'), prev = $('#prev'), nextBtn = $('#next'), submit = $('#submit'), msg = $('#brief-msg');
  let cur = 0, lastSent = 0;

  /* ---------- Booking calendar (loads only when the visitor asks, so no third party sees them before) ---------- */
  function setupBooking(box) {
    const ok = configured(CONFIG.bookingUrl);
    if (!ok) {
      box.innerHTML = `<p class="text-sm text-slate-600 dark:text-slate-300">Online booking opens soon. Message us on <a class="underline text-brand-600 dark:text-emerald-400" href="${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> or email <a class="underline text-brand-600 dark:text-emerald-400" href="mailto:${CONFIG.fallbackEmail}">${CONFIG.fallbackEmail}</a> and we will arrange a time.</p>`;
      return;
    }
    box.innerHTML = `<button type="button" class="book-open px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-brand-500/25 transition">Choose a time</button>
      <a href="${esc(CONFIG.bookingUrl)}" target="_blank" rel="noopener" class="ml-3 text-sm font-semibold underline text-brand-600 dark:text-emerald-400">Open in a new tab</a>
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">The calendar is provided by an external booking service and loads when you click.</p><div class="book-frame mt-5"></div>`;
    $('.book-open', box).addEventListener('click', e => {
      const u = new URL(CONFIG.bookingUrl), dark = document.documentElement.classList.contains('dark');
      if (/cal\.com$/.test(u.hostname)) { u.searchParams.set('embed', 'true'); u.searchParams.set('theme', dark ? 'dark' : 'light'); }
      else if (/calendly\.com$/.test(u.hostname)) { u.searchParams.set('hide_gdpr_banner', '1'); }
      $('.book-frame', box).innerHTML = `<iframe src="${esc(u.toString())}" title="Book a discovery call" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" class="w-full h-[720px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white"></iframe>`;
      e.target.classList.add('hidden');
    });
  }
  $$('[data-booking]').forEach(setupBooking);

  /* ---------- Stepper ---------- */
  function checkServices() {
    const boxes = $$('input[name="services"]', form);
    if (!boxes.some(b => b.checked)) return { field: boxes[0], text: 'Choose at least one thing you need.' };
  }
  function validateStep(i) {
    if (panels[i].contains($('input[name="services"]', form))) { const missing = checkServices(); if (missing) return missing; }
    return window.DDGForms.validateFields($$('input, select, textarea', panels[i]));
  }
  function summary() {
    const fd = new FormData(form);
    const rows = [['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Company', 'company_name'], ['Website', 'website'], ['You need', 'services'], ['Stage', 'stage'], ['About the project', 'description'], ['Links', 'links'], ['Budget', 'budget'], ['Timeline', 'timeline'], ['Next step', 'followup'], ['Contact by', 'channel']];
    $('#review').innerHTML = rows.map(([l, k]) => {
      const v = (k === 'services' ? fd.getAll('services').join(', ') : (fd.get(k) || '')).toString().trim();
      return `<div class="py-3 grid sm:grid-cols-3 gap-1 sm:gap-4"><dt class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">${l}</dt><dd class="sm:col-span-2 text-sm text-slate-900 dark:text-white break-words">${v ? esc(v) : '<span class="text-slate-400">Not provided</span>'}</dd></div>`;
    }).join('');
  }
  function show(i, focus = true) {
    cur = i;
    panels.forEach((p, n) => p.classList.toggle('hidden', n !== i));
    dots.forEach((d, n) => { d.toggleAttribute('data-done', n < i); d.toggleAttribute('data-on', n === i); n === i ? d.setAttribute('aria-current', 'step') : d.removeAttribute('aria-current'); });
    $('#steps-bar').style.width = ((i + 1) / panels.length * 100) + '%';
    prev.classList.toggle('invisible', i === 0);
    nextBtn.classList.toggle('hidden', i === panels.length - 1);
    submit.classList.toggle('hidden', i !== panels.length - 1);
    msg.textContent = '';
    if (i === panels.length - 1) summary();
    if (focus) panels[i].querySelector('h3').focus({ preventScroll: true });
  }
  function goNext() {
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    const bad = validateStep(cur);
    if (bad) { msg.textContent = bad.text; msg.className = 'text-sm font-semibold text-rose-500'; bad.field.setAttribute('aria-invalid', 'true'); bad.field.focus(); return; }
    show(cur + 1); form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  nextBtn.addEventListener('click', goNext);
  prev.addEventListener('click', () => { show(cur - 1); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && e.target.type !== 'radio' && cur < panels.length - 1) { e.preventDefault(); goNext(); } });
  form.addEventListener('input', e => e.target.removeAttribute('aria-invalid'));
  const dc = $('#description'), count = $('#description-count');
  dc.addEventListener('input', () => { count.textContent = `${dc.value.trim().length} / 1500 (at least 40)`; });
  show(0, false);

  /* ---------- Sending ---------- */
  async function send(data) {
    const ep = CONFIG.briefEndpoint, netlify = ep === 'netlify';
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), CONFIG.timeoutMs);
    try {
      const res = await fetch(netlify ? '/' : ep, {
        method: 'POST', signal: ctl.signal,
        headers: netlify ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: netlify ? new URLSearchParams({ 'form-name': 'project-brief', subject: data._subject, ...data }).toString() : JSON.stringify(data)
      });
      return res.ok;
    } catch (e) { return false; } finally { clearTimeout(t); }
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.elements.company && form.elements.company.value) return;           // spam trap
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    for (let i = 0; i < panels.length; i++) {
      const bad = validateStep(i);
      if (bad) { if (i !== cur) show(i, false); msg.textContent = bad.text; msg.className = 'text-sm font-semibold text-rose-500'; bad.field.setAttribute('aria-invalid', 'true'); bad.field.focus(); return; }
    }
    if (Date.now() - lastSent < CONFIG.cooldownMs) { msg.textContent = 'Please wait a few seconds before sending again.'; msg.className = 'text-sm font-semibold text-rose-500'; return; }
    const fd = new FormData(form), d = {};
    for (const [k, v] of fd.entries()) if (k !== 'company' && k !== 'services') d[k] = typeof v === 'string' ? v.trim() : v;
    d.services = fd.getAll('services').join(', ');
    d.ref = 'DDG-' + Date.now().toString(36).toUpperCase().slice(-6);
    d._subject = `[DDG Project Brief] ${d.services} - ${d.name} (${d.budget})`;
    const label = submit.innerHTML; submit.disabled = true; submit.setAttribute('aria-busy', 'true'); submit.textContent = 'Sending...';
    let sent;
    if (!configured(CONFIG.briefEndpoint) && CONFIG.briefEndpoint !== 'netlify') {
      location.href = `mailto:${CONFIG.fallbackEmail}?subject=${encodeURIComponent(d._subject)}&body=${encodeURIComponent(Object.entries(d).filter(([k]) => k !== '_subject').map(([k, v]) => `${k}: ${v}`).join('\n'))}`;
      msg.textContent = 'Opening your email app...'; msg.className = 'text-sm font-semibold text-brand-600 dark:text-emerald-400';
    } else if (sent = await send(d)) {
      lastSent = Date.now(); form.reset();
      $('#brief-wrap').classList.add('hidden');
      $('#success-name').textContent = d.name.split(' ')[0]; $('#success-email').textContent = d.email; $('#success-ref').textContent = d.ref;
      $('#success-call').classList.toggle('hidden', !/call/i.test(d.followup));
      $('#brief-success').classList.remove('hidden'); $('#brief-success h3').focus();
      $('#start').scrollIntoView({ behavior: 'smooth' });
    } else {
      msg.textContent = `We could not send that. Please try again, or email ${CONFIG.fallbackEmail}.`; msg.className = 'text-sm font-semibold text-rose-500';
    }
    submit.disabled = false; submit.removeAttribute('aria-busy'); submit.innerHTML = label;
  });
})();
