/* DDG Academy page.
   EDIT THE THREE LISTS AT THE TOP (TRACKS, COHORTS, FAQS): the syllabus, dates, application form options and FAQ all update from them.
   All text below is placeholder content to replace with your real programme details. */

const TRACKS = [
  { id: 'ui-ux', name: 'UI/UX Design Systems', weeks: 12, level: 'Beginner friendly',
    blurb: 'Learn to research users, design clear interfaces, and build a design system developers love.',
    tools: ['Figma', 'FigJam', 'Maze', 'Notion'],
    outcomes: ['A portfolio case study from real research', 'A reusable component library in Figma', 'A tested, clickable prototype'],
    modules: [
      ['Weeks 1-2', 'Design foundations', 'Design thinking|Visual hierarchy, colour, and type|Accessibility basics (WCAG)', 'Redesign a real app screen'],
      ['Weeks 3-4', 'User research', 'Interviews and surveys|Personas and journey maps|Defining the problem', 'A short research report'],
      ['Weeks 5-6', 'Flows and wireframes', 'Information architecture|Low-fidelity wireframes|User flows', 'An end-to-end flow'],
      ['Weeks 7-8', 'Interface design in Figma', 'Auto layout and components|Design tokens and systems|Responsive layouts', 'A component library'],
      ['Weeks 9-10', 'Prototyping and testing', 'Interactive prototypes|Usability testing|Iterating on feedback', 'A tested prototype'],
      ['Weeks 11-12', 'Capstone and portfolio', 'Developer handoff|Writing a case study|Presenting your work', 'A portfolio case study'] 
    ] 
  },
  { id: 'web', name: 'Full-Stack Web Development', weeks: 12, level: 'Beginner friendly',
    blurb: 'Go from HTML to a deployed full-stack app with React, Node.js, and a database.',
    tools: ['VS Code', 'Git and GitHub', 'React', 'Node.js', 'PostgreSQL'],
    outcomes: ['A deployed full-stack application', 'A GitHub profile with real commit history', 'Confidence reading and debugging other people\'s code'],
    modules: [
      ['Weeks 1-2', 'Web foundations', 'Semantic HTML and accessibility|CSS, Flexbox, and Grid|Git and GitHub', 'A responsive landing page'],
      ['Weeks 3-4', 'JavaScript essentials', 'Functions, objects, and the DOM|Async code and APIs|Debugging', 'An interactive web app'],
      ['Weeks 5-6', 'React', 'Components and state|Routing and forms|Fetching data', 'A multi-page React app'],
      ['Weeks 7-8', 'Backend with Node.js', 'Building REST APIs|Authentication basics|Validation and error handling', 'A working API'],
      ['Weeks 9-10', 'Databases and deployment', 'SQL and PostgreSQL|Connecting the API to a database|Deploying to the cloud', 'A deployed full-stack app'],
      ['Weeks 11-12', 'Capstone', 'Testing and security basics|Building with a designer|Demo day', 'A team-built product'] 
    ] 
  },
  { id: 'data', name: 'Data Analytics & BI', weeks: 12, level: 'Beginner friendly',
    blurb: 'Turn raw data into decisions using SQL, Python, and Power BI dashboards.',
    tools: ['Excel', 'SQL', 'Python (pandas)', 'Power BI'],
    outcomes: ['An interactive business dashboard', 'A written analysis of a real dataset', 'SQL and Python skills for entry-level analyst roles'],
    modules: [
      ['Weeks 1-2', 'Data foundations', 'Data types and sources|Spreadsheets for analysis|Cleaning messy data', 'A cleaned dataset'],
      ['Weeks 3-4', 'SQL for analysis', 'SELECT, JOIN, and GROUP BY|Window functions|Querying real datasets', 'A query portfolio'],
      ['Weeks 5-6', 'Python for analysis', 'pandas basics|Exploring and visualising data|Basic statistics', 'An exploratory analysis'],
      ['Weeks 7-8', 'Dashboards in Power BI', 'Data modelling|DAX basics|Dashboard design', 'A business dashboard'],
      ['Weeks 9-10', 'Insight and storytelling', 'Choosing the right chart|Presenting to stakeholders|A/B testing basics', 'A stakeholder presentation'],
      ['Weeks 11-12', 'Capstone', 'Define a business question|Analyse and visualise|Present recommendations', 'An end-to-end analysis'] 
    ]
  },
  { id: 'security', name: 'Defensive Cybersecurity', weeks: 12, level: 'Basic computer skills needed',
    blurb: 'Learn how systems are attacked and how to defend them, with hands-on labs.',
    tools: ['Linux', 'Wireshark', 'Nmap', 'OWASP ZAP'],
    outcomes: ['A security review report of a sample application', 'Hands-on lab experience with common tools', 'A clear path toward entry-level security certifications'],
    modules: [
      ['Weeks 1-2', 'Security foundations', 'The CIA triad|Threats and attackers|Linux and the command line', 'A lab environment'],
      ['Weeks 3-4', 'Networks', 'TCP/IP, DNS, and HTTP|Firewalls and VPNs|Traffic analysis with Wireshark', 'A traffic analysis report'],
      ['Weeks 5-6', 'Web application security', 'OWASP Top 10|Secure authentication and sessions|Testing with ZAP', 'A vulnerability scan report'],
      ['Weeks 7-8', 'Identity and cloud security', 'Access control and least privilege|Cloud misconfigurations|Secrets and keys', 'A hardening checklist'],
      ['Weeks 9-10', 'Monitoring and response', 'Logging and alerts|Incident response steps|Phishing and social engineering', 'An incident playbook'],
      ['Weeks 11-12', 'Capstone', 'Review a sample application|Report findings|Present fixes', 'A full security review'] 
    ] 
  },
  { id: 'design', name: 'Graphics Design', weeks: 8, level: 'No prior knowledge needed',
    blurb: 'Learn how to design high quality graphics for marketing, infographics, social media, etc.',
    tools: ['CorelDRAW', 'Photoshop', 'Canva', 'AI Tools'],
    outcomes: ['A well-structured portfolio of high-quality graphics', 'Hands-on design experience with common tools', 'Mentorship and a clear path toward entry-level graphic design roles'],
    modules: [
      ['Weeks 1-2', 'Graphic Design foundations', 'Design principles|Modern tools|Vector vs raster graphics', 'Practical projects'],
      ['Weeks 3-4', 'WCAG, Typography and Colour', 'The POUR WCAG principles|Typography rules|Colour and contrast', 'Accessibility mastery'],
      ['Weeks 5-6', 'Colour Management', 'RGB, CMYK, and HSL systems|The 60/30/10 rule|Colour psychology', 'Colour mastery through projects'],
      ['Weeks 7-8', 'Portfolio Management', 'Dribbble and Behance setup|Client relationships and CRM|Professional networking', 'A well structured design portfolio'] 
    ] 
  },
  { id: 'smm-seo', name: 'Social Media Management & SEO', weeks: 8, level: 'No prior knowledge needed',
    blurb: 'Learn how to grow organic audiences, run targeted ad campaigns, and rank content on search engines.',
    tools: ['Meta Business Suite', 'Google Search Console', 'SEMrush', 'Buffer / Hootsuite'],
    outcomes: ['A comprehensive social media strategy and SEO audit portfolio', 'Hands-on campaign and optimization experience with core industry tools', 'Mentorship and a clear path toward entry-level digital marketing and SEO roles'],
    modules: [
      ['Weeks 1-2', 'Social Media Foundations & Strategy', 'Platform algorithms|Audience personas|Content calendars', 'Content creation and copywriting'],
      ['Weeks 3-4', 'Community Management & Paid Social', 'Meta Ads Manager setup|Audience targeting and budgeting|Crisis response & KPI tracking', 'Community growth plan'],
      ['Weeks 5-6', 'SEO Fundamentals & On-Page Optimization', 'Keyword research and search intent|Meta tags and content optimization|Technical SEO and site architecture', 'On-page website audit'],
      ['Weeks 7-8', 'Off-Page SEO, Analytics & Portfolio', 'Backlink strategies|Google Search Console and GA4 reporting|Client reporting dashboards', 'Pitch deck and final portfolio'] 
    ] 
  }
];

