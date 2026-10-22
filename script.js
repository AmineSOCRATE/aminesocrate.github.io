// Thème clair / sombre (mémorisé)
const root = document.documentElement;
const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (prefersDark ? "dark" : "light");

document.querySelector(".theme-btn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// Header : plus opaque une fois qu'on a défilé
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Header : surligne la section visible
const navLinks = [...document.querySelectorAll(".links a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.setAttribute("aria-current", a.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["projets", "experience", "competences", "contact"].forEach(id => spy.observe(document.getElementById(id)));

// Apparition au scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Hero : taille réelle de la sélection (comme dans Figma)
const selection = document.getElementById("selection");
const dims = document.getElementById("dims");
new ResizeObserver(() => {
  dims.textContent = `${Math.round(selection.offsetWidth)} x ${Math.round(selection.offsetHeight)}`;
}).observe(selection);

// Hero : barre d'outils (sélection visuelle uniquement)
document.querySelectorAll(".tool").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tool").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  })
);

// Traduction : t("français", "english") selon la langue choisie (voir i18n.js)
const t = (fr, en) => i18n.t(fr, en);
// Un projet dans la langue courante : les champs de p.en remplacent ceux en français
const L = p => (i18n.lang === "en" && p.en ? { ...p, ...p.en } : p);

// Projets : roue de cartes
// Pour utiliser une vraie image, ajoute assets/projets/<id>.jpg (ex. assets/projets/gerozone.jpg)
const projects = [
  {
    id: "gooduniforme",
    title: "Good Uniforme — Refonte & SEO",
    meta: "Vêtements professionnels · Casablanca · 2026",
    time: "oct. 2026",
    status: "En ligne",
    page: "projets/gooduniforme.html",
    url: "https://gooduniforme.ma/",
    desc: "Refonte du site de Good Uniforme, spécialiste des vêtements professionnels personnalisés au Maroc, puis stratégie de référencement naturel (SEO). Le nouveau site est en ligne.",
    tags: ["Refonte web", "UX/UI", "SEO"],
    poster: () => `<div class="poster p-good"><div class="row"><small>Casablanca</small><small class="live">${t("En ligne", "Live")}</small></div><div class="chevrons"><i></i><i></i><i></i></div><div class="p-good-txt"><img src="assets/projets/gooduniforme/logo-blanc.png" alt=""><small class="cs-flag">${t("Étude de cas →", "Case study →")}</small></div></div>`,
    // Vue projet
    logo: "assets/projets/gooduniforme/icone.png",
    context: "Good Uniforme conçoit des vêtements professionnels personnalisés au Maroc : tenues de travail, blouses médicales, uniformes scolaires et textile publicitaire. L'enjeu : un site plus moderne et plus clair, et une meilleure visibilité sur Google.",
    role: [
      "Refonte complète du site sous WordPress / Elementor (UX/UI) — en ligne",
      "Référencement naturel (SEO) — en cours"
    ],
    skills: ["UX/UI", "WordPress", "Elementor", "Claude (IA)", "Refonte web", "SEO"],
    gallery: [
      { src: "assets/projets/gooduniforme/apres-accueil.jpg", caption: "Nouvelle page d'accueil", pos: "top" },
      { src: "assets/projets/gooduniforme/apres-boutique.jpg", caption: "E-boutique — catalogue filtrable", pos: "top" },
      { src: "assets/projets/gooduniforme/apres-produit.jpg", caption: "Page produit + devis", pos: "top" },
      { src: "assets/projets/gooduniforme/apres-categorie.jpg", caption: "Catégorie Hôtellerie", pos: "top" },
      { src: "assets/projets/gooduniforme/apres-realisations.jpg", caption: "Nos réalisations", pos: "top" },
      { src: "assets/projets/gooduniforme/avant-boutique.jpg", caption: "Avant — l'ancienne E-boutique, vide", pos: "top" }
    ],
    en: {
      title: "Good Uniforme — Redesign & SEO",
      meta: "Workwear · Casablanca · 2026",
      time: "Oct 2026",
      status: "Live",
      desc: "Redesign of the website of Good Uniforme, a specialist in custom workwear in Morocco, followed by an SEO strategy. The new site is live.",
      tags: ["Web redesign", "UX/UI", "SEO"],
      context: "Good Uniforme designs custom workwear in Morocco: work clothing, medical coats, school uniforms and promotional textiles. The goal: a more modern, clearer website and better visibility on Google.",
      role: [
        "Full website redesign in WordPress / Elementor (UX/UI) — live",
        "Search engine optimization (SEO) — in progress"
      ],
      skills: ["UX/UI", "WordPress", "Elementor", "Claude (AI)", "Web redesign", "SEO"]
    }
  },
  {
    id: "gerozone",
    title: "Gerozone — UX, social media & événements",
    meta: "Plateforme esport · Maroc · depuis le lancement",
    time: "nov. 2025",
    url: "https://play.gerozone.gg/",
    extra: { label: "Instagram", url: "https://www.instagram.com/gerozone.gg/" },
    desc: "Membre de l'équipe depuis le premier jour : UX de la plateforme, stratégie réseaux sociaux et organisation d'événements pour faire grandir la communauté esport au Maroc.",
    tags: ["UX", "Social media", "Événementiel", "Growth"],
    poster: () => `<div class="poster p-gero"><div class="row"><small>${t("Esport · Maroc", "Esports · Morocco")}</small><small>Day 1</small></div><div class="orb"><img src="assets/projets/gerozone/logo.png" alt=""></div><small>UX · Social · Events</small></div>`,
    // Vue projet
    logo: "assets/projets/gerozone/logo.png",
    status: "Depuis le jour 1",
    context: "GeroZone est la plateforme esport et gaming du Maroc : tournois, jeux, équipes pro, créateurs de contenu et une boutique, avec un système de récompenses (GeroCoins). J'ai rejoint l'aventure dès le premier jour, avec un objectif : construire une expérience et une communauté qui donnent envie de s'inscrire, de jouer et de revenir.",
    role: [
      "UX de la plateforme : parcours d'inscription, de participation aux tournois et d'engagement",
      "Stratégie réseaux sociaux : ligne éditoriale, contenus et animation de la communauté sur Instagram",
      "Organisation et promotion d'événements et de tournois esport",
      "Collaboration avec les développeurs pour faire évoluer la plateforme"
    ],
    skills: ["UX", "Stratégie social media", "Community management", "Événementiel", "Growth"],
    details: [["Entreprise", "GeroZone"], ["Secteur", "Esport · Maroc"], ["Rôle", "UX, social media & événements"], ["Période", "Depuis le lancement"], ["Mode", "Remote"], ["Canaux", "Plateforme · Instagram"]],
    en: {
      title: "Gerozone — UX, social media & events",
      meta: "Esports platform · Morocco · since launch",
      time: "Nov 2025",
      status: "Since day 1",
      desc: "On the team since day one: platform UX, social media strategy and event organization to grow the esports community in Morocco.",
      tags: ["UX", "Social media", "Events", "Growth"],
      context: "GeroZone is Morocco's esports and gaming platform: tournaments, games, pro teams, content creators and a shop, with a rewards system (GeroCoins). I joined on day one with one goal: build an experience and a community that make people want to sign up, play and come back.",
      role: [
        "Platform UX: sign-up, tournament participation and engagement flows",
        "Social media strategy: editorial line, content and community management on Instagram",
        "Organizing and promoting esports events and tournaments",
        "Working with the developers to evolve the platform"
      ],
      skills: ["UX", "Social media strategy", "Community management", "Events", "Growth"],
      details: [["Company", "GeroZone"], ["Sector", "Esports · Morocco"], ["Role", "UX, social media & events"], ["Period", "Since launch"], ["Mode", "Remote"], ["Channels", "Platform · Instagram"]]
    }
  },
  {
    id: "sportscore",
    title: "Sportscore.tech — Identité & site",
    meta: "IA sportive · ARTEKA · 2024",
    time: "août 2024",
    url: "", // site hors ligne
    desc: "Création de l'identité visuelle et refonte du logo d'un projet d'intelligence artificielle sportive, conception UX/UI du site et participation à l'intégration front-end.",
    tags: ["Branding", "UX/UI", "HTML/CSS/JS"],
    poster: () => `<div class="poster p-sport"><div class="row"><small>AI · Sports</small><small>2024</small></div><div class="sp-orbit"><i></i><i></i></div><img class="sp-logo" src="assets/projets/sportscore/logo.png" alt=""><small>${t("Identité visuelle", "Visual identity")}</small></div>`,
    // Vue projet
    logo: "assets/projets/sportscore/logo.png",
    status: "Archivé",
    context: "Sportscore.tech était un projet d'intelligence artificielle appliquée au sport, développé au sein de l'agence ARTEKA. Il fallait lui donner une identité forte et un site capable de présenter le produit. Le site n'est plus en ligne aujourd'hui.",
    role: [
      "Création de l'identité visuelle du projet",
      "Refonte du logo",
      "Conception UX/UI du site",
      "Participation à l'intégration front-end (HTML, CSS, JavaScript)"
    ],
    skills: ["Branding", "Logo", "UX/UI", "HTML/CSS/JS"],
    details: [["Agence", "ARTEKA"], ["Lieu", "Amiens"], ["Rôle", "Designer UX/UI & Front-end"], ["Période", "Août – oct. 2024"], ["Livrables", "Logo, identité, site"], ["Statut", "Site hors ligne"]],
    en: {
      title: "Sportscore.tech — Identity & website",
      meta: "Sports AI · ARTEKA · 2024",
      time: "Aug 2024",
      status: "Archived",
      desc: "Created the visual identity and redesigned the logo of a sports AI project, designed the website's UX/UI and contributed to front-end development.",
      tags: ["Branding", "UX/UI", "HTML/CSS/JS"],
      context: "Sportscore.tech was an artificial intelligence project applied to sports, developed at the ARTEKA agency. It needed a strong identity and a website able to showcase the product. The site is no longer online.",
      role: [
        "Created the project's visual identity",
        "Logo redesign",
        "UX/UI design of the website",
        "Contributed to front-end development (HTML, CSS, JavaScript)"
      ],
      skills: ["Branding", "Logo", "UX/UI", "HTML/CSS/JS"],
      details: [["Agency", "ARTEKA"], ["Location", "Amiens"], ["Role", "UX/UI Designer & Front-end"], ["Period", "Aug – Oct 2024"], ["Deliverables", "Logo, identity, website"], ["Status", "Site offline"]]
    }
  },
  {
    id: "za3za3",
    title: "ZA3ZA3 Gaming — Refonte de marque",
    meta: "Gaming · Brest · 2026",
    time: "mars 2026",
    url: "https://za3za3gaming.fr",
    desc: "Refonte de l'identité visuelle pour une stratégie de marque cohérente, création de supports marketing, animation des réseaux sociaux et optimisation UX du site.",
    tags: ["Identité visuelle", "Social media", "Webdesign"],
    poster: () => `<div class="poster p-za3"><div class="row"><small>Brest</small><small>2026</small></div><span class="p-logo-wrap"><img class="p-logo" src="assets/projets/za3za3/logo.png" alt=""></span><div class="p-za3-txt"><b>ZA3ZA3 Gaming</b><small class="words"><i>Jouer.</i> <i>Manger.</i> <i>Kiffer.</i></small></div></div>`,
    // Vue projet (bouton « Voir le projet »)
    logo: "assets/projets/za3za3/logo.png",
    brand: { bg: "#070b07", accent: "#7ed957" },
    context: "Za3za3 Gaming est un gaming-snack à Brest : PC gaming, PS5, Nintendo Switch 2, rétrogaming et un snack sur place, ouvert 7j/7 de 11h30 à 01h. L'enjeu : une marque cohérente et un site qui donne envie de réserver une session.",
    role: [
      "Refonte de l'identité visuelle et contribution à une stratégie de marque cohérente",
      "Conception de supports visuels et d'actions marketing",
      "Animation des réseaux sociaux",
      "Mise à jour, optimisation UX et maintenance du site internet"
    ],
    skills: ["UX/UI", "WordPress", "Elementor", "Claude (IA)", "Marketing digital", "Branding", "Réseaux sociaux"],
    details: [["Client", "ZA3ZA3 Gaming"], ["Lieu", "Brest"], ["Rôle", "Assistant UX/UI & marketing"], ["Période", "Mars – juin 2026"], ["Site", "WordPress · Elementor"], ["Concept", "Gaming-snack"]],
    en: {
      title: "ZA3ZA3 Gaming — Brand redesign",
      meta: "Gaming · Brest · 2026",
      time: "Mar 2026",
      desc: "Visual identity redesign for a consistent brand strategy, marketing materials, social media management and UX optimization of the website.",
      tags: ["Visual identity", "Social media", "Web design"],
      context: "Za3za3 Gaming is a gaming snack bar in Brest: gaming PCs, PS5, Nintendo Switch 2, retro gaming and an on-site snack bar, open 7 days a week from 11:30 am to 1 am. The goal: a consistent brand and a website that makes people want to book a session.",
      role: [
        "Redesigned the visual identity and contributed to a consistent brand strategy",
        "Designed visual materials and marketing campaigns",
        "Social media management",
        "Website updates, UX optimization and maintenance"
      ],
      skills: ["UX/UI", "WordPress", "Elementor", "Claude (AI)", "Digital marketing", "Branding", "Social media"],
      details: [["Client", "ZA3ZA3 Gaming"], ["Location", "Brest"], ["Role", "UX/UI & marketing assistant"], ["Period", "Mar – Jun 2026"], ["Website", "WordPress · Elementor"], ["Concept", "Gaming snack bar"]]
    }
  }
];

const stage = document.getElementById("stage");
const wheel = document.getElementById("wheel");
const SLOTS = 12; // cartes réparties sur un cercle complet (projets répétés)
const STEP = 360 / SLOTS;
const mod = (n, m) => ((n % m) + m) % m;
let rot = 0;
let active = 0;

const cards = Array.from({ length: SLOTS }, (_, i) => {
  const p = projects[i % projects.length];
  const card = document.createElement("button");
  card.className = "card";
  card.style.setProperty("--a", `${i * STEP}deg`);
  card.addEventListener("click", () => {
    if (dragMoved) return;
    stopAuto();
    if (card.classList.contains("active")) openCase(p); // carte déjà au centre : on ouvre le projet
    else goTo(i);
  });
  wheel.appendChild(card);
  return card;
});
function renderCards() { // (re)dessine les cartes dans la langue courante
  cards.forEach((card, i) => {
    const p = projects[i % projects.length];
    card.setAttribute("aria-label", L(p).title);
    card.innerHTML = `<div class="card-inner">${p.poster()}<img src="assets/projets/${p.id}.jpg" alt="" onerror="this.remove()"></div>`
      + `<span class="sel" aria-hidden="true"><i></i><i></i><i></i><i></i><em>${p.id}.fig</em></span>`;
  });
}
renderCards();

const info = document.getElementById("workInfo");
const comment = document.getElementById("comment");
let commentTimer = null;
document.getElementById("wTotal").textContent = String(projects.length).padStart(2, "0");
function showInfo(base, idx) {
  const p = L(base);
  comment.classList.remove("open");
  document.getElementById("ringNum").textContent = String(idx + 1).padStart(2, "0");
  dots.forEach((d, k) => d.setAttribute("aria-selected", k === idx));
  clearTimeout(commentTimer);
  commentTimer = setTimeout(() => {
    document.getElementById("wTime").textContent = p.time;
    document.getElementById("wTitle").textContent = p.title;
    document.getElementById("wDesc").textContent = p.desc;
    const link = document.getElementById("wLink");
    link.hidden = !p.url;
    setExtra(document.getElementById("wExtra"), p);
    if (p.url) link.href = p.url;
    const caseBtn = document.getElementById("wCase");
    caseBtn.hidden = !p.context;
    caseBtn.textContent = p.page ? t("Lire l'étude de cas →", "Read the case study →") : t("Voir le projet →", "View project →");
    caseBtn.onclick = () => openCase(base);
    comment.classList.add("open");
  }, 450); // le commentaire s'ouvre quand la carte arrive au centre
}

function render() {
  wheel.style.setProperty("--rot", `${rot}deg`);
  const idx = mod(Math.round(-rot / STEP), SLOTS);
  cards.forEach((c, i) => c.classList.toggle("active", i === idx));
  const pIdx = idx % projects.length;
  if (pIdx !== active || !info.dataset.ready) {
    active = pIdx;
    info.dataset.ready = "1";
    showInfo(projects[pIdx], pIdx);
  }
}
function goTo(i) {
  let delta = mod(-i * STEP - rot, 360);
  if (delta > 180) delta -= 360;
  rot += delta;
  render();
}
const current = () => Math.round(-rot / STEP);

// Points : aller au projet k par le chemin le plus court
function goToProject(k) {
  const slots = cards.map((_, i) => i).filter(i => i % projects.length === k);
  const dist = i => { const d = mod(-i * STEP - rot, 360); return Math.min(d, 360 - d); };
  goTo(slots.sort((a, b) => dist(a) - dist(b))[0]);
}
const dots = projects.map((p, k) => {
  const d = document.createElement("button");
  d.className = "dot-btn";
  d.setAttribute("role", "tab");
  d.setAttribute("aria-label", L(p).title);
  d.addEventListener("click", () => { goToProject(k); stopAuto(); });
  document.getElementById("wDots").appendChild(d);
  return d;
});
document.querySelector(".wheel-nav.prev").addEventListener("click", () => { goTo(current() - 1); stopAuto(); });
document.querySelector(".wheel-nav.next").addEventListener("click", () => { goTo(current() + 1); stopAuto(); });
stage.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") { goTo(current() - 1); stopAuto(); }
  if (e.key === "ArrowRight") { goTo(current() + 1); stopAuto(); }
});

