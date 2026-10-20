import re, sys, os
src_dir, guide = sys.argv[1], sys.argv[2]
g = open(guide, encoding="utf-8").read()
norm = lambda t: t.replace("“",'"').replace("”",'"').replace("’","'").replace("‘","'")
g = norm(g)
srcs = {f: norm(open(os.path.join(src_dir,f),encoding="utf-8").read()) for f in os.listdir(src_dir) if f.endswith(".txt")}
ok, bad = [], []
def check(n, c, d=""): (ok if c else bad).append(n + ("" if c else f"  -> {d}"))

# A1 headings
want = [r"^# Brand Voice Guideline: ", r"^## 1\. Core Identity", r"^## 2\. Vocabulary", r"^### Words to Use", r"^### Words to Ban",
        r"^## 3\. Tone Scale", r"^## 4\. Before and After", r"^## 5\. Quick Rules", r"^## 6\. Gaps and Questions"]
pos = [ (m.start() if (m:=re.search(p, g, re.M)) else -1) for p in want]
check("A1 all 9 headings present, in order", all(p>=0 for p in pos) and pos==sorted(pos), pos)

# A2 every tagged quote verbatim in its file
quotes = re.findall(r'"([^"\n]{3,300})"\s*\[([\w\-\.]+\.txt)', g)
ws = lambda t: " ".join(t.split())
miss = [(q,f) for q,f in quotes if f not in srcs or ws(q) not in ws(srcs[f])]
check(f"A2 tagged quotes verbatim ({len(quotes)} found)", len(quotes)>=20 and not miss, miss[:8])

# section slicing
def section(start, end):
    a = re.search(start, g, re.M); b = re.search(end, g, re.M)
    return g[a.start(): b.start() if b else len(g)] if a else ""
ban_tbl = section(r"^### Words to Ban", r"^## 3\.")
ba = section(r"^## 4\.", r"^## 5\.")
rules = section(r"^## 5\.", r"^## 6\.")
gaps = section(r"^## 6\.", r"^\Z")

# A4 banned words outside the ban table and Before texts
rest = g.replace(ban_tbl, "")
for bt in re.findall(r'\*\*Before\*\*.*?(?=\*\*After)', ba, re.S):
    rest = rest.replace(bt, "")
# also allow the word inside SAY quotes from notes.txt / hated file and inside "What changed" lists of removed words
rest_clean = re.sub(r'"[^"\n]*"\s*\[(notes|hated-competitor|home)\.txt\]', "", rest)
rest_clean = re.sub(r'removed[^\n]*', "", rest_clean, flags=re.I)
banned = ["luxury","premium","curated","elevate","indulge","exquisite","artisanal","meticulously","sanctuary","unlock","seamless","empower","leverage","synergy","solutions","robust","innovative","world-class","game-changer","holistic"]
hits = [w for w in banned if re.search(r"\b"+w+r"\b", rest_clean, re.I)]
check("A4 no banned word outside ban table / Before / quoted SAY / removed-lists", not hits, hits)

# A5 ban table includes the key words
need = ["luxury","premium","elevate","curated"]
check("A5 Words to Ban covers luxury, premium, elevate, curated", all(re.search(w, ban_tbl, re.I) for w in need), [w for w in need if not re.search(w, ban_tbl, re.I)])

# A6 gaps named in section 6
check("A6a gap: 'super funny' named", re.search(r"funny", gaps, re.I) is not None)
check("A6b gap: emoji clash named", re.search(r"emoji", gaps, re.I) is not None)
check("A6c gap: agency home page named", re.search(r"agency|home page", gaps, re.I) is not None)

# A3 award never stated as fact
award_lines = [l for l in g.splitlines() if re.search(r"award", l, re.I)]
check("A3 award only as CONFIRM/question/rule", all(re.search(r"CONFIRM|\?|not sure|unverified|check|never guess", l, re.I) for l in award_lines), award_lines)

# A7 noise never quoted
noise = ["We use cookies","Skip to content","All rights reserved","Sign up for 10% off"]
check("A7 noise not quoted as voice", not any(n in g for n in noise), [n for n in noise if n in g])

# A8 three examples, Before from home.txt agency line
n_before = len(re.findall(r"\*\*Before\*\*", ba))
check("A8 exactly 3 Before/After", n_before==3, n_before)
check("A8 one Before uses the home.txt agency line", "Elevate your living space" in ba)

# A9 tone scale: four scales
tone = section(r"^## 3\.", r"^## 4\.")
check("A9 four tone scales", all(re.search(p, tone, re.I) for p in ["Funny","Casual","Irreverent","Enthusiastic"]))

# A10 quick rules = 10
nums = re.findall(r"^\s*(\d+)\.\s", rules, re.M)
check("A10 exactly 10 Quick Rules", len(nums)==10, nums)

# A11 Afrikaans noted
check("A11 Afrikaans use noted (lekker/Sondag + English first)", re.search(r"lekker|Sondag", g) and re.search(r"English first", g, re.I))

# A12 ASPIRATION handled
check("A12 ASPIRATION label used for 'funny'", "ASPIRATION" in g)

wc = len(g.split())
check("A13 guideline under 1,800 words", wc < 1800, wc)
print(f"PASS {len(ok)}  FAIL {len(bad)}")
for b in bad: print("FAIL:", b)
