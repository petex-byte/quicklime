import glob, re
for p in glob.glob('**/*.html', recursive=True) + glob.glob('nx/**/*.js', recursive=True):
    s = open(p, encoding='utf-8').read()
    t = re.sub(r'(["\'(\s]|\\")/art/', r'\1art/', s)
    if t != s: open(p, 'w', encoding='utf-8').write(t); print('rewrote', p)
