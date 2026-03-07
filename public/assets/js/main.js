// ═══════════════════════════════════════════════════════════════
//  DYNAMIC PORTFOLIO — fetches all data from /api/*
// ═══════════════════════════════════════════════════════════════

const API = '';  // Empty = same origin. Change to http://localhost:3000 if needed.

/* ── Helpers ─────────────────────────────────────────────────── */
async function get(path) {
    const r = await fetch(API + path);
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

/* ── Render Profile ──────────────────────────────────────────── */
function renderProfile(p) {
    document.title = `${p.name} — ${p.role.join(' & ')} Developer`;
    document.getElementById('nav-logo').textContent = p.name.split(' ').map(w => w[0]).join('') + '.dev';
    setText('hero-name', p.name);
    setText('hero-tagline', p.tagline);
    setText('footer-name', p.name);

    // Role tags
    document.getElementById('hero-role').innerHTML =
        p.role.map((r, i) =>
            `<span class="role-tag"${i === 1 ? ' style="background:linear-gradient(135deg,#1B5E20,#3DDC84)"' : ''}>${r}</span>`
        ).join(' &amp; ') + ' Developer';

    setText('hero-desc', p.description);

    const statLabels = { appsBuilt: 'Apps Built', yearsExp: 'Years Exp', happyClients: 'Happy Clients', githubRepos: 'GitHub Repos' };
    document.getElementById('hero-stats').innerHTML = Object.entries(p.stats)
        .map(([k, v]) => `
      <div class="stat">
        <span class="stat-num" data-target="${v}">0</span>
        <span class="stat-label">${statLabels[k] || k}</span>
      </div>`).join('');

    const emailEl = document.getElementById('contact-email');
    emailEl.href = `mailto:${p.email}`;
    emailEl.textContent = p.email;

    const socialIcons = { github: '🐙', linkedin: '💼', twitter: '🐦', playStore: '🎮', whatsapp: '📱' };
    document.getElementById('social-links').innerHTML = Object.entries(p.socials)
        .map(([k, url]) => `<a href="${url}" class="social-link" title="${k}">${socialIcons[k] || '🔗'}</a>`).join('');
}

/* ── Render Skills ───────────────────────────────────────────── */
function renderSkills(skills) {
    const cards = skills.filter(s => s.type);
    const bars = skills.filter(s => s.barPct);

    document.getElementById('skills-grid').innerHTML = cards.map(s => `
    <div class="skill-card ${s.type} reveal">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-title">${s.title}</div>
      <div class="skill-desc">${s.desc}</div>
      <div class="skill-tags">
        ${s.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>`).join('');

    document.getElementById('skills-bars').innerHTML = bars.map(s => `
    <div class="skill-bar-item">
      <div class="skill-bar-header">
        <span class="skill-bar-name">${s.barName}</span>
        <span class="skill-bar-pct">${s.barPct}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill ${s.barClass}" data-width="${s.barPct}"></div>
      </div>
    </div>`).join('');
}

/* ── Custom Alert ───────────────────────────────────────────── */
function showAlertDialog(message) {
    const alert = document.getElementById('custom-alert');
    document.getElementById('alert-message').textContent = message;
    alert.classList.add('active');

    const handler = () => {
        alert.classList.remove('active');
        alert.querySelector('.alert-btn').removeEventListener('click', handler);
    };
    alert.querySelector('.alert-btn').addEventListener('click', handler);
}

/* ── Project Modal & Carousel ────────────────────────────────── */
let currentProjects = [];

function openProjectModal(projectId) {
    const p = currentProjects.find(item => item._id === projectId);
    if (!p) return;

    const modal = document.getElementById('project-modal');
    const body = modal.querySelector('.modal-body');

    let carouselHTML = '';
    if (p.images && p.images.length > 0) {
        carouselHTML = `
            <div class="carousel">
                <div class="carousel-track" id="carousel-track">
                    ${p.images.map(img => `<div class="carousel-slide"><img src="${img}" alt="${p.title}"></div>`).join('')}
                </div>
                ${p.images.length > 1 ? `
                    <button class="carousel-btn carousel-prev" id="carousel-prev">←</button>
                    <button class="carousel-btn carousel-next" id="carousel-next">→</button>
                ` : ''}
            </div>
        `;
    }

    body.innerHTML = `
        ${carouselHTML}
        <h2 style="font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;margin-bottom:16px">${p.title}</h2>
        <div class="project-tech" style="margin-bottom:24px">
            ${p.tech.map(t => `<span style="background:rgba(255,255,255,0.08);padding:6px 14px;border-radius:100px;font-size:0.8rem">${t}</span>`).join('')}
        </div>
        <p style="color:var(--text-muted);font-size:1.05rem;line-height:1.8;margin-bottom:30px">${p.desc}</p>
        <div style="display:flex;gap:16px">
            <button class="btn-primary modal-link-github" style="border:none;flex:1">⭐ GitHub</button>
            <button class="btn-secondary modal-link-demo" style="border:none;flex:1">▶ Live Demo</button>
        </div>
    `;

    // Hook up modal links
    body.querySelector('.modal-link-github').onclick = (e) => {
        e.stopPropagation();
        if (p.githubUrl && p.githubUrl !== '#') window.open(p.githubUrl, '_blank');
        else showAlertDialog('GitHub link not available for this project.');
    };
    body.querySelector('.modal-link-demo').onclick = (e) => {
        e.stopPropagation();
        if (p.demoUrl && p.demoUrl !== '#') window.open(p.demoUrl, '_blank');
        else showAlertDialog('Live Demo link not available for this project.');
    };

    // Carousel Logic
    if (p.images && p.images.length > 1) {
        const track = document.getElementById('carousel-track');
        let idx = 0;
        const update = () => track.style.transform = `translateX(-${idx * 100}%)`;
        document.getElementById('carousel-prev').onclick = () => { idx = (idx > 0) ? idx - 1 : p.images.length - 1; update(); };
        document.getElementById('carousel-next').onclick = () => { idx = (idx < p.images.length - 1) ? idx + 1 : 0; update(); };
    }

    modal.classList.add('active');
}

function initModal() {
    const modal = document.getElementById('project-modal');
    const close = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    const hide = () => modal.classList.remove('active');
    close.onclick = hide;
    backdrop.onclick = hide;
}

/* ── Render Projects ─────────────────────────────────────────── */
function renderProjects(projects) {
    currentProjects = projects;
    document.getElementById('projects-grid').innerHTML = projects.map(p => `
    <div class="project-card reveal" onclick="openProjectModal('${p._id}')">
      <div class="project-thumb project-thumb-${p.thumb}">
        <div class="project-mock">${p.mock}</div>
        <div class="project-badge badge-${p.badgeType}">${p.badgeType.charAt(0).toUpperCase() + p.badgeType.slice(1)}</div>
      </div>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <button onclick="handleProjectLink(event, '${p.githubUrl}', 'GitHub')" class="project-link link-github" style="border:none">⭐ GitHub</button>
          <button onclick="handleProjectLink(event, '${p.demoUrl}', 'Demo')" class="project-link link-demo" style="border:none">▶ Live Demo</button>
        </div>
      </div>
    </div>`).join('');
}

function handleProjectLink(e, url, type) {
    e.stopPropagation();
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        showAlertDialog(`${type} link not available for this project yet.`);
    }
}



