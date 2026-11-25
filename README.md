# Prompt to Patch

AI security, both sides, from zero. One place to learn AI, ML and LLM security, from defense to attack, step by step. Built and curated by <a href="https://anmol-vats-portfolio.vercel.app/" target="_blank" rel="noopener">Anmol Vats</a>.

**Website.** https://nucleiav.github.io/ai-cyber/

## What is in here

| Part | What you get | Where |
| --- | --- | --- |
| Start here | 8 short steps from what machine learning is to why LLM apps are hard to secure. Diagrams, quick checks and a prompt injection simulator. | [`basics.html`](basics.html) |
| Prompting | 6 lessons. The parts of a clear prompt, the main ways of prompting from zero-shot to ReAct, system prompts and the instruction hierarchy, prompting for security work, adversarial prompting and jailbreak measurement, and defensive design patterns such as the dual LLM and CaMeL. | [`prompting/`](prompting/) |
| Red teaming course map | The NYU Tandon course Red Teaming and Securing Generative AI (CS-GY 9223, Spring 2027 draft syllabus), week by week, with its readings, labs and exams mapped to lessons on this site. | [`redteam.html`](redteam.html) |
| Attack track | 15 full lessons. The OWASP LLM Top 10 in order, plus MCP and agent security. Each lesson has a plain explanation, diagrams, attack and defense workflows, real cases, an OWASP, Agentic Top 10 and MITRE ATLAS map, a lab walkthrough, discussion questions with model answers, a quiz, a practice desk and references. | [`attack/`](attack/) |
| Defend track | 12 modules of the NYU Tandon AI for Cyber Security course. Each has a from-zero primer with diagrams, every course section shown inside the site, 85 interactive labs, lecture slides inline, a quiz and references. Every module ends with a practice desk. Seven turn the class workbook into interactive questions, with answers from the class answer slides. The rest have desks written for this site. | [`defend/`](defend/) |
| Frameworks | MITRE ATLAS, MITRE ATT&CK, MITRE D3FEND, STRIDE, the OWASP LLM and Agentic Top 10, and ARTEX. Each one explained from zero, with diagrams, an animated walkthrough, a quiz, a practice desk and references. | [`frameworks/`](frameworks/) |
| The plan | The lean plan, updated. Weeks 0 to 15 with tasks and links to every lesson. Progress counts tasks done, and each week can be marked done at its end. Progress saves in your browser. | [`plan.html`](plan.html) |
| The ten risks | The OWASP LLM Top 10 2025 and the Agentic Top 10 2026 in plain words. | [`risks.html`](risks.html) |
| Full roadmap | Phases 0 to 7, from fundamentals to detection, governance and certifications. | [`roadmap.html`](roadmap.html) |
| Library | Every paper, article, lab, tool, course, standard, book and cert, with search and filters. | [`library.html`](library.html) |

## How the lesson pages are made

The lesson pages in `attack/`, `defend/`, `frameworks/` and `prompting/`, and `redteam.html`, are generated. Edit the content, then rebuild.

```
content/attack/l01.yaml ... l15.yaml    attack lessons
content/defend/m01.yaml ... m13.yaml    defend modules, primers and practice desks
content/frameworks/f01.yaml ... f06.yaml  framework lessons
content/prompting/p01.yaml ... p06.yaml   prompting lessons
content/practice/*.yaml                 extra practice rounds added to each desk
content/labs/*.yaml                     pinpointed hands-on tasks for each lesson's lab section
content/desks/*.yaml                    practice desks for lessons and modules without a class workbook
content/scenes/l01.yaml, m01.yaml ...   animated step-by-step scenes for each lesson
tools/build.py                          turns the YAML into HTML pages and SVG diagrams
```

Rebuild with Python 3.12 or later and PyYAML:

```
pip install pyyaml
python tools/check_scenes.py
python tools/check_content.py
python tools/build.py
```