/* Dates use YYYY-MM-DD. A cohort closes for applications automatically after its deadline. */
const COHORTS = [
  { id: 'c1', name: 'Cohort 1', start: '2027-01-18', deadline: '2027-01-04', schedule: 'Mon and Wed evenings, 6:00 pm WAT', mode: 'Live online', seats: 20, tracks: ['ui-ux', 'web'] },
  { id: 'c2', name: 'Cohort 2', start: '2027-03-15', deadline: '2027-03-01', schedule: 'Tue and Thu evenings, 6:00 pm WAT', mode: 'Live online', seats: 20, tracks: ['data', 'security', 'web'] },
  { id: 'c3', name: 'Weekend Cohort', start: '2027-05-08', deadline: '2027-04-24', schedule: 'Saturdays, 10:00 am to 2:00 pm WAT', mode: 'Live online or Abuja studio', seats: 15, tracks: ['ui-ux', 'web', 'data', 'security'] }
];

const FAQS = [
  ['Do I need any experience?', 'No. The UI/UX, web development, and data analytics tracks start from the basics. Cybersecurity expects basic computer skills and curiosity about how networks work.'],
  ['How much time do I need each week?', 'Plan for 10 to 12 hours: live sessions plus project work. Evening and weekend cohorts are designed around work and school.'],
  ['Are the classes live or recorded?', 'Live. You learn with instructors who work on real client projects, and you get 1-on-1 mentor time. Sessions are recorded for revision only.'],
  ['What do I need to take part?', 'A laptop that can run a web browser and a code editor, a reliable internet connection, and time to attend live sessions.'],
  ['How much does it cost and how do I pay?', 'You do not pay anything to apply. If you are accepted, our team sends the tuition amount and payment options directly. Scholarships may be available. Tick the scholarship box on the application.'],
  ['What happens after I apply?', 'We review every application within 5 working days, then invite shortlisted applicants to a short friendly call. You hear the outcome within 3 working days of the call.'],
  ['Do I get a certificate?', 'Yes. You receive a certificate of completion and a reviewed portfolio project.'],
  ['Can my company train a team?', 'Yes. We run private and corporate cohorts. Use the contact form and choose "DDG Academy" as the requirement.']
];

