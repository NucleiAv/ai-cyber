"""Check every question in content/ has a correct answer and a reason.
Run: python tools/check_content.py"""
import glob, os, sys
import yaml
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
bad = 0
seen = {}
TYPES = {}
def check(items, where):
    global bad
    for i, it in enumerate(items or [], 1):
        t = it.get("type", "mcq")
        TYPES[t] = TYPES.get(t, 0) + 1
        tag = f"{where} Q{i}"
        if t == "open":
            if not str(it.get("a", "")).strip(): print(tag, "open question without a model answer"); bad += 1
            continue
        if not str(it.get("why", "")).strip(): print(tag, "no reasoning (why)"); bad += 1
        if t == "mcq":
            if not isinstance(it.get("a"), int) or not 0 <= it["a"] < len(it.get("opts", [])): print(tag, "bad answer index"); bad += 1
        elif t == "sort":
            for r in it.get("rows", []):
                if r[1] not in it.get("opts", []): print(tag, "row answer not in options:", r[1]); bad += 1
        elif t == "num":
            if not isinstance(it.get("a"), (int, float)): print(tag, "num answer is not a number"); bad += 1
        elif t == "multi":
            a = it.get("a")
            if not isinstance(a, list) or not a or any(not isinstance(x, int) or not 0 <= x < len(it.get("opts", [])) for x in a): print(tag, "bad multi answers"); bad += 1
        elif t == "fill":
            if not it.get("a"): print(tag, "fill without accepted answers"); bad += 1
        elif t == "order":
            if len(it.get("rows", [])) < 3: print(tag, "order needs 3 or more steps"); bad += 1
        else:
            print(tag, "unknown type", t); bad += 1
        key = " ".join(str(it.get("q", "")).lower().split())
        if key in seen: print(tag, "duplicate question, also in", seen[key]); bad += 1
        seen[key] = tag
n = 0
for p in sorted(glob.glob("content/**/*.yaml", recursive=True)):
    if "scenes" in p: continue
    d = yaml.safe_load(open(p, encoding="utf-8"))
    if not isinstance(d, dict): continue
    n += 1
    check(d.get("quiz"), p + " quiz")
    for q, a in d.get("questions", []) or []:
        if not str(a).strip(): print(p, "discussion question without model answer"); bad += 1
    dk = d.get("desk") if "rounds" not in d else d
    if dk:
        for r_i, r in enumerate(dk.get("rounds", []), 1):
            check(r.get("items"), f"{p} round {r_i}")
print("question types:", ", ".join(f"{k} {v}" for k, v in sorted(TYPES.items())))
print(f"{n} content files checked, " + ("all questions have answers and reasons" if not bad else f"{bad} problems"))
sys.exit(1 if bad else 0)