// Glisser pour tourner (on bloque le glisser-déposer natif des images)
stage.addEventListener("dragstart", e => e.preventDefault());
let dragStartX = null, dragStartRot = 0, dragMoved = false;
stage.addEventListener("pointerdown", e => {
  if (e.target.closest(".wheel-nav")) return;
  dragStartX = e.clientX; dragStartRot = rot; dragMoved = false;
});
window.addEventListener("pointermove", e => {
  if (dragStartX === null) return;
  const dx = e.clientX - dragStartX;
  if (Math.abs(dx) > 6) { dragMoved = true; stage.classList.add("dragging"); stopAuto(); }
  if (dragMoved) { rot = dragStartRot + dx * 0.12; render(); }
});
window.addEventListener("pointerup", () => {
  if (dragStartX === null) return;
  dragStartX = null;
  stage.classList.remove("dragging");
  if (dragMoved) { rot = Math.round(rot / STEP) * STEP; render(); }
  setTimeout(() => (dragMoved = false), 0);
});

// Rotation automatique jusqu'à la première interaction
let autoTimer = null;
function stopAuto() { clearInterval(autoTimer); autoTimer = null; }
// Pas de rotation automatique : la roue reste sur Good Uniforme (projet 01) jusqu'à ce que le visiteur la fasse tourner.
render();

