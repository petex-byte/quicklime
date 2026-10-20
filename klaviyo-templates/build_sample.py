"""Render premium-master.html with a sample shop for the portfolio site.

Fills every Klaviyo tag with fixed sample values so the email opens in a
browser. Output: portfolio-site/samples/email.html. Re-run after editing
the master. The master itself is never changed.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "klaviyo-templates" / "premium-master.html"
OUT = ROOT / "portfolio-site" / "samples" / "email.html"

CART = [
    ("img/p1.svg", "Wool overshirt", "Size M", 1, "1299.00"),
    ("img/p2.svg", "Knit beanie", "Rust", 1, "299.00"),
]

html = SRC.read_text(encoding="utf-8")


def cart_block(m):
    body = m.group(1)
    loop = re.search(r"\{% for item in [^%]+%\}(.*?)\{% endfor %\}", body, re.S)
    rows = []
    for img, title, variant, qty, price in CART:
        row = loop.group(1)
        row = re.sub(r"\{\{ item\.product\.images\.0\.src\|default:'[^']*' \}\}", img, row)
        row = row.replace("{{ item.product.title }}", title)
        row = re.sub(r"\{% if item\.variant_title %\}\{\{ item\.variant_title \}\} · \{% endif %\}", variant + " · ", row)
        row = row.replace("{{ item.quantity }}", str(qty))
        row = row.replace("{{ item.line_price|floatformat:2 }}", price)
        rows.append(row)
    body = body[: loop.start()] + "".join(rows) + body[loop.end():]
    return body.replace("{{ event.extra.checkout_url }}", "#")


html = re.sub(r"\{% if event\.extra\.line_items %\}(.*?)\{% endif %\}\s*(?=<!-- ▲ 05)", cart_block, html, flags=re.S)
html = re.sub(r"\{% if person\|lookup:'Loyalty Tier' == 'VIP' %\}.*?\{% else %\}(.*?)\{% endif %\}", r"\1", html, flags=re.S)

subs = {
    "{{ first_name|default:'friend' }}": "Anika",
    "{{ first_name|default:'Hello' }}": "Anika",
    "{% web_view %}": '<a href="#" style="color:#8E877C;">View in your browser</a>',
    "{% coupon_code 'REPLACE_COUPON_NAME' %}": "KLOOF-7QK2",
    "{{ organization.name }}": "Kloof &amp; Co.",
    "{{ organization.full_address }}": "Sample address, Cape Town",
    "{% manage_preferences %}": '<a href="#" style="color:#8E877C;">Manage preferences</a>',
    "{% unsubscribe %}": '<a href="#" style="color:#8E877C;">Unsubscribe</a>',
    "Real customer name &middot; Verified buyer": "Sample review &middot; shown for layout",
    "https://placehold.co/280x64/FFFFFF/1A1A1A/png?text=BRAND_NAME": "img/logo-light.svg",
    "https://placehold.co/280x64/1C1B19/F2EEE7/png?text=BRAND_NAME": "img/logo-dark.svg",
    "https://placehold.co/1200x900/EFE6DA/1A1A1A/png?text=Hero+1200x900": "img/hero.svg",
    "https://placehold.co/500x625/EFE6DA/1A1A1A/png?text=Product+1": "img/p1.svg",
    "https://placehold.co/500x625/E4DED3/1A1A1A/png?text=Product+2": "img/p2.svg",
    "https://placehold.co/500x625/E4DED3/1A1A1A/png?text=Product+3": "img/p3.svg",
    "https://placehold.co/500x625/EFE6DA/1A1A1A/png?text=Product+4": "img/p4.svg",
    "https://placehold.co/500x500/E4DED3/1A1A1A/png?text=Workshop": "img/workshop.svg",
    'alt="Product 1 name"': 'alt="Wool overshirt"',
    'alt="Product 2 name"': 'alt="Knit beanie"',
    'alt="Product 3 name"': 'alt="Leather tote"',
    'alt="Product 4 name"': 'alt="Cord trousers"',
    "BRAND_NAME": "Kloof &amp; Co.",
}
for k, v in subs.items():
    html = html.replace(k, v)
html = re.sub(r"https://example\.com[^\"']*", "#", html)
# Links in a sample go nowhere; keep the visitor on the page.
html = html.replace('target="_blank"', "")
html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex">\n<base target="_self">', 1)

visible = re.sub(r"<!--(?!\[if|<!\[endif).*?-->", "", html, flags=re.S)  # author notes may mention tags
left = re.findall(r"\{\{.*?\}\}|\{%.*?%\}|placehold\.co|REPLACE_", visible)
assert not left, left
OUT.write_text(html, encoding="utf-8")
print("wrote", OUT.relative_to(ROOT), len(html), "bytes")
