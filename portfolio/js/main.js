/* MAIN.JS: renders data, navigation, projects + modal, CV check, contact form */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
// Makes text safe before putting it into HTML
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- toast message ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 5000);
}

/* ---------- render skills, journey, goals from js/projects.js ---------- */
function renderSkills() {
  $('#skills-root').innerHTML = SKILLS.map((g, i) => `
    <div class="skill-group reveal"><h3><i class="fa-solid ${g.icon}"></i>${esc(g.category)}</h3>
      <div class="skill-grid">${g.items.map(s => `
        <div class="card skill"><i class="${s.icon}" aria-hidden="true"></i>
          <div><b>${esc(s.name)}</b>${s.level ? `<span class="tag ${s.level.toLowerCase().replace(/\s+/g, '-')}">${esc(s.level)}</span>` : ''}</div></div>`).join('')}
      </div></div>`).join('');
}
function renderJourney() {
  $('#journey-root').innerHTML = JOURNEY.map((j, i) => `
    <li class="t-item reveal"><span class="dot" aria-hidden="true">${i + 1}</span>
      <div class="card"><h3>${esc(j.text)}</h3>${j.tag ? `<p class="meta"><span class="pill ${j.status === 'done' ? 'done' : 'live'}">${esc(j.tag)}</span></p>` : ''}</div></li>`).join('');
}
function renderGoals() {
  $('#goals-root').innerHTML = GOALS.map((g, i) => `
    <div class="card reveal" style="--d:${(i % 3) * .1}s"><i class="icon fa-solid ${g.icon}" aria-hidden="true"></i><p>${esc(g.text)}</p></div>`).join('');
}

/* ---------- navigation (mobile menu) ---------- */
const toggle = $('#nav-toggle'), menu = $('#nav-menu');
function setMenu(open) {
  menu.classList.toggle('open', open); toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); } });

/* ---------- projects gallery ---------- */
let filter = 'all';
function projectCard(p) {
  const real = p.category === 'real';
  return `<article class="card pcard ${real ? 'is-real' : ''}">
    <div class="pvis ${esc(p.visual || 'v1')}" aria-hidden="true"><i class="fa-solid ${esc(p.icon || 'fa-code')}"></i>
      <div><span></span><span></span><span></span></div>
      ${real ? '<b class="badge real">MY PROJECT</b>' : '<b class="badge">SAMPLE PROJECT</b>'}</div>
    <div class="pbody"><div class="pmeta"><span>${real ? 'Real Project' : 'Sample Concept'}</span><span class="status">${esc(p.status)}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
      <ul class="tags" aria-label="Technologies">${p.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <button class="btn btn-outline btn-sm" data-id="${esc(p.id)}"><i class="fa-solid fa-circle-info"></i> View Details</button></div></article>`;
}
function renderProjects() {
  let html = '';
  const hasReal = PROJECTS.some(p => p.category === 'real');
  // Friendly empty state when there are no real projects yet
  if (filter !== 'sample' && !hasReal) html += `<div class="card empty"><i class="icon fa-solid fa-seedling"></i>
    <h3>My real projects will be added here soon.</h3>
    <p>To add one, open <code>js/projects.js</code>, copy a project object, and set <code>category: "real"</code>.</p></div>`;
  html += PROJECTS.filter(p => filter === 'all' || p.category === filter).map(projectCard).join('');
  $('#project-grid').innerHTML = html;
}
$$('.chip').forEach(c => c.addEventListener('click', () => {
  filter = c.dataset.filter;
  $$('.chip').forEach(x => { x.classList.toggle('active', x === c); x.setAttribute('aria-pressed', x === c); });
  renderProjects();
}));

/* ---------- modal (button, Esc, outside click) ---------- */
const modal = $('#modal'), box = $('.modal-box', modal);
let lastFocus;
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  const real = p.category === 'real';
  $('#modal-body').innerHTML = `
    <h3 id="modal-title">${esc(p.title)}</h3>
    <p class="meta"><span class="pill ${real ? 'done' : 'live'}">${real ? 'Real Project' : 'SAMPLE PROJECT'}</span><span class="pill">${esc(p.status)}</span></p>
    <p>${esc(p.description)}</p>
    <h4>${real ? 'Features' : 'Planned features'}</h4><ul>${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h4>Limitations</h4><ul>${p.limitations.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h4>Technologies</h4><ul class="tags" style="list-style:none;padding:0">${p.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    ${p.note ? `<p class="notice">${esc(p.note)}</p>` : ''}
    ${p.github ? `<p class="btn-row"><a class="btn btn-primary btn-sm" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a></p>` : ''}
    ${p.live ? `<p class="btn-row"><a class="btn btn-outline btn-sm" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Live Demo</a></p>` : ''}`;
  lastFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = 'hidden'; box.focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
