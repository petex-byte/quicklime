"""Render last-light.html with sample values for a browser preview.

Outputs:
  klaviyo-templates/last-light/preview.html   (local, uses img/)
  portfolio-site/samples/last-light.html      (site sample, uses img/ll-*.jpg)
The template itself is never changed. The timer GIF slot is replaced by
live-text digits that tick in the browser, standing in for the GIF.
"""
import pathlib
import re
import shutil

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
# Stand-in for the timer GIF: live digits, counting down to 18:42 SAST.
def unit(label, key, colour="#FFFFFF"):
    return (f'<td align="center" style="padding:0 10px;"><div class="display digits" data-t="{key}" '
            f'style="font-family:\'Archivo\',\'Arial Black\',Arial,sans-serif; font-weight:800; font-size:64px; '
            f'line-height:64px; color:{colour}; font-variant-numeric:tabular-nums;">00</div>'
            f'<div class="mono" style="font-family:\'IBM Plex Mono\',\'Courier New\',monospace; font-size:11px; '
            f'letter-spacing:2px; color:#8C96A8; padding-top:8px;">{label}</div></td>')
colon = ('<td class="display digits" style="font-family:\'Archivo\',Arial,sans-serif; font-weight:800; '
         'font-size:64px; line-height:64px; color:#2A3140; vertical-align:top;">:</td>')
timer = ('<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" '
         'aria-label="Time left until sunset"><tr>' + unit("HOURS", "h") + colon + unit("MIN", "m") + colon
         + unit("SEC", "s", "#FFD38A") + "</tr></table>")
html = re.sub(r"<!--TIMER-->.*?<!--/TIMER-->", timer, html, flags=re.S)
script = """<script>
(function(){
  function next(){var n=new Date(),t=new Date(n);t.setUTCHours(16,42,0,0);if(t<=n)t.setUTCDate(t.getUTCDate()+1);return t;}
  var end=next(),els={};['h','m','s'].forEach(function(k){els[k]=document.querySelector('[data-t='+k+']');});
  function p(v){return (v<10?'0':'')+v;}
  function tick(){var d=Math.max(0,Math.floor((end-new Date())/1000));
    els.h.textContent=p(Math.floor(d/3600));els.m.textContent=p(Math.floor(d%3600/60));els.s.textContent=p(d%60);
    if(!d)end=next();}
  tick();setInterval(tick,1000);
})();
</script>
</body>"""
html = html.replace("</body>", script, 1)
html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex">', 1)

visible = re.sub(r"<!--(?!\[if|<!\[endif).*?-->", "", html, flags=re.S)
left = re.findall(r"\{\{.*?\}\}|\{%.*?%\}|REPLACE|BRAND_NAME|<!--TIMER|SUNSET_TIME", visible)
assert not left, left
ROOT = HERE.parent.parent
(HERE / "preview.html").write_text(html, encoding="utf-8")
print("wrote", (HERE / "preview.html").relative_to(ROOT))

site = ROOT / "portfolio-site" / "samples"
(site / "img").mkdir(parents=True, exist_ok=True)
for img in sorted((HERE / "img").glob("*.jpg")):
    shutil.copyfile(img, site / "img" / f"ll-{img.name}")
    html = html.replace(f"img/{img.name}", f"img/ll-{img.name}")
(site / "last-light.html").write_text(html, encoding="utf-8")
print("wrote", (site / "last-light.html").relative_to(ROOT))
