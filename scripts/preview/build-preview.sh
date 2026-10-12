#!/usr/bin/env bash
# Build a static, self-contained preview of the site that can be published as a
# claude.ai Artifact (or opened from any folder / sub-path).
#
#   npm run preview            # builds into .preview/out
#
# Why each step exists:
#   - output:"export" + assetPrefix "./"  → plain HTML files with relative assets
#   - PreviewLink shim                    → flat page names (home.html, artist-<slug>.html)
#   - _next → nx                          → artifact paths starting with "_" are reserved
#   - U+FFFD escaped                      → the artifact upload rejects that raw character
#   - relart.py                           → "/art/..." becomes "art/..." so images load under a sub-path
# The real site (Vercel) never uses any of this; it builds from next.config.ts as-is.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
HERE="$ROOT/scripts/preview"
P="$ROOT/.preview"

rm -rf "$P" && mkdir -p "$P"
cd "$ROOT"
# Committed files only, plus the working-tree images and content (so uncommitted edits show up).
git archive HEAD | tar -x -C "$P"
cp -R src public "$P"/
ln -s "$ROOT/node_modules" "$P/node_modules"
cd "$P"

printf 'import type { NextConfig } from "next";\nconst nextConfig: NextConfig = { output: "export", trailingSlash: true, assetPrefix: "./" };\nexport default nextConfig;\n' > next.config.ts
cp "$HERE/PreviewLink.tsx" src/components/PreviewLink.tsx
grep -rl 'from "next/link"' src | xargs sed -i 's#import Link from "next/link";#import Link from "@/components/PreviewLink";#'
node scripts/make-sizes.mjs > /dev/null
npx next build > build.log 2>&1 || { tail -40 build.log; exit 1; }

cd out
mv index.html home.html
mv artists/index.html artists.html
for d in artists/*/; do s=$(basename "$d"); mv "$d/index.html" "artist-$s.html"; done
rm -rf artists 404 404.html ./*.txt art/.gitkeep
mv _next nx && grep -rl "_next" . | xargs sed -i 's#_next/#nx/#g; s#/_next#/nx#g'
python3 - <<'PY'
import glob
for p in glob.glob('nx/**/*.js', recursive=True):
    s = open(p, encoding='utf-8').read()
    if '�' in s:
        open(p, 'w', encoding='utf-8').write(s.replace('�', '\\uFFFD'))
PY
python3 "$HERE/relart.py" > /dev/null
cp "$HERE/launcher.html" quicklime-preview.html
find . -type f ! -name quicklime-preview.html | sed 's#^\./##' \
  | python3 -c 'import sys,json; print(json.dumps({l.strip(): l.strip() for l in sys.stdin}, indent=0))' > ../files.json
echo "Preview built: $P/out ($(find . -type f | wc -l) files). Entry page: quicklime-preview.html"
echo "Supporting-file map for the Artifact publish: $P/files.json"