/* ── Render Timeline (shared) ────────────────────────────────── */
function renderTimeline(containerId, items, titleField, subtitleField) {
    document.getElementById(containerId).innerHTML = items.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot" style="border-color:${item.dotColor};box-shadow:0 0 20px ${item.glowColor}"></div>
      <div class="timeline-period">${item.period}</div>
      <div class="timeline-title">${item[titleField]}</div>
      <div class="timeline-company">${item[subtitleField]} ${item.icon || ''}</div>
      <div class="timeline-desc">${item.desc}</div>
      ${item.tags ? `
      <div class="skill-tags" style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px">
        ${item.tags.map(t => `
        <span class="skill-tag" style="color:${item.tagColor};border-color:${item.tagBorder};background:${item.tagBg}">${t}</span>
        `).join('')}
      </div>` : ''}
    </div>`).join('');
}

/* ── Ticker ──────────────────────────────────────────────────── */
function buildTicker() {
    const items = [
        ['🐦', 'Flutter'], ['🤖', 'Android'], ['🎯', 'Dart'], ['🔥', 'Firebase'],
        ['🟣', 'Kotlin'], ['📦', 'GetX / BLoC'], ['🔌', 'REST API'], ['☁️', 'Google Cloud'],
        ['🗄️', 'SQLite'], ['🎨', 'Material 3'], ['⚡', 'Riverpod'], ['🧪', 'Unit Testing'],
    ];
    const doubled = [...items, ...items];
    document.getElementById('ticker').innerHTML =
        doubled.map(([icon, label]) =>
            `<div class="ticker-item"><span class="icon">${icon}</span> ${label}</div>`
        ).join('');
}

/* ── Intersection Observer (scroll effects) ──────────────────── */
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

    // Counter animation
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let start = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    start = Math.min(start + step, target);
                    el.textContent = Math.floor(start) + (start >= target ? '+' : '');
                    if (start >= target) clearInterval(timer);
                }, 25);
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

    // Skill bars
    const barObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
                barObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skills-bars').forEach(el => barObs.observe(el));

    // Active nav highlight
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + current ? 'var(--flutter-sky)' : '';
        });
    });
}

/* ── Cursor ──────────────────────────────────────────────────── */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    (function animCursor() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animCursor); })();
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; ring.style.width = '50px'; ring.style.height = '50px'; });
        el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; ring.style.width = '36px'; ring.style.height = '36px'; });
    });
}

/* ── Navbar scroll ───────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
}

/* ── Particles ───────────────────────────────────────────────── */
function initParticles() {
    const c = document.getElementById('particles');
    const colors = ['var(--flutter-sky)', 'var(--android-green)', 'var(--purple)', 'var(--amber)'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random() * 100}%;background:${colors[Math.floor(Math.random() * colors.length)]};--dur:${6 + Math.random() * 10}s;--delay:${Math.random() * 8}s;--tx:${(Math.random() - .5) * 200}px;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;`;
        c.appendChild(p);
    }
}

