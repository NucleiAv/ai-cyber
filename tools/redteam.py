"""The red teaming course map page, redteam.html.
It maps the NYU Tandon course "Red Teaming and Securing Generative AI" (CS-GY 9223, Spring 2027 draft syllabus)
to the lessons on this site. Called from build.py. Contact details and policies from the syllabus are left out on purpose."""

COURSE = {
    "title": "Red teaming and securing generative AI",
    "code": "NYU Tandon · CS-GY 9223 · Spring 2027",
    "who": "Professor Rachel Greenstadt",
    "about": ("The course treats generative AI and autonomous agents as the target software stack, not as a security tool. "
              "It covers prompt injection, context manipulation, agent hijacking and defensive architecture. "
              "Each class has a lecture, a current events segment and a hands-on exercise. The schedule below is the draft from the syllabus and may change."),
}

OBJECTIVES = [
    ("Threat-model generative AI systems", "Find trust boundaries, untrusted inputs and exfiltration paths in LLM apps and agents.",
     [("frameworks/f04.html", "STRIDE"), ("prompting/p06.html", "Lethal trifecta"), ("attack/l01.html", "Lesson 1")]),
    ("Analyze and run attacks", "Jailbreaks, direct and indirect prompt injection, agent hijacking, privacy attacks and poisoning, in controlled settings.",
     [("prompting/p05.html", "Adversarial prompting"), ("attack/l02.html", "Lesson 2"), ("attack/l04.html", "Lesson 4"), ("attack/l07.html", "Lesson 7")]),
    ("Design and build defenses", "Instruction hierarchies, information-flow control and least privilege, justified for a system and its threat model.",
     [("prompting/p03.html", "Instruction hierarchy"), ("prompting/p06.html", "Design patterns"), ("attack/l10.html", "Lesson 10")]),
    ("Evaluate security claims", "Adaptive attacks, sound baselines and statistical measurement, and critique of published evaluations.",
     [("prompting/p05.html#attack", "Measure, do not anecdote"), ("prompting/p06.html#defend", "Judge a defense claim")]),
    ("Analyze real incidents", "Apply course frameworks to new incidents, including AI that behaves adversarially, and recommend fixes.",
     [("frameworks/index.html", "Frameworks"), ("frameworks/f05.html", "OWASP"), ("defend/m13.html", "Module 13")]),
    ("Reason about ethics and society", "The ethics of red teaming, model welfare, proportionality, censorship, misinformation and propaganda.",
     [("prompting/p05.html#defend", "Rules of engagement"), ("defend/m12.html", "Module 12"), ("attack/l13.html", "Lesson 13")]),
]