// Vue projet + galerie
const caseDlg = document.getElementById("case");
const lightbox = document.getElementById("lightbox");
let lbItems = [], lbIndex = 0;

function openCase(base) {
  if (base.page) { location.href = base.page; return; } // projet avec étude de cas complète
  const p = L(base);
  stopAuto();
  document.getElementById("caseFile").textContent = `${p.id}.fig`;
  document.getElementById("caseLogo").src = p.logo || "";
  document.getElementById("caseLogo").hidden = !p.logo;
  document.getElementById("caseMeta").innerHTML = p.meta + (p.status ? ` <span class="status${base.status === "Archivé" ? " is-archived" : ""}">${p.status}</span>` : "");
  document.getElementById("caseTitle").textContent = p.title;
  document.getElementById("caseContext").textContent = p.context || p.desc;
  document.getElementById("caseRole").innerHTML = (p.role || []).map(r => `<li>${r}</li>`).join("");
  document.getElementById("caseTags").innerHTML = (p.skills || p.tags).map(t => `<li>${t}</li>`).join("");
  const link = document.getElementById("caseLink");
  const page = document.getElementById("casePage");
  page.hidden = !p.page;
  if (p.page) page.href = p.page;
  link.hidden = !p.url;
  setExtra(document.getElementById("caseExtra"), p);
  if (p.url) link.href = p.url;
  document.getElementById("caseDetails").innerHTML = (p.details || [])
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  caseDlg.querySelector(".case-body").scrollTop = 0;
  if (!caseDlg.open) caseDlg.showModal();
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", `#${p.id}`); // lien partageable : .../#gerozone
}
caseDlg.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (projects.some(p => `#${p.id}` === location.hash)) history.replaceState(null, "", location.pathname + location.search);
});

