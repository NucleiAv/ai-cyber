/* ============================================================
   NYU TANDON COURSE TEMPLATE: Interactive Behaviors
   ------------------------------------------------------------
   Self-contained vanilla JS. Drop on any Brightspace page.
   Auto-initializes on DOMContentLoaded; also exposes
   window.NYUCourse.init() to call manually after AJAX inserts.
   Built for keyboard + screen-reader accessibility.
   ============================================================ */

(function () {
  "use strict";

  const NYUCourse = {
    init(root = document) {
      this.bindAccordions(root);
      this.bindScenarios(root);
      this.bindTabs(root);
      this.bindQuizzes(root);
      this.bindBackToTop(root);
      this.bindProgress(root);
      this.bindTOCScrollSpy(root);
      this.bindAnchorSettle();
      this.bindTooltipsKeyboard(root);
      this.bindGlossary(root);
      this.bindAnnotatedCode(root);
      this.bindSequence(root);
      this.bindFlashcards(root);
      this.bindTimeline(root);
      this.bindMatch(root);
      this.bindSort(root);
      this.bindCommitChoice(root);
      this.bindBranch(root);
      this.bindReflect(root);
      this.bindHotspots(root);
      this.bindNumbered(root);
      this.bindVideoPosters(root);
      this.bindPymEmbeds(root);
      this.bindMlDlFlows(root);
      this.bindDemoFullscreen(root);
      this.bindXrefs(root);
      this.bindFigureA11y(root);
      this.bindTableA11y(root);
    },

    /* -------- Cross-reference links with return bubble --------
       <a class="nyu-xref" href="#target-id">part 1</a>
       Click: smooth-scroll to #target-id, flash-highlight it, and
       show a floating bubble that returns the reader to where they
       were. Chained jumps keep the ORIGINAL reading position, so
       "return" always goes back to where the reader started. */
    bindXrefs(root) {
      const links = Array.from(root.querySelectorAll(".nyu-xref"));
      if (!links.length) return;

      let bubble = document.querySelector(".nyu-return-bubble");
      if (!bubble) {
        bubble = document.createElement("div");
        bubble.className = "nyu-return-bubble";
        bubble.setAttribute("role", "status");
        bubble.dataset.visible = "false";
        bubble.innerHTML =
          '<button type="button" class="nyu-return-bubble__back">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>' +
          '<span class="nyu-return-bubble__label">Return</span>' +
          "</button>" +
          '<button type="button" class="nyu-return-bubble__close" aria-label="Dismiss">&times;</button>';
        document.body.appendChild(bubble);
      }
      const backBtn = bubble.querySelector(".nyu-return-bubble__back");
      const labelEl = bubble.querySelector(".nyu-return-bubble__label");
      const closeBtn = bubble.querySelector(".nyu-return-bubble__close");
      let origin = null; // { y, label } - reading position before the first jump

      function hideBubble() {
        bubble.dataset.visible = "false";
        origin = null;
      }
      function showBubble() {
        labelEl.textContent = origin && origin.label
          ? "Back to “" + origin.label + "”"
          : "Back to where you were";
        bubble.dataset.visible = "true";
      }
      function flash(el) {
        el.classList.remove("nyu-xref-flash");
        void el.offsetWidth; // restart the CSS animation
        el.classList.add("nyu-xref-flash");
        el.addEventListener(
          "animationend",
          function () { el.classList.remove("nyu-xref-flash"); },
          { once: true }
        );
      }

      backBtn.addEventListener("click", function () {
        if (origin) window.scrollTo({ top: origin.y, behavior: "smooth" });
        hideBubble();
      });
      closeBtn.addEventListener("click", hideBubble);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && bubble.dataset.visible === "true") hideBubble();
      });

      links.forEach(function (link) {
        link.addEventListener("click", function (e) {
          const hash = link.getAttribute("href") || "";
          if (hash.charAt(0) !== "#") return;
          const target = document.getElementById(hash.slice(1));
          if (!target) return;
          e.preventDefault();

          // Remember the reading position only for the first hop of a chain
          if (!origin) {
            let label = link.dataset.returnLabel || "";
            if (!label) {
              const section = link.closest(".nyu-section");
              const title = section && section.querySelector(".nyu-section__title");
              if (title) label = title.textContent.trim();
            }
            origin = { y: window.scrollY, label: label };
          }
          target.style.scrollMarginTop = "72px";
          // Scrolling is delegated to bindAnchorSettle. This used to call
          // scrollIntoView({behavior:"smooth"}) directly, which lands short
          // whenever a lazy iframe above the target reports its height during
          // the scroll, and which fought the anchor handler for control.
          if (NYUCourse.gotoAnchor) NYUCourse.gotoAnchor(target);
          else target.scrollIntoView({ block: "start" });
          flash(target);
          showBubble();
        });
      });
    },

    /* -------- Accordions -------- */
    /* -------- Tables: belt-and-braces header scopes -------- */
    bindTableA11y(root) {
      // Ensure every header cell declares its scope (WCAG 1.3.1),
      // covering any table whose markup omitted the attribute.
      root.querySelectorAll("table").forEach((table) => {
        table.querySelectorAll("thead th:not([scope])").forEach((th) => th.setAttribute("scope", "col"));
        table.querySelectorAll("tbody th:not([scope])").forEach((th) => th.setAttribute("scope", "row"));
        // Legacy matrices mark row headers as <td class="label">; expose
        // them to AT as row headers without requiring markup changes.
        table.querySelectorAll("tbody td.label").forEach((td) => td.setAttribute("role", "rowheader"));
      });
    },

    /* -------- Figures: belt-and-braces SVG hiding from AT -------- */
    bindFigureA11y(root) {
      // A <figure role="img" aria-label="..."> is announced via its label;
      // explicitly hide the inner SVG as well so no screen reader ever
      // traverses its text nodes, and keep it out of the tab order.
      root.querySelectorAll('figure[role="img"] svg').forEach((svg) => {
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
      });
    },

    bindAccordions(root) {
      root.querySelectorAll(".nyu-accordion").forEach((acc) => {
        const trigger = acc.querySelector(".nyu-accordion__trigger");
        const panel = acc.querySelector(".nyu-accordion__panel");
        if (!trigger || !panel) return;
        const id = panel.id || `nyu-acc-${Math.random().toString(36).slice(2, 9)}`;
        panel.id = id;
        trigger.setAttribute("aria-controls", id);
        const startOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(startOpen));
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-labelledby", trigger.id || `${id}-trigger`);
        if (!trigger.id) trigger.id = `${id}-trigger`;
        panel.dataset.open = String(startOpen);

        trigger.addEventListener("click", () => {
          const isOpen = trigger.getAttribute("aria-expanded") === "true";
          trigger.setAttribute("aria-expanded", String(!isOpen));
          panel.dataset.open = String(!isOpen);
        });
      });
    },

    /* -------- Scenario / Show Answer -------- */
    bindScenarios(root) {
      root.querySelectorAll(".nyu-scenario").forEach((sc) => {
        const btn = sc.querySelector(".nyu-scenario__btn");
        const ans = sc.querySelector(".nyu-scenario__answer");
        if (!btn || !ans) return;
        const id = ans.id || `nyu-ans-${Math.random().toString(36).slice(2, 9)}`;
        ans.id = id;
        btn.setAttribute("aria-controls", id);
        btn.setAttribute("aria-expanded", "false");
        ans.setAttribute("role", "region");
        const showLabel = btn.textContent.trim();
        // Strip whichever reveal verb the button uses, not just "Show".
        // Previously only /^Show\s+/ was removed, so a button reading
        // "Reveal Analysis" collapsed to the nonsense "Hide Reveal Analysis".
        const hideLabel = "Hide " + showLabel.replace(/^(Show|Reveal|Display|View)\s+/i, "");
        btn.addEventListener("click", () => {
          const open = ans.dataset.open === "true";
          ans.dataset.open = String(!open);
          btn.setAttribute("aria-expanded", String(!open));
          btn.textContent = open ? showLabel : hideLabel;
        });
      });
    },

    /* -------- Commit-before-reveal -------- */
    bindCommitChoice(root) {
      root.querySelectorAll(".nyu-commit-choice").forEach((wrap) => {
        const btns = wrap.querySelectorAll(".nyu-commit-choice__opt");
        const reveal = wrap.parentElement.querySelector("[data-requires-choice]");
        if (!reveal) return;
        btns.forEach((btn) => {
          btn.addEventListener("click", () => {
            /* The options the learner did not pick still have to be readable:
               the whole point of commit-before-reveal is comparing your choice
               against the alternatives once the answer appears. Fading them to
               0.45 took the unchosen text to 3.26:1. Mark the choice with an
               outline and a pressed state instead of dimming the rest. */
            btns.forEach((b) => {
              const chosen = b === btn;
              b.style.outline = chosen ? "3px solid var(--nyu-violet, #57068C)" : "none";
              b.style.outlineOffset = "2px";
              b.setAttribute("aria-pressed", chosen ? "true" : "false");
            });
            reveal.style.display = "";
          });
        });
      });
    },

    /* -------- Tabs -------- */
    bindTabs(root) {
      root.querySelectorAll(".nyu-tabs").forEach((wrap) => {
        const tabs = Array.from(wrap.querySelectorAll(".nyu-tabs__tab"));
        const panels = Array.from(wrap.querySelectorAll(".nyu-tabs__panel"));
        if (!tabs.length) return;

        tabs.forEach((tab, i) => {
          tab.setAttribute("role", "tab");
          tab.setAttribute("tabindex", i === 0 ? "0" : "-1");
          tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
          const panel = panels[i];
          if (panel) {
            panel.setAttribute("role", "tabpanel");
            panel.dataset.active = i === 0 ? "true" : "false";
            panel.setAttribute("tabindex", "0");
          }
          tab.addEventListener("click", () => activate(i));
          tab.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              activate((i + 1) % tabs.length, true);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              activate((i - 1 + tabs.length) % tabs.length, true);
            } else if (e.key === "Home") { e.preventDefault(); activate(0, true); }
            else if (e.key === "End")  { e.preventDefault(); activate(tabs.length - 1, true); }
          });
        });

        const tablist = wrap.querySelector(".nyu-tabs__tablist");
        if (tablist) tablist.setAttribute("role", "tablist");

        function activate(idx, focus) {
          tabs.forEach((t, i) => {
            const sel = i === idx;
            t.setAttribute("aria-selected", String(sel));
            t.setAttribute("tabindex", sel ? "0" : "-1");
            if (panels[i]) panels[i].dataset.active = String(sel);
          });
          if (focus) tabs[idx].focus();
        }
      });
    },

    /* -------- Knowledge check quizzes -------- */
    bindQuizzes(root) {
      root.querySelectorAll(".nyu-quiz").forEach((quiz) => {
        // Skip radio/fieldset-based quizzes: they're handled below
        if (quiz.tagName === "FIELDSET") return;
        const opts = quiz.querySelectorAll(".nyu-quiz__option");
        const feedback = quiz.querySelector(".nyu-quiz__feedback");
        let answeredCorrectly = false;

        // role="radio" requires a managed checked state (WCAG 4.1.2)
        opts.forEach((o) => o.setAttribute("aria-checked", "false"));

        function resetQuiz() {
          answeredCorrectly = false;
          opts.forEach((o) => {
            delete o.dataset.state;
            delete o.dataset.explored;
            o.setAttribute("aria-checked", "false");
          });
          if (feedback) {
            feedback.textContent = "";
            delete feedback.dataset.show;
            delete feedback.dataset.correct;
            delete feedback.dataset.exploring;
          }
        }

        opts.forEach((opt) => {
          opt.addEventListener("click", () => {
            const correct = opt.dataset.correct === "true";

            // If this option already has a state, clicking it again resets the quiz
            if (!answeredCorrectly && opt.dataset.state) {
              resetQuiz();
              return;
            }

            // Reflect the selection in the radio state
            if (!answeredCorrectly) {
              opts.forEach((o) => o.setAttribute("aria-checked", "false"));
              opt.setAttribute("aria-checked", "true");
            }

            if (!answeredCorrectly && correct) {
              // Clicked the correct answer
              answeredCorrectly = true;
              opts.forEach((o) => delete o.dataset.state);
              opt.dataset.state = "correct";
              if (feedback) {
                feedback.textContent = feedback.dataset.correctMsg || "Correct: well done.";
                feedback.dataset.show = "true";
                feedback.dataset.correct = "true";
                feedback.setAttribute("role", "status");
              }
            } else if (!answeredCorrectly && !correct) {
              // Clicked a wrong answer: show why it's wrong, clear previous states
              opts.forEach((o) => delete o.dataset.state);
              opt.dataset.state = "incorrect";
              if (feedback) {
                const msg = opt.dataset.explainWrong || feedback.dataset.incorrectMsg || "Review the section above and try again.";
                feedback.textContent = msg;
                feedback.dataset.show = "true";
                feedback.dataset.correct = "false";
                feedback.setAttribute("role", "status");
              }
            } else if (answeredCorrectly && !correct) {
              // After getting it right, student explores a wrong answer
              const isExplored = opt.dataset.explored === "true";
              // Clear explored/incorrect state from all other wrong options
              opts.forEach((o) => {
                if (o !== opt && o.dataset.correct !== "true") {
                  o.dataset.explored = "false";
                  delete o.dataset.state;
                }
              });
              if (!isExplored) {
                // Show this option as explored
                opt.dataset.explored = "true";
                opt.dataset.state = "incorrect";
                if (feedback) {
                  const wrongExplain = opt.dataset.explainWrong || feedback.dataset.incorrectMsg || "This is not the best answer. Review the explanation above.";
                  feedback.textContent = wrongExplain;
                  feedback.dataset.show = "true";
                  feedback.dataset.correct = "false";
                  feedback.dataset.exploring = "true";
                }
              } else {
                // Un-explore: restore correct feedback
                opt.dataset.explored = "false";
                delete opt.dataset.state;
                if (feedback) {
                  feedback.textContent = feedback.dataset.correctMsg || "Correct: well done.";
                  feedback.dataset.correct = "true";
                  feedback.dataset.exploring = "false";
                }
              }
            }
          });
        });
      });

      // Also handle radio-based quizzes: allow clicking other options after answering
      root.querySelectorAll("fieldset.nyu-quiz").forEach((quiz) => {
        const radios = quiz.querySelectorAll('input[type="radio"]');
        let hasAnswered = false;
        radios.forEach((radio) => {
          const label = radio.closest("label.nyu-quiz__option");
          if (!label) return;
          // Make label always clickable even after answering
          label.addEventListener("click", (e) => {
            if (hasAnswered) {
              // Allow re-selection to explore wrong answers
              radios.forEach((r) => { r.checked = false; });
              radio.checked = true;
              // Trigger change-like behavior
              e.stopPropagation();
            }
            hasAnswered = true;
          });
        });
      });
    },

    /* -------- Back-to-top FAB -------- */
    bindBackToTop(root) {
      const fab = root.querySelector(".nyu-fab");
      if (!fab) return;
      const onScroll = () => {
        fab.classList.toggle("is-visible", window.scrollY > 400);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // refocus the top of content for screen-reader users
        const main = document.querySelector(".nyu-course");
        if (main) main.focus({ preventScroll: true });
      });
    },

    /* -------- Reading progress bar -------- */
    bindProgress(root) {
      const bar = root.querySelector(".nyu-progress__bar");
      if (!bar) return;
      const course = root.querySelector(".nyu-course") || document.body;
      const onScroll = () => {
        const total = course.scrollHeight - window.innerHeight;
        const pct = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
        bar.style.width = pct + "%";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    },

    /* -------- TOC scroll-spy -------- */
    bindTOCScrollSpy(root) {
      const links = Array.from(root.querySelectorAll(".nyu-toc__list a[href^='#']"));
      if (!links.length) return;
      const sections = links
        .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
        .filter(Boolean);
      const onScroll = () => {
        const scroll = window.scrollY + 120;
        let activeIdx = 0;
        sections.forEach((s, i) => {
          if (s.offsetTop <= scroll) activeIdx = i;
        });
        links.forEach((a, i) => {
          if (i === activeIdx) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    },

    /* -------- In-page anchor navigation --------
       Every in-page anchor (the "In this section" table of contents, the
       cross-reference links) is handled here rather than by the browser.

       Why: the global CSS sets `html { scroll-behavior: smooth }`. A native
       smooth scroll computes its destination once, at click time, and does not
       revise it. Our pages carry lazy-loaded iframes that report their real
       height via postMessage only after they enter the viewport, so content
       above the target grows *during* the scroll and pushes the target down.
       The browser still stops at the stale destination, landing short. Click
       the same link again and it works, because the iframes are loaded by then
       and nothing moves. That is exactly the report from the first-round
       review, and it appears in every module except Module 13, which is the
       only module with no iframes at all.

       The previous version of this function tried to correct the landing with
       window.scrollBy() while the native animation was still running. That
       cannot work: the animation reasserts its own destination on the next
       frame and overwrites the correction.

       So: preventDefault, run the scroll ourselves, and recompute the
       destination on every frame. Growing content is then tracked instead of
       fought. After arriving we keep re-anchoring briefly, because a lazy
       iframe can report its height a beat after the scroll finishes. Any real
       scroll intent from the reader cancels all of it immediately. */
    bindAnchorSettle() {
      const GLIDE_MS = 420;    // travel time for the scroll we drive ourselves
      const SETTLE_MS = 1800;  // keep re-anchoring this long after the page stops moving
      const SETTLE_MAX_MS = 8000; // absolute ceiling, so we can never pin the page
      const reduce = window.matchMedia
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let nav = null;

      // Where an anchor jump should land, honouring the element's
      // scroll-margin-top so the target does not sit flush against the edge.
      const destOf = (el) => {
        const cs = window.getComputedStyle(el);
        const margin = parseFloat(cs.scrollMarginTop) || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - margin;
        const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        return Math.min(Math.max(0, top), max);
      };

      const cancel = () => { nav = null; };
      ["wheel", "touchstart", "keydown"].forEach((ev) => {
        window.addEventListener(ev, cancel, { passive: true });
      });

      /* Shared entry point. The cross-reference links (bindXrefReturn) used to
         run their own smooth scrollIntoView, which carried the identical bug
         and also fought this handler. They now call this instead, so exactly
         one piece of code drives in-page scrolling. */
      const goto = (el) => {
        window.dispatchEvent(new Event("nyu:anchor-nav"));
        const now = Date.now();
        const base = {
          el: el,
          until: now + GLIDE_MS + SETTLE_MS,
          deadline: now + GLIDE_MS + SETTLE_MAX_MS,
          height: document.documentElement.scrollHeight,
        };
        if (reduce) {
          window.scrollTo({ top: destOf(el), behavior: "auto" });
          nav = Object.assign(base, { phase: "settle", until: now + SETTLE_MS });
        } else {
          nav = Object.assign(base, { phase: "glide", from: window.scrollY, start: now });
        }
      };
      NYUCourse.gotoAnchor = goto;

      document.addEventListener("click", (e) => {
        if (e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = e.target.closest && e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        let id;
        try { id = decodeURIComponent(href.slice(1)); } catch (err) { id = href.slice(1); }
        const el = document.getElementById(id);
        if (!el) return;

        e.preventDefault();

        // Keep the address bar and history behaviour the default jump gives.
        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", href);
        }

        // And keep the focus move, which is what screen reader and keyboard
        // users rely on. preventScroll, because we are driving the scroll.
        if (!el.hasAttribute("tabindex")) {
          el.setAttribute("tabindex", "-1");
          el.addEventListener("blur", function drop() {
            el.removeAttribute("tabindex");
            el.removeEventListener("blur", drop);
          });
        }
        try { el.focus({ preventScroll: true }); } catch (err) { /* older browsers */ }

        goto(el);
      }, true);

      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = () => {
        if (nav) {
          const now = Date.now();
          // Destination is read fresh every frame, so an iframe that grows
          // mid-scroll moves the destination with it rather than stranding us.
          const dest = destOf(nav.el);

          /* Keep watching while the page is still changing size. A fixed
             window is not enough: Module 2's embeds ship with no reserved
             height, so they grow well past two seconds and the target drifts
             again after we have stopped holding it. Every time the document
             height changes we give it another SETTLE_MS, capped by an absolute
             deadline so a page that never stops resizing cannot pin the
             reader in place. */
          const h = document.documentElement.scrollHeight;
          if (h !== nav.height) {
            nav.height = h;
            nav.until = Math.min(now + SETTLE_MS, nav.deadline);
          }

          if (nav.phase === "glide") {
            const t = Math.min(1, (now - nav.start) / GLIDE_MS);
            window.scrollTo({ top: nav.from + (dest - nav.from) * easeOut(t), behavior: "auto" });
            if (t >= 1) nav.phase = "settle";
          } else if (Math.abs(window.scrollY - dest) > 1) {
            // Arrived. Hold the target in place while late heights land.
            window.scrollTo({ top: dest, behavior: "auto" });
          }

          if (now > nav.until || now > nav.deadline) nav = null;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },

    /* -------- Tooltip cards: keyboard focusability -------- */
    bindTooltipsKeyboard(root) {
      root.querySelectorAll(".nyu-tooltip-card").forEach((card) => {
        if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
        const tip = card.querySelector(".nyu-tooltip-card__tip");
        if (tip && !tip.id) {
          tip.id = `nyu-tip-${Math.random().toString(36).slice(2, 9)}`;
          card.setAttribute("aria-describedby", tip.id);
        }
      });
    },

    /* -------- Glossary popovers (clickable inline terms) -------- */
    bindGlossary(root) {
      const all = Array.from(root.querySelectorAll(".nyu-define"));
      let activePop = null; // currently visible popup

      function closePop() {
        if (activePop) {
          activePop.pop.dataset.visible = "false";
          activePop.pop.style.display = "none";
          // Move popup back into its parent button
          activePop.btn.appendChild(activePop.pop);
          activePop.pop.style.position = "";
          activePop.pop.style.top = "";
          activePop.pop.style.bottom = "";
          activePop.pop.style.left = "";
          // Clear the scroll cap so it is re-decided fresh on the next open
          // (viewport size and content differ card to card).
          activePop.pop.style.maxHeight = "";
          activePop.pop.classList.remove("is-scrollable");
          activePop.btn.setAttribute("aria-expanded", "false");
          activePop = null;
        }
      }

      function openPop(btn) {
        const pop = btn.querySelector(".nyu-define__pop");
        if (!pop) return;

        // Teleport popup to document.body so it escapes all overflow:hidden ancestors.
        // Positioned absolutely in DOCUMENT coordinates (not fixed/viewport ones),
        // so it stays anchored to the word when the page scrolls.
        document.body.appendChild(pop);
        pop.style.display = "block";
        pop.style.position = "absolute";
        pop.dataset.visible = "true";
        btn.setAttribute("aria-expanded", "true");
        activePop = { btn, pop };

        const btnRect = btn.getBoundingClientRect();
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        // Measure the rendered popup (includes padding/border, which a
        // hardcoded 300 missed) and use clientWidth, which excludes the
        // scrollbar, so the box never escapes the right edge.
        const viewportW = document.documentElement.clientWidth;
        const popWidth = pop.offsetWidth || 300;

        // Horizontal: center on button, clamp to viewport edges (in document coords)
        let left = btnRect.left + scrollX + btnRect.width / 2 - popWidth / 2;
        left = Math.max(scrollX + 8, Math.min(left, scrollX + viewportW - popWidth - 8));
        pop.style.left = left + "px";
        pop.style.bottom = "auto";

        /* Vertical placement.
           Prefer above the term, fall back to below. If neither side has room
           for the whole card (long definitions, short viewports, or the term
           sitting near the top of a Brightspace iframe), choose the roomier
           side and then CLAMP into the viewport so the card is never cut off.
           The previous version picked a side but never clamped, which is why
           the popup appeared clipped for terms near the top of the screen. */
        const viewportH = document.documentElement.clientHeight;

        /* Decide whether this card needs to scroll at all. Most definitions are
           a couple of lines and must not show a scrollbar gutter, so the cap is
           applied per-card here rather than unconditionally in CSS. */
        pop.classList.remove("is-scrollable");
        pop.style.maxHeight = "";
        const avail = viewportH - 24;
        if (pop.offsetHeight > avail) {
          pop.style.maxHeight = avail + "px";
          pop.classList.add("is-scrollable");
        }

        const popHeight = pop.offsetHeight;
        const spaceAbove = btnRect.top;
        const spaceBelow = viewportH - btnRect.bottom;

        let placeAbove = spaceAbove > popHeight + 16;
        if (!placeAbove && spaceBelow < popHeight + 16) {
          placeAbove = spaceAbove > spaceBelow;
        }

        let top = placeAbove
          ? btnRect.top + scrollY - popHeight - 8
          : btnRect.bottom + scrollY + 8;
        pop.dataset.pos = placeAbove ? "above" : "below";

        const minTop = scrollY + 8;
        const maxTop = scrollY + viewportH - popHeight - 8;
        if (maxTop > minTop) top = Math.max(minTop, Math.min(top, maxTop));
        else top = minTop;
        pop.style.top = top + "px";

        // Arrow: point at button center
        const arrowLeft = btnRect.left + scrollX + btnRect.width / 2 - left;
        pop.style.setProperty("--arrow-left", arrowLeft + "px");
      }

      all.forEach((btn) => {
        if (btn.tagName !== "BUTTON") {
          btn.setAttribute("role", "button");
          btn.setAttribute("tabindex", "0");
        }
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const wasOpen = btn.getAttribute("aria-expanded") === "true";
          closePop();
          if (!wasOpen) openPop(btn);
        });
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
          } else if (e.key === "Escape") {
            closePop();
            btn.focus();
          }
        });
      });
      document.addEventListener("click", (e) => {
        if (activePop && !activePop.btn.contains(e.target) && !activePop.pop.contains(e.target)) {
          closePop();
        }
      });
    },

    /* -------- Annotated code (hover/click lines for explanation) -------- */
    bindAnnotatedCode(root) {
      root.querySelectorAll(".nyu-annot-code").forEach((wrap) => {
        const lines = Array.from(wrap.querySelectorAll(".nyu-annot-code__line"));
        const notes = wrap.querySelector(".nyu-annot-code__notes");
        const defaultMsg = notes ? notes.textContent.trim() : "";
        if (notes) {
          notes.dataset.empty = "true";
          if (!defaultMsg) {
            notes.textContent = "Hover or tap a highlighted line to see what it does.";
          }
        }
        lines.forEach((line) => {
          const note = line.dataset.note;
          const annotated = !!note;
          line.dataset.annotated = String(annotated);
          if (!annotated) return;
          line.setAttribute("tabindex", "0");
          line.setAttribute("role", "button");
          // Name each control by its code content so screen reader users
          // hear which segment they are on, not a generic repeated label.
          const codeEl = line.querySelector(".nyu-annot-code__code");
          const codeText = codeEl ? codeEl.textContent.trim() : "";
          line.setAttribute("aria-label", codeText ? "Explain: " + codeText : "Explain this line");
          const show = () => {
            lines.forEach((l) => (l.dataset.active = "false"));
            line.dataset.active = "true";
            if (notes) {
              notes.innerHTML = note;
              notes.dataset.empty = "false";
            }
          };
          const reset = () => {
            line.dataset.active = "false";
            if (notes && notes.dataset.sticky !== "true") {
              notes.textContent = defaultMsg || "Hover or tap a highlighted line to see what it does.";
              notes.dataset.empty = "true";
            }
          };
          line.addEventListener("mouseenter", show);
          line.addEventListener("mouseleave", reset);
          line.addEventListener("focus", show);
          line.addEventListener("blur", reset);
          line.addEventListener("click", () => {
            // Click pins the note in place
            if (notes) {
              const wasSticky = notes.dataset.sticky === "true" && line.dataset.active === "true";
              if (wasSticky) {
                notes.dataset.sticky = "false";
                reset();
              } else {
                show();
                notes.dataset.sticky = "true";
              }
            }
          });
        });
      });
    },

    /* -------- Drag-to-order sequence exercise -------- */
    bindSequence(root) {
      root.querySelectorAll(".nyu-sequence").forEach((wrap) => {
        const list = wrap.querySelector(".nyu-sequence__list");
        const check = wrap.querySelector("[data-action='check']");
        const reset = wrap.querySelector("[data-action='reset']");
        if (!list) return;

        const items = () => Array.from(list.querySelectorAll(".nyu-sequence__item"));
        const renumber = () => items().forEach((it, i) => {
          const pos = it.querySelector(".nyu-sequence__pos");
          if (pos) pos.textContent = String(i + 1);
        });
        renumber();

        // Drag and drop
        let dragged = null;
        items().forEach((item) => item.setAttribute("draggable", "true"));
        list.addEventListener("dragstart", (e) => {
          const t = e.target.closest(".nyu-sequence__item");
          if (!t) return;
          dragged = t;
          t.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
        });
        list.addEventListener("dragend", () => {
          if (dragged) dragged.classList.remove("is-dragging");
          dragged = null;
          items().forEach((i) => { i.classList.remove("is-over"); i.dataset.state = ""; });
          renumber();
        });
        list.addEventListener("dragover", (e) => {
          e.preventDefault();
          const over = e.target.closest(".nyu-sequence__item");
          if (!over || !dragged || over === dragged) return;
          items().forEach((i) => i.classList.toggle("is-over", i === over));
          const rect = over.getBoundingClientRect();
          const after = (e.clientY - rect.top) / rect.height > 0.5;
          over.parentNode.insertBefore(dragged, after ? over.nextSibling : over);
        });

        // Keyboard nudge buttons
        list.addEventListener("click", (e) => {
          const up = e.target.closest("[data-nudge='up']");
          const down = e.target.closest("[data-nudge='down']");
          if (!up && !down) return;
          const item = e.target.closest(".nyu-sequence__item");
          if (!item) return;
          if (up && item.previousElementSibling) item.parentNode.insertBefore(item, item.previousElementSibling);
          if (down && item.nextElementSibling) item.parentNode.insertBefore(item.nextElementSibling, item);
          items().forEach((it) => { it.dataset.state = ""; });
          renumber();
        });

        // Original order (for reset)
        const original = items().slice();

        const reveal = wrap.querySelector("[data-action='reveal']");

        if (check) check.addEventListener("click", () => {
          items().forEach((it, i) => {
            const want = parseInt(it.dataset.correct, 10);
            it.dataset.state = want === i + 1 ? "correct" : "incorrect";
          });
        });
        if (reveal) reveal.addEventListener("click", () => {
          items().slice()
            .sort((a, b) => parseInt(a.dataset.correct, 10) - parseInt(b.dataset.correct, 10))
            .forEach((it) => { list.appendChild(it); it.dataset.state = "correct"; });
          renumber();
        });
        if (reset) reset.addEventListener("click", () => {
          /* Shuffle into a fresh order so a second attempt is not the same
             puzzle. This used to splice `original` while iterating, which
             emptied the array on the first reset: the button worked once and
             then silently did nothing on every press after. Shuffle a copy and
             leave `original` intact. */
          const pool = original.slice();
          for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            list.appendChild(pool[j]);
            pool.splice(j, 1);
          }
          if (pool.length) list.appendChild(pool[0]);
          items().forEach((c) => { c.dataset.state = ""; });
          renumber();
        });
      });
    },

    /* -------- Flashcards -------- */
    bindFlashcards(root) {
      root.querySelectorAll(".nyu-flashcard").forEach((card) => {
        card.setAttribute("aria-pressed", "false");
        // Keyboard-inclusive hint wording (cards also flip with Enter/Space)
        const hint = card.querySelector(".nyu-flashcard__hint");
        if (hint) hint.textContent = "Click or press Enter to flip ↻";
        card.addEventListener("click", () => {
          const open = card.getAttribute("aria-pressed") === "true";
          card.setAttribute("aria-pressed", String(!open));
        });
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.click();
          }
        });
      });
    },

    /* -------- Process timeline -------- */
    /* Supports two naming conventions:
       Interactive (click-to-expand): __step / __dot / __body / __detail
       Static (always visible):       __item / __marker / __content
       Both live inside .nyu-timeline. The interactive variant uses
       data-active to toggle __detail visibility. The static variant
       has no hidden content and needs no JS, but this function
       gracefully handles both so either can appear on any page.    */
    bindTimeline(root) {
      root.querySelectorAll(".nyu-timeline").forEach((tl) => {
        /* Interactive variant: __step / __body */
        const steps = Array.from(tl.querySelectorAll(".nyu-timeline__step"));
        steps.forEach((s) => {
          const body = s.querySelector(".nyu-timeline__body");
          if (!body) return;
          body.setAttribute("role", "button");
          body.setAttribute("tabindex", "0");
          const toggle = () => {
            const open = s.dataset.active === "true";
            steps.forEach((x) => (x.dataset.active = "false"));
            s.dataset.active = String(!open);
          };
          body.addEventListener("click", toggle);
          body.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
          });
        });
        /* Static variant: __item / __content: no JS needed,
           but mark the list for accessibility. */
        if (!steps.length) {
          tl.setAttribute("role", "list");
          tl.querySelectorAll(".nyu-timeline__item").forEach((item) => {
            item.setAttribute("role", "listitem");
          });
        }
      });
    },

    /* -------- Drag-to-categorize sort bins -------- */
    bindSort(root) {
      root.querySelectorAll(".nyu-sort").forEach((wrap) => {
        const pool = wrap.querySelector(".nyu-sort__pool");
        const bins = Array.from(wrap.querySelectorAll(".nyu-sort__bin"));
        const chips = Array.from(wrap.querySelectorAll(".nyu-sort__chip"));
        const check = wrap.querySelector("[data-action='check']");
        const reveal = wrap.querySelector("[data-action='reveal']");
        const reset = wrap.querySelector("[data-action='reset']");
        const score = wrap.querySelector(".nyu-sort__score");
        if (!pool || !bins.length) return;

        // Backward compatibility with legacy sort markup.
        // Newer modules put the explanation in a data-hint attribute on the
        // chip. Older ones (M02, M08, M09) instead ship a static
        // <span class="nyu-sort__chip-hint"> inside the chip, which used to be
        // revealed on hover by CSS alone. The check handler below clears and
        // rebuilds hints from data-hint, so without this step those static
        // hints would be deleted on the first check and never come back.
        // Lift their text into data-hint once, at bind time, before anything
        // removes them; both markup styles then drive the same info button.
        chips.forEach((chip) => {
          if (chip.dataset.hint) return;
          const legacy = chip.querySelector(".nyu-sort__chip-hint");
          const text = legacy && legacy.textContent.trim();
          if (text) chip.dataset.hint = text;
        });

        /* Shuffle the pool. Authored chip order tends to mirror bin order,
           which hands the learner the answer for free: in M09 Section 2.1 the
           first five chips matched the five bins exactly. Sorting is a
           classification task, so pool order carries no meaning and is safe to
           randomise. Set data-shuffle="false" on the .nyu-sort to opt out. */
        const shuffle = () => {
          if (wrap.dataset.shuffle === "false") return;
          const loose = Array.from(pool.children);
          for (let i = loose.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            pool.appendChild(loose[j]);
            loose.splice(j, 1);
          }
        };
        shuffle();

        // Close open sort hints when clicking outside
        document.addEventListener("click", (e) => {
          if (!e.target.closest(".nyu-sort__info-btn") && !e.target.closest(".nyu-sort__chip-hint")) {
            wrap.querySelectorAll(".nyu-sort__chip-hint.is-open").forEach((h) => h.classList.remove("is-open"));
          }
        });

        let dragged = null;
        const allLists = [pool, ...bins.map((b) => b.querySelector(".nyu-sort__bin-list") || b)];

        chips.forEach((chip) => {
          chip.setAttribute("draggable", "true");
          chip.setAttribute("tabindex", "0");
          chip.setAttribute("role", "button");
          chip.addEventListener("dragstart", () => {
            dragged = chip;
            chip.classList.add("is-dragging");
          });
          chip.addEventListener("dragend", () => {
            chip.classList.remove("is-dragging");
            bins.forEach((b) => b.classList.remove("is-over"));
            pool.classList.remove("is-over");
            dragged = null;
          });
          // Keyboard cycling: Enter/Space cycles a chip through bins -> pool
          chip.addEventListener("keydown", (e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            const containers = [pool, ...bins.map((b) => b.querySelector(".nyu-sort__bin-list") || b)];
            const cur = containers.indexOf(chip.parentElement);
            const next = containers[(cur + 1) % containers.length];
            next.appendChild(chip);
          });
        });

        allLists.forEach((target) => {
          target.addEventListener("dragover", (e) => {
            if (!dragged) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            const bin = target.closest(".nyu-sort__bin");
            if (bin) bin.classList.add("is-over");
          });
          target.addEventListener("dragleave", () => {
            const bin = target.closest(".nyu-sort__bin");
            if (bin) bin.classList.remove("is-over");
          });
          target.addEventListener("drop", (e) => {
            e.preventDefault();
            if (!dragged) return;
            target.appendChild(dragged);
            const bin = target.closest(".nyu-sort__bin");
            if (bin) bin.classList.remove("is-over");
          });
        });

        /* Attach the "?" explanation control to a chip. Shared by Check and
           Show answers so the two behave identically. The explanation opens on
           demand rather than all at once: the tooltip is absolutely positioned
           and at least 260px wide, so six of them open together inside 220px
           bins would sit on top of each other. */
        const clearHints = () => {
          wrap.querySelectorAll(".nyu-sort__info-btn").forEach((b) => b.remove());
          wrap.querySelectorAll(".nyu-sort__chip-hint").forEach((h) => h.remove());
        };
        const attachHint = (chip) => {
          const hintText = chip.dataset.hint;
          if (!hintText) return;

          const hint = document.createElement("div");
          hint.className = "nyu-sort__chip-hint";
          hint.textContent = hintText;
          chip.style.position = "relative";
          chip.appendChild(hint);

          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "nyu-sort__info-btn";
          btn.setAttribute("aria-label", "Show explanation");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "?";
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrap.querySelectorAll(".nyu-sort__chip-hint.is-open").forEach((h) => {
              if (h !== hint) {
                h.classList.remove("is-open");
                const other = h.parentElement && h.parentElement.querySelector(".nyu-sort__info-btn");
                if (other) other.setAttribute("aria-expanded", "false");
              }
            });
            const open = hint.classList.toggle("is-open");
            btn.setAttribute("aria-expanded", String(open));
          });
          chip.appendChild(btn);
        };

        if (check) check.addEventListener("click", () => {
          clearHints();

          let correct = 0;
          chips.forEach((chip) => {
            const bin = chip.closest(".nyu-sort__bin");
            if (!bin) { chip.dataset.state = ""; return; }
            const isRight = bin.dataset.bin === chip.dataset.bin;
            chip.dataset.state = isRight ? "correct" : "incorrect";
            if (isRight) correct++;
          });

          // Explanation offered on the ones they got wrong.
          chips.forEach((chip) => {
            if (chip.dataset.state === "incorrect") attachHint(chip);
          });

          if (score) score.textContent = `${correct} of ${chips.length} correct`;
        });
        /* Show answers. This handler was missing entirely: the markup ships a
           [data-action='reveal'] button but only check and reset were ever
           bound, so the button did nothing when clicked. It moves every chip
           into its correct bin and surfaces the explanations. */
        if (reveal) reveal.addEventListener("click", () => {
          clearHints();

          chips.forEach((chip) => {
            const target = bins.find((b) => b.dataset.bin === chip.dataset.bin);
            if (target) {
              (target.querySelector(".nyu-sort__bin-list") || target).appendChild(chip);
              chip.dataset.state = "correct";
            }
            // Every chip gets a "?" so the reasoning is available, not just
            // the placement.
            attachHint(chip);
          });

          if (score) {
            score.textContent =
              "Answers shown. Select ? on any item to see why it belongs there.";
          }
        });

        if (reset) reset.addEventListener("click", () => {
          clearHints();
          chips.forEach((chip) => {
            chip.dataset.state = "";
            pool.appendChild(chip);
          });
          // Re-shuffle, so a second attempt is not the same arrangement.
          shuffle();
          if (score) score.textContent = "";
        });
      });
    },

    /* -------- Branching scenario / decision tree -------- */
    bindBranch(root) {
      root.querySelectorAll(".nyu-branch").forEach((wrap) => {
        const steps = Array.from(wrap.querySelectorAll(".nyu-branch__step"));
        const path = wrap.querySelector(".nyu-branch__path");
        const restart = wrap.querySelector(".nyu-branch__restart");
        if (!steps.length) return;

        const show = (id, label) => {
          steps.forEach((s) => (s.dataset.active = String(s.dataset.id === id)));
          if (path && label) {
            const crumb = document.createElement("span");
            crumb.className = "nyu-branch__crumb";
            crumb.textContent = label;
            path.appendChild(crumb);
          }
          const live = wrap.querySelector("[aria-live]");
          if (live) live.focus({ preventScroll: true });
        };

        // Activate first step
        steps.forEach((s, i) => { s.dataset.active = String(i === 0); });

        wrap.querySelectorAll(".nyu-branch__choice").forEach((btn) => {
          btn.addEventListener("click", () => {
            const next = btn.dataset.next;
            const label = btn.dataset.label || btn.textContent.trim();
            if (next) show(next, label);
          });
        });

        if (restart) restart.addEventListener("click", () => {
          if (path) path.innerHTML = "";
          steps.forEach((s, i) => { s.dataset.active = String(i === 0); });
        });
      });
    },

    /* -------- Reflection prompt (persistent journal) -------- */
    bindReflect(root) {
      root.querySelectorAll(".nyu-reflect").forEach((wrap) => {
        const ta  = wrap.querySelector(".nyu-reflect__textarea");
        const status = wrap.querySelector(".nyu-reflect__status");
        const counter = wrap.querySelector(".nyu-reflect__count");
        if (!ta) return;
        const key = "nyu-reflect-" + (wrap.dataset.key || ta.id || Math.random().toString(36).slice(2));
        try {
          const stored = localStorage.getItem(key);
          if (stored) ta.value = stored;
        } catch (_) {}
        const update = () => {
          if (counter) counter.textContent = `${ta.value.length} characters`;
        };
        update();
        let timer;
        ta.addEventListener("input", () => {
          update();
          if (status) {
            status.dataset.saved = "false";
            status.textContent = "Saving…";
          }
          clearTimeout(timer);
          timer = setTimeout(() => {
            try { localStorage.setItem(key, ta.value); } catch (_) {}
            if (status) {
              status.dataset.saved = "true";
              status.textContent = "Saved to this browser";
            }
          }, 500);
        });
      });
    },

    /* -------- Numbered list (inject visible number badges) -------- */
    bindNumbered(root) {
      root.querySelectorAll(".nyu-numbered").forEach((wrap) => {
        Array.from(wrap.children).forEach((item, i) => {
          if (item.querySelector(":scope > .nyu-numbered__num")) return;
          const badge = document.createElement("span");
          badge.className = "nyu-numbered__num";
          badge.setAttribute("aria-hidden", "true");
          badge.textContent = String(i + 1);
          item.insertBefore(badge, item.firstChild);
        });
      });
    },

    /* -------- Video poster click-to-load (privacy + perf) -------- */
    bindVideoPosters(root) {
      root.querySelectorAll(".nyu-video__poster").forEach((poster) => {
        poster.addEventListener("click", () => {
          const src = poster.dataset.embed;
          if (!src) return;
          const frame = poster.parentElement;
          const iframe = document.createElement("iframe");
          iframe.src = src;
          iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("title", poster.getAttribute("aria-label") || "Embedded video");
          frame.appendChild(iframe);
          poster.remove();
        });
      });
    },

    /* -------- Responsive pym.js embeds -------- */
    bindPymEmbeds(root) {
      const embeds = Array.from(root.querySelectorAll(".nyu-pym-embed[data-pym-src]"));
      if (!embeds.length) return;

      const initEmbeds = () => {
        if (!window.pym || !window.pym.Parent) return;
        embeds.forEach((embed) => this.initPymEmbed(embed));
      };

      if (window.pym && window.pym.Parent) {
        initEmbeds();
        return;
      }

      this.loadPymScript().then(initEmbeds).catch(() => {
        // Leave the fallback iframe in place if pym.js is blocked by the LMS or network.
        embeds.forEach((embed) => embed.classList.add("is-pym-fallback"));
      });
    },

    loadPymScript() {
      if (window.pym && window.pym.Parent) return Promise.resolve();
      if (this._pymScriptPromise) return this._pymScriptPromise;

      this._pymScriptPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector("script[data-nyu-pym-loader], script[src*='pym.v1']");
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("pym.js failed to load")), { once: true });
          if (window.pym && window.pym.Parent) resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://pym.nprapps.org/pym.v1.min.js";
        script.async = true;
        script.dataset.nyuPymLoader = "true";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("pym.js failed to load"));
        document.head.appendChild(script);
      });

      return this._pymScriptPromise;
    },

    initPymEmbed(embed) {
      if (embed.dataset.pymInitialized === "true") return;

      const src = embed.dataset.pymSrc;
      if (!src || !window.pym || !window.pym.Parent) return;

      if (!embed.id) {
        embed.id = `nyu-pym-${Math.random().toString(36).slice(2, 9)}`;
      }

      // Remove the static fallback iframe only after pym.js is available.
      embed.innerHTML = "";
      embed.classList.add("is-pym-ready");
      embed.dataset.pymInitialized = "true";

      const options = {
        title: embed.dataset.pymTitle || embed.getAttribute("aria-label") || "Embedded interactive",
        parenturlparam: embed.dataset.pymParentUrlParam || "",
        parenturlvalue: embed.dataset.pymParentUrlValue || ""
      };

      try {
        embed._pymParent = new window.pym.Parent(embed.id, src, options);
      } catch (err) {
        embed.dataset.pymInitialized = "false";
        embed.classList.remove("is-pym-ready");
        const fallbackSrc = embed.dataset.pymFallbackSrc || src;
        const iframe = document.createElement("iframe");
        iframe.className = "nyu-embed__frame";
        iframe.src = fallbackSrc;
        iframe.title = options.title;
        iframe.loading = "lazy";
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        embed.appendChild(iframe);
      }
    },


    /* -------- ML/DL process flow: fit non-wrapping rows in both side-by-side and stacked compare layouts -------- */
    bindMlDlFlows(root) {
      const flows = Array.from(root.querySelectorAll(".ml-dl-flow"));
      if (!flows.length) return;

      const run = () => this.scaleMlDlFlows(document);
      const queue = () => window.requestAnimationFrame(run);

      if (!this._mlDlFlowResizeBound) {
        window.addEventListener("resize", queue, { passive: true });
        window.addEventListener("orientationchange", queue, { passive: true });
        window.addEventListener("load", queue, { once: true });
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(queue).catch(() => {});
        }
        this._mlDlFlowResizeBound = true;
      }

      if ("ResizeObserver" in window) {
        if (!this._mlDlFlowResizeObserver) {
          this._mlDlFlowResizeObserver = new ResizeObserver(queue);
        }
        flows.forEach((flow) => {
          if (flow.dataset.mlDlFlowObserved === "true") return;
          this._mlDlFlowResizeObserver.observe(flow);
          flow.dataset.mlDlFlowObserved = "true";
        });
      }

      queue();
    },

    scaleMlDlFlows(root = document) {
      root.querySelectorAll(".ml-dl-flow").forEach((flow) => {
        const track = flow.querySelector(".ml-dl-flow__track");
        if (!track) return;

        // Reset before measuring so the previous viewport's scale never pollutes the next one.
        flow.style.setProperty("--ml-dl-flow-scale", "1");

        const available = flow.clientWidth;
        if (!available) return;

        const styles = window.getComputedStyle(flow);
        const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
        const innerWidth = Math.max(0, available - paddingX);
        if (!innerWidth) return;

        // The track is absolutely positioned and max-content width, so this is its true
        // unwrapped width; transforms do not affect scrollWidth.
        const needed = track.scrollWidth;
        const trackHeight = track.offsetHeight;
        const scale = needed > innerWidth ? innerWidth / needed : 1;
        const outerHeight = Math.ceil((trackHeight * scale) + paddingY);

        flow.style.setProperty("--ml-dl-flow-scale", scale.toFixed(4));
        flow.style.setProperty("--ml-dl-flow-height", `${outerHeight}px`);
      });
    },

    /* -------- Interactive demo: fullscreen toggle -------- */
    bindDemoFullscreen(root) {
      root.querySelectorAll(".nyu-demo").forEach((demo) => {
        const btn = demo.querySelector("[data-action='fullscreen']");
        if (!btn) return;
        btn.addEventListener("click", () => {
          const open = demo.classList.toggle("nyu-demo--fullscreen");
          btn.textContent = open ? "Exit fullscreen" : "Fullscreen";
          document.body.style.overflow = open ? "hidden" : "";
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && demo.classList.contains("nyu-demo--fullscreen")) {
            demo.classList.remove("nyu-demo--fullscreen");
            btn.textContent = "Fullscreen";
            document.body.style.overflow = "";
          }
        });
      });
    },

    /* -------- Hotspot diagram (clickable pins on an image/SVG) -------- */
    bindHotspots(root) {
      root.querySelectorAll(".nyu-hotspots").forEach((wrap) => {
        const stage = wrap.querySelector(".nyu-hotspots__stage");
        const pins  = Array.from(wrap.querySelectorAll(".nyu-hotspots__pin"));
        const panel = wrap.querySelector(".nyu-hotspots__panel");
        const fill  = wrap.querySelector(".nyu-hotspots__progress-fill");
        const counter = wrap.querySelector(".nyu-hotspots__progress-count");
        if (!stage || !pins.length || !panel) return;

        const defaultTitle = panel.dataset.defaultTitle || "Explore the diagram";
        const defaultBody  = panel.dataset.defaultBody  || "Click a numbered pin to learn what each part does.";
        const visited = new Set();

        const renderPanel = (title, body) => {
          panel.dataset.empty = "false";
          panel.innerHTML = `
            <h4 class="nyu-hotspots__panel-title">${title}</h4>
            <div>${body}</div>
          `;
        };
        const reset = () => {
          panel.dataset.empty = "true";
          panel.innerHTML = `
            <h4 class="nyu-hotspots__panel-title">${defaultTitle}</h4>
            <div>${defaultBody}</div>
          `;
        };
        reset();

        const updateProgress = () => {
          const pct = (visited.size / pins.length) * 100;
          if (fill) fill.style.width = pct + "%";
          if (counter) counter.textContent = `${visited.size} / ${pins.length} explored`;
        };
        updateProgress();

        pins.forEach((pin, i) => {
          pin.setAttribute("aria-pressed", "false");
          pin.setAttribute("type", "button");
          pin.addEventListener("click", () => {
            pins.forEach((p) => p.setAttribute("aria-pressed", "false"));
            pin.setAttribute("aria-pressed", "true");
            visited.add(pin);
            pin.dataset.visited = "true";
            const title = pin.dataset.title || `Hotspot ${i + 1}`;
            const body  = pin.dataset.body  || pin.getAttribute("aria-label") || "";
            renderPanel(title, body);
            updateProgress();
          });
        });
      });
    },
    bindMatch(root) {
      root.querySelectorAll(".nyu-match").forEach((wrap) => {
        const grid  = wrap.querySelector(".nyu-match__grid");
        const svg   = wrap.querySelector(".nyu-match__svg");
        const terms = Array.from(wrap.querySelectorAll(".nyu-match__term"));
        const defs  = Array.from(wrap.querySelectorAll(".nyu-match__def"));
        const check = wrap.querySelector("[data-action='check']");
        const reset = wrap.querySelector("[data-action='reset']");
        const reveal = wrap.querySelector("[data-action='reveal']");
        if (!grid || !svg) return;

        const matches = new Map(); // term -> def
        let selectedTerm = null;
        let revealed = false;
        let hintLinesDrawn = 0;

        const SVGNS = "http://www.w3.org/2000/svg";

        const setPressed = () => {
          terms.forEach((t) => t.setAttribute("aria-pressed", String(t === selectedTerm)));
          defs.forEach((d) => {
            // a def is "pressed" only as a transient highlight, never persistent
            d.setAttribute("aria-pressed", "false");
          });
          terms.forEach((t) => t.classList.toggle("is-matched", matches.has(t) && !revealed));
          defs.forEach((d) => d.classList.toggle("is-matched", [...matches.values()].includes(d) && !revealed));
        };

        const drawLines = () => {
          // Clear
          while (svg.firstChild) svg.removeChild(svg.firstChild);
          const gridRect = grid.getBoundingClientRect();
          svg.setAttribute("viewBox", `0 0 ${gridRect.width} ${gridRect.height}`);
          svg.setAttribute("preserveAspectRatio", "none");

          const drawOne = (term, def, state) => {
            const tRect = term.getBoundingClientRect();
            const dRect = def.getBoundingClientRect();
            const x1 = tRect.right - gridRect.left;
            const y1 = tRect.top + tRect.height / 2 - gridRect.top;
            const x2 = dRect.left - gridRect.left;
            const y2 = dRect.top + dRect.height / 2 - gridRect.top;
            const cx = (x1 + x2) / 2;
            const path = document.createElementNS(SVGNS, "path");
            path.setAttribute("d", `M ${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`);
            path.setAttribute("class", "nyu-match__line");
            if (state) path.setAttribute("data-state", state);
            svg.appendChild(path);
          };

          matches.forEach((def, term) => {
            const state = term.dataset.state;
            const lineState = state === "correct" ? "correct"
                            : state === "incorrect" ? "incorrect"
                            : null;
            drawOne(term, def, lineState);
          });

          // When revealed, draw hint lines for any term that is unmatched OR mismatched
          hintLinesDrawn = 0;
          if (revealed) {
            terms.forEach((term) => {
              const correctDef = defs.find((d) => d.dataset.match === term.dataset.match);
              if (!correctDef) return;
              const userDef = matches.get(term);
              if (userDef !== correctDef) {
                drawOne(term, correctDef, "hint");
                hintLinesDrawn += 1;
              }
            });
          }
        };

        const linkPair = (term, def) => {
          // remove any prior link involving either node
          if (matches.has(term)) matches.delete(term);
          for (const [t, d] of [...matches.entries()]) {
            if (d === def) matches.delete(t);
          }
          matches.set(term, def);
          setPressed();
          drawLines();
        };

        // --- Click selection mode ---
        terms.forEach((t) => {
          t.setAttribute("role", "button");
          t.setAttribute("tabindex", "0");
          t.setAttribute("aria-pressed", "false");
          t.addEventListener("click", () => {
            selectedTerm = (selectedTerm === t) ? null : t;
            setPressed();
          });
          t.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t.click(); }
          });
        });
        defs.forEach((d) => {
          d.setAttribute("role", "button");
          d.setAttribute("tabindex", "0");
          d.setAttribute("aria-pressed", "false");
          d.addEventListener("click", () => {
            if (!selectedTerm) return;
            linkPair(selectedTerm, d);
            selectedTerm = null;
            setPressed();
          });
          d.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); d.click(); }
          });
        });

        // --- Drag-and-drop alternative ---
        let dragSource = null;
        terms.concat(defs).forEach((el) => {
          el.setAttribute("draggable", "true");
          el.addEventListener("dragstart", (e) => {
            dragSource = el;
            el.classList.add("is-dragging");
            try { e.dataTransfer.setData("text/plain", "match"); } catch (_) {}
            e.dataTransfer.effectAllowed = "move";
          });
          el.addEventListener("dragend", () => {
            el.classList.remove("is-dragging");
            terms.concat(defs).forEach((x) => x.classList.remove("is-drag-over"));
            dragSource = null;
          });
          el.addEventListener("dragenter", (e) => {
            if (!dragSource || dragSource === el) return;
            // only allow term->def or def->term drops
            const srcIsTerm = dragSource.classList.contains("nyu-match__term");
            const tgtIsTerm = el.classList.contains("nyu-match__term");
            if (srcIsTerm === tgtIsTerm) return;
            e.preventDefault();
            el.classList.add("is-drag-over");
          });
          el.addEventListener("dragover", (e) => {
            if (!dragSource) return;
            const srcIsTerm = dragSource.classList.contains("nyu-match__term");
            const tgtIsTerm = el.classList.contains("nyu-match__term");
            if (srcIsTerm === tgtIsTerm) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          });
          el.addEventListener("dragleave", () => el.classList.remove("is-drag-over"));
          el.addEventListener("drop", (e) => {
            e.preventDefault();
            el.classList.remove("is-drag-over");
            if (!dragSource) return;
            const srcIsTerm = dragSource.classList.contains("nyu-match__term");
            const tgtIsTerm = el.classList.contains("nyu-match__term");
            if (srcIsTerm === tgtIsTerm) return;
            const term = srcIsTerm ? dragSource : el;
            const def  = srcIsTerm ? el : dragSource;
            linkPair(term, def);
          });
        });

        // --- Check ---
        if (check) check.addEventListener("click", () => {
          terms.forEach((t) => {
            const linked = matches.get(t);
            if (!linked) { t.dataset.state = "incorrect"; return; }
            const correct = t.dataset.match === linked.dataset.match;
            t.dataset.state = correct ? "correct" : "incorrect";
            linked.dataset.state = correct ? "correct" : "incorrect";
          });
          drawLines();
        });

        // --- Reveal correct answers ---
        if (reveal) reveal.addEventListener("click", () => {
          revealed = true;
          // Clear any "is-matched" / pressed state visuals
          terms.concat(defs).forEach((el) => { el.classList.remove("is-matched"); });
          drawLines();
          const hint = wrap.querySelector(".nyu-match__hint");
          // Only promise dotted lines when some were actually drawn. If every
          // term is already matched correctly there is nothing left to reveal,
          // and claiming otherwise reads as a broken activity.
          if (hint) {
            hint.textContent = hintLinesDrawn > 0
              ? "Dotted blue lines show the correct matches."
              : "All matches are already correct; nothing left to reveal.";
          }
        });

        // --- Reset ---
        if (reset) reset.addEventListener("click", () => {
          matches.clear();
          selectedTerm = null;
          revealed = false;
          terms.concat(defs).forEach((el) => {
            el.dataset.state = "";
            el.classList.remove("is-matched");
            el.setAttribute("aria-pressed", "false");
          });
          drawLines();
          const hint = wrap.querySelector(".nyu-match__hint");
          if (hint) hint.textContent = hint.dataset.default || "";
        });

        // Re-render arrows on resize / scroll
        const ro = ("ResizeObserver" in window) ? new ResizeObserver(drawLines) : null;
        if (ro) ro.observe(grid);
        window.addEventListener("resize", drawLines);
        // Initial paint (in case any prior state)
        requestAnimationFrame(drawLines);
      });
    },
  };

  // ── Auto-resize embedded iframes (.nyu-embed-frame iframe) ──
  // Preserves the parent page's scroll position so that iframe load
  // events (content rendering, focus grabs, scrollIntoView inside the
  // iframe) never scroll the student away from where they are reading.
  NYUCourse.embedResize = function () {
    var iframes = document.querySelectorAll('.nyu-embed-frame iframe');
    if (!iframes.length) return;

    /* Prevent iframe focus from scrolling the parent.
       When an iframe's content grabs focus (e.g. via tabindex, autofocus,
       or scrollIntoView inside the iframe), browsers scroll the parent
       to make the iframe visible. We block that on first load. */
    var scrollLocked = true;
    var savedY = window.scrollY;
    var USER_INPUT = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

    function lockScroll() { if (scrollLocked) window.scrollTo(0, savedY); }

    /* Release the lock. The lock exists to stop an iframe stealing scroll on
       load; it must never fight the reader. Previously it snapped the window
       back for a fixed 2.5s regardless of who scrolled, so a student who
       started reading immediately saw the page shudder and refuse to move.
       Any genuine user input now releases it at once. */
    function releaseScroll() {
      if (!scrollLocked) return;
      scrollLocked = false;
      window.removeEventListener('scroll', lockScroll);
      USER_INPUT.forEach(function (ev) {
        window.removeEventListener(ev, releaseScroll, true);
      });
    }

    window.addEventListener('scroll', lockScroll, { passive: false });
    USER_INPUT.forEach(function (ev) {
      window.addEventListener(ev, releaseScroll, true);
    });
    // Fallback: release once the page has settled even if the reader has not
    // touched anything yet.
    setTimeout(releaseScroll, 2500);

    /* An anchor navigation is a deliberate move to somewhere else on the page,
       so the load lock must stand down. Without this the two would fight: the
       anchor code scrolls to the target, the lock's scroll handler snaps back
       to savedY. bindAnchorSettle fires this before it starts moving. */
    window.addEventListener('nyu:anchor-nav', releaseScroll);

    /* Measure the child's CONTENT, never its viewport.
       documentElement.scrollHeight equals max(content, viewport), and the
       viewport is the frame height we just set, so it can only ever confirm
       the current size: once a frame is too short it stays too short, and the
       child scrolls instead of the frame growing. Summing the bottom edge of
       the body's children measures what is actually there and cannot feed
       back into the next measurement. */
    function contentHeightOf(frame) {
      var doc = frame.contentDocument;
      if (!doc || !doc.body) return 0;
      var kids = doc.body.children, max = 0;
      for (var k = 0; k < kids.length; k++) {
        var r = kids[k].getBoundingClientRect();
        if (r.height) max = Math.max(max, r.bottom + (doc.defaultView.scrollY || 0));
      }
      if (!max) return 0;
      var pb = parseFloat(doc.defaultView.getComputedStyle(doc.body).paddingBottom) || 0;
      return Math.ceil(max + pb + 16);
    }

    function fitFrame(frame) {
      try {
        var h = contentHeightOf(frame);
        if (h && h > 50 && Math.abs(h - frame.clientHeight) > 2) {
          var sy = window.scrollY;
          frame.style.height = h + 'px';
          window.scrollTo(0, sy);
        }
      } catch (e) { /* cross-origin - rely on postMessage instead */ }
    }

    /* Watch the child from here rather than trusting it to report.
       Most interactives post their height from a ResizeObserver that watches
       only their canvas, so text growing below the canvas never re-posts, and
       the observers do not run reliably inside a lazily loaded frame. A
       ResizeObserver owned by this document runs in this document's rendering
       loop, which is what makes the behaviour consistent across browsers.
       Safari exposed the gap: it settles webfonts after first layout, so the
       child's single early measurement came out short. */
    function watchFrame(frame) {
      try {
        var doc = frame.contentDocument;
        if (!doc || !doc.body || frame.__nyuWatched) return;
        frame.__nyuWatched = true;
        var refit = function () { fitFrame(frame); };
        if (window.ResizeObserver) {
          var ro = new ResizeObserver(refit);
          ro.observe(doc.body);
          for (var k = 0; k < doc.body.children.length; k++) ro.observe(doc.body.children[k]);
        }
        if (window.MutationObserver) {
          new MutationObserver(function () { setTimeout(refit, 60); })
            .observe(doc.body, { childList: true, subtree: true, characterData: true });
        }
        if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(refit);
        doc.addEventListener('click', function () { setTimeout(refit, 450); }, true);
      } catch (e) { /* cross-origin */ }
    }

    for (var i = 0; i < iframes.length; i++) {
      (function (frame) {
        frame.addEventListener('load', function () {
          watchFrame(frame);
          fitFrame(frame);
          [200, 600, 1500, 3000].forEach(function (t) {
            setTimeout(function () { watchFrame(frame); fitFrame(frame); }, t);
          });
        });
        if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
          watchFrame(frame); fitFrame(frame);
        }
      })(iframes[i]);
    }

    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.kind !== 'nyu-embed-height') return;
      var h = Number(d.height);
      if (!Number.isFinite(h) || h < 50 || h > 2400) return;
      var sy = window.scrollY;
      for (var j = 0; j < iframes.length; j++) {
        if (iframes[j].contentWindow === e.source) {
          /* A few pixels of slack. The child measures its own content, not the
             frame, so this cannot feed back into the next measurement. Without
             it the frame is sized to exactly the content height, and any later
             reflow (a web font swapping in and pushing text onto one more line)
             drops the last line outside the frame with no way to reach it. */
          iframes[j].style.height = (Math.ceil(h) + 12) + 'px';
          break;
        }
      }
      window.scrollTo(0, sy);
    });
  };

  // ── Prompt-model modal (Section 01 interactive) ──
  NYUCourse.promptModal = function () {
    var overlay = document.getElementById('promptOverlay');
    if (!overlay) return;
    var iframe = document.getElementById('promptIframe');

    window.openPromptModal = function () {
      iframe.src = 'interactive/prompt_model/prompt_model.html';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    window.closePromptModal = function () {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      iframe.src = './';
    };
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePromptModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePromptModal();
    });
  };

  // ── True / False Rapid-Fire Strip ──
  // Reads explanations from data-explain attributes on each .nyu-tf-strip__row.
  // Supports multiple strips per page (querySelectorAll).
  NYUCourse.tfStrip = function () {
    var strips = document.querySelectorAll('.nyu-tf-strip');
    if (!strips.length) return;

    strips.forEach(function (strip) {
      var rows = Array.from(strip.querySelectorAll('.nyu-tf-strip__row'));
      var scoreEl = strip.querySelector('.nyu-tf-strip__score');

      // Toggle selection
      rows.forEach(function (row) {
        var opts = Array.from(row.querySelectorAll('.nyu-tf-strip__opt'));
        opts.forEach(function (opt) {
          opt.addEventListener('click', function () {
            if (row.hasAttribute('data-state')) return;
            opts.forEach(function (o) {
              o.setAttribute('aria-pressed', String(o === opt));
            });
          });
        });
      });

      // Check answers
      var checkBtn = strip.querySelector('[data-action="check"]');
      if (checkBtn) checkBtn.addEventListener('click', function () {
        var correct = 0;
        rows.forEach(function (row) {
          var selected = row.querySelector('[aria-pressed="true"]');
          var fb = row.querySelector('.nyu-tf-strip__fb');
          if (!selected) {
            fb.textContent = 'Pick True or False.';
            fb.classList.add('show');
            return;
          }
          var isCorrect = selected.dataset.val === row.dataset.correct;
          row.setAttribute('data-state', isCorrect ? 'correct' : 'incorrect');
          selected.setAttribute('data-state', isCorrect ? 'correct' : 'incorrect');
          fb.textContent = row.dataset.explain || '';
          fb.classList.add('show');
          if (isCorrect) correct++;
        });
        if (scoreEl) {
          scoreEl.textContent = correct + ' of ' + rows.length + ' correct';
          scoreEl.style.color = (correct === rows.length)
            ? 'var(--accent-success)' : 'var(--accent-danger)';
        }
      });

      // Reset
      var resetBtn = strip.querySelector('[data-action="reset"]');
      if (resetBtn) resetBtn.addEventListener('click', function () {
        rows.forEach(function (row) {
          row.removeAttribute('data-state');
          var opts = row.querySelectorAll('.nyu-tf-strip__opt');
          opts.forEach(function (o) {
            o.setAttribute('aria-pressed', 'false');
            o.removeAttribute('data-state');
          });
          var fb = row.querySelector('.nyu-tf-strip__fb');
          fb.textContent = '';
          fb.classList.remove('show');
        });
        if (scoreEl) scoreEl.textContent = '';
      });
    });
  };

  // Expose
  window.NYUCourse = NYUCourse;

  // ── Position-taking system (stance cards + recall) ──
  // Interactive cards let students commit to Agree / Unsure / Disagree, and
  // .nyu-pos-recall blocks later answer the student's specific choice.
  //
  // Two ways to supply the copy:
  //   1. Per-page, from the markup (preferred for new modules). Put
  //      data-fb-agree / data-fb-unsure / data-fb-disagree on the card, and
  //      data-recall-agree / -unsure / -disagree on the recall block.
  //   2. From the built-in maps below (legacy; keeps existing modules working).
  //
  // Persistence: if any card carries data-pos-scope, choices are stored under
  // that scope so a commitment made on one page can be recalled on another.
  // Without a scope the store stays in memory, which is the original behavior.
  NYUCourse.positionSystem = function () {
    var cards = Array.from(document.querySelectorAll('.nyu-position-card'));
    var recallEls = Array.from(document.querySelectorAll('.nyu-pos-recall'));
    if (!cards.length && !recallEls.length) return;

    var scopeEl = document.querySelector('[data-pos-scope]');
    var scope = scopeEl ? scopeEl.getAttribute('data-pos-scope') : null;
    var storeKey = scope ? 'nyu-positions-' + scope : null;

    // Store: posId (string) → value ('agree'|'unsure'|'disagree')
    var positions = {};
    if (storeKey) {
      try {
        var saved = localStorage.getItem(storeKey);
        if (saved) positions = JSON.parse(saved) || {};
      } catch (_) { positions = {}; }
    }
    function persist() {
      if (!storeKey) return;
      try { localStorage.setItem(storeKey, JSON.stringify(positions)); } catch (_) {}
    }

    // Feedback messages shown inside the card after selecting
    var cardFeedback = {
      '1': {
        agree:    'You\'ll see this position challenged in the next section.',
        unsure:   'Section 2 will sharpen that: what exactly does governance add that controls don\'t?',
        disagree: 'Section 2 will push on why you\'re skeptical. There\'s a specific gap technical controls can\'t fill.',
      },
      '2': {
        agree:    'The Govern section will stress-test this. Human review is necessary but not sufficient.',
        unsure:   'Section 3 makes the gap concrete: accountability requires more than a reviewer.',
        disagree: 'Section 3 confirms your skepticism and names what "handled" actually requires.'
      },
      '3': {
        agree:    'Failure (b) in Section 6 addresses this directly. Aggregated metrics can hide systematic problems.',
        unsure:   'Section 6 gives you the specific gap between aggregate accuracy and group-level fairness.',
        disagree: 'Section 6\'s failure (b) names exactly what aggregate metrics miss. You\'re ahead of it.'
      }
    };

    // Recall messages shown later in the section (recall blocks)
    var recallMsg = {
      '1': {
        agree:    '<span class="nyu-pos-recall__label">Your position (Statement A): Agree</span> You sided with controls over governance. The argument above is the one that most directly challenges that. Note what paperwork does that a guardrail cannot.',
        unsure:   '<span class="nyu-pos-recall__label">Your position (Statement A): Unsure</span> The distinction above (technical constraints vs. organizational decisions) is the answer. Governance fills a gap no control can reach.',
        disagree: '<span class="nyu-pos-recall__label">Your position (Statement A): Disagree</span> Your instinct was right. The argument above explains <em>why</em>: residual risk is accepted by people, not tools.'
      },
      '2': {
        agree:    '<span class="nyu-pos-recall__label">Your position (Statement B): Agree</span> Human review is necessary, but the Govern function asks a harder question: who assigned that reviewer, against what criteria, and who is accountable when they miss something? Review is evidence, not accountability.',
        unsure:   '<span class="nyu-pos-recall__label">Your position (Statement B): Unsure</span> The RMF makes the gap concrete. Govern asks not just "is there a human?" but "is there a named authority, a written criterion, and an accountable owner?" Review without those is informal, not governed.',
        disagree: '<span class="nyu-pos-recall__label">Your position (Statement B): Disagree</span> The Govern function names what\'s still missing even with human reviewers: named authority, written criteria, and continuous oversight. You were tracking the right gap.'
      },
      '3': {
        agree:    '<span class="nyu-pos-recall__label">Your position (Statement C): Agree</span> Failure (b) above is the direct challenge: a pipeline that performs well overall can still classify systematically differently across business units. Aggregate precision and recall don\'t reveal that. Disaggregated metrics do.',
        unsure:   '<span class="nyu-pos-recall__label">Your position (Statement C): Unsure</span> Failure (b) names the gap. Aggregate accuracy is a Measure gap: the missing evidence is a recurring disaggregated evaluation report, reviewed by a named owner. Overall numbers hide subgroup behavior.',
        disagree: '<span class="nyu-pos-recall__label">Your position (Statement C): Disagree</span> You had it. Failure (b) confirms: precision and recall across the whole population can look excellent while one group\'s incidents are systematically deprioritized. Fairness requires disaggregated measurement.'
      }
    };

    // Markup-supplied copy wins; the legacy maps above are the fallback.
    function cardText(card, id, val) {
      var attr = card.getAttribute('data-fb-' + val);
      if (attr) return attr;
      return (cardFeedback[id] && cardFeedback[id][val]) || '';
    }
    function recallText(block, id, val) {
      var attr = block.getAttribute('data-recall-' + val);
      if (attr) return attr;
      return (recallMsg[id] && recallMsg[id][val]) || '';
    }

    function updateStatus() {
      var expected = cards.length || 3;
      var done = Object.keys(positions).length >= expected;
      var allSet = document.getElementById('pos-all-set');
      var incomplete = document.getElementById('pos-incomplete');
      if (allSet) allSet.style.display = done ? '' : 'none';
      if (incomplete) incomplete.style.display = done ? 'none' : '';

      // Update all recall blocks with current positions
      Array.from(document.querySelectorAll('.nyu-pos-recall')).forEach(function (block) {
        var id = block.dataset.posId;
        var val = positions[id];
        if (!val) {
          // No commitment recorded: show the fallback prompt if one is supplied,
          // so a student arriving cold is told where to go rather than seeing a blank.
          block.innerHTML = block.getAttribute('data-recall-none') || '';
          block.removeAttribute('data-chosen');
          return;
        }
        block.setAttribute('data-chosen', val);
        // Colour by whether the position survived the evidence, not by whether
        // the student clicked Agree. On a statement that turns out to be false,
        // "Disagree" is the well-reasoned answer and must not be flagged red.
        // Supply data-tone-agree / -unsure / -disagree as "held", "challenged"
        // or "partial"; without them the legacy agree/disagree colours apply.
        var tone = block.getAttribute('data-tone-' + val);
        if (tone) block.setAttribute('data-tone', tone);
        else block.removeAttribute('data-tone');
        block.innerHTML = recallText(block, id, val);
      });
    }

    cards.forEach(function (card) {
      var posId = card.dataset.posId;
      var btns = Array.from(card.querySelectorAll('.nyu-pos-btn'));
      var promptEl = card.querySelector('.nyu-position-card__prompt');

      // Restore a previously saved commitment so returning students see it.
      var savedVal = positions[posId];
      if (savedVal) {
        card.dataset.chosen = savedVal;
        btns.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.val === savedVal));
        });
        if (promptEl) promptEl.textContent = cardText(card, posId, savedVal);
      }

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var val = btn.dataset.val;
          // Toggle off if already selected
          if (positions[posId] === val) {
            delete positions[posId];
            card.removeAttribute('data-chosen');
            btns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
            if (promptEl) promptEl.textContent = '';
            persist();
            updateStatus();
            return;
          }
          positions[posId] = val;
          card.dataset.chosen = val;
          btns.forEach(function (b) {
            b.setAttribute('aria-pressed', String(b === btn));
          });
          if (promptEl) promptEl.textContent = cardText(card, posId, val);
          persist();
          updateStatus();
        });
      });
    });

    updateStatus();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      NYUCourse.init();
      NYUCourse.embedResize();
      NYUCourse.promptModal();
      NYUCourse.tfStrip();
      NYUCourse.positionSystem();
    });
  } else {
    NYUCourse.init();
    NYUCourse.embedResize();
    NYUCourse.promptModal();
    NYUCourse.tfStrip();
    NYUCourse.positionSystem();
  }
})();
