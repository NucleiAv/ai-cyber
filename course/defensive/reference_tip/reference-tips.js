/* ============================================================
   NYU TANDON - REFERENCE TIPS (Cross-Module Back-References)
   Global, Modules 1-13
   ------------------------------------------------------------
   Hover/focus tooltips that tell students where a concept was
   originally covered. Visually distinct from glossary popovers
   (warm neutral vs. violet, hover vs. click).

   Markup in section HTML:
     <span class="nyu-ref" data-ref="slug">visible text</span>

   This script injects the popup content on load and manages
   show/hide on hover and keyboard focus.

   Loaded via <script src="../reference_tip/reference-tips.js"></script>
   AFTER the course CSS, BEFORE nyu-tandon-course.js.
   ============================================================ */

window.NYU_REFERENCES = {

  "triage-pipeline": {
    entries: [
      {
        module: "M03",
        detail: "<strong>Section 1</strong> builds the SOC triage prompt from scratch (role, task, output contract). <strong>Section 4</strong> evolves it into structured JSON mapped to STIX. <strong>Section 5</strong> (TinyLlama Lab) runs it against a local model."
      },
      {
        module: "M04",
        detail: "<strong>Section 2</strong> designs the full four-step pipeline (parse, classify severity, enrich, hand off), traces one alert through it, and runs the DNS-beaconing failure scenario against it. <strong>Section 5</strong> places it in the queue as one layer among three and names the pattern 'LLM-Assisted Triage.'"
      }
    ]
  },

  /* ---------- Model mechanics ---------- */

  "rlhf": {
    entries: [
      {
        module: "M01",
        detail: "<strong>Section 1, part 4</strong> walks the reinforcement learning loop step by step (observe, act, reward, update the policy, repeat), then follows it into RLHF: human preference comparisons train a reward model, and that reward model scores the language model's own output. It also names <em>reward hacking</em>, what happens when a proxy is optimized past the point where it still agrees with the outcome someone wanted."
      }
    ]
  },

  "fabrication-mechanism": {
    entries: [
      {
        module: "M02",
        detail: "<strong>Section 6</strong> ('Why Models Fabricate and Why Outputs Vary') separates the two failure modes: fabrication, where the model generates from parametric memory with no lookup step, and output variability, where sampling makes the same prompt answer differently. It also names the property that makes both hard to catch: confidence is uniform whether the model is recalling or inventing."
      }
    ]
  },
  "lifecycle-risk-map": {
    entries: [
      {
        module: "M02",
        detail: "<strong>Section 4</strong> turns the behavior stack into a decision procedure: given a risk, identify which lifecycle stage produced it, then match that stage to the category of control that can actually reach it. Decompose first, route second."
      }
    ]
  },
  "token-cost": {
    entries: [
      {
        module: "M02",
        detail: "<strong>Section 1</strong> shows why security data pays a token tax that prose does not: hashes, encoded payloads and log lines fragment into far more tokens than their length suggests, and a split string is no longer one recognisable object. <strong>Section 2</strong> turns that into a capacity budget for the context window."
      }
    ]
  },

  /* ---------- Evaluation and measurement ---------- */

  "confusion-matrix": {
    entries: [
      {
        module: "M01",
        detail: "<strong>Section 5</strong> builds the confusion matrix cell by cell, derives precision and recall from it, and works the email-gateway example where a single accuracy figure hides the false negatives."
      },
      {
        module: "M04",
        detail: "<strong>Section 2</strong> applies the same matrix to LLM triage output and converts the error rates into analyst hours, which is the extrapolation your own lab reproduced."
      }
    ]
  },
  "aggregate-metrics": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 2</strong> ('The Aggregate That Lied') disaggregates a healthy-looking overall metric by subgroup and shows the performance gap the average concealed. Same confusion matrix, sliced differently."
      }
    ]
  },
  "vendor-claims": {
    entries: [
      {
        module: "M01",
        detail: "<strong>Section 6</strong> ('Evaluating AI Security Claims') sets the five questions: what the product operationally does, what data performance was measured on, error rates in both directions, evaluation conditions, and who verified it."
      }
    ]
  },
  "source-grading": {
    entries: [
      {
        module: "M05",
        detail: "<strong>Section 5</strong> gives the five-step verification methodology and the grading, currency, and confidence scheme you applied to six claims."
      },
      {
        module: "M08",
        detail: "<strong>Section 4</strong> ('Capability vs. Attribution') separates what a dramatic report establishes from what only its author could have measured, using the GTG-1002 espionage disclosure as the worked case."
      }
    ]
  },
  "autonomy-evidence": {
    entries: [
      {
        module: "M08",
        detail: "<strong>Section 4</strong> assembles the independent evidence on how autonomous offensive AI actually is, and reads the GTG-1002 disclosure as an analyst rather than as a reader."
      }
    ]
  },

  /* ---------- Attack surface ---------- */

  "software-supply-chain": {
    entries: [
      {
        module: "M06",
        detail: "<strong>Section 4</strong> maps the software supply chain as a chain of trust boundaries, then works the attack vectors that cross them: dependency confusion, typosquatting and its AI-assisted cousin slopsquatting, maintainer compromise, and build system compromise. It closes on the defensive frameworks, SBOM and SLSA among them, and is explicit that it is a survey of a field rather than a treatment of it."
      }
    ]
  },


  "artifact-signing": {
    entries: [
      {
        module: "M06",
        detail: "<strong>Section 4</strong> covers the frameworks that answer 'is this artifact what it claims to be': OpenSSF Scorecard for judging a project before adopting it, Sigstore's keyless signing through Fulcio and Rekor for tying a release to a verifiable publisher identity, and SBOM and SLSA for recording what went into a build. Applied to a model file or a dataset rather than a package, the question is the same one."
      }
    ]
  },

  "instruction-data-boundary": {
    entries: [
      {
        module: "M09",
        detail: "<strong>Section 1</strong> establishes why every token is both data and instruction, and why chat templates are formatting rather than a security boundary. <strong>Section 4</strong> covers indirect injection, where the hostile text arrives inside retrieved content."
      }
    ]
  },
  "jailbreak": {
    entries: [
      {
        module: "M09",
        detail: "<strong>Section 3</strong> covers jailbreaking: roleplay framing, assumed authority, and the other routes past a model's safety training. Distinct from injection, which arrives through data the model was asked to process."
      }
    ]
  },
  "excessive-agency": {
    entries: [
      {
        module: "M10",
        detail: "<strong>Section 4</strong> ('A Failure With No Attacker' and 'Constraining Agency') introduces excessive agency as harm a system can cause with nobody attacking it, and gives the constraint vocabulary for narrowing it."
      },
      {
        module: "M09",
        detail: "<strong>Section 5</strong> places excessive agency inside full attack chains, where an injected instruction becomes a consequential action."
      }
    ]
  },
  "mitre-atlas": {
    entries: [
      {
        module: "M08",
        detail: "<strong>Section 4</strong> classifies observed offensive-AI behavior against ATLAS techniques, the same exercise you now repeat for agent-specific entries."
      },
      {
        module: "M10",
        detail: "<strong>Section 4</strong> positions ATLAS alongside the adversarial-ML taxonomy as one of three lenses on the same attack set."
      }
    ]
  },
  "dual-use": {
    entries: [
      {
        module: "M01",
        detail: "<strong>Section 6</strong> introduces the dual-use structure of every AI security capability."
      },
      {
        module: "M08",
        detail: "<strong>Section 1</strong> works the attacker economics behind it and names the inversion: the same capability gain does not benefit both sides equally."
      },
      {
        module: "M12",
        detail: "<strong>Section 2</strong> ('Governing the Use, Not the Tool') turns dual-use into a governance problem with an actual decision attached."
      }
    ]
  },

  /* ---------- Defense and constraint ---------- */

  "human-in-the-loop": {
    entries: [
      {
        module: "M01",
        detail: "<strong>Section 1, part 4</strong> separates the two arrangements the phrase names. The <em>training-time</em> sense is RLHF: many raters, aggregated in advance, compressed into weights that cannot be queried about any specific decision. The <em>runtime</em> sense is a named person approving a specific action before it takes effect. Only the second can be audited after the fact, which is why it is the one that appears in control documents."
      },
      {
        module: "M04",
        detail: "<strong>Section 7</strong> works a triage failure stage by stage and assigns each one an owner: the detector produced the score, the model drafted the rationale, the gate was meant to check it, and a named analyst owned the verdict. Accountability attaches to the person who signs, not to the tool that drafted."
      }
    ]
  },
  "constraint-vocabulary": {
    entries: [
      {
        module: "M11",
        detail: "<strong>Section 1</strong> establishes least privilege, scoped functionality, and layered validation for AI pipelines. <strong>Section 4</strong> turns the assessment methodology on a live system in the MedAssist lab."
      }
    ]
  },
  "deployment-patterns": {
    entries: [
      {
        module: "M02",
        detail: "<strong>Section 5</strong> treats where the model runs as a security architecture decision rather than a procurement one: what leaves your boundary with a hosted API, what local deployment does and does not solve, and why data residency alone is not security."
      },
      {
        module: "M11",
        detail: "<strong>Section 2</strong> maps the attack-surface envelope of each deployment pattern, including the four retrieval-specific surfaces that RAG opens. <strong>Section 3</strong> covers log signatures and detection layers for abuse monitoring."
      }
    ]
  },

  /* ---------- Governance ---------- */

  "policy-anatomy": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 3</strong> ('A Control or a Wish') gives the four parts every enforceable statement needs: named actor, bounded object, triggering condition, observable evidence. You drilled it building a security team's AI policy."
      }
    ]
  },
  "residual-risk": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 1</strong> ('The Decision Nobody Assigned') introduces residual-risk acceptance as the move that converts a diffuse organizational worry into one accountable signature. <strong>Section 4</strong> attaches it to the gap assessment."
      }
    ]
  },
  "automation-bias": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 2</strong> ('The Loop Is Not the Fix') presents the evidence on reviewers approving machine recommendations at rubber-stamp rates, and what a review has to be designed for to count as a control."
      },
      {
        module: "M05",
        detail: "<strong>Section 5</strong> draws the analyst's boundary: the point past which verification cannot be delegated to the system being verified."
      }
    ]
  },
  "gap-assessment": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 1</strong> treats the AI Risk Management Framework as an instrument rather than a reading, then <strong>Section 4</strong> runs the full assessment against NorthShore Mutual, which is the artifact that evidences your governance skill."
      }
    ]
  },
  "regulatory-method": {
    entries: [
      {
        module: "M12",
        detail: "<strong>Section 4</strong> gives the method that outlives any particular date: locate the deployment, classify it, map the obligations that follow, and stamp the answer with the date you checked. 'Classify Without Memorizing' is the exercise."
      }
    ]
  },

  /* ---------- Offensive AI ---------- */

  "big-sleep": {
    entries: [
      {
        module: "M08",
        detail: "<strong>Section 3</strong> introduces Big Sleep and the vulnerability-discovery pipeline it represents. <strong>Section 4</strong> places it in the broader evidence base on autonomous offensive capability, alongside the other demonstrated cases."
      }
    ]
  },

  /* ---------- Craft ---------- */

  "prompt-library": {
    entries: [
      {
        module: "M03",
        detail: "<strong>Section 1</strong> structures prompts around role, task, and output contract; <strong>Section 3</strong> adds iteration and critical evaluation; <strong>Section 4</strong> produces the machine-usable output your prompt library documents."
      }
    ]
  },
  "hallucination-lab": {
    entries: [
      {
        module: "M02",
        detail: "<strong>Section 5</strong> ('Why Models Fabricate') explains the generation mechanism behind confident invention."
      },
      {
        module: "M05",
        detail: "<strong>Section 6</strong> is the lab where you elicited fabricated CVEs and citations yourself, then verified them against ground truth."
      }
    ]
  }

};


