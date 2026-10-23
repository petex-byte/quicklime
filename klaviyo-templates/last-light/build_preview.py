"""Render last-light.html with sample values for a browser preview.

Output: klaviyo-templates/last-light/preview.html (same folder, so img/ paths work).
The template itself is never changed.
"""
import pathlib
import re

HERE = pathlib.Path(__file__).resolve().parent
html = (HERE / "last-light.html").read_text(encoding="utf-8")

subs = {
    "{{ first_name|default:'Your' }}": "Anika, your",
    "{% web_view %}": '<a href="#" style="color:#8C96A8;">VIEW IN BROWSER</a>',
    "{% coupon_code 'REPLACE_COUPON_NAME' %}": "LASTLIGHT30",
    "{{ organization.name }}": "Kloof &amp; Co",
    "{{ organization.full_address }}": "Sample address, Cape Town",
    "{% manage_preferences %}": '<a href="#" style="color:#8C96A8; text-decoration:underline;">Manage preferences</a>',
    "{% unsubscribe %}": '<a href="#" style="color:#8C96A8; text-decoration:underline;">Unsubscribe</a>',
    "BRAND_NAME": "KLOOF &amp; CO.",
    "SUNSET_TIME": "18:42",
}
for k, v in subs.items():
    html = html.replace(k, v)
html = re.sub(r"https://example\.com[^\"']*", "#", html)
html = re.sub(r"https://[a-z.]+/@?REPLACE", "#", html)
html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex">', 1)

visible = re.sub(r"<!--(?!\[if|<!\[endif).*?-->", "", html, flags=re.S)
left = re.findall(r"\{\{.*?\}\}|\{%.*?%\}|REPLACE|BRAND_NAME|SUNSET_TIME", visible)
assert not left, left
(HERE / "preview.html").write_text(html, encoding="utf-8")
print("wrote", (HERE / "preview.html").relative_to(HERE.parent.parent))
