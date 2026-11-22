#!/usr/bin/env python3
"""Generate one static page per UPS model, plus SEO metadata tidy-ups.

Reads single-phase-products.js / three-phase-products.js, writes
/<family>/<model-id>/index.html, injects a crawlable "Available Models" list into the
family pages, and rewrites sitemap.xml. Idempotent: re-run after editing product data.
    python3 scripts/generate_model_pages.py
"""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://keptron.com'
TODAY = '2026-11-22'
e = lambda x: html.escape(x, quote=True)

def read(p): return open(os.path.join(ROOT, p), encoding='utf-8').read()
def write(p, s):
    os.makedirs(os.path.dirname(os.path.join(ROOT, p)), exist_ok=True)
    open(os.path.join(ROOT, p), 'w', encoding='utf-8').write(s)

def parse_products(js):
    out = []
    for blk in re.findall(r'\{\s*name:.*?details:\s*\[(?:.*?)\]\s*\}', js, re.S):
        g = lambda k: re.search(k + r':\s*"([^"]*)"', blk).group(1)
        details = re.findall(r'"([^"]*)"', re.search(r'details:\s*\[(.*?)\]', blk, re.S).group(1))
        out.append(dict(name=g('name'), id=g('id'), image=g('image'), details=details))
    return out

FAMILIES = [
    dict(path='single-phase-online-ups', file='single-phase-products.js', label='Single Phase Online UPS',
         title='Single Phase Online UPS 1-20 kVA | Keptron Electronics',
         desc='Single phase Industrial Online UPS from 1 kVA to 20 kVA by Keptron Electronics. Made in India since 1991. ISO, CE and BIS certified. Request a quotation.',
         product='Industrial Online UPS - Single Phase'),
    dict(path='three-phase-online-ups', file='three-phase-products.js', label='Three Phase Online UPS',
         title='Three Phase Online UPS 10-300 kVA | Keptron Electronics',
         desc='Three phase Industrial Online UPS from 10 kVA up to 300 kVA by Keptron Electronics. Made in India since 1991. ISO, CE and BIS certified. Request a quotation.',
         product='Industrial Online UPS - Three Phase'),
]
META = {  # page path -> (title, description)
    'about-us': ('About Keptron | UPS Manufacturer in India Since 1991', 'Keptron Electronics, established 1991, is an Indian manufacturer of Industrial Online UPS and Lift Inverters. ISO, CE and BIS certified.'),
    'contact-us': ('Contact Keptron | Online UPS & Lift Inverter Enquiries', 'Contact Keptron Electronics for Industrial Online UPS and Lift Inverter enquiries. Call +91 9987400719 or email info@keptronelectronics.com.'),
    'elevator-backup-system': ('Elevator Backup System for Power Failure | Keptron', 'Choose the right elevator backup system for your building. Keptron offers lift inverters and online UPS solutions for elevator power backup.'),
    'industrial-online-ups': ('Industrial Online UPS Manufacturer in India | Keptron', 'Keptron Electronics manufactures Industrial Online UPS systems in India since 1991. Single phase 1-20 kVA and three phase up to 300 kVA. Request a quote.'),
    'lift-inverter': (None, 'Keptron Lift Inverters keep elevators running during power failure. Indian manufacturer since 1991 for builders, elevator companies and dealers. Get a quote.'),
    'single-phase-online-ups': (FAMILIES[0]['title'], FAMILIES[0]['desc']),
    'three-phase-online-ups': (FAMILIES[1]['title'], FAMILIES[1]['desc']),
    'blogs.html': ('Industrial UPS & Lift Inverter Blog | Keptron', 'Guides and insights on Industrial Online UPS systems, lift inverters and elevator power backup from Keptron Electronics, an Indian manufacturer since 1991.'),
    'product-matrix.html': ('Online UPS Selection Matrix, 1-300 kVA | Keptron', 'Compare Keptron Industrial Online UPS models from 1 kVA to 300 kVA by input and output configuration. Request a quotation for UPS and lift inverter needs.'),
}
CRUMBS = {  # inner page -> breadcrumb trail
    'about-us': [('About', '/about-us/')], 'contact-us': [('Contact', '/contact-us/')],
    'elevator-backup-system': [('Elevator Backup System', '/elevator-backup-system/')],
    'industrial-online-ups': [('Industrial Online UPS', '/industrial-online-ups/')],
    'lift-inverter': [('Lift Inverter', '/lift-inverter/')],
    'single-phase-online-ups': [('Industrial Online UPS', '/industrial-online-ups/'), ('Single Phase Online UPS', '/single-phase-online-ups/')],
    'three-phase-online-ups': [('Industrial Online UPS', '/industrial-online-ups/'), ('Three Phase Online UPS', '/three-phase-online-ups/')],
}

