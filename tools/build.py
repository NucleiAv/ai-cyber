"""Build the lesson pages of the Prompt to Patch site.

Run from the repository root:
    python tools/build.py

Reads   content/attack/*.yaml, content/defend/*.yaml, assets/js/data.js,
        assets/js/modules.js
Writes  attack/*.html, defend/*.html

No third-party packages except PyYAML.
"""
import html
import json
import math
import os
import re
import sys

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

E = lambda s: html.escape(str(s), quote=True)

# ---------------------------------------------------------------- data
def load_links():
    src = open("assets/js/data.js", encoding="utf-8").read()
    out = {}
    for m in re.finditer(r'^\s*(\w+):\s*\{\s*t:\s*"((?:[^"\\]|\\.)*)",\s*u:\s*"([^"]+)",\s*type:\s*"(\w+)"', src, re.M):
        out[m.group(1)] = {"t": m.group(2).replace('\\"', '"'), "u": m.group(3), "type": m.group(4)}
    return out

def load_modules():
    src = open("assets/js/modules.js", encoding="utf-8").read()
    return json.loads(src[src.index("{"): src.rindex("}") + 1])

LINKS = load_links()
MODFILES = load_modules()

OWASP = {
    "LLM01": ("Prompt injection", "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"),
    "LLM02": ("Sensitive information disclosure", "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/"),
    "LLM03": ("Supply chain", "https://genai.owasp.org/llmrisk/llm032025-supply-chain/"),
    "LLM04": ("Data and model poisoning", "https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/"),
    "LLM05": ("Improper output handling", "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/"),
    "LLM06": ("Excessive agency", "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"),
    "LLM07": ("System prompt leakage", "https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/"),
    "LLM08": ("Vector and embedding weaknesses", "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/"),
    "LLM09": ("Misinformation", "https://genai.owasp.org/llmrisk/llm092025-misinformation/"),
    "LLM10": ("Unbounded consumption", "https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/"),
}
AGENTIC_URL = "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
AGENTIC = {
    "ASI01": "Agent goal hijack", "ASI02": "Tool misuse and exploitation", "ASI03": "Identity and privilege abuse",
    "ASI04": "Agentic supply chain vulnerabilities", "ASI05": "Unexpected code execution", "ASI06": "Memory and context poisoning",
    "ASI07": "Insecure inter-agent communication", "ASI08": "Cascading failures", "ASI09": "Human-agent trust exploitation",
    "ASI10": "Rogue agents",
}
# MITRE ATLAS release 2026.10 names, checked against atlas-data
ATLAS = {
    "AML.T0010": "Supply Chain Compromise", "AML.T0010.003": "Supply Chain Compromise. Model Repository",
    "AML.T0010.005": "Supply Chain Compromise. AI Agent Tool", "AML.T0011.000": "User Execution. Unsafe AI Artifacts",
    "AML.T0015": "Evade AI Model", "AML.T0018.000": "Manipulate AI Model. Poison AI Model",
    "AML.T0020": "Training Data Poisoning", "AML.T0029": "Denial of AI Service", "AML.T0034": "Cost Harvesting",
    "AML.T0034.002": "Cost Harvesting. Agentic Resource Consumption", "AML.T0036": "Data from Information Repositories",
    "AML.T0043": "Craft Adversarial Data", "AML.T0043.004": "Craft Adversarial Data. Insert Backdoor Trigger",
    "AML.T0046": "Spamming AI System with Chaff Data", "AML.T0048.002": "External Harms. Societal Harm",
    "AML.T0051": "LLM Prompt Injection", "AML.T0051.000": "LLM Prompt Injection. Direct", "AML.T0051.001": "LLM Prompt Injection. Indirect",
    "AML.T0053": "AI Agent Tool Invocation", "AML.T0054": "LLM Jailbreak", "AML.T0055": "Unsecured Credentials",
    "AML.T0060": "Publish Hallucinated Entities", "AML.T0062": "Discover LLM Hallucinations", "AML.T0064": "Gather RAG-Indexed Targets",
    "AML.T0065": "LLM Prompt Crafting", "AML.T0068": "LLM Prompt Obfuscation", "AML.T0069.002": "Discover LLM System Information. System Prompt",
    "AML.T0070": "RAG Poisoning", "AML.T0071": "False RAG Entry Injection", "AML.T0080": "AI Agent Context Poisoning",
    "AML.T0080.000": "AI Agent Context Poisoning. Memory", "AML.T0084.001": "Discover AI Agent Configuration. Tool Definitions",
    "AML.T0086": "Exfiltration via AI Agent Tool Invocation", "AML.T0093": "Prompt Infiltration via Public-Facing Application",
    "AML.T0101": "Data Destruction via AI Agent Tool Invocation", "AML.T0102": "Generate Malicious Commands",
    "AML.T0109": "AI Supply Chain Rug Pull", "AML.T0110": "AI Agent Tool Poisoning", "AML.T0111": "AI Supply Chain Reputation Inflation",
    "AML.T0115.001": "Publish Poisoned AI Artifacts. Models", "AML.T0116": "Autonomous Reconnaissance",
    "AML.T0124": "Autonomous Attack Orchestration", "AML.T0131": "Crafted AI Assistant Links",
    "AML.T0136": "Exfiltration via AI User Interface", "AML.T0137.000": "Training Data Information from AI Models. Infer Membership",
    "AML.T0137.002": "Training Data Information from AI Models. Invert AI Model",
    "AML.T0137.003": "Training Data Information from AI Models. Extract Memorized Data",
}