// Ouvrir directement un projet depuis le lien (ex. index.html#za3za3)
function openFromHash() {
  const k = projects.findIndex(p => `#${p.id}` === location.hash);
  if (k < 0 || !projects[k].context) return;
  goToProject(k);
  document.getElementById("projets").scrollIntoView();
  openCase(projects[k]);
}
window.addEventListener("hashchange", openFromHash);
document.getElementById("caseClose").addEventListener("click", () => caseDlg.close());
caseDlg.addEventListener("click", e => { if (e.target === caseDlg) caseDlg.close(); }); // clic sur le fond

function showLightbox(i) {
  lbIndex = mod(i, lbItems.length);
  document.getElementById("lbImg").src = lbItems[lbIndex].src;
  document.getElementById("lbImg").alt = lbItems[lbIndex].caption;
  document.getElementById("lbCap").textContent = `${lbIndex + 1} / ${lbItems.length} — ${lbItems[lbIndex].caption}`;
  if (!lightbox.open) lightbox.showModal();
}
lightbox.querySelector(".lb-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lb-prev").addEventListener("click", () => showLightbox(lbIndex - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => showLightbox(lbIndex + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Chiffres clés : compteur animé quand la frame apparaît
const statsFrame = document.querySelector(".stats-frame");
new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  obs.disconnect();
  statsFrame.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, suffix = el.dataset.suffix || "";
    const t0 = performance.now(), dur = 1100;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffix : "");
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 }).observe(statsFrame);

