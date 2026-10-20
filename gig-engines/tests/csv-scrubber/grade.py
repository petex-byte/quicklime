import csv, sys, collections
D=sys.argv[1].rstrip("/")+"/FO-TEST-0001_"
rd=lambda f: list(csv.DictReader(open(D+f, encoding="utf-8", newline="")))
sh, wo, cl, pr = rd("shopify_import.csv"), rd("woocommerce_import.csv"), rd("change_log.csv"), rd("problem_rows.csv")
ok=[]; bad=[]
def check(name, cond, detail=""):
    (ok if cond else bad).append(name + ("" if cond else f"  -> {detail}"))

# Answer key
KEY_PRICE = {"FT-1001":"1299.00","FT-1002":"1299.00","FT-1005":"1099.00","FT-1006":"249.50",
             "FT-1010":"189.90","FT-1011":"349.00","FT-1012":"45.00"}
BLANK = {"FT-1003":"Canvas Tote","FT-1007":"Leather Belt","FT-1008":"Throw Blanket","FT-1009":"Soy Candle"}
SIZES = {"FT-1001":["S","M","L"],"FT-1002":["S","M","L","XL"],"FT-1005":["28","30","32"],"FT-1006":["S","M","L"]}
CORE = ["Handle","Title","Body (HTML)","Vendor","Type","Tags","Published","Option1 Name","Option1 Value","Variant Price"]

hdr = next(csv.reader(open(D+"shopify_import.csv")))
check("Shopify core 10 headers first, in order", hdr[:10]==CORE, hdr[:10])
check("Shopify row count = 20", len(sh)==20, len(sh))
# group by handle
g=collections.OrderedDict()
for r in sh: g.setdefault(r["Handle"],[]).append(r)
check("11 products (handles)", len(g)==11, list(g))
check("No beanie in output (HELD)", not any("beanie" in h for h in g), list(g))
title_of = {rows[0]["Title"]:rows for rows in g.values()}
def rows_for(word): return next((rows for t,rows in title_of.items() if word.lower() in t.lower()), None)
names={"FT-1001":"Olive","FT-1002":"Sand","FT-1005":"Cord","FT-1006":"shirt basic","FT-1010":"Napkin","FT-1011":"Apron","FT-1012":"Towel"}
for sku,p in KEY_PRICE.items():
    rows=rows_for(names[sku]); check(f"{sku} price {p} on every variant", rows and all(r["Variant Price"]==p for r in rows), rows and [r["Variant Price"] for r in rows])
for sku,t in BLANK.items():
    rows=rows_for(t); check(f"{sku} {t}: price blank + Published FALSE", rows and all(r["Variant Price"]=="" for r in rows) and rows[0]["Published"].upper()=="FALSE", rows and (rows[0]["Variant Price"],rows[0]["Published"]))
for sku,sz in SIZES.items():
    rows=rows_for(names[sku]); check(f"{sku} sizes {sz}", rows and [r["Option1 Value"] for r in rows]==sz and rows[0]["Option1 Name"]=="Size", rows and [r["Option1 Value"] for r in rows])
for h,rows in g.items():
    for r in rows[1:]:
        if r["Title"] or r["Vendor"]: bad.append(f"variant row of {h} repeats product fields")
check("Handles valid", all(h and h==h.lower() and "--" not in h and not h.startswith("-") and not h.endswith("-") and all(c.isalnum() or c=="-" for c in h) for h in g))
check("No price is 0 or has >2 decimals", all(r["Variant Price"]=="" or (float(r["Variant Price"])>0 and len(r["Variant Price"].split(".")[-1])==2) for r in sh))
nap=rows_for("Napkin"); check("span stripped from napkins", nap and "<span" not in nap[0]["Body (HTML)"] and "Pre-washed" in nap[0]["Body (HTML)"], nap and nap[0]["Body (HTML)"])
check("Kitchen towel ALL CAPS fixed", any(t=="Kitchen Towel - Stripe" for t in title_of), list(title_of))
check("Type left blank (not invented)", all(r["Type"]=="" for r in sh), {r["Type"] for r in sh})
check("Vendor = Fynbos Textiles on product rows", all(rows[0]["Vendor"]=="Fynbos Textiles" for rows in g.values()))

# Woo
types=collections.Counter(r["Type"] for r in wo)
check("Woo: 4 variable / 13 variation / 7 simple", types==collections.Counter({"variable":4,"variation":13,"simple":7}), dict(types))
skus={r["SKU"] for r in wo if r["Type"]=="variable"}
check("Woo: every variation's Parent is a variable SKU", all(r["Parent"] in skus for r in wo if r["Type"]=="variation"))
check("Woo: parent rows have blank price", all(r["Regular price"]=="" for r in wo if r["Type"]=="variable"))
wp=[r for r in wo if r["Name"] in BLANK.values()]
check("Woo: blank-price products Published 0", len(wp)==4 and all(r["Published"]=="0" for r in wp), [(r["Name"],r["Published"]) for r in wp])

# Ledger
st={}
for r in cl:
    s=r["source_row"]
    if s.startswith("S-"): st.setdefault(s,set()).add(r["status"])
for r in pr:
    if r["source_row"].startswith("S-"): st.setdefault(r["source_row"],set()).add(r["status"])
expect={**{f"S-{i:04d}":"MAPPED" for i in [1,2,4,7,8,10,11,13,14,15,16]}, "S-0005":"HELD","S-0006":"HELD","S-0003":"SKIPPED","S-0009":"SKIPPED","S-0012":"SKIPPED"}
for s,e in expect.items():
    check(f"{s} status {e} (one status only)", st.get(s)=={e}, st.get(s))
check("$ currency flagged on S-0016", any(r["source_row"]=="S-0016" and ("$" in r["problem"] or "USD" in r["problem"]) for r in pr))
check("#REF! flagged on S-0015", any(r["source_row"]=="S-0015" and "REF" in r["problem"] for r in pr))

print(f"PASS {len(ok)}  FAIL {len(bad)}")
for b in bad: print("FAIL:", b)