# ---------------------------------------------------------------- markdown-lite
def inline(s):
    s = E(s)
    codes = []
    def keep(m):
        codes.append(m.group(1))
        return f"\x00{len(codes) - 1}\x00"
    s = re.sub(r"`([^`]+)`", keep, s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    def lk(m):
        t, u = m.group(1), m.group(2)
        if u.startswith("@"):
            x = LINKS.get(u[1:])
            if not x:
                print("missing link id", u, file=sys.stderr)
                return t
            u = x["u"]
        ext = u.startswith("http")
        return f'<a href="{u}"{" target=\"_blank\" rel=\"noopener\"" if ext else ""}>{t}</a>'
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", lk, s)
    s = re.sub(r"\x00(\d+)\x00", lambda m: f"<code>{codes[int(m.group(1))]}</code>", s)
    return s

BOX = {"!plain": ("plain", "In plain words"), "!warn": ("plain warn", "Careful"), "!eli5": ("plain eli5", "Think of it like this"),
       "!key": ("plain", "Key point"), "!fact": ("plain fact", "Fact check")}

def md(text):
    if not text:
        return ""
    out = []
    for block in re.split(r"\n\s*\n", str(text).strip()):
        lines = block.strip().split("\n")
        first = lines[0]
        tag = first.split(" ", 1)[0]
        if tag in BOX:
            cls, label = BOX[tag]
            body = " ".join([first.split(" ", 1)[1] if " " in first else ""] + lines[1:])
            out.append(f'<div class="{cls}"><span class="k">{label}</span><p>{inline(body)}</p></div>')
        elif all(re.match(r"^\s*- ", l) for l in lines):
            out.append("<ul>" + "".join(f"<li>{inline(l.strip()[2:])}</li>" for l in lines) + "</ul>")
        elif all(re.match(r"^\s*\d+\. ", l) for l in lines):
            out.append("<ol>" + "".join(f"<li>{inline(re.sub(r'^\s*\d+\. ', '', l))}</li>" for l in lines) + "</ol>")
        elif first.startswith("### "):
            out.append(f"<h3>{inline(first[4:])}</h3>" + (f"<p>{inline(' '.join(lines[1:]))}</p>" if lines[1:] else ""))
        elif first.startswith("```"):
            code = "\n".join(lines[1:-1] if lines[-1].startswith("```") else lines[1:])
            out.append(f'<pre class="code"><code>{E(code)}</code></pre>')
        else:
            out.append(f"<p>{inline(' '.join(l.strip() for l in lines))}</p>")
    return "\n".join(out)

# ---------------------------------------------------------------- diagrams
KIND = {"atk": "box-atk", "def": "box-def", "box": "box", "raised": "box-r", "ink": "box-r"}
LCOL = {"atk": "t-atk", "def": "t-def", "box": "t-mute", "raised": "t-mute", "pen": "t-pen"}
ARROW_DEFS = """<defs>
<marker id="a-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--ink-2)"/></marker>
<marker id="a-atk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--atk)"/></marker>
<marker id="a-def" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--def)"/></marker>
<marker id="a-pen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--pencil)"/></marker>
</defs>"""
LNC = {"ink": "ln", "atk": "ln-atk", "def": "ln-def", "pen": "ln-pen"}

def wrap(label, width_px, size=13):
    per = max(6, int(width_px / (size * 0.56)))
    lines = []
    for part in str(label).split("|"):
        cur = ""
        for w in part.split():
            if len(cur) + len(w) + (1 if cur else 0) <= per:
                cur = (cur + " " + w).strip()
            else:
                if cur:
                    lines.append(cur)
                cur = w
        lines.append(cur)
    return lines

def text_block(x, cy, lines, cls="t-s", lh=16, anchor="middle"):
    y0 = cy - (len(lines) - 1) * lh / 2 + 4
    return "".join(f'<text x="{x:.0f}" y="{y0 + i * lh:.0f}" text-anchor="{anchor}" class="{cls}">{E(l)}</text>' for i, l in enumerate(lines))

def node(x, y, w, h, label, kind="box", sub=None):
    s = f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" rx="8" class="{KIND.get(kind, "box")}"/>'
    lines = wrap(label, w - 16)
    if sub:
        s += text_block(x + w / 2, y + h / 2 - 7, lines, "t-s")
        s += f'<text x="{x + w / 2:.0f}" y="{y + h - 9:.0f}" text-anchor="middle" class="t-mono">{E(sub)}</text>'
    else:
        s += text_block(x + w / 2, y + h / 2, lines, "t-s")
    return s

def d_flow(d):
    lanes = d.get("lanes") or [{"nodes": d["nodes"], "edges": d.get("edges", []), "label": d.get("label"), "color": d.get("color", "ink")}]
    W = 680
    out, y = [], 0
    for lane in lanes:
        nodes = lane["nodes"]
        edges = lane.get("edges", [])
        n = len(nodes)
        gap = 64 if any(edges) else 36
        w = min(170, (W - (n - 1) * gap) / n)
        total = n * w + (n - 1) * gap
        x0 = (W - total) / 2
        if lane.get("label"):
            out.append(f'<text x="0" y="{y + 14}" class="t-mono {LCOL.get(lane.get("labelkind", "box"), "")}">{E(lane["label"])}</text>')
            y += 24
        h = max(52, 18 + 16 * max(len(wrap(nd[0], w - 16)) for nd in nodes) + (14 if any(len(nd) > 2 for nd in nodes) else 0))
        col = lane.get("color", "ink")
        for i, nd in enumerate(nodes):
            x = x0 + i * (w + gap)
            out.append(node(x, y, w, h, nd[0], nd[1] if len(nd) > 1 else "box", nd[2] if len(nd) > 2 else None))
            if i < n - 1:
                ax, bx = x + w + 4, x + w + gap - 4
                ec = col
                lab = edges[i] if i < len(edges) else ""
                if isinstance(lab, list):
                    lab, ec = lab[0], lab[1]
                out.append(f'<path class="{LNC.get(ec, "ln")}" d="M{ax:.0f} {y + h / 2:.0f} H{bx:.0f}" marker-end="url(#a-{ec if ec in ("atk", "def", "pen") else "ink"})"/>')
                if lab:
                    for j, l in enumerate(wrap(lab, gap + 6, 11)[:3]):
                        out.append(f'<text x="{(ax + bx) / 2:.0f}" y="{y + h / 2 - 8 - (len(wrap(lab, gap + 6, 11)[:3]) - 1 - j) * 12:.0f}" text-anchor="middle" class="t-mono">{E(l)}</text>')
        y += h + 28
    return W, y - 12, "".join(out)

def d_cycle(d):
    steps = d["nodes"]
    n = len(steps)
    W, H = 680, 300 if n <= 4 else 340
    cx, cy, rx, ry = W / 2, H / 2, 250, (H / 2 - 40)
    w, h = 150, 52
    pts = []
    for i in range(n):
        a = -math.pi / 2 + 2 * math.pi * i / n
        pts.append((cx + rx * math.cos(a), cy + ry * math.sin(a)))
    out = []
    col = d.get("color", "ink")
    for i in range(n):
        (x1, y1), (x2, y2) = pts[i], pts[(i + 1) % n]
        # shorten the segment so the arrow stops at the box edge
        dx, dy = x2 - x1, y2 - y1
        L = math.hypot(dx, dy)
        ux, uy = dx / L, dy / L
        def edge(px, py, sx, sy):
            tx = (w / 2 + 6) / abs(sx) if sx else 1e9
            ty = (h / 2 + 6) / abs(sy) if sy else 1e9
            t = min(tx, ty)
            return px + sx * t, py + sy * t
        sx1, sy1 = edge(x1, y1, ux, uy)
        ex2, ey2 = edge(x2, y2, -ux, -uy)
        mx, my = (sx1 + ex2) / 2, (sy1 + ey2) / 2
        bend = 0.18
        qx, qy = mx + (my - cy) * -bend * 0 + (mx - cx) * bend, my + (my - cy) * bend
        out.append(f'<path class="{LNC.get(col, "ln")}" d="M{sx1:.0f} {sy1:.0f} Q{qx:.0f} {qy:.0f} {ex2:.0f} {ey2:.0f}" marker-end="url(#a-{col if col in ("atk", "def", "pen") else "ink"})"/>')
    for i, (x, y) in enumerate(pts):
        s = steps[i]
        out.append(node(x - w / 2, y - h / 2, w, h, s[0], s[1] if len(s) > 1 else "box", s[2] if len(s) > 2 else f"step {i + 1}"))
    if d.get("center"):
        out.append(text_block(cx, cy, wrap(d["center"], 220), "t-m t-mute", 18))
    return W, H, "".join(out)

def d_layers(d):
    W = 680
    layers = d["layers"]
    h, gap, y = 46, 10, 34
    out = [f'<text x="0" y="14" class="t-mono t-atk">{E(d.get("attack", "attack"))}</text>']
    stop_y = None
    for i, L in enumerate(layers):
        name, note = L[0], L[1] if len(L) > 1 else ""
        status = L[2] if len(L) > 2 else "pass"
        cls = "box-def" if status == "stop" else ("box" if status == "pass" else "box-r")
        out.append(f'<rect x="70" y="{y}" width="{W - 70}" height="{h}" rx="8" class="{cls}"/>')
        out.append(f'<text x="86" y="{y + 20}" class="t-s" style="font-weight:600">{E(name)}</text>')
        for j, l in enumerate(wrap(note, W - 110, 12)[:1]):
            out.append(f'<text x="86" y="{y + 37}" class="t-s t-mute" style="font-size:12px">{E(l)}</text>')
        tag = {"stop": "stops it", "pass": "slips past", "partial": "slows it"}.get(status, status)
        out.append(f'<text x="{W - 12}" y="{y + 20}" text-anchor="end" class="t-mono {"t-def" if status == "stop" else "t-atk"}">{E(tag)}</text>')
        if status == "stop" and stop_y is None:
            stop_y = y + h / 2
        y += h + gap
    end = stop_y if stop_y else y
    out.insert(1, f'<path class="ln-atk" d="M30 22 V{end:.0f} H66" marker-end="url(#a-atk)"/>')
    if stop_y:
        out.append(f'<path d="M50 {stop_y - 8:.0f} l14 14 M64 {stop_y - 8:.0f} l-14 14" style="stroke:var(--def);stroke-width:2.5"/>')
    return W, y, "".join(out)

def d_split(d):
    """one source fans out to several targets"""
    W = 680
    src = d["source"]
    targets = d["targets"]
    n = len(targets)
    h = 44
    H = max(n * (h + 14), 80)
    out = [node(0, H / 2 - 28, 170, 56, src[0], src[1] if len(src) > 1 else "box")]
    col = d.get("color", "ink")
    for i, t in enumerate(targets):
        ty = i * (h + 14)
        out.append(f'<path class="{LNC.get(col, "ln")}" d="M170 {H / 2:.0f} C230 {H / 2:.0f} 230 {ty + h / 2:.0f} 290 {ty + h / 2:.0f}" marker-end="url(#a-{col if col in ("atk", "def", "pen") else "ink"})"/>')
        out.append(node(294, ty, 180, h, t[0], t[1] if len(t) > 1 else "box"))
        if len(t) > 2:
            for j, l in enumerate(wrap(t[2], 190, 12)[:2]):
                out.append(f'<text x="490" y="{ty + 18 + j * 15}" class="t-s t-mute" style="font-size:12px">{E(l)}</text>')
    return W, H, "".join(out)

DIAG = {"flow": d_flow, "cycle": d_cycle, "layers": d_layers, "split": d_split}

def diagram(d):
    W, H, body = DIAG[d.get("type", "flow")](d)
    cap = d.get("caption", "")
    title = d.get("title", "")
    return (f'<figure class="diagram"><div class="sheet">'
            + (f'<div class="sheet-cap"><span>{E(title)}</span><span>{E(d.get("note", ""))}</span></div>' if title else "")
            + f'<svg class="dg" viewBox="-4 -4 {W + 8} {H + 8}" role="img" aria-label="{E(title + ". " + cap)}">{ARROW_DEFS}{body}</svg>'
            + '</div><div class="scroll-hint">Swipe sideways to see the whole diagram</div>'
            + f'{f"<figcaption>{inline(cap)}</figcaption>" if cap else ""}</figure>')

# ---------------------------------------------------------------- scenes
def scene(sc):
    d = dict(sc)
    d["steps"] = [dict(st, text=inline(st.get("text", ""))) for st in sc["steps"]]
    for st in d["steps"]:
        st["flow"] = [list(f) for f in st.get("flow", [])]
        if "stats" in st:
            st["stats"] = [str(v) for v in st["stats"]]
    js = json.dumps(d, ensure_ascii=False).replace("</", "<\\/")
    return f'<div class="scene"><script type="application/json">{js}</script><noscript>{E(sc.get("title", ""))}</noscript></div>'

def scenes_block(items):
    if not items:
        return ""
    return '<p class="small muted">Press Next or Play. Each step lights up one part. Arrow keys move steps after you click the diagram.</p>' + "".join(scene(x) for x in items)

# ---------------------------------------------------------------- questions
def qset(items, sid):
    """Questions are rendered by learn.js from JSON."""
    data = []
    for it in items or []:
        it = dict(it)
        for k in ("q", "why", "a", "info"):
            if k in it and isinstance(it[k], str) and k != "a":
                it[k] = inline(it[k])
        if it.get("type") == "open" and isinstance(it.get("a"), str):
            it["a"] = md(it["a"])
        if it.get("type") in ("mcq", None, "multi") and "opts" in it:
            it["opts"] = [inline(o) for o in it["opts"]]
            it["type"] = it.get("type") or "mcq"
        if it.get("type") == "sort":
            it["rows"] = [[inline(r[0]), r[1]] for r in it["rows"]]
        if it.get("type") == "order":
            it["rows"] = [inline(r) for r in it["rows"]]
        if it.get("type") == "fill" and not isinstance(it.get("a"), list):
            it["a"] = [str(it["a"])]
        data.append(it)
    js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    return f'<div class="qset" data-id="{E(sid)}"></div><script type="application/json" data-for="{E(sid)}">{js}</script>'

# ---------------------------------------------------------------- shell
HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<script>(function(){{try{{var t=localStorage.getItem("site.theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}}catch(e){{}}}})()</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="icon" href="../assets/img/mark.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/site.css?v=20261126b">
</head>
<body data-root="../" data-track="{track}">
<a class="skip" href="#main">Skip to content</a>
<header id="top"></header>
"""
TAIL = """<footer id="foot"></footer>
<script src="../assets/js/tracks.js?v=20261126b"></script>
<script src="../assets/js/data.js?v=20261126b"></script>
<script src="../assets/js/site.js?v=20261126b"></script>
<script src="../assets/js/learn.js?v=20261126b"></script>
<script src="../assets/js/scene.js?v=20261126b"></script>
</body>
</html>
"""

def page(path, title, desc, track, side, body):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    html_ = (HEAD.format(title=E(title), desc=E(desc), track=track)
             + f'<div class="shell">{side}<main id="main" class="doc">{body}</main></div>' + TAIL)
    open(path, "w", encoding="utf-8").write(html_)

def pager(prev, nxt):
    p = f'<a class="pg prev" href="{prev[0]}"><span class="mono">Previous</span>{E(prev[1])}</a>' if prev else "<span></span>"
    n = f'<a class="pg next" href="{nxt[0]}"><span class="mono">Next</span>{E(nxt[1])}</a>' if nxt else "<span></span>"
    return f'<nav class="pager" aria-label="Lesson pages">{p}{n}</nav>'

def section(sid, title, inner, kicker=None):
    return f'<section class="block" id="{sid}"><h2>{E(title)}</h2>{inner}</section>'

def link_li(lid, note=None, star=False):
    x = LINKS.get(lid)
    if not x:
        print("missing link", lid, file=sys.stderr)
        return ""
    return (f'<li><a href="{x["u"]}" target="_blank" rel="noopener">{E(x["t"])}</a>'
            + (' <span class="star">must read</span>' if star else "")
            + f' <span class="meta">{x["type"]}</span>'
            + (f'<div class="small muted">{inline(note)}</div>' if note else "") + "</li>")

def frameworks(d):
    rows = []
    for k in d.get("owasp", []):
        n, u = OWASP[k]
        rows.append(f'<tr><td>OWASP LLM Top 10 2025</td><td><a href="{u}" target="_blank" rel="noopener">{k} {E(n)}</a></td></tr>')
    for k in d.get("agentic", []):
        rows.append(f'<tr><td>OWASP Agentic Top 10 2026</td><td><a href="{AGENTIC_URL}" target="_blank" rel="noopener">{k} {E(AGENTIC[k])}</a></td></tr>')
    for k in d.get("atlas", []):
        if k not in ATLAS:
            print("unknown atlas", k, file=sys.stderr)
        rows.append(f'<tr><td>MITRE ATLAS</td><td><a href="https://atlas.mitre.org/techniques/{k}" target="_blank" rel="noopener">{k} {E(ATLAS.get(k, ""))}</a></td></tr>')
    for x in d.get("other_fw", []):
        fw, txt = ", ".join(str(v) for v in x[:-1]), x[-1]
        rows.append(f"<tr><td>{E(fw)}</td><td>{inline(txt)}</td></tr>")
    if not rows:
        return ""
    return (f'<div class="table-wrap"><table class="table fw"><thead><tr><th>Framework</th><th>Where this lesson sits</th></tr></thead><tbody>{"".join(rows)}</tbody></table></div>'
            + '<p class="small muted">ATLAS names follow release 2026.10. OWASP links open the official entry.</p>')

# ---------------------------------------------------------------- sidebars
TRACK_ITEMS = {}

def track_add(track, kind, did):
    """Record a trackable item, a hands-on lab or a practice desk, for the per-track trackers."""
    TRACK_ITEMS.setdefault(track, {"labs": [], "desks": []})[kind].append(did)

TICKSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13c2 1.4 3.7 3.2 5.2 5.4C11.6 12.6 15.4 7.4 21 3"/></svg>'
KIND = {"lab": "Hands-on lab", "learn": "Guided lesson", "read": "Read", "tool": "Tool"}

def lab_tasks(tasks, track, slug):
    """Pinpointed lab tasks, each with its own done tick."""
    out = []
    for i, t in enumerate(tasks):
        did = f"lab.{track}.{slug}.{i}"
        track_add(track, "labs", did)
        u = t["u"]
        ext = "" if u.startswith("#") else ' target="_blank" rel="noopener"'
        out.append(f'<li class="ltask"><label class="check" title="Mark done"><input type="checkbox" data-id="{did}" aria-label="Mark done. {E(t["t"])}"><span class="box"></span>{TICKSVG}</label>'
                   f'<div><a class="ltask-t" href="{E(u)}"{ext}>{E(t["t"])}</a>'
                   f'<div class="ltask-tags"><span class="tag {"atk" if t.get("kind") == "lab" else ""}">{E(KIND.get(t.get("kind", "lab"), "Lab"))}</span><span class="tag">{E(t.get("access", ""))}</span></div>'
                   f'<p>{inline(t["goal"])}</p>' + (f'<p class="small muted">{inline(t["where"])}</p>' if t.get("where") else "") + '</div></li>')
    return ('<p class="small muted">Do these in order. Each link opens the exact lab, level or lesson. Tick each one when you finish it. The tracker in the sidebar counts them.</p>'
            f'<ol class="ltasks">{"".join(out)}</ol>')

def tracker(track):
    return f'<div class="tracker" data-tracker="{track}"></div>'

def side_wrap(track, label, inner):
    dot = {"attack": "atk", "defend": "def", "frameworks": "pen", "prompting": "def"}.get(track, "def")
    return (f'<aside class="side" id="side" aria-label="{E(label)}">'
            f'<button class="side-btn" type="button" aria-expanded="false" aria-controls="side-nav">{E(label)}, all lessons</button>'
            f'<nav id="side-nav"><p class="side-h"><span class="dot {dot}"></span>{E(label)}</p>{tracker(track)}{inner}</nav></aside>')

def side_group(num, title, href, cur, items, done=None):
    """One expandable group. items = [(href, label, mark, is_current)]"""
    sub = "".join(f'<a href="{h}"' + (' aria-current="page"' if c else "") + (f' data-done="{d}"' if d else "")
                  + f'><span class="mono">{E(m)}</span>{E(t)}</a>' for h, t, m, c, d in items)
    return (f'<details class="side-mod{" cur" if cur else ""}"{" open" if cur else ""}>'
            f'<summary{" data-done=" + chr(34) + done + chr(34) if done else ""}><span class="mono">{E(num)}</span><span>{E(title)}</span></summary>'
            f'<a class="side-open" href="{href}"' + (' aria-current="page"' if cur == "page" else "") + f'><span class="mono">&rarr;</span>Open the page</a>{sub}</details>')

ATTACK_PARTS = [("idea", "The idea in one minute", "idea"), ("watch", "Watch it, step by step", "scenes"), ("words", "Words you need", "terms"),
                ("how", "How it works", "how"), ("attack", "The attack as a workflow", "attack_steps"), ("cases", "Real cases", "cases"),
                ("defend", "How to defend", "defense"), ("map", "Map to the frameworks", None), ("artex", "ARTEX case study", "artex"),
                ("lab", "Hands-on lab", "lab"), ("read", "Readings, explained", "readings"), ("course", "From the red teaming course", "syllabus"), ("discuss", "Discussion questions", "questions"),
                ("quiz", "Check yourself", "quiz"), ("deliver", "Deliverables", "deliverables"), ("refs", "References", "refs")]

def attack_side(lessons, cur, track="attack", label="Attack track"):
    out = [f'<a class="side-top" href="index.html"' + (' aria-current="page"' if cur == "index" else "") + '><span class="mono">00</span>Track overview</a>']
    for L in lessons:
        here = cur in (L["slug"], L["slug"] + "-desk")
        base = "" if cur == L["slug"] else f'{L["slug"]}.html'
        H = L.get("headings") or {}
        items = [(f"{base}#{a}", H.get(a, t), "#", False, None) for a, t, k in ATTACK_PARTS if k is None or L.get(k)]
        if L.get("desk"):
            items.append((f'{L["slug"]}-desk.html', "Practice desk", "Q", cur == L["slug"] + "-desk", f'{track}.{L["slug"]}-desk'))
        out.append(side_group(L["num"], L["short"], f'{L["slug"]}.html', "page" if cur == L["slug"] else here, items, f'{track}.{L["slug"]}'))
    return side_wrap(track, label, "".join(out))

def done_end(did, label, note="Ticks save in this browser and show in the sidebar and on the plan."):
    """The mark-done control, shown once at the end of a page."""
    return (f'<div class="done-end"><label class="donebox"><span class="check"><input type="checkbox" data-id="{E(did)}"><span class="box"></span>'
            f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13c2 1.4 3.7 3.2 5.2 5.4C11.6 12.6 15.4 7.4 21 3"/></svg></span>{E(label)}</label>'
            f'<span class="small muted">{E(note)}</span></div>')

def jt(a, b):
    """Join two title parts without doubling punctuation."""
    a = str(a).rstrip()
    return f"{a} {b}" if a.endswith(("?", "!", ".")) else f"{a}. {b}"

def desk_body(dk, sid, crumbs, eyebrow, kind, source):
    inner = md(dk.get("situation"))
    for r_i, rnd in enumerate(dk["rounds"]):
        inner += f'<section class="block round" id="r{r_i + 1}"><h2>{E(rnd["title"])}</h2>{md(rnd.get("info"))}{qset(rnd["items"], f"{sid}-desk-r{r_i + 1}")}</section>'
    if dk.get("card"):
        inner += section("card", "Field card. Keep this", md(dk["card"]))
    return (crumbs + f'<header class="doc-head"><div class="eyebrow"><span class="tag {kind}"><span class="dot {kind}"></span>{E(eyebrow)}</span><span>{E(dk.get("source", source))}</span></div>'
            f'<h1>{E(dk["title"])}</h1><p class="lede">{inline(dk["lede"])}</p></header>'
            + '<nav class="doc-toc" aria-label="Rounds">' + "".join(f'<a href="#r{i + 1}">{E(r["title"])}</a>' for i, r in enumerate(dk["rounds"])) + "</nav>"
            + inner)

def load_desk(key):
    dp = f"content/desks/{key}.yaml"
    return yaml.safe_load(open(dp, encoding="utf-8")) if os.path.exists(dp) else None

def with_extra(desk, key):
    """Append the extra practice rounds in content/practice/{key}.yaml to a desk."""
    xp = f"content/practice/{key}.yaml"
    if desk and os.path.exists(xp):
        extra = yaml.safe_load(open(xp, encoding="utf-8")) or {}
        desk = dict(desk)
        desk["rounds"] = list(desk.get("rounds", [])) + list(extra.get("rounds", []))
    return desk

# ---------------------------------------------------------------- attack track
def build_lessons(track="attack", label="Attack track", crumb="Attack", kind="atk", eyebrow="Lesson",
                  ov_title="", ov_eyebrow="", ov_lede="", ov_desc="", page_suffix="Attack lesson"):
    files = sorted(f for f in os.listdir(f"content/{track}") if f.endswith(".yaml"))
    lessons = [yaml.safe_load(open(f"content/{track}/{f}", encoding="utf-8")) for f in files]
    for L in lessons:
        sp = f'content/scenes/{L["slug"]}.yaml'
        if os.path.exists(sp):
            L["scenes"] = yaml.safe_load(open(sp, encoding="utf-8"))
    for L in lessons:
        L.setdefault("short", L["title"])
        if not L.get("desk"):
            dk = load_desk(L["slug"])
            if dk:
                L["desk"] = dk
        if L.get("desk"):
            L["desk"] = with_extra(L["desk"], L["slug"])
        lp = f'content/labs/{L["slug"]}.yaml'
        if os.path.exists(lp):
            lx = yaml.safe_load(open(lp, encoding="utf-8")) or {}
            L.setdefault("lab", {})
            L["lab"] = dict(L["lab"])
            L["lab"]["tasks"] = lx.get("tasks", [])
            L["lab"]["links"] = lx.get("tools", [])
    for i, L in enumerate(lessons):
        side = attack_side(lessons, L["slug"], track, label)
        prev = (f'{lessons[i - 1]["slug"]}.html', lessons[i - 1]["title"]) if i else ("index.html", "Track overview")
        nxt = (f'{lessons[i + 1]["slug"]}.html', lessons[i + 1]["title"]) if i + 1 < len(lessons) else None
        parts, toc = [], []

        def add(sid, title, inner, L=L):
            title = (L.get("headings") or {}).get(sid, title)
            if inner and inner.strip():
                toc.append((sid, title))
                parts.append(section(sid, title, inner))

        add("idea", "The idea in one minute", md(L.get("idea")))
        add("watch", "Watch it, step by step", scenes_block(L.get("scenes")))
        add("words", "Words you need", "<dl class=\"terms\">" + "".join(f"<dt>{E(a)}</dt><dd>{inline(b)}</dd>" for a, b in L.get("terms", [])) + "</dl>" if L.get("terms") else "")
        how = md(L.get("how")) + "".join(diagram(d) for d in L.get("diagrams", []))
        add("how", "How it works, step by step", how)
        steps = L.get("attack_steps")
        if steps:
            add("attack", "The attack, as a workflow", "<ol class=\"flowlist atk\">" + "".join(f"<li>{inline(s)}</li>" for s in steps) + "</ol>" + "".join(diagram(d) for d in L.get("attack_diagrams", [])))
        if L.get("cases"):
            add("cases", "Real cases", "".join(f'<div class="case"><h3>{E(", ".join(str(v) for v in c[:-1]))}</h3>{md(c[-1])}</div>' for c in L["cases"]))
        dfn = md(L.get("defense")) + "".join(diagram(d) for d in L.get("defense_diagrams", []))
        if L.get("defense_steps"):
            dfn += "<ol class=\"flowlist def\">" + "".join(f"<li>{inline(s)}</li>" for s in L["defense_steps"]) + "</ol>"
        add("defend", "How to defend", dfn)
        add("map", "Map to the frameworks", frameworks(L))
        if L.get("artex"):
            add("artex", "Case study. ARTEX, an autonomous pentest agent", md(L["artex"]))
        lab = L.get("lab")
        if lab:
            inner = md(lab.get("intro"))
            if lab.get("tasks"):
                inner += "<h3>Labs and lessons to do</h3>" + lab_tasks(lab["tasks"], track, L["slug"])
                if lab.get("steps"):
                    inner += "<h3>Step by step</h3>"
            if lab.get("steps"):
                inner += "<ol class=\"flowlist\">" + "".join(f"<li>{inline(s)}</li>" for s in lab["steps"]) + "</ol>"
            if lab.get("code"):
                inner += f'<pre class="code"><code>{E(lab["code"])}</code></pre>'
            if lab.get("solution"):
                inner += f'<details class="hint"><summary>Show one solution. Try your own first</summary><pre class="code"><code>{E(lab["solution"])}</code></pre></details>'
            if lab.get("hints"):
                inner += "<details class=\"hint\"><summary>Hints, open only if stuck for 30 minutes</summary><ul>" + "".join(f"<li>{inline(h)}</li>" for h in lab["hints"]) + "</ul></details>"
            if lab.get("links"):
                inner += "<h3>Tools you need</h3><ul class=\"refs\">" + "".join(link_li(x) for x in lab["links"]) + "</ul>"
            add("lab", "Hands-on lab", inner)
        if L.get("readings"):
            add("read", "Readings, explained", "<ul class=\"refs\">" + "".join(link_li(r[0], r[1] if len(r) > 1 else None, r[0] in L.get("star", [])) for r in L["readings"]) + "</ul>")
        if L.get("syllabus"):
            add("course", "From the red teaming course", '<p>The NYU Tandon course Red Teaming and Securing Generative AI assigns these readings for this topic. See <a href="../redteam.html">the course map</a> for the week and the lab.</p>'
                + "<ul class=\"refs\">" + "".join(link_li(r[0], r[1] if len(r) > 1 else None) for r in L["syllabus"]) + "</ul>")
        if L.get("questions"):
            add("discuss", "Discussion questions", "<p class=\"small muted\">Write your own answer first. Your text stays in this browser. Then open the model answer and compare.</p>"
                + qset([{"type": "open", "q": q, "a": a} for q, a in L["questions"]], f'{L["slug"]}-discuss'))
        if L.get("quiz"):
            add("quiz", "Check yourself", qset(L["quiz"], f'{L["slug"]}-quiz'))
        if L.get("deliverables"):
            add("deliver", "Deliverables checklist", "<ul class=\"checks\">" + "".join(
                f'<li><label class="check"><input type="checkbox" data-id="{track}.{L["slug"]}.d{j}"><span class="box"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13c2 1.4 3.7 3.2 5.2 5.4C11.6 12.6 15.4 7.4 21 3"/></svg></label><span>{inline(d)}</span></li>'
                for j, d in enumerate(L["deliverables"])) + "</ul>")
        refs = L.get("refs", [])
        if refs:
            add("refs", "References", "<ol class=\"reflist\">" + "".join(f"<li>{inline(r)}</li>" for r in refs) + "</ol>")

        tags = "".join(f'<a class="tag atk" href="{OWASP[k][1]}" target="_blank" rel="noopener">{k} {E(OWASP[k][0])}</a>' for k in L.get("owasp", []))
        files_ = ""
        if L.get("lecture"):
            files_ = f'<details class="pdf"><summary>Open the lecture sheet here</summary><iframe src="../files/offensive/lectures/lesson-{L["lecture"]:02d}.pdf" title="Lecture sheet" loading="lazy"></iframe><p class="small"><a href="../files/offensive/lectures/lesson-{L["lecture"]:02d}.pdf" target="_blank">Open the PDF in a new tab</a></p></details>'
        if L.get("desk"):
            add("practice", "Practice desk", f'<p>{inline(L["desk"].get("blurb", "Scenario questions with instant feedback and a reason for every answer."))}</p><a class="btn btn-primary" href="{L["slug"]}-desk.html">Open the practice desk</a>')
        head = (f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">{crumb}</a><span>/</span><span>{E(L["num"])}</span></nav>'
                f'<header class="doc-head"><div class="eyebrow"><span class="tag {kind}"><span class="dot {kind}"></span>{crumb} · {eyebrow} {E(L["num"])}</span>{tags}<span>{E(L.get("time", ""))}</span></div>'
                f'<h1>{E(L["title"])}</h1><p class="lede">{inline(L["lede"])}</p>'
                + (f'<div class="doc-meta"><a class="btn btn-quiet btn-sm" href="../plan.html#week-{L["week"]}">Plan, week {L["week"]}</a></div>' if L.get("week") is not None else "")
                + f'{files_}</header>'
                + '<nav class="doc-toc" aria-label="On this page">' + "".join(f'<a href="#{a}">{E(b)}</a>' for a, b in toc) + "</nav>")
        dnext = (f'{L["slug"]}-desk.html', f'{L["short"]}, practice desk') if L.get("desk") else nxt
        page(f'{track}/{L["slug"]}.html', jt(L["title"], f'{page_suffix} {L["num"]}'), L["lede"][:150], track, side, head + "".join(parts) + done_end(f'{track}.{L["slug"]}', "Mark this lesson done") + pager(prev, dnext))
        if L.get("desk"):
            track_add(track, "desks", f'{track}.{L["slug"]}-desk')
            crumbs = f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">{crumb}</a><span>/</span><a href="{L["slug"]}.html">{E(L["num"])}</a><span>/</span><span>Practice desk</span></nav>'
            dbody = desk_body(L["desk"], L["slug"], crumbs, f'{crumb} · {eyebrow} {L["num"]} · Practice desk', kind, "scenario practice, written for this site")
            page(f'{track}/{L["slug"]}-desk.html', jt(L["desk"]["title"], "Practice desk"), L["desk"]["lede"][:150], track,
                 attack_side(lessons, L["slug"] + "-desk", track, label), dbody + done_end(f'{track}.{L["slug"]}-desk', "Mark this practice desk done") + pager((f'{L["slug"]}.html', L["title"]), nxt))

    # overview
    rows = "".join(
        f'<a class="lesson-row" href="{L["slug"]}.html" data-done="{track}.{L["slug"]}"><span class="mono">{L["num"]}</span><span><b>{E(L["title"])}</b><small>{inline(L["lede"])}</small></span>'
        f'<span class="tags">{"".join(f"<span class=\"tag atk\">{k}</span>" for k in L.get("owasp", []))}</span></a>' for L in lessons)
    body = (f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><span>{crumb}</span></nav>'
            f'<header class="doc-head"><div class="eyebrow"><span class="tag {kind}"><span class="dot {kind}"></span>{E(label)}</span><span>{E(ov_eyebrow)}</span></div>'
            f'<h1>{E(ov_title)}</h1><p class="lede">{inline(ov_lede)}</p></header>'
            + tracker(track)
            + md(open(f"content/{track}/_intro.md", encoding="utf-8").read() if os.path.exists(f"content/{track}/_intro.md") else "")
            + f'<div class="lesson-list">{rows}</div>')
    page(f"{track}/index.html", jt(label, ov_title), ov_desc, track, attack_side(lessons, "index", track, label), body)
    return lessons

# ---------------------------------------------------------------- defend track
def tidy(s):
    s = re.sub(r"\s*[\u2014\u2013]\s*", ", ", s)
    s = re.sub(r":\s+", ". ", s)
    return s.replace(" & ", " and ")

def defend_side(mods, cur):
    out = [f'<a class="side-top" href="index.html"' + (' aria-current="page"' if cur == "index" else "") + '><span class="mono">00</span>Track overview</a>']
    for M in mods:
        key = f'm{M["n"]:02d}'
        here = cur.startswith(key)
        items = [(f"{key}-s{j + 1:02d}.html", tidy(s["t"]), str(j + 1), cur == f"{key}-s{j + 1:02d}", f"defend.{key}-s{j + 1:02d}") for j, s in enumerate(M["_secs"])]
        if M.get("desk"):
            items.append((f"{key}-desk.html", "Practice desk", "Q", cur == key + "-desk", f"defend.{key}-desk"))
        out.append(side_group(f'{M["n"]:02d}', M["short"], f"{key}.html", "page" if cur == key else here, items))
    return side_wrap("defend", "Defend track", "".join(out))

def build_defend():
    mods = []
    for f in sorted(os.listdir("content/defend")):
        if f.endswith(".yaml"):
            M = yaml.safe_load(open(f"content/defend/{f}", encoding="utf-8"))
            sp = f'content/scenes/m{M["n"]:02d}.yaml'
            if os.path.exists(sp):
                M["scenes"] = yaml.safe_load(open(sp, encoding="utf-8"))
            M["_secs"] = MODFILES[f'module-{M["n"]:02d}']["sections"]
            M["_labs"] = MODFILES[f'module-{M["n"]:02d}']["labs"]
            if not M.get("desk"):
                dk = load_desk(f'm{M["n"]:02d}')
                if dk:
                    M["desk"] = dk
            if M.get("desk"):
                M["desk"] = with_extra(M["desk"], f'm{M["n"]:02d}')
            M.setdefault("short", M["title"])
            mods.append(M)
    refs_all = json.load(open("content/defend/_refs.json", encoding="utf-8")) if os.path.exists("content/defend/_refs.json") else {}
    order = []
    for M in mods:
        key = f'm{M["n"]:02d}'
        order.append((f"{key}.html", f'Module {M["n"]}. {M["title"]}'))
        for j, s in enumerate(M["_secs"]):
            order.append((f"{key}-s{j + 1:02d}.html", tidy(s["t"])))
        if M.get("desk"):
            order.append((f"{key}-desk.html", f'Module {M["n"]} practice desk'))
    idx = {p: i for i, (p, _) in enumerate(order)}
    def nav(p):
        i = idx[p]
        return pager(order[i - 1] if i > 0 else ("index.html", "Track overview"), order[i + 1] if i + 1 < len(order) else None)

    for M in mods:
        key = f'm{M["n"]:02d}'
        mdir = f'../course/defensive/module-{M["n"]:02d}/'
        crumbs = f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">Defend</a><span>/</span><span>Module {M["n"]}</span></nav>'
        parts, toc = [], []

        def add(sid, title, inner):
            if inner and inner.strip():
                toc.append((sid, title))
                parts.append(section(sid, title, inner))

        add("idea", "The idea in one minute", md(M.get("idea")))
        add("watch", "Watch it, step by step", scenes_block(M.get("scenes")))
        add("primer", "Learn it from zero", md(M.get("primer")) + "".join(diagram(d) for d in M.get("diagrams", [])))
        if M.get("terms"):
            add("words", "Words you need", "<dl class=\"terms\">" + "".join(f"<dt>{E(a)}</dt><dd>{inline(b)}</dd>" for a, b in M["terms"]) + "</dl>")
        secs = "".join(
            f'<a class="lesson-row" href="{key}-s{j + 1:02d}.html" data-done="defend.{key}-s{j + 1:02d}"><span class="mono">{j + 1}</span><span><b>{E(tidy(s["t"]))}</b><small>{inline(M.get("sections", {}).get(s["f"], tidy(s["s"])))}</small></span></a>'
            for j, s in enumerate(M["_secs"]))
        add("sections", "Read the sections", f'<p class="small muted">Each section opens inside this site with its diagrams, knowledge checks and labs.</p><div class="lesson-list">{secs}</div>')
        if M.get("desk"):
            add("desk", "Practice desk", f'<p>{inline(M["desk"].get("blurb", "Work through the class exercise with instant feedback."))}</p><a class="btn btn-primary" href="{key}-desk.html">Open the practice desk</a>')
        if M["_labs"]:
            for j, l in enumerate(M["_labs"]):
                track_add("defend", "labs", f"lab.defend.{key}.{j}")
            add("labs", "Interactive labs", '<p class="small muted">Each lab runs inside this site. Tick it here or at the end of the lab page when you finish it.</p><ul class="labgrid">' + "".join(
                f'<li><label class="check" title="Mark done"><input type="checkbox" data-id="lab.defend.{key}.{j}" aria-label="Mark done. {E(tidy(l["t"]))}"><span class="box"></span>{TICKSVG}</label><a href="lab.html?m={M["n"]}&amp;f={E(l["f"])}">{E(tidy(l["t"]))}</a></li>'
                for j, l in enumerate(M["_labs"])) + "</ul>")
        add("frameworks", "Map to the frameworks", frameworks(M))
        if M.get("slides"):
            sl = M["slides"]
            add("slides", "The lecture slides", md(sl.get("summary")) + "".join(
                f'<details class="pdf"><summary>Open {E(f)} here</summary><iframe src="../files/defensive/{"workbooks" if "Workbook" in f or "Handout" in f else "slides"}/{E(f)}" title="{E(f)}" loading="lazy"></iframe></details>'
                for f in sl.get("files", [])))
        if M.get("quiz"):
            add("quiz", "Check yourself", qset(M["quiz"], f"{key}-quiz"))
        r = refs_all.get(f'module-{M["n"]:02d}', [])
        extra = M.get("refs", [])
        if r or extra:
            add("refs", "References", "<ol class=\"reflist\">" + "".join(f"<li>{inline(x)}</li>" for x in extra)
                + "".join(f'<li><a href="{E(u)}" target="_blank" rel="noopener">{E(t or u)}</a></li>' for t, u in r) + "</ol>"
                + f'<p class="small muted">The full annotated list is in <a href="{key}-s{len(M["_secs"]):02d}.html">the module references section</a>.</p>')
        head = (crumbs + f'<header class="doc-head"><div class="eyebrow"><span class="tag def"><span class="dot def"></span>Defend · Module {M["n"]}</span><span>{E(M.get("time", ""))}</span></div>'
                f'<h1>{E(M["title"])}</h1><p class="lede">{inline(M["lede"])}</p></header>'
                + '<nav class="doc-toc" aria-label="On this page">' + "".join(f'<a href="#{a}">{E(b)}</a>' for a, b in toc) + "</nav>")
        page(f"defend/{key}.html", f'Module {M["n"]}. {M["title"]}', M["lede"][:150], "defend", defend_side(mods, key), head + "".join(parts) + nav(f"{key}.html"))

        for j, s in enumerate(M["_secs"]):
            sid = f"{key}-s{j + 1:02d}"
            blurb = M.get("sections", {}).get(s["f"]) or tidy(s["s"])
            body = (f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">Defend</a><span>/</span><a href="{key}.html">Module {M["n"]}</a><span>/</span><span>Section {j + 1}</span></nav>'
                    f'<header class="doc-head"><div class="eyebrow"><span class="tag def"><span class="dot def"></span>Module {M["n"]} · Section {j + 1} of {len(M["_secs"])}</span></div>'
                    f'<h1>{E(tidy(s["t"]))}</h1>'
                    f'<div class="plain"><span class="k">In plain words</span><p>{inline(blurb)}</p></div>'
                    f'</header>'
                    f'<div class="embed"><iframe class="nyu" src="{mdir}{E(s["f"])}" title="{E(tidy(s["t"]))}"></iframe></div>'
                    f'<p class="small muted">Course content by NYU Tandon, shown inside this site. <a href="{mdir}{E(s["f"])}" target="_blank">Open it full screen</a>.</p>'
                    + done_end(f"defend.{sid}", "Mark this section read") + nav(f"{sid}.html"))
            page(f"defend/{sid}.html", jt(tidy(s["t"]), f'Module {M["n"]}'), blurb[:150], "defend", defend_side(mods, sid), body)

        if M.get("desk"):
            track_add("defend", "desks", f"defend.{key}-desk")
            dk = M["desk"]
            crumbs = f'<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">Defend</a><span>/</span><a href="{key}.html">Module {M["n"]}</a><span>/</span><span>Practice desk</span></nav>'
            body = desk_body(dk, key, crumbs, f'Module {M["n"]} · Practice desk', "def", dk.get("source", "from the class workbook and its answer slides")) + done_end(f"defend.{key}-desk", "Mark this practice desk done") + nav(f"{key}-desk.html")
            page(f"defend/{key}-desk.html", jt(dk["title"], f'Module {M["n"]} practice desk'), dk["lede"][:150], "defend", defend_side(mods, key + "-desk"), body)

    # lab viewer
    body = ('<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><a href="index.html">Defend</a><span>/</span><span id="lab-crumb">Lab</span></nav>'
            '<header class="doc-head"><div class="eyebrow"><span class="tag def"><span class="dot def"></span>Interactive lab</span></div><h1 id="lab-title">Interactive lab</h1>'
            '<p class="lede" id="lab-lede">The lab runs below. Use the controls inside it.</p></header>'
            '<div class="embed"><iframe class="nyu" id="lab-frame" title="Interactive lab"></iframe></div><p class="small muted" id="lab-back"></p>'
            + done_end("lab.defend.pending", "Mark this lab done", "Ticks save in this browser and count in the defend tracker."))
    page("defend/lab.html", "Interactive lab. Defend track", "An interactive lab from the defensive course.", "defend", defend_side(mods, "lab"), body)

    # overview
    rows = ""
    for M in mods:
        tg = f'<span class="tag">{len(M["_secs"])} sections</span>'
        if M["_labs"]:
            tg += f'<span class="tag">{len(M["_labs"])} labs</span>'
        if M.get("desk"):
            tg += '<span class="tag def">practice desk</span>'
        rows += (f'<a class="lesson-row" href="m{M["n"]:02d}.html"><span class="mono">{M["n"]:02d}</span><span><b>{E(M["title"])}</b>'
                 f'<small>{inline(M["lede"])}</small></span><span class="tags">{tg}</span></a>')
    body = ('<nav class="crumbs"><a href="../index.html">Home</a><span>/</span><span>Defend</span></nav>'
            '<header class="doc-head"><div class="eyebrow"><span class="tag def"><span class="dot def"></span>Defend track</span><span>NYU Tandon · AI for Cyber Security · CS-GY 9223</span></div>'
            '<h1>AI for cyber security</h1><p class="lede">How defenders use AI for detection, threat intelligence and code review, and how to defend AI systems. Each module starts with a plain primer, then opens the course sections, labs and practice desks inside this site.</p></header>'
            + tracker("defend")
            + md(open("content/defend/_intro.md", encoding="utf-8").read() if os.path.exists("content/defend/_intro.md") else "")
            + f'<div class="lesson-list">{rows}</div>')
    page("defend/index.html", "Defend track. AI for cyber security", "Twelve modules on AI for defense with primers, embedded course sections, labs and practice desks.", "defend", defend_side(mods, "index"), body)
    return mods

if __name__ == "__main__":
    a = build_lessons(track="attack", label="Attack track", crumb="Attack", kind="atk", eyebrow="Lesson",
                      ov_title="LLM security, lesson by lesson", ov_eyebrow="LLM security, VAPT · 14 lessons and 1 extra",
                      ov_lede="Each lesson takes one risk from the OWASP LLM Top 10. You read a plain explanation, watch the attack step by step, learn the defenses, map it to OWASP and MITRE ATLAS, do the lab, practice on a scenario desk and check yourself. Everything is on the page.",
                      ov_desc="Fifteen lessons on the OWASP LLM Top 10 and MCP with animated diagrams, labs, practice desks and framework maps.", page_suffix="Attack lesson")
    if os.path.isdir("content/frameworks"):
        build_lessons(track="frameworks", label="Frameworks", crumb="Frameworks", kind="pen", eyebrow="Framework",
                      ov_title="The frameworks behind AI security", ov_eyebrow="ATLAS · ATT&CK · D3FEND · STRIDE · OWASP · ARTEX",
                      ov_lede="Security teams share a few maps. Each page here explains one of them from zero, shows it step by step, says how to use it, and links it to the others.",
                      ov_desc="MITRE ATLAS, MITRE ATT&CK, MITRE D3FEND, STRIDE, the OWASP Top 10 lists and ARTEX, explained from zero.", page_suffix="Framework")
    if os.path.isdir("content/prompting"):
        build_lessons(track="prompting", label="Prompting", crumb="Prompting", kind="def", eyebrow="Lesson",
                      ov_title="Prompting, from clear prompts to attacks and defenses", ov_eyebrow="How to prompt · ways of prompting · adversarial and defensive prompting",
                      ov_lede="How to write a prompt that works, the main techniques and when to use each, how attackers use prompts, and why good design matters more than any prompt. Every lesson has a step-by-step animation, examples, a lab and a practice desk.",
                      ov_desc="Six lessons on prompt engineering for security, from the parts of a prompt to jailbreaks, prompt injection and the design patterns that defend against them.", page_suffix="Prompting lesson")
    d = build_defend()
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
    import redteam
    head = HEAD.replace("../", "").replace('data-track="{track}"', 'data-track=""').format(
        title="Red teaming and securing generative AI, the course map",
        desc="The NYU Tandon red teaming course, week by week, with its readings and labs mapped to the lessons on this site.", track="")
    tail = re.sub(r'<script src="assets/js/(learn|scene)\.js[^"]*"></script>\s*', "", TAIL.replace("../", ""))
    open("redteam.html", "w", encoding="utf-8").write(head + redteam.build(LINKS, E, "") + "\n" + tail)
    names = {"attack": "Attack", "defend": "Defend", "frameworks": "Frameworks", "prompting": "Prompting"}
    man = {k: dict(v, name=names.get(k, k)) for k, v in TRACK_ITEMS.items()}
    open("assets/js/tracks.js", "w", encoding="utf-8").write("/* Generated by tools/build.py. Trackable labs and desks per track. */\nwindow.TRACKS = " + json.dumps(man, separators=(",", ":")) + ";\n")
    print("tracker items", {k: (len(v["labs"]), len(v["desks"])) for k, v in TRACK_ITEMS.items()})
    print(f"built {len(a)} attack lessons and {len(d)} defend modules")