# (date, part, topic, [reading link ids], extra reading text, in-class exercise, [(href, label)])
WEEKS = [
    ("Jan 20", "Foundations", "Generative AI review, intro to security, and the events of 2023", ["ignoreprev", "trifecta"], "", "Trust-boundary mapping of an LLM product",
     [("basics.html", "Start here"), ("prompting/p01.html", "How to prompt"), ("attack/l01.html", "Lesson 1"), ("frameworks/f04.html", "STRIDE")]),
    ("Jan 27", "Foundations", "Ethics of red teaming and intro to jailbreaking", ["jailbroken", "aiwelfare"], "", "Jailbreak taxonomy sort",
     [("prompting/p05.html", "Adversarial prompting"), ("prompting/p05-desk.html", "Jailbreak lab desk")]),
    ("Feb 3", "Foundations", "Automated and optimization-based attacks", ["gcg", "pair"], "", "Thing of the week presentations begin",
     [("prompting/p05.html#how", "GCG and PAIR"), ("defend/m09.html", "Module 9"), ("attack/l03.html", "Lesson 3")]),
    ("Feb 10", "Attacks on systems", "Prompt injection and indirect prompt injection", ["greshake", "embrace"], "Selected posts on data exfiltration.", "",
     [("attack/l02.html", "Lesson 2"), ("prompting/p03.html", "System prompts and roles"), ("defend/m09.html", "Module 9")]),
    ("Feb 17", "Attacks on systems", "Agents and tools as an attack surface", ["agentdojo", "mcppoison", "aiworm"], "The AI worm paper is optional.", "",
     [("attack/l09.html", "Lesson 9"), ("attack/l15.html", "Lesson 15, MCP"), ("prompting/p02.html#how", "ReAct")]),
    ("Feb 24", "Defenses and their discontents", "Model-level defenses and adaptive attacks", ["insthier", "spotlight", "attackersecond"], "", "",
     [("prompting/p03.html", "Instruction hierarchy and spotlighting"), ("prompting/p06.html", "Defensive prompting"), ("attack/l03.html", "Lesson 3")]),
    ("Mar 3", "Defenses and their discontents", "Architectural defenses", ["designpatterns", "camel"], "", "Design-pattern speedrun, pub quiz review",
     [("prompting/p06.html#cases", "Design patterns"), ("prompting/p06-desk.html", "Defense design desk"), ("attack/l10.html", "Lesson 10")]),
    ("Mar 10", "Midterm", "Midterm exam, weeks 1 to 7, paper and pencil, open note", [], "", "",
     [("prompting/index.html", "Prompting desks"), ("attack/index.html", "Attack desks")]),
    ("Mar 24", "Defenses and their discontents", "Red teaming and threat modeling", ["msredteam", "feffer"], "", "Red team engagement tabletop",
     [("frameworks/f04.html", "STRIDE"), ("frameworks/f01.html", "MITRE ATLAS"), ("frameworks/f06.html", "ARTEX")]),
    ("Mar 31", "Privacy, integrity and the frontier", "Privacy and training data extraction", ["carlini", "scalableext", "miallm"], "", "Canary extraction",
     [("attack/l04.html", "Lesson 4"), ("attack/l04-desk.html", "Lesson 4 desk")]),
    ("Apr 7", "Privacy, integrity and the frontier", "Guest lecture, the agent as adversary", ["aicontrol", "atlascs68"], "The syllabus also lists selected sections of a 2026 METR investigation of this incident.", "",
     [("attack/l10.html", "Lesson 10"), ("defend/m13.html", "Module 13")]),
    ("Apr 14", "Privacy, integrity and the frontier", "Poisoning, hallucination and sycophancy", ["nearconst", "sleeper", "sycophancy"], "", "Sycophancy and hallucination measurement",
     [("attack/l07.html", "Lesson 7"), ("attack/l13.html", "Lesson 13"), ("prompting/p04.html", "Prompting for security work")]),
    ("Apr 21", "Privacy, integrity and the frontier", "Sovereign AI, censorship, misinformation, propaganda and debunking", [], "Readings not yet set in the syllabus.", "Seeding the information ecosystem, or a stylometry exercise",
     [("attack/l13.html", "Lesson 13"), ("defend/m08.html", "Module 8"), ("defend/m12.html", "Module 12")]),
    ("Apr 28", "Frontier", "Frontier topics and review", [], "Readings not yet set in the syllabus.", "Incident autopsy, final exam practice",
     [("frameworks/f05.html", "OWASP"), ("frameworks/index.html", "Frameworks")]),
]

LABS = [
    ("Lab 1. Measuring jailbreaks", "Run manual and automated jailbreaks, such as GCG, PAIR and garak, against open-weight models you are allowed to test, and report attack success rates over many trials, not single anecdotes. A measurement-based alternative exists for students who prefer not to do persuasion-style attacks.",
     [("prompting/p05.html#lab", "Adversarial prompting lab"), ("prompting/p05-desk.html", "Jailbreak lab desk")]),
    ("Lab 2. Escalating agent attacks", "An AgentDojo-style ladder where each level adds a defense. Hijack tool-using agents through direct and indirect injection and record how each defense was bypassed.",
     [("attack/l09.html", "Lesson 9"), ("attack/l02-desk.html", "Lesson 2 desk"), ("plan.html", "PromptTrace Gauntlet in the plan")]),
    ("Lab 3. Build and defend an agent", "Teams build a tool-using agent, threat model it, add model-level and architectural defenses, then swap agents and attack each other adaptively.",
     [("prompting/p06.html#lab", "Defensive prompting lab"), ("frameworks/f04.html#lab", "STRIDE lab"), ("prompting/p06-desk.html", "Defense design desk")]),
    ("Lab 4. Poisoning or membership inference", "Either backdoor a small model by fine-tuning and vary the number of poisoned examples, or run a membership inference study and see how distribution shift can make an attack look like it works.",
     [("attack/l07-desk.html", "Lesson 7 desk, plan a study"), ("attack/l04-desk.html", "Lesson 4 desk")]),
]

THING = [
    "Pick one recent incident or development from the last month.",
    "Say in one sentence what happened.",
    "Name the course concept it shows, such as indirect injection, the lethal trifecta or poisoning.",
    "Map it to one framework entry, such as an OWASP risk or an ATLAS technique.",
    "Say what defense would have stopped it, and whether that defense is model-level or architectural.",
    "End with one open question for the class.",
]

AI_USE = [
    "Name the model and the date for any AI help, and say what it did and on which part.",
    "Keep your prompts and the model's replies, and share them on request.",
    "You are responsible for everything an agentic tool does on your behalf, including staying in scope.",
    "Do not paste another team's code, prompts or secrets into a third party AI service without permission.",
    "Models you attack, defend or evaluate are part of your methods, not your AI use disclosure.",
]