// Méthode : le curseur « Recruteur » dit bonjour quand on le survole (façon FigJam)
const mpCursor = document.getElementById("mpCursor");
const board = mpCursor.closest(".board");
function sayHi() {
  const b = board.getBoundingClientRect(), c = mpCursor.getBoundingClientRect();
  ["👋", "✨", "🙌", "✨", "💙"].forEach((emoji, i) => {
    const p = document.createElement("span");
    p.className = "hi-burst";
    p.textContent = emoji;
    const angle = (-150 + i * 30) * Math.PI / 180;
    p.style.left = `${c.left - b.left + 10}px`;
    p.style.top = `${c.top - b.top + 4}px`;
    p.style.setProperty("--x", `${Math.cos(angle) * 46}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * 46}px`);
    p.style.setProperty("--r", `${(i - 2) * 15}deg`);
    board.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  });
}
mpCursor.addEventListener("pointerenter", sayHi);
mpCursor.addEventListener("click", () => { // au toucher (mobile/tablette)
  mpCursor.classList.add("waving"); sayHi();
  setTimeout(() => mpCursor.classList.remove("waving"), 2000);
});

// Parcours : onglets Expérience / Formation
document.querySelectorAll(".h-tabs button").forEach(tab =>
  tab.addEventListener("click", () => {
    document.querySelectorAll(".h-tabs button").forEach(t => t.setAttribute("aria-selected", t === tab));
    document.querySelectorAll(".h-list").forEach(l => (l.hidden = l.dataset.panel !== tab.dataset.tab));
  })
);