/* ── Contact Form Logic ───────────────────────────────────────── */
function initContactForm(profile) {
    const btn = document.getElementById('btn-send-message');
    const wrapper = document.getElementById('contact-message-wrapper');
    const textarea = document.getElementById('contact-message');
    let isEditing = false;

    btn.onclick = () => {
        if (!isEditing) {
            wrapper.style.display = 'block';
            textarea.focus();
            btn.textContent = '🚀 Send Now';
            isEditing = true;
        } else {
            const msg = textarea.value.trim();
            if (!msg) {
                showAlertDialog('Please type a message first!');
                return;
            }
            const mailto = `mailto:${profile.email}?subject=Portfolio Inquiry from ${profile.name}&body=${encodeURIComponent(msg)}`;
            window.location.href = mailto;

            // Reset
            textarea.value = '';
            wrapper.style.display = 'none';
            btn.textContent = '✉️ Send Message';
            isEditing = false;
        }
    };
}

/* ── Bootstrap ───────────────────────────────────────────────── */
async function init() {
    try {
        const [profile, skills, projects, experience, education] = await Promise.all([
            get('/api/profile'),
            get('/api/skills'),
            get('/api/projects'),
            get('/api/experience'),
            get('/api/education'),
        ]);

        renderProfile(profile);
        renderSkills(skills);
        renderProjects(projects);
        renderTimeline('experience-timeline', experience, 'title', 'company');
        renderTimeline('education-timeline', education, 'degree', 'school');
        buildTicker();

        // Hide loader
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.add('hidden');
        setTimeout(() => overlay.remove(), 600);

        initScrollEffects();
        initCursor();
        initNavbar();
        initParticles();
        initModal();
        initContactForm(profile);

    } catch (err) {
        console.error('Failed to load portfolio data:', err);
        document.getElementById('loading-overlay').innerHTML =
            `<div style="text-align:center;color:var(--text-muted)">
        <div style="font-size:3rem;margin-bottom:16px">⚠️</div>
        <p>Could not connect to the server.</p>
        <p style="font-size:.8rem;margin-top:8px">Make sure <code>node server.js</code> is running.</p>
       </div>`;
    }
}

init();
