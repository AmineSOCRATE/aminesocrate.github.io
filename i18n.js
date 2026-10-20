// Langue FR / EN (mémorisée, ou forcée par ?lang=en dans l'URL)
// Le français est écrit dans le HTML ; l'anglais juste à côté :
//   data-en="…"               → remplace le contenu de l'élément
//   data-en-aria-label="…"    → remplace l'attribut aria-label (idem title, alt, content, data-name)
(() => {
  const root = document.documentElement;
  const ATTRS = ["aria-label", "title", "alt", "content", "data-name"];
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const param = new URLSearchParams(location.search).get("lang");
  let lang = ["fr", "en"].includes(param) ? param
    : get("lang") || ((navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en");

  const els = [...document.querySelectorAll(["[data-en]", ...ATTRS.map(a => `[data-en-${a}]`)].join(","))];
  const fr = new Map(els.map(el => [el, {
    html: el.innerHTML,
    attrs: Object.fromEntries(ATTRS.map(a => [a, el.getAttribute(a)]))
  }]));

  function apply() {
    root.lang = lang;
    const en = lang === "en";
    els.forEach(el => {
      const orig = fr.get(el);
      if (el.hasAttribute("data-en")) el.innerHTML = en ? el.dataset.en : orig.html;
      ATTRS.forEach(a => {
        const t = el.getAttribute(`data-en-${a}`);
        if (t !== null) el.setAttribute(a, en ? t : orig.attrs[a] ?? "");
      });
    });
    document.querySelectorAll(".lang-btn").forEach(b => {
      b.dataset.lang = lang; // la pastille bleue glisse sur la langue active
      b.innerHTML = `<span${en ? "" : ' class="on"'}>FR</span><span${en ? ' class="on"' : ""}>EN</span>`;
      b.setAttribute("aria-label", en ? "Passer en français" : "Switch to English");
      b.title = b.getAttribute("aria-label");
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  window.i18n = {
    get lang() { return lang; },
    t: (frText, enText) => (lang === "en" ? enText : frText)
  };

  document.addEventListener("click", e => {
    if (!e.target.closest(".lang-btn")) return;
    lang = lang === "en" ? "fr" : "en";
    try { localStorage.setItem("lang", lang); } catch {}
    if (param) history.replaceState(null, "", location.pathname + location.hash); // on retire ?lang= de l'URL
    apply();
  });

  apply();
})();