// Compétences : calques → frame sur le canevas
const skills = [
  { name: "UX/UI & Product Design", items: ["Prototypage interactif", "Wireframing", "User flows", "Design System", "Figma", "Adobe XD"],
    en: { items: ["Interactive prototyping", "Wireframing", "User flows", "Design System", "Figma", "Adobe XD"] } },
  { name: "Communication & Branding", items: ["Identité visuelle", "Stratégie de contenu", "SEO", "Community Management"],
    en: { items: ["Visual identity", "Content strategy", "SEO", "Community Management"] } },
  { name: "Création graphique", items: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
    en: { name: "Graphic design" } },
  { name: "Intégration web & CMS", items: ["HTML5", "CSS3", "JavaScript", "WordPress", "Elementor", "phpMyAdmin"],
    en: { name: "Web development & CMS" } },
  { name: "Soft skills", items: ["Empathie & approche centrée utilisateur", "Esprit d'équipe", "Résolution de problèmes", "Adaptabilité"],
    en: { items: ["Empathy & user-centered approach", "Team spirit", "Problem solving", "Adaptability"] } },
  { name: "Langues", items: ["Français — C1", "Anglais — C1", "Arabe — C2"],
    en: { name: "Languages", items: ["French — C1", "English — C1", "Arabic — C2"] } }
];
const frameIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/></svg>`;
const compIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l5 5-5 5-5-5zM12 12l5 5-5 5-5-5zM2 12l5-5 5 5-5 5zM12 12l5-5 5 5-5 5z"/></svg>`;
const layerList = document.getElementById("skillLayers");
const skillFrame = document.getElementById("skillFrame");
let skillIdx = 0;
function renderLayers() {
  layerList.innerHTML = skills.map(L).map((s, i) =>
    `<li><button role="tab" aria-selected="${i === skillIdx}" data-i="${i}">${frameIcon}${s.name}<small>${s.items.length}</small></button></li>`
  ).join("");
}
renderLayers();
function showSkill(i) {
  skillIdx = i;
  const s = L(skills[i]);
  layerList.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-selected", k === i));
  skillFrame.style.animation = "none"; skillFrame.offsetWidth; skillFrame.style.animation = "";
  skillFrame.innerHTML = `<span class="f-name">${s.name}</span><i></i><i></i><i></i><i></i>
    <h4>${s.name}</h4>
    <div class="sk-chips">${s.items.map((t, k) => `<span class="sk-chip" style="--d:${k * 50}ms">${compIcon}${t}</span>`).join("")}</div>
    <span class="f-size">Hug × Hug</span>`;
}
layerList.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (b) showSkill(+b.dataset.i);
});
showSkill(0);