A scene is a list of blocks on a grid (`nodes` with `x` and `y`) and a list of `steps`. Each step can light blocks (`on`), send packets along links (`flow`, colored `ink`, `atk`, `def` or `pen`), add badges (`mark` with `ok`, `bad` or `warn`), hide blocks (`show`) and update the stat cards (`stats`). Quote any tag that contains a comma.

The content uses a small markup. `**bold**`, `` `code` ``, `[text](url)`, `[text](@linkid)` for a link from `assets/js/data.js`, lists with `- ` or `1. `, and boxes that start with `!plain`, `!warn`, `!eli5`, `!key` or `!fact`. Diagrams are described in YAML (`flow`, `cycle`, `layers`, `split`) and drawn as SVG at build time. Questions are `mcq`, `multi` (pick all that fit), `sort` (match with a dropdown), `order` (put steps in order), `fill` (fill in the blank, with a list of accepted answers), `num` or `open`. Options and rows are shown in a new random order on every visit. Every `mcq`, `sort` and `num` question needs a `why` that explains the right answer, and every `open` question needs a model answer. `check_content.py` fails the build if one is missing, and also flags duplicate questions across the site.

## Repository layout

```
index.html, basics.html, plan.html, risks.html, roadmap.html, library.html
attack/                 generated attack lessons
defend/                 generated defend modules, sections, desks and the lab viewer
frameworks/             generated framework lessons and desks
prompting/              generated prompting lessons and desks
content/                lesson sources (YAML)
tools/                  page generator and content checks
assets/css, assets/js   styles, data, page code, scene.js for animated diagrams
course/defensive/       the extracted NYU modules, shown inside the defend pages
files/defensive/        lecture slides, workbooks and the original Brightspace zips
files/offensive/        attack lecture sheets and lab code
```

## Why the course zips look broken when opened directly

Each zip is a Brightspace export. Its pages load shared files (`../css`, `../js`, `../tooltips`) from the root of the zip. If you open a page from inside the zip, Windows extracts only that page, so styles and scripts are missing. On the website, or after you extract the whole zip and serve the folder, every page and lab works.

## Progress trackers

Every hands-on lab task and every practice desk has a done tick. Each track, Prompting, Defend, Attack and Frameworks, has its own tracker in its sidebar and on its overview page, and the home page shows all four. The build writes the list of trackable items to `assets/js/tracks.js`. Ticks stay in your browser.

## Light and dark mode

The sun and moon button in the header switches themes. The choice is saved in your browser. With no choice saved, the site follows your system setting.

## Run it on your machine

No build step is needed to view it. From the repository folder:

```
python -m http.server 8000
```

Open `http://localhost:8000`.

## Host it on GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings**, then **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. The site appears at `https://<user>.github.io/ai-cyber/` after a minute or two.

## Safety

Only test systems that you own or that give you permission. The pickle payload in `files/offensive/lab-code` runs a harmless print command, but the same method runs any command. Run it only in a throwaway virtual machine or container.

## Credits

- Site, lessons, primers, diagrams, practice desks and model answers. [Anmol Vats](https://anmol-vats-portfolio.vercel.app/).
- Defensive course material. NYU Tandon, AI for Cyber Security (CS-GY 9223), Prof. Alon Hillel-Tuch.
- Red teaming course map. Built from the draft syllabus of NYU Tandon, Red Teaming and Securing Generative AI (CS-GY 9223, Spring 2027), Prof. Rachel Greenstadt. Readings link to their authors.
- Offensive lecture sheets. NYU LLM security (VAPT) course.
- Frameworks. OWASP GenAI Security Project, MITRE ATLAS, MITRE ATT&CK, MITRE D3FEND (funded by the NSA), STRIDE (Microsoft), ARTEX (AGPL-3.0), NIST.
- Design pass follows the unslop method by Damir Sokolovsky (@heydamir), CC BY 4.0.
- All linked papers, labs and tools belong to their authors.

The course material is shared for study. If you are a rights holder and want something removed, open an issue.
