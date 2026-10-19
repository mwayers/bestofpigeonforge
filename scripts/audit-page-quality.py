#!/usr/bin/env python3
import csv, json, re
from pathlib import Path
from collections import defaultdict, Counter
root=Path(__file__).resolve().parent.parent
data=root/'data'
out=root/'docs'/'seo-page-quality-inventory-2026-07-26.csv'
files=[p for p in data.glob('*.json') if p.name!='attractions.json']
rows=[]; slug_types=defaultdict(list)
for p in files:
    d=json.loads(p.read_text())
    if not isinstance(d,list): continue
    for r in d:
        if isinstance(r,dict):
            rows.append((p.stem,r)); slug_types[str(r.get('slug',''))].append(p.stem)
valid=set(slug_types)
rx_placeholder=re.compile(r'Content placeholder|\$XX|\bTBD\b|\bTODO\b|lorem ipsum',re.I)
rx_dummy=re.compile(r'^(Tip|FAQ|Answer)\s*\d+\??$',re.I)

def strings(x):
    if isinstance(x,str): yield x
    elif isinstance(x,list):
        for y in x: yield from strings(y)
    elif isinstance(x,dict):
        for y in x.values(): yield from strings(y)

result=[]
for page_type,r in rows:
    vals=list(strings(r)); text=' '.join(vals)
    wc=len(re.findall(r"\b[\w’'-]+\b",text))
    placeholder=bool(rx_placeholder.search(text) or any(rx_dummy.match(v.strip()) for v in vals))
    broken=[s for s in (r.get('relatedSlugs') or []) if s not in valid]
    duplicate=len(slug_types.get(str(r.get('slug','')),[]))>1
    body=len(r.get('bodySections') or [])
    if placeholder: recommendation='QUARANTINE_PLACEHOLDER'
    elif duplicate: recommendation='REVIEW_DUPLICATE_CANONICAL'
    elif wc<300: recommendation='NOINDEX_UNTIL_UPGRADED'
    elif broken: recommendation='FIX_LINKS_BEFORE_INDEXING'
    else: recommendation='REVIEW_FOR_PRIORITY_INDEXING'
    result.append({
      'page_type':page_type,'slug':r.get('slug',''),'estimated_words':wc,
      'body_sections':body,'placeholder_or_dummy':str(placeholder).lower(),
      'duplicate_slug':str(duplicate).lower(),'broken_related_count':len(broken),
      'broken_related_slugs':'|'.join(broken),'recommendation':recommendation
    })
with out.open('w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=result[0].keys(), lineterminator='\n')
    w.writeheader()
    w.writerows(result)
print(out)
print('rows',len(result))
print('recommendations',dict(Counter(r['recommendation'] for r in result)))