/* ---------------- Rendering and behaviour (no need to edit below) ---------------- */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const today = new Date(new Date().toDateString());
  const isOpen = c => new Date(c.deadline + 'T23:59:59') >= today;
  const trackName = id => (TRACKS.find(t => t.id === id) || {}).name || id;
  const FIELD = 'w-full rounded-xl px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500';

  /* Track cards */
  $('#tracks').innerHTML = TRACKS.map(t => `
    <article class="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col">
      <p class="text-xs font-mono font-semibold text-brand-600 dark:text-emerald-400">${t.weeks} weeks &bull; ${esc(t.level)}</p>
      <h3 class="mt-2 font-display font-bold text-xl text-slate-900 dark:text-white">${esc(t.name)}</h3>
      <p class="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">${esc(t.blurb)}</p>
      <div class="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        <a href="#syllabus" data-track-tab="${t.id}" class="text-brand-600 dark:text-emerald-400 hover:underline">See syllabus</a>
        <button type="button" data-apply-track="${t.id}" class="text-slate-900 dark:text-white hover:underline">Apply</button>
      </div>
    </article>`).join('');

  /* Syllabus tabs */
  $('#tabs').innerHTML = TRACKS.map((t, i) => `<button type="button" role="tab" id="tab-${t.id}" aria-controls="panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-id="${t.id}" class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 aria-selected:bg-brand-600 aria-selected:text-white aria-selected:border-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:hover:bg-brand-600 transition">${esc(t.name)}</button>`).join('');
  function showTrack(id) {
    const t = TRACKS.find(x => x.id === id) || TRACKS[0];
    $$('#tabs [role=tab]').forEach(b => { const on = b.dataset.id === t.id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $('#panel').setAttribute('aria-labelledby', 'tab-' + t.id);
    $('#panel').innerHTML = `
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 space-y-6">
          <div><h3 class="font-display font-bold text-2xl text-slate-900 dark:text-white">${esc(t.name)}</h3><p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${esc(t.blurb)}</p></div>
          <div><h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">You will use</h4><div class="mt-2 flex flex-wrap gap-2">${t.tools.map(x => `<span class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">${esc(x)}</span>`).join('')}</div></div>
          <div><h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">You will leave with</h4><ul class="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc pl-5">${t.outcomes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
          <button type="button" data-apply-track="${t.id}" class="w-full bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition">Apply for this track</button>
        </div>
        <ol class="lg:col-span-2 space-y-4">${t.modules.map((m, i) => `
          <li class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
            <div class="flex flex-wrap items-baseline justify-between gap-2"><h4 class="font-display font-bold text-lg text-slate-900 dark:text-white"><span class="text-brand-600 dark:text-emerald-400">${i + 1}.</span> ${esc(m[1])}</h4><span class="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">${esc(m[0])}</span></div>
            <ul class="mt-3 grid sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">${m[2].split('|').map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <p class="mt-3 text-sm"><span class="font-semibold text-slate-900 dark:text-white">Project:</span> <span class="text-slate-600 dark:text-slate-300">${esc(m[3])}</span></p>
          </li>`).join('')}</ol>
      </div>`;
  }
  showTrack(TRACKS[0].id);
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if (b) showTrack(b.dataset.id); });
  $('#tabs').addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const tabs = $$('#tabs [role=tab]'), i = tabs.indexOf(document.activeElement); if (i < 0) return;
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]; n.focus(); showTrack(n.dataset.id);
  });
  document.addEventListener('click', e => { const a = e.target.closest('[data-track-tab]'); if (a) showTrack(a.dataset.trackTab); });

  /* Cohorts */
  $('#cohorts').innerHTML = COHORTS.map(c => `
    <article class="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
      <div class="flex items-center justify-between gap-3"><h3 class="font-display font-bold text-xl text-slate-900 dark:text-white">${esc(c.name)}</h3>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${isOpen(c) ? 'bg-emerald-500/10 text-brand-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${isOpen(c) ? 'Applications open' : 'Closed'}</span></div>
      <dl class="mt-4 space-y-2 text-sm">
        <div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Starts</dt><dd class="font-semibold text-slate-900 dark:text-white text-right">${fmt(c.start)}</dd></div>
        <div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Apply by</dt><dd class="font-semibold text-slate-900 dark:text-white text-right">${fmt(c.deadline)}</dd></div>
        <div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Schedule</dt><dd class="font-semibold text-slate-900 dark:text-white text-right">${esc(c.schedule)}</dd></div>
        <div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Format</dt><dd class="font-semibold text-slate-900 dark:text-white text-right">${esc(c.mode)}</dd></div>
        <div class="flex justify-between gap-4"><dt class="text-slate-500 dark:text-slate-400">Seats</dt><dd class="font-semibold text-slate-900 dark:text-white text-right">${c.seats}</dd></div>
      </dl>
      <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">Tracks: ${c.tracks.map(trackName).map(esc).join(', ')}</p>
    </article>`).join('');
  const next = COHORTS.filter(isOpen).sort((a, b) => a.start.localeCompare(b.start))[0];
  $$('[data-next-cohort]').forEach(el => el.textContent = next ? `${next.name}: ${fmt(next.start)}` : 'Next intake to be announced');

  /* FAQ */
  $('#faqs').innerHTML = FAQS.map(([q, a]) => `<details class="group py-5"><summary class="flex justify-between gap-4 cursor-pointer list-none font-display font-bold text-lg text-slate-900 dark:text-white">${esc(q)}<span class="transition group-open:rotate-45 text-brand-600 dark:text-emerald-400" aria-hidden="true">+</span></summary><p class="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">${esc(a)}</p></details>`).join('');

  /* Application form: select options */
  const form = $('#academy-form'), trackSel = $('#f-track'), cohortSel = $('#f-cohort');
  trackSel.innerHTML = '<option value="">Choose a track</option>' + TRACKS.map(t => `<option value="${esc(t.name)}" data-id="${t.id}">${esc(t.name)}</option>`).join('');
  function fillCohorts() {
    const id = (trackSel.selectedOptions[0] || {}).dataset?.id;
    if (!id) { cohortSel.innerHTML = '<option value="">Choose a track first</option>'; return; }
    const open = COHORTS.filter(c => c.tracks.includes(id) && isOpen(c));
    cohortSel.innerHTML = '<option value="">Choose a cohort</option>' +
      open.map(c => `<option value="${esc(c.name + ' (starts ' + fmt(c.start) + ')')}">${esc(c.name)}: starts ${fmt(c.start)}</option>`).join('') +
      '<option value="Next intake (date to be announced)">Tell me about the next intake</option>';
  }
  trackSel.addEventListener('change', fillCohorts); fillCohorts();
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-apply-track]'); if (!b) return;
    trackSel.value = trackSel.querySelector(`[data-id="${b.dataset.applyTrack}"]`).value; fillCohorts();
    show(0); $('#apply').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#f-name').focus({ preventScroll: true }), 400);
  });

  /* Application form: stepper */
  const panels = $$('.step', form), dots = $$('#steps-nav li'), prev = $('#prev'), nextBtn = $('#next'), submit = $('#submit'), msg = $('#academy-msg');
  let cur = 0;
  function summary() {
    const rows = [['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Country', 'country'], ['City', 'city'], ['Track', 'track'], ['Cohort', 'cohort'], ['Learning mode', 'mode'], ['Experience level', 'level'], ['Hours per week', 'hours'], ['Why you want to join', 'motivation'], ['Experience so far', 'experience'], ['Portfolio or profile link', 'link'], ['Scholarship', 'scholarship']];
    const fd = new FormData(form);
    $('#review').innerHTML = rows.map(([l, k]) => { const v = (fd.get(k) || '').toString().trim(); return `<div class="py-3 grid sm:grid-cols-3 gap-1 sm:gap-4"><dt class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">${l}</dt><dd class="sm:col-span-2 text-sm text-slate-900 dark:text-white break-words">${v ? esc(k === 'scholarship' ? 'Yes, please consider me' : v) : '<span class="text-slate-400">Not provided</span>'}</dd></div>`; }).join('');
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
    const bad = window.DDGForms.validateFields($$('input, select, textarea', panels[cur]));
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    if (bad) { msg.textContent = bad.text; msg.className = 'text-sm font-semibold text-rose-500'; bad.field.setAttribute('aria-invalid', 'true'); bad.field.focus(); return; }
    show(cur + 1); form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  nextBtn.addEventListener('click', goNext);
  prev.addEventListener('click', () => { show(cur - 1); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && cur < panels.length - 1) { e.preventDefault(); goNext(); } });
  form.addEventListener('input', e => { e.target.removeAttribute('aria-invalid'); });
  form.addEventListener('ddg:invalid', e => { const n = panels.findIndex(p => p.contains(e.detail.field)); if (n > -1 && n !== cur) { const m = msg.textContent, c = msg.className; show(n, false); msg.textContent = m; msg.className = c; } });
  form.addEventListener('ddg:sent', e => {
    $('#apply-form-wrap').classList.add('hidden');
    $('#success-email').textContent = e.detail.data.email;
    $('#success-name').textContent = (e.detail.data.name || '').split(' ')[0];
    $('#apply-success').classList.remove('hidden'); $('#apply-success h3').focus();
    $('#apply').scrollIntoView({ behavior: 'smooth' });
  });
  const mot = $('#f-motivation'), count = $('#motivation-count');
  mot.addEventListener('input', () => { const n = mot.value.trim().length; count.textContent = `${n} / 800 (at least 50)`; });
  show(0, false);
})();