def crumb_ld(trail):
    items = [('Home', '/')] + trail
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': SITE + u} for i, (n, u) in enumerate(items)]}

def ld_tag(obj): return '  <script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace('<', '\\u003c') + '</script>\n'

def set_head(s, title, desc, url, image=SITE + '/assets/logo.jpg'):
    s = re.sub(r'<title>.*?</title>', lambda m: f'<title>{e(title)}</title>', s, count=1, flags=re.S)
    s = re.sub(r'(name="description" content=")[^"]*', lambda m: m.group(1) + e(desc), s, count=1)
    s = re.sub(r'(property="og:title" content=")[^"]*', lambda m: m.group(1) + e(title), s, count=1)
    s = re.sub(r'(property="og:description" content=")[^"]*', lambda m: m.group(1) + e(desc), s, count=1)
    if 'og:title' not in s:
        og = (f'  <meta property="og:title" content="{e(title)}">\n  <meta property="og:description" content="{e(desc)}">\n'
              f'  <meta property="og:type" content="website">\n  <meta property="og:url" content="{url}">\n  <meta property="og:image" content="{image}">\n  <meta property="og:site_name" content="Keptron Electronics">\n')
        s = re.sub(r'(<link rel="canonical"[^>]*>\n)', lambda m: m.group(1) + og, s, count=1)
    s = re.sub(r'\s*<meta name="twitter:[^>]*>', '', s)
    tw = (f'\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="{e(title)}">\n'
          f'  <meta name="twitter:description" content="{e(desc)}">\n  <meta name="twitter:image" content="{image}">')
    s = re.sub(r'(<meta property="og:image"[^>]*>)', lambda m: m.group(1) + tw, s, count=1)
    return s

# ---- shared chrome taken from an existing generated page
ref = read('industrial-online-ups/index.html')
header = re.search(r'<header class="main-header">.*?</header>', ref, re.S).group(0)
footer = re.search(r'<footer>.*?</footer>', ref, re.S).group(0)
enquiry_tpl = re.search(r'<section class="enquiry-block" id="enquiry">.*?</section>', ref, re.S).group(0)

def enquiry(product):
    s = re.sub(r' selected', '', enquiry_tpl)
    return s.replace(f'<option value="{product}">', f'<option value="{product}" selected>')

def spec_rows(details):
    rows = ''
    for d in details:
        k, _, v = d.partition(':')
        rows += f'        <tr><th>{e(k.strip())}</th><td>{e(v.strip())}</td></tr>\n' if v else f'        <tr><th colspan="2">{e(d)}</th></tr>\n'
    return rows