// Contact : copier l'e-mail
document.getElementById("copyMail").addEventListener("click", async e => {
  const btn = e.currentTarget, label = btn.querySelector("span");
  try { await navigator.clipboard.writeText("aminesocrate11@gmail.com"); label.textContent = t("E-mail copié ✓", "Email copied ✓"); }
  catch { label.textContent = "aminesocrate11@gmail.com"; }
  btn.classList.add("done");
  setTimeout(() => { label.textContent = t("Copier l'e-mail", "Copy email"); btn.classList.remove("done"); }, 2200);
});
const copyLabel = () => (document.querySelector("#copyMail span").textContent = t("Copier l'e-mail", "Copy email"));
copyLabel();

// Changement de langue : on redessine tout ce qui est généré en JS
document.addEventListener("langchange", () => {
  renderCards();
  dots.forEach((d, k) => d.setAttribute("aria-label", L(projects[k]).title));
  showInfo(projects[active], active);
  renderLayers();
  showSkill(skillIdx);
  copyLabel();
  if (caseDlg.open) openCase(projects.find(p => `#${p.id}` === location.hash) || projects[active]);
});

// Au chargement : si le lien pointe vers un projet, on l'ouvre
openFromHash();

// Lien secondaire d'un projet (ex. Instagram)
function setExtra(el, p) {
  el.hidden = !p.extra;
  if (!p.extra) return;
  el.href = p.extra.url;
  el.innerHTML = `${p.extra.label} <span aria-hidden="true">↗</span>`;
}