/* -- Injector & interaction --
   Finds every <span class="nyu-ref" data-ref="slug">
   and appends the tooltip element. Manages hover/focus show/hide
   with teleport-to-body positioning (same pattern as glossary).
   ============================================================ */
(function initReferenceTips() {
  function run() {
    var refs = document.querySelectorAll(".nyu-ref[data-ref]");
    if (!refs.length) return;

    var activePop = null;
    var hideTimer = null;

    function closePop() {
      if (activePop) {
        activePop.pop.dataset.visible = "false";
        activePop.pop.style.display = "none";
        activePop.el.appendChild(activePop.pop);
        activePop.pop.style.position = "";
        activePop.pop.style.top = "";
        activePop.pop.style.bottom = "";
        activePop.pop.style.left = "";
        activePop = null;
      }
    }

    function openPop(el) {
      var pop = el.querySelector(".nyu-ref__pop");
      if (!pop) return;

      document.body.appendChild(pop);
      pop.style.display = "block";
      pop.style.position = "absolute";
      pop.style.pointerEvents = "auto";
      pop.dataset.visible = "true";
      activePop = { el: el, pop: pop };

      var elRect = el.getBoundingClientRect();
      var scrollX = window.scrollX || document.documentElement.scrollLeft;
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      var viewportW = document.documentElement.clientWidth;
      var popWidth = pop.offsetWidth || 340;

      // Horizontal: center on element, clamp to viewport
      var left = elRect.left + scrollX + elRect.width / 2 - popWidth / 2;
      left = Math.max(scrollX + 8, Math.min(left, scrollX + viewportW - popWidth - 8));
      pop.style.left = left + "px";
      pop.style.bottom = "auto";

      // Vertical: prefer above, fall back to below
      var popHeight = pop.offsetHeight;
      if (elRect.top > popHeight + 16) {
        pop.style.top = (elRect.top + scrollY - popHeight - 8) + "px";
        pop.dataset.pos = "above";
      } else {
        pop.style.top = (elRect.bottom + scrollY + 8) + "px";
        pop.dataset.pos = "below";
      }

      // Arrow
      var arrowLeft = elRect.left + scrollX + elRect.width / 2 - left;
      pop.style.setProperty("--arrow-left", arrowLeft + "px");
    }

    function scheduleClose() {
      hideTimer = setTimeout(function() { closePop(); }, 180);
    }

    function cancelClose() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    }

    refs.forEach(function(el) {
      var slug = el.getAttribute("data-ref");
      var entry = window.NYU_REFERENCES[slug];
      if (!entry) return;

      // Build popup HTML
      var pop = document.createElement("span");
      pop.className = "nyu-ref__pop";
      pop.setAttribute("role", "tooltip");

      var html = '<span class="nyu-ref__header">'
        + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
        + 'Covered in earlier modules'
        + '</span>';
      html += '<ul class="nyu-ref__entries">';
      entry.entries.forEach(function(e) {
        html += '<li class="nyu-ref__entry">'
          + '<span class="nyu-ref__module">' + e.module + '</span>'
          + '<span class="nyu-ref__detail">' + e.detail + '</span>'
          + '</li>';
      });
      html += '</ul>';
      pop.innerHTML = html;
      el.appendChild(pop);

      // Accessibility
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "term");
      if (!pop.id) {
        pop.id = "nyu-ref-" + Math.random().toString(36).slice(2, 9);
      }
      el.setAttribute("aria-describedby", pop.id);

      // Hover interaction (with grace period so popup stays while cursor moves to it)
      el.addEventListener("mouseenter", function() {
        cancelClose();
        if (activePop && activePop.el !== el) closePop();
        openPop(el);
      });
      el.addEventListener("mouseleave", function() {
        scheduleClose();
      });

      // Keyboard
      el.addEventListener("focus", function() {
        cancelClose();
        if (activePop && activePop.el !== el) closePop();
        openPop(el);
      });
      el.addEventListener("blur", function() {
        scheduleClose();
      });
      el.addEventListener("keydown", function(e) {
        if (e.key === "Escape") { closePop(); el.blur(); }
      });
    });

    // Allow hovering over the popup itself without it closing
    document.addEventListener("mouseover", function(e) {
      if (activePop && activePop.pop.contains(e.target)) {
        cancelClose();
      }
    });
    document.addEventListener("mouseout", function(e) {
      if (activePop && activePop.pop.contains(e.target) && !activePop.pop.contains(e.relatedTarget)) {
        scheduleClose();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
