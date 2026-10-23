/* DDGs form handling: validation, spam trap, send, and friendly feedback.
   ------------------------------------------------------------------
   SETUP: edit only the CONFIG block below. Full guide: FORM-SETUP.md
   Endpoint can be a Formspree URL (https://formspree.io/f/xxxx), any service that
   accepts a JSON POST, or the word 'netlify' if you host on Netlify.
   While an endpoint still contains YOUR_, forms fall back to opening the visitor's email app. */
(() => {
  const CONFIG = {
    contactEndpoint:    'netlify',
    newsletterEndpoint: 'netlify',
    fallbackEmail: 'dataanddesigngeeks@gmail.com',
    cooldownMs: 30000,   // minimum gap between submissions from one browser
    timeoutMs: 12000     // give up if the server takes longer than this
  };

  const $ = (s, c = document) => c.querySelector(s);
  const configured = url => !!url && !/YOUR_/.test(url);
  const lastSent = {};

  async function send(endpoint, formName, data) {
    const netlify = endpoint === 'netlify';
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), CONFIG.timeoutMs);
    try {
      const res = await fetch(netlify ? '/' : endpoint, {
        method: 'POST',
        signal: ctl.signal,
        headers: netlify
          ? { 'Content-Type': 'application/x-www-form-urlencoded' }
          : { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: netlify
          ? new URLSearchParams({ 'form-name': formName, ...data }).toString()
          : JSON.stringify(data)
      });
      return res.ok;
    } catch (err) { return false; }
    finally { clearTimeout(timer); }
  }

  function wire(o) {
    const form = $(o.form); if (!form) return;
    const msg = $(o.msg), btn = form.querySelector('[type="submit"]');
    const say = (text, ok) => { msg.textContent = text; msg.className = ok ? o.okClass : o.errClass; };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.elements.company && form.elements.company.value) return;   // spam trap: bots fill hidden fields

      form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
      const bad = o.validate(form);
      if (bad) { say(bad.text, false); bad.field.setAttribute('aria-invalid', 'true'); bad.field.focus(); return; }

      if (Date.now() - (lastSent[o.form] || 0) < CONFIG.cooldownMs) { say('Please wait a few seconds before sending again.', false); return; }

      const data = o.data(new FormData(form));
      const label = btn.innerHTML;
      btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending...';

      if (!configured(o.endpoint)) {                                        // not set up yet: use the visitor's email app
        location.href = `mailto:${CONFIG.fallbackEmail}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(o.mailBody(data))}`;
        say('Opening your email app...', true);
      } else if (await send(o.endpoint, o.formName, data)) {
        lastSent[o.form] = Date.now();
        say(o.success, true); form.reset();
      } else {
        say(`We could not send that. Please try again, or email ${CONFIG.fallbackEmail}.`, false);
      }
      btn.disabled = false; btn.removeAttribute('aria-busy'); btn.innerHTML = label;
    });
  }

  wire({
    form: '#contact-form', msg: '#form-msg', formName: 'contact', endpoint: CONFIG.contactEndpoint,
    okClass: 'text-sm font-semibold text-brand-600 dark:text-emerald-400',
    errClass: 'text-sm font-semibold text-rose-500',
    success: 'Thank you. We have your inquiry and will reply within one working day.',
    validate(f) {
      const n = f.elements.name, e = f.elements.email, m = f.elements.message;
      if (!n.value.trim()) return { field: n, text: 'Please enter your name.' };
      if (!e.value.trim() || !e.checkValidity()) return { field: e, text: 'Please enter a valid email address.' };
      if (m.value.trim().length < 10) return { field: m, text: 'Please tell us a little more about your project.' };
    },
    data: fd => ({
      name: fd.get('name').trim(), email: fd.get('email').trim(), type: fd.get('type'), message: fd.get('message').trim(),
      _subject: `[DDGs Inquiry] ${fd.get('type')} - ${fd.get('name').trim()}`
    }),
    mailBody: d => `Name: ${d.name}\nEmail: ${d.email}\nRequirement: ${d.type}\n\nProject brief:\n${d.message}`
  });

  wire({
    form: '#news', msg: '#news-msg', formName: 'waitlist', endpoint: CONFIG.newsletterEndpoint,
    okClass: 'text-xs text-emerald-300 font-semibold',
    errClass: 'text-xs text-rose-400 font-semibold',
    success: 'You are on the waitlist. We will email you when admissions open.',
    validate(f) {
      const e = f.elements.email;
      if (!e.value.trim() || !e.checkValidity()) return { field: e, text: 'Please enter a valid email address.' };
    },
    data: fd => ({ email: fd.get('email').trim(), _subject: 'Academy waitlist signup' }),
    mailBody: d => `Please add me to the DDG Academy waitlist.\n\nEmail: ${d.email}`
  });
})();
