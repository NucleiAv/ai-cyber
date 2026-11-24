/* Lesson pages. Question sets, embedded course pages, sidebar, done marks. */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const store = window.AIC.store;
  const NOTES = "aicyber.notes.v1";
  const notes = {
    all() { try { return JSON.parse(localStorage.getItem(NOTES)) || {}; } catch (e) { return {}; } },
    get(k) { return this.all()[k] || ""; },
    set(k, v) { const a = this.all(); if (v) a[k] = v; else delete a[k]; try { localStorage.setItem(NOTES, JSON.stringify(a)); } catch (e) {} }
  };
  const TICK = '<span class="box"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13c2 1.4 3.7 3.2 5.2 5.4C11.6 12.6 15.4 7.4 21 3"/></svg>';
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9.]/g, "");

  /* ---------- question sets ---------- */
  function renderSet(box) {
    const id = box.dataset.id;
    const src = $(`script[data-for="${id}"]`);
    if (!src) return;
    const items = JSON.parse(src.textContent);
    box.innerHTML = items.map((it, i) => {
      const qid = `${id}.${i}`;
      const num = `<span class="qn mono">${items.length > 1 ? "Q" + (i + 1) : "Q"}</span>`;
      const info = it.info ? `<div class="qinfo">${it.info}</div>` : "";
      if (it.type === "mcq") {
        return `<div class="q mcq" data-q="${qid}">${num}<p class="qq">${it.q}</p>${info}
          <div class="opts">${it.opts.map((o, j) => `<button type="button" data-j="${j}">${o}</button>`).join("")}</div>
          <div class="why">${it.why || ""}</div></div>`;
      }
      if (it.type === "sort") {
        return `<div class="q sort" data-q="${qid}">${num}<p class="qq">${it.q}</p>${info}
          <div class="rows">${it.rows.map((r, j) => `<label class="srow"><span>${r[0]}</span><select data-j="${j}"><option value="">Choose</option>${it.opts.map(o => `<option>${o}</option>`).join("")}</select><i class="mark" aria-hidden="true"></i></label>`).join("")}</div>
          <button type="button" class="btn btn-quiet btn-sm check-btn">Check my answers</button><div class="why">${it.why || ""}</div></div>`;
      }
      if (it.type === "num") {
        return `<div class="q num" data-q="${qid}">${num}<p class="qq">${it.q}</p>${info}
          <div class="numrow"><input type="text" inputmode="decimal" aria-label="Your answer" value="${(notes.get(qid) || "").replace(/"/g, "&quot;")}"><span class="mono">${it.unit || ""}</span>
          <button type="button" class="btn btn-quiet btn-sm check-btn">Check</button><span class="res" aria-live="polite"></span></div>
          <div class="why">${it.why || ""}</div></div>`;
      }
      /* open */
      return `<div class="q open" data-q="${qid}">${num}<p class="qq">${it.q}</p>${info}
        <textarea rows="4" placeholder="Write your answer here. It saves in this browser." aria-label="Your answer">${(notes.get(qid) || "").replace(/</g, "&lt;")}</textarea>
        <div class="row"><button type="button" class="btn btn-quiet btn-sm reveal">Show model answer</button><span class="saved mono"></span></div>
        <div class="model">${it.a || ""}</div></div>`;
    }).join("");

    $$(".q", box).forEach((q, i) => {
      const it = items[i], qid = q.dataset.q;
      if (it.type === "mcq") {
        q.addEventListener("click", e => {
          const b = e.target.closest("button"); if (!b || q.classList.contains("done")) return;
          q.classList.add("done");
          const ok = +b.dataset.j === it.a;
          $$("button", q).forEach(x => { if (+x.dataset.j === it.a) x.classList.add("right"); });
          if (!ok) b.classList.add("wrong");
          $(".why", q).insertAdjacentHTML("afterbegin", `<b>${ok ? "Correct." : "Not quite."}</b> `);
          store.set("q." + qid, ok ? 1 : 0);
          score(box);
        });
      } else if (it.type === "sort") {
        $(".check-btn", q).addEventListener("click", () => {
          let good = 0;
          $$("select", q).forEach(s => {
            const want = it.rows[+s.dataset.j][1];
            const ok = s.value === want;
            if (ok) good++;
            s.closest(".srow").classList.toggle("right", ok);
            s.closest(".srow").classList.toggle("wrong", !ok);
            s.closest(".srow").querySelector(".mark").textContent = ok ? "" : want;
          });
          q.classList.add("done");
          const w = $(".why", q);
          w.querySelector(".tally") ? w.querySelector(".tally").remove() : null;
          w.insertAdjacentHTML("afterbegin", `<b class="tally">${good} of ${it.rows.length} right. </b>`);
        });
      } else if (it.type === "num") {
        const inp = $("input", q);
        $(".check-btn", q).addEventListener("click", () => {
          const v = parseFloat(String(inp.value).replace(/[, $%]/g, ""));
          const tol = it.tol != null ? it.tol : Math.abs(it.a) * 0.01;
          const ok = !isNaN(v) && Math.abs(v - it.a) <= tol;
          notes.set(qid, inp.value);
          $(".res", q).textContent = ok ? "Correct" : "Not yet. Try again or read the working below";
          $(".res", q).className = "res " + (ok ? "good" : "bad");
          q.classList.add("done");
        });
      } else {
        const ta = $("textarea", q), sv = $(".saved", q);
        let t;
        ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { notes.set(qid, ta.value.trim()); sv.textContent = "saved"; }, 400); });
        $(".reveal", q).addEventListener("click", e => {
          q.classList.toggle("shown");
          e.target.textContent = q.classList.contains("shown") ? "Hide model answer" : "Show model answer";
        });
      }
    });
  }
  function score(box) {
    const qs = $$(".q.mcq", box);
    if (qs.length < 2) return;
    const done = qs.filter(q => q.classList.contains("done"));
    if (done.length !== qs.length) return;
    const right = qs.filter(q => $(".right.wrong", q) === null && !$(".wrong", q)).length;
    let s = $(".qscore", box);
    if (!s) { s = document.createElement("p"); s.className = "qscore"; box.appendChild(s); }
    s.innerHTML = `<b>${right} of ${qs.length}</b> right. ${right === qs.length ? "Well done. Mark the lesson done at the top." : "Read the explanations above, then go back to the part you missed."}`;
  }

  /* ---------- embedded course pages ---------- */
  const RETINT = `
    :root{--nyu-violet:#2a5791!important;--nyu-violet-dark:#1f4373!important;--nyu-violet-light:#5b7fb2!important;
      --nyu-violet-50:#f3f6fa!important;--nyu-violet-100:#e3eaf3!important;--nyu-violet-200:#c9d6e8!important;--nyu-violet-rgb:42,87,145!important;--nyu-glow:none!important}
    html,body{background:#f7f4ee!important;height:auto!important;min-height:0!important}
    .nyu-progress,.skip-link{display:none!important}`;
  const RETINT_DARK = `
    :root{--ink:#efe9de!important;--ink-soft:#c9c1b5!important;--ink-mute:#a39b8f!important;--rule:rgba(239,233,222,.12)!important;
      --surface:#1c1a18!important;--surface-sunken:#161513!important;--code-bg:#262421!important;--code-ink:#efe9de!important;
      --nyu-violet:#84a9dd!important;--nyu-violet-dark:#a9c3e8!important;--nyu-violet-50:#1f2633!important;--nyu-violet-100:#243044!important;--nyu-violet-200:#2e3d57!important}
    html,body,.nyu-course{background:#161513!important;color:#efe9de!important}
    img{background:#f7f4ee}`;
  /* The course pages hard-code light boxes, so they always stay light and readable, in both themes. */
  const themeCss = () => RETINT;
  function fit(fr) {
    try {
      const d = fr.contentDocument; if (!d || !d.body) return;
      /* measure the content, not the frame, so the frame can also shrink */
      const cs = fr.contentWindow.getComputedStyle(d.body);
      const h = Math.ceil(d.body.getBoundingClientRect().height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom));
      if (h > 50 && Math.abs(fr.offsetHeight - h) > 4) fr.style.height = (h + 4) + "px";
    } catch (e) {}
  }
  function initEmbeds() {
    $$("iframe.nyu").forEach(fr => {
      const setup = () => {
        try {
          const d = fr.contentDocument;
          let st = d.getElementById("aic-retint");
          if (!st) { st = d.createElement("style"); st.id = "aic-retint"; d.head.appendChild(st); }
          st.textContent = themeCss();
          /* links that leave the course open in a new tab */
          $$("a[href^='http']", d).forEach(a => a.setAttribute("target", "_blank"));
          fit(fr);
          if ("ResizeObserver" in window) new ResizeObserver(() => fit(fr)).observe(d.body);
          setTimeout(() => fit(fr), 600); setTimeout(() => fit(fr), 2000);
        } catch (e) { fr.style.height = "80vh"; }
      };
      fr.addEventListener("load", setup);
      if (fr.contentDocument && fr.contentDocument.readyState === "complete" && fr.src) setup();
    });
    window.addEventListener("resize", () => $$("iframe.nyu").forEach(fit));
    document.addEventListener("themechange", () => $$("iframe.nyu").forEach(fr => {
      try { const st = fr.contentDocument.getElementById("aic-retint"); if (st) st.textContent = themeCss(); } catch (e) {}
    }));
  }

  /* ---------- lab viewer ---------- */
  function initLab() {
    const fr = $("#lab-frame"); if (!fr) return;
    const p = new URLSearchParams(location.search);
    const m = parseInt(p.get("m"), 10), f = p.get("f") || "";
    if (!m || !/^interactive\/[\w\-./]+\.html$/.test(f) || f.includes("..")) { $("#lab-title").textContent = "Lab not found"; return; }
    const mod = (window.MODULES || []).find(x => x.n === m);
    const key = "module-" + String(m).padStart(2, "0");
    const lab = window.MODULE_FILES && window.MODULE_FILES[key] && window.MODULE_FILES[key].labs.find(l => l.f === f);
    const title = lab ? lab.t.replace(/:\s+/g, ". ") : "Interactive lab";
    document.title = title + ". Module " + m;
    $("#lab-title").textContent = title;
    $("#lab-crumb").textContent = "Module " + m + " lab";
    $("#lab-lede").textContent = "A hands-on lab from Module " + m + (mod ? ", " + mod.t.toLowerCase() : "") + ". Use the controls inside the frame. Nothing you do here leaves your browser.";
    $("#lab-back").innerHTML = `<a href="m${String(m).padStart(2, "0")}.html">Back to Module ${m}</a> · <a href="../course/defensive/${key}/${f}" target="_blank">Open the lab full screen</a>`;
    fr.src = `../course/defensive/${key}/${f}`;
    const grp = $(`.side-mod a.side-open[href="m${String(m).padStart(2, "0")}.html"]`);
    if (grp) { const d = grp.closest("details"); d.open = true; d.classList.add("cur"); }
  }

  /* ---------- sidebar and done marks ---------- */
  function initSide() {
    const btn = $(".side-btn"), nav = $("#side-nav"), side = $(".side");
    if (btn && nav) btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    $$("[data-done]").forEach(a => { if (store.get(a.dataset.done)) a.classList.add("is-done"); });
    /* bring the current group into view inside the sidebar */
    const cur = $(".side .side-mod.cur") || $(".side [aria-current='page']");
    if (cur && side && window.innerWidth > 1000) side.scrollTop = Math.max(0, cur.offsetTop - 90);
    /* highlight the part of the page you are reading */
    const links = $$(".side-mod.cur a[href^='#']");
    if (links.length && "IntersectionObserver" in window) {
      const map = new Map(links.map(l => [l.getAttribute("href").slice(1), l]));
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.remove("spy"));
        const l = map.get(e.target.id); if (l) l.classList.add("spy");
      }), { rootMargin: "-20% 0px -70% 0px" });
      map.forEach((l, id) => { const t = document.getElementById(id); if (t) io.observe(t); });
      links.forEach(l => l.addEventListener("click", () => { if (nav) nav.classList.remove("open"); }));
    }
    /* left and right arrow keys move between pages */
    document.addEventListener("keydown", e => {
      if (e.target.closest("input, textarea, select, [contenteditable], .scene") || e.altKey || e.ctrlKey || e.metaKey) return;
      const pg = e.key === "ArrowRight" ? $(".pager .next") : e.key === "ArrowLeft" ? $(".pager .prev") : null;
      if (pg && pg.href) location.href = pg.href;
    });
    $$("input[data-id]").forEach(i => {
      i.checked = store.get(i.dataset.id);
      i.addEventListener("change", () => {
        store.set(i.dataset.id, i.checked);
        $$(`[data-done="${i.dataset.id}"]`).forEach(a => a.classList.toggle("is-done", i.checked));
      });
    });
  }

  /* modules.js is needed by the lab viewer only */
  function needModules(cb) {
    if (window.MODULE_FILES || !$("#lab-frame")) return cb();
    const s = document.createElement("script"); s.src = "../assets/js/modules.js"; s.onload = cb; document.body.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", () => {
    $$(".qset").forEach(renderSet);
    if (window.AIC.enhanceAll) window.AIC.enhanceAll(document);
    initSide();
    initEmbeds();
    needModules(initLab);
  });
})();