def model_page(fam, p, siblings):
    url = f"{SITE}/{fam['path']}/{p['id']}/"
    title = f"{p['name']} | Keptron"
    title = title if len(title) <= 60 else f"{p['name']}"[:60]
    model = next((d.split(':', 1)[1].strip() for d in p['details'] if d.lower().startswith('model name')), '')
    bits = [d for d in p['details'] if not d.lower().startswith('country')]
    desc = f"Keptron {p['name']}. " + '; '.join(bits[:4]) + '. Made in India. Request a quotation.'
    desc = desc if len(desc) <= 158 else desc[:157].rsplit(' ', 1)[0] + '…'
    img = p['image']
    prod = {'@context': 'https://schema.org', '@type': 'Product', 'name': p['name'], 'description': desc, 'image': SITE + img,
            'brand': {'@type': 'Brand', 'name': 'Keptron'}, 'manufacturer': {'@type': 'Organization', 'name': 'Keptron Electronics'},
            'category': fam['label'], 'url': url}
    if model: prod['model'] = model
    other = ''.join(f'<li><a href="/{fam["path"]}/{o["id"]}/">{e(o["name"])}</a></li>' for o in siblings if o['id'] != p['id'])
    body = f'''    <nav class="breadcrumb" aria-label="Breadcrumb" style="padding:18px 4px;font-size:0.9rem;">
      <a href="/">Home</a> › <a href="/industrial-online-ups/">Industrial Online UPS</a> › <a href="/{fam['path']}/">{fam['label']}</a> › <span>{e(p['name'])}</span>
    </nav>
    <section class="page-header" style="padding-top:20px;">
      <h1>{e(p['name'])}</h1>
      <p>Made in India by Keptron Electronics since 1991</p>
    </section>
    <section class="content-section">
      <div style="display:grid;grid-template-columns:minmax(220px,360px) 1fr;gap:32px;align-items:start;">
        <img src="{img}" alt="{e(p['name'])}" width="480" height="480" style="width:100%;height:auto;border-radius:12px;">
        <div>
          <h2>Specifications</h2>
          <table>
{spec_rows(p['details'])}          </table>
          <p>Pricing is enquiry-based. Use the form below or <a href="tel:+919987400719">call +91 9987400719</a> for a quotation and datasheet.</p>
        </div>
      </div>
    </section>
    <section class="content-section">
      <h2>Other {e(fam['label'])} Models</h2>
      <ul>{other}</ul>
    </section>
    {enquiry(fam['product'])}'''
    page = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>x</title>
  <meta name="description" content="x">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Keptron Electronics">
  <link rel="canonical" href="{url}">
  <meta property="og:title" content="x">
  <meta property="og:description" content="x">
  <meta property="og:type" content="product">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{SITE}{img}">
  <meta property="og:site_name" content="Keptron Electronics">
  <link rel="icon" type="image/png" sizes="180x180" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="stylesheet" href="/style.css">
{ld_tag(prod)}{ld_tag(crumb_ld([('Industrial Online UPS', '/industrial-online-ups/'), (fam['label'], f"/{fam['path']}/"), (p['name'], f"/{fam['path']}/{p['id']}/")]))}</head>
<body>
  {header}

  <main class="container">
{body}
  </main>

  {footer}

  <script src="/menu.js"></script>
  <script src="/enquiry.js"></script>
</body>
</html>
'''
    page = set_head(page, title, desc, url, SITE + img)
    write(f"{fam['path']}/{p['id']}/index.html", page)
    return url

urls = []
for fam in FAMILIES:
    prods = parse_products(read(fam['file']))
    assert prods, fam['file']
    fam['urls'] = [model_page(fam, p, prods) for p in prods]
    urls += fam['urls']
    # static, crawlable model list on the family page
    listing = ('<!-- models:start -->\n    <section class="content-section">\n      <h2>Available Models</h2>\n      <ul>\n' +
               ''.join(f'        <li><a href="/{fam["path"]}/{p["id"]}/">{e(p["name"])}</a></li>\n' for p in prods) +
               '      </ul>\n    </section>\n    <!-- models:end -->')
    s = read(fam['path'] + '/index.html')
    s = re.sub(r'<!-- models:start -->.*?<!-- models:end -->', lambda m: listing, s, flags=re.S)
    if '<!-- models:start -->' not in s:
        s = s.replace('<section class="category-features">', listing + '\n\n    <section class="category-features">', 1)
    write(fam['path'] + '/index.html', s)

# ---- metadata tidy-up on existing pages
for key, (title, desc) in META.items():
    path = key if key.endswith('.html') else key + '/index.html'
    s = read(path)
    url = SITE + ('/' + key if key.endswith('.html') else f'/{key}/')
    if title is None: title = re.search(r'<title>(.*?)</title>', s, re.S).group(1)
    s = set_head(s, html.unescape(title), desc, url)
    if key in CRUMBS and 'BreadcrumbList' not in s:
        s = s.replace('</head>', ld_tag(crumb_ld(CRUMBS[key])) + '</head>', 1)
    write(path, s)
# homepage: keep client-supplied title/description, only add social tags
s = read('index.html')
t = html.unescape(re.search(r'<title>(.*?)</title>', s, re.S).group(1)); d = html.unescape(re.search(r'name="description" content="([^"]*)', s).group(1))
write('index.html', set_head(s, t, d, SITE + '/'))

# ---- sitemap
sm = read('sitemap.xml')
sm = re.sub(r'\s*<url>\s*<loc>[^<]*/(?:single|three)-phase-online-ups/[^/<]+/</loc>.*?</url>', '', sm, flags=re.S)
sm = sm.replace('</urlset>', ''.join(f'  <url>\n    <loc>{u}</loc>\n    <lastmod>{TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n' for u in urls) + '</urlset>')
write('sitemap.xml', sm)
print(f'Generated {len(urls)} model pages.')