$('#project-grid').addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) openModal(b.dataset.id); });
$('#modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });   // outside click
document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') {   // keep keyboard focus inside the modal
    const f = $$('button,a[href]', box); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- CV check: warn if the PDF file is missing ---------- */
const CV_PATH = 'assets/Nimra-Afzal-CV.pdf';
let cvOk = null;   // null = not known yet
// The check only works on a server (Live Server, GitHub Pages). On file:// we cannot check, so we trust the link.
if (location.protocol !== 'file:') {
  fetch(CV_PATH, { method: 'HEAD' }).then(r => { cvOk = r.ok; }).catch(() => { cvOk = false; });
}
$$('[data-cv]').forEach(a => a.addEventListener('click', e => {
  if (cvOk !== false) return;   // file exists (or unknown): normal download / open
  e.preventDefault();
  toast('CV not found yet. Please place your CV at assets/Nimra-Afzal-CV.pdf (and open the site with Live Server).');
}));

/* ---------- contact form ---------- */
const form = $('#contact-form'), statusBox = $('#form-status'), sendBtn = $('#send-btn');
const configured = () => typeof EMAILJS_CONFIG !== 'undefined' && Object.values(EMAILJS_CONFIG).every(v => v && !v.startsWith('YOUR_'));
// Whenever a status message appears, scroll to it and also show it as a toast so it is never missed
new MutationObserver(() => {
  if (statusBox.textContent.trim()) {
    statusBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    toast(statusBox.textContent.trim().slice(0, 140));
  }
}).observe(statusBox, { childList: true, characterData: true, subtree: true });
function validate() {
  let ok = true;
  const rules = {
    name: v => v.trim().length < 2 ? 'Please enter your name.' : '',
    email: v => !v.trim() ? 'Please enter your email.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Please enter a valid email address.' : '',
    subject: v => !v.trim() ? 'Please enter a subject.' : '',
    message: v => v.trim().length < 10 ? 'Please write at least 10 characters.' : ''
  };
  for (const id in rules) {
    const field = $('#' + id), msg = rules[id](field.value);
    $('#err-' + id).textContent = msg; field.classList.toggle('invalid', !!msg);
    field.setAttribute('aria-invalid', !!msg); if (msg) ok = false;
  }
  return ok;
}
form.addEventListener('submit', async e => {
  e.preventDefault(); statusBox.className = ''; statusBox.textContent = '';
  if (!validate()) { statusBox.className = 'bad'; statusBox.textContent = 'Please fix the highlighted fields.'; return; }
  const data = Object.fromEntries(new FormData(form));
  // Not set up yet: do NOT pretend the message was sent
  if (!configured()) {
    const mail = `mailto:nimraafzal257@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message + '\n\nFrom: ' + data.name + ' (' + data.email + ')')}`;
    statusBox.className = 'bad';
    statusBox.innerHTML = `The contact form is not connected yet. Please email me directly. <a href="${mail}">Open email app</a>`;
    return;
  }
  sendBtn.disabled = true; $('span', sendBtn).textContent = 'Sending…';   // loading state
  try {
    if (!window.emailjs) throw new Error('EmailJS did not load');
    await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
      // Both naming styles are sent, so the default EmailJS template ({{name}}, {{email}}, {{title}}, {{time}}) works too
      name: data.name, from_name: data.name,
      email: data.email, reply_to: data.email,
      // The sender's name and email are also written INTO the subject and message text,
      // so you can always see who wrote to you, even if the EmailJS template is not edited.
      title: 'From ' + data.name + ' - ' + data.subject, subject: data.subject,
      message: data.message + '  ---  Sent by: ' + data.name + ' (' + data.email + ')',
      time: new Date().toLocaleString()
    }, { publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    statusBox.className = 'ok'; statusBox.textContent = 'Thank you! Your message has been sent.'; form.reset();
  } catch (err) {
    statusBox.className = 'bad';
    statusBox.innerHTML = 'Sorry, the message could not be sent. Please try again or <a href="mailto:nimraafzal257@gmail.com">email me directly</a>.';
  } finally { sendBtn.disabled = false; $('span', sendBtn).textContent = 'Send Message'; }
});

/* ---------- start-up ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderSkills(); renderJourney(); renderGoals(); renderProjects();
  $('#year').textContent = new Date().getFullYear();   // auto-updating year
});
window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('hide'), 700));