def build(LINKS, E, page_root):
    def lnk(lid):
        x = LINKS.get(lid)
        return f'<a href="{x["u"]}" target="_blank" rel="noopener">{E(x["t"])}</a>' if x else ""

    def here(items):
        return " ".join(f'<a class="tag" href="{h}">{E(t)}</a>' for h, t in items)

    obj = "".join(f'<div class="card"><h3>{E(t)}</h3><p>{E(d)}</p><p class="small" style="margin-top:12px">{here(l)}</p></div>' for t, d, l in OBJECTIVES)
    rows = ""
    for wk, (date, part, topic, reads, extra, ex, links) in enumerate(WEEKS, 1):
        rd = "".join(f"<li>{lnk(r)}</li>" for r in reads)
        if extra:
            rd += f'<li class="muted">{E(extra)}</li>'
        rows += (f'<tr><td class="mono" style="white-space:nowrap">Week {wk}<div class="small muted">{E(date)}</div></td><td><b>{E(topic)}</b><div class="small muted">{E(part)}</div>'
                 + (f'<div class="small">In class. {E(ex)}</div>' if ex else "")
                 + f'</td><td><ul class="plainlist">{rd}</ul></td><td>{here(links)}</td></tr>')
    labs = "".join(f'<div class="card"><h3>{E(t)}</h3><p>{E(d)}</p><p class="small" style="margin-top:12px">Practice here. {here(l)}</p></div>' for t, d, l in LABS)
    thing = "".join(f"<li>{E(x)}</li>" for x in THING)
    aiuse = "".join(f"<li>{E(x)}</li>" for x in AI_USE)
    body = f'''<main id="main">
  <section class="page-head"><div class="wrap">
    <div class="eyebrow">{E(COURSE["code"])} · {E(COURSE["who"])}</div>
    <h1>{E(COURSE["title"])}, mapped to this site</h1>
    <p class="lede">{E(COURSE["about"])}</p>
    <div class="toc-chips"><a href="#objectives">Objectives</a><a href="#weeks">Week by week</a><a href="#labs">Labs</a><a href="#thing">Thing of the week</a><a href="#exam">Exams</a><a href="#ai-use">AI use rules</a></div>
  </div></section>
  <section class="section" id="objectives"><div class="wrap">
    <h2 class="section-title">The six course objectives</h2>
    <p class="section-sub">Each objective links to the lessons on this site that teach it.</p>
    <div class="grid grid-3">{obj}</div>
  </div></section>
  <section class="section" id="weeks"><div class="wrap">
    <h2 class="section-title">Week by week</h2>
    <p class="section-sub">The draft schedule, its readings, and where to learn each topic here. Every reading link was checked against its source.</p>
    <div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Topic</th><th>Readings</th><th>Learn it here</th></tr></thead><tbody>{rows}</tbody></table></div>
  </div></section>
  <section class="section" id="labs"><div class="wrap">
    <h2 class="section-title">The four labs, and where to practice</h2>
    <p class="section-sub">Labs are about 25% of the grade in total. Run every attack only against models and apps you are allowed to test.</p>
    <div class="grid grid-2">{labs}</div>
  </div></section>
  <section class="section" id="thing"><div class="wrap narrow prose">
    <h2 class="section-title">Thing of the week, a 10 minute template</h2>
    <p>Each student presents one recent incident or development. This outline fits the brief.</p>
    <ol>{thing}</ol>
  </div></section>
  <section class="section" id="exam"><div class="wrap narrow prose">
    <h2 class="section-title">Exams</h2>
    <p>Both exams are paper and pencil, open note but not open device. The midterm covers weeks 1 to 7. The final is an incident analysis. You read an incident write-up you have not seen, explain what happened with the course frameworks, and recommend fixes.</p>
    <p>To practice, take any incident from <a href="frameworks/f05.html">the OWASP page</a> or <a href="attack/index.html">the attack lessons</a>. Map it with <a href="frameworks/f04.html">STRIDE</a>, <a href="frameworks/f01.html">ATLAS</a> and <a href="frameworks/f05.html">OWASP</a>, find the broken trust boundary, then pick a model-level and an architectural fix. The practice desks give instant feedback with a reason for every answer.</p>
  </div></section>
  <section class="section" id="ai-use"><div class="wrap narrow prose">
    <h2 class="section-title">AI use rules worth copying</h2>
    <p>The course asks you to keep studying AI separate from replacing your learning with AI. Its rules for assignments are good practice for any security team.</p>
    <ul>{aiuse}</ul>
    <p class="small muted">Summarized from the course syllabus. AI tools are not allowed in the exams. The syllabus is a draft and may change, so check the official course page for the current version.</p>
  </div></section>
</main>'''
    return body
