"""Check content/scenes/*.yaml for common mistakes. Run: python tools/check_scenes.py"""
import glob, os, sys
import yaml
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
bad = 0
for p in sorted(glob.glob("content/scenes/*.yaml")):
    try:
        d = yaml.safe_load(open(p, encoding="utf-8"))
    except Exception as e:
        print(p, "YAML error", e); bad += 1; continue
    for sc in d:
        ids = set(sc["nodes"])
        for k, n in sc["nodes"].items():
            extra = set(n) - {"label", "x", "y", "kind", "tag"}
            if extra: print(p, k, "unexpected keys (quote tags with commas)", extra); bad += 1
        for i, st in enumerate(sc["steps"], 1):
            for f in st.get("flow", []):
                if f[0] not in ids or f[1] not in ids: print(p, "step", i, "unknown node in flow", f); bad += 1
            for x in st.get("on", []) + st.get("show", []) + list(st.get("mark", {})):
                if x not in ids: print(p, "step", i, "unknown node", x); bad += 1
            if "stats" in st and len(st["stats"]) != len(sc.get("stats", [])): print(p, "step", i, "stats count differs"); bad += 1
print("scene files ok" if not bad else f"{bad} problems")
sys.exit(1 if bad else 0)
