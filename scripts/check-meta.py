#!/usr/bin/env python3
"""List every built, indexable page whose <title> is >60 chars or whose meta
description is outside 70-160 chars. Also flags ' , ' artifacts and stale years.
Run after `next build`. Exit 1 if any issue is found."""
import html, json, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent / '.next' / 'server' / 'app'
issues, n = [], 0
rows = []
for f in sorted(root.rglob('*.html')):
    rel = '/' + str(f.relative_to(root))[:-5]
    if rel in ('/_not-found', '/404', '/500') or rel.startswith('/_'):
        continue
    s = f.read_text(errors='ignore')
    head = s.split('</head>')[0]
    if re.search(r'<meta name="robots" content="[^"]*noindex', head):
        continue
    n += 1
    t = re.search(r'<title>(.*?)</title>', head, re.S)
    d = re.search(r'<meta name="description" content="(.*?)"', head, re.S)
    t = html.unescape(t.group(1)) if t else ''
    d = html.unescape(d.group(1)) if d else ''
    rows.append({'path': rel, 'title': t, 'description': d})
    if len(t) > 60: issues.append(f'TITLE {len(t)} {rel}: {t}')
    if not 70 <= len(d) <= 160: issues.append(f'DESC {len(d)} {rel}: {d}')
    if ' , ' in t or ' , ' in d: issues.append(f'COMMA {rel}: {t} / {d}')
    if re.search(r'\b202[45]\b', t + ' ' + d): issues.append(f'YEAR {rel}: {t} / {d}')
if len(sys.argv) > 1:
    pathlib.Path(sys.argv[1]).write_text(json.dumps(rows, indent=1))
print('\n'.join(issues))
kinds = {k: sum(i.startswith(k) for i in issues) for k in ('TITLE', 'DESC', 'COMMA', 'YEAR')}
print(f'indexable pages checked: {n}; issues: {kinds}')
sys.exit(1 if issues else 0)
