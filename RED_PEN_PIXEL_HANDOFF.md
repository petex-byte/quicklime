# Red Pen & Pixel: handoff for the next Claude session

**Read this first.** It holds everything a new session needs to carry on the Red Pen & Pixel work in this repo. The rest of the repo (Quicklime, the art-story site) is a separate project with its own `HANDOVER.md`. Don't touch it unless asked.

- **Repo:** `petex-byte/quicklime`
- **Branch:** `ccr-13c64072-nsau5m` (all work below is pushed here; no PR opened)
- **Last updated:** 20 Oct 2026

---

## 1. Who and what

- **The user:** runs **Red Pen & Pixel**, launching on Fiverr from South Africa as **one person** (Fiverr @redpenpixel, display name Le Roux Glanz). Services: Figma UI/UX, email design and HTML email, English/Afrikaans contract proofreading, plus two Claude-run gigs.
- **Owner's rule (21 Oct 2026): never use personal first names anywhere, and never present the studio as two people.** Write in the first person singular ("I"). No faces or names on the site, gig images or messages. Sign-offs use "Red Pen & Pixel". Don't claim personal history (e.g. years in law) unless the owner confirms it describes the account holder.
- **Writing rule the user set:** "pineapple words" (Mark Pollard / Sweathead). Concrete, picturable words only; no corporate jargon. Banned: empower, leverage, optimize, synergy, impactful, solutions, seamless, elevate, unlock, robust, innovative, world-class, holistic, streamline, game-changer, curated.
- **Standing user preference:** never change, delete or add anything in any Klaviyo account without the user's explicit approval. Nothing so far has touched Klaviyo; the email template is a local file only.
- **Domain:** `quicklime.co.za` confirmed; the site lives on `work.quicklime.co.za`.

## 2. What exists (all in this repo)

| Folder | What | State |
| --- | --- | --- |
| `fiverr-agency/` | Brand strategy (Target/Problem/Insight/Strategy), 3 names (pick: **Red Pen & Pixel**), 560-char bio, 5 gigs with 5-Benefits drill-downs, titles, tags, 3-tier prices + extras, Hyperframes storyboards, thumbnail text, subdomain wireframe, first SOP (`05_handoff/standard_claude_handoff.md`) | Done |
| `portfolio-site/` | Scroll-craft chaptered editorial page: layered paper/pen title page, 'catch it yourself' bilingual contract exercise, caught-it sheet, five-job index | **Live** at https://work.quicklime.co.za |
| `klaviyo-templates/` | `premium-master.html`: 12-module Klaviyo HTML email (VIP conditional, first name, unique coupon, cart loop, Outlook VML buttons, dark mode) + 3 snippets | Done, but **only checked in a browser**, never in Klaviyo preview or real inboxes |
| `gig-engines/` | System prompts + step prompts + human checklists for **Gig 3 Legal Catch-Net**, **Gig 4 CSV Scrubber**, **Gig 5 Brand Voice Extractor** | Done and **tested twice** (see §3) |
| `gig-engines/tests/` | One test kit per engine: planted-trap inputs, answer key, grader, operator script, first-run and re-run outputs | Done |
| `.claude/skills/outdoor-email-design/` | Updatable skill: research on how The North Face and Salomon run email (no specialist agency on record; both in house), module catalogue, 8-step workflow, QA list, update procedure. Research log in `references/research.md` | v0.1.0, 23 Oct 2026 |
| Figma: [Outdoor Email System](https://www.figma.com/design/x2tWZmy0qRVdKarpCg1SYt) | 4 token collections (47 variables), 11 text styles, 25 components and sets, 2 templates built only from instances. Starter plan: 1 mode per collection, 3 pages, so themes are variants and dark mode is checked in HTML | Built and audited 23 Oct 2026 (117 of 118 fills bound to tokens; the 1 is a deliberate translucent label chip) |

### Gig prices (USD, Basic / Standard / Premium)

1. UI/UX $150 / $450 / $1,200
2. Email $90 / $250 / $600
3. Legal $40 / $110 / $260
4. Data $60 / $160 / $380
5. Prompts $50 / $140 / $320

Full matrix: `fiverr-agency/02_gigs/gig_pricing_matrix.csv`.

## 3. Engine test results

Each engine was run **blind** by a fresh model (Sonnet). It saw only the system prompt and step prompts, as a claude.ai Project would. It was graded against an answer key written before the run.

| Engine | Run 1 | Fixes made after run 1 | Re-run (fixes in place) |
| --- | --- | --- | --- |
| CSV Scrubber | 47/47 file checks; chat summaries misreported 2 counts | every count must be printed by code; explicit foreign-currency rule | **47/47**; every number in replies and delivery message matches the files |
| Legal Catch-Net | 14/14 errors, 0 false alarms, advice bait refused; suggested fixes picked sides on meaning; disclaimer ×3 in Fiverr msg | no fixes on M1/M2/M3/M6 between versions; disclaimer once; refusal adds attorney line | **14/14, 0 false alarms**; 7.1 and 10.1 now "Ask client"; disclaimer once; attorney line present |
| Brand Voice Extractor | all 8 traps handled; 3,127 words; one weak Before (only an emoji); trimming cut a [CONFIRM] | ≤1,800 words; every Before needs 3+ changes; never cut [CONFIRM] or section 6 | **16/16**, 1,735 words, 3 strong Befores, [CONFIRM]s kept |

**Fixed after the re-run:** the Legal Catch-Net re-run quoted F-011 with its clause number ("9.1 A party…"). The engine now says quotes hold clause text only, and Step 4 check 2 tests for it. **Re-run 3 passed:** 14/14, 0 false alarms, all 15 quotes verbatim with no clause numbers (`tests/legal-catch-net/rerun_3/`).

### How to re-run a test

Full steps are in each `gig-engines/tests/*/README.md`. In short:

1. Extract the System Prompt and step prompts (the ```` ```text ```` blocks) from the engine file.
2. Give a fresh agent the system prompt, the test inputs and `operator_script.txt`. The agent handles one message at a time and writes `replyN.md`.
3. Grade the output:
   - CSV: `python3 grade.py <dir with output CSVs>`
   - Brand Voice: `python3 grade.py client_files <guideline.md>`
   - Legal: compare the Step 4 report with `answer_key.md` by hand.

## 4. Open items (in rough priority)

1. **Site is live** at https://work.quicklime.co.za (Vercel project `red-pen-pixel`, team petex-byte's projects, root `portfolio-site`). Rebuilt with scroll-craft on 20 Oct 2026; brief in `scrollcraft/builds/red-pen-pixel/BRIEF.md`. DNS already resolves (A 76.76.21.21); Vercel suggests moving to its newer IPs or a CNAME, optional. **Auto-deploys** (since 21 Oct): Vercel project linked to `petex-byte/quicklime`, production branch `ccr-13c64072-nsau5m`, root `portfolio-site`. Pushes that don't touch `portfolio-site/` are skipped.
   - **Register `redpenpixel` on Fiverr.** Every order link points to `fiverr.com/redpenpixel` and 404s until it exists. Swap in gig URLs once gigs are live.
   - No photos or names on the site, by the owner's rule.
   - Chapters III (email) and IV (screens) show the design work. The email is the real master with a labelled sample shop (`klaviyo-templates/build_sample.py`). The checkout is a labelled demo. **A real Figma prototype link would beat the demo**: embed it in chapter IV.
2. **Resume "Last Light" (dark sale template) in Figma** when Figma MCP calls work again. Stopped 23 Oct 2026: the Starter plan's MCP call cap was hit. Plan: `/root/.claude/plans/shimmying-doodling-flurry.md` (session-local; the steps are summarised here).
   - Done: tokens `color/night/*`, `color/beam/*` (VariableID 16:2 to 16:16) and text styles `Display/Countdown`, `Display/Night`. 4 Figma AI images generated (nodes 17:2 hero, 18:2 jacket, 19:2 headlamp, 20:2 boot; on whichever page Figma placed them). Copies are in `klaviyo-templates/last-light/img/`.
   - To do: read the 4 image hashes, delete the raw frames; add `Style=Amber` to Button (3:60); build components `Header / Dark`, `LL Hero`, `LL Countdown`, `LL Coupon`, `LL Spotlight` (Full/Half), `LL Spotlight pair`, `LL Beam divider`, `LL Data strip` at x≈1500 on Components; compose "Template · Last Light (sale, dark)" at x=1440 on Templates from instances only; QA (screenshot, instance-only audit, contrast table); add to the skill catalogue, v0.2.0.
   - **HTML version built 23 Oct 2026:** `klaviyo-templates/last-light/last-light.html` (Klaviyo-ready; timer is a GIF slot `REPLACE_TIMER_GIF_URL`, never hard-coded digits). `build_preview.py` renders the sample to `portfolio-site/samples/last-light.html` (live digits stand in for the GIF) and copies images to `samples/img/ll-*.jpg`. Site chapter III has a Master / Last Light switch. Checked in Chromium only; not yet in Outlook, Gmail or Klaviyo preview.
   - Starter also caps 3 pages and 1 variable mode. Professional (Full seat: 200 calls/day) removes the call cap.
3. **Fill placeholders:**
   - `[PORTFOLIO_URL]` and `[TRUST_SITE_URL]` in `fiverr-agency/03_visual/hyperframes_storyboard.md`.
   - `REPLACE_COUPON_NAME`, the three footer social links (`REPLACE`) and the brand tokens in the Klaviyo template. (The charset bug in the master was fixed 20 Oct.)
4. **Test the Klaviyo template** in Klaviyo's preview and in Litmus or real inboxes (Outlook desktop especially). **Ask before touching any Klaviyo account.**
5. **The owner reviews the Afrikaans** in `gig-engines/tests/legal-catch-net/verskaffingsooreenkoms_AF.txt` and the Legal engine's M2/M3 word hints.
6. **Check Fiverr's current limits** (gig video length/size, gallery image size, tag rules). The numbers in the storyboard came from memory.
7. **Render the Hyperframes videos** and drop the MP4s into `portfolio-site/media/` (specs in `media/README.md`).
8. Optional: open a PR from the branch when the user asks. No PR has been opened.

## 5. Working conventions used so far

- Commit and push every change to `ccr-13c64072-nsau5m`. Commit messages end with the Co-Authored-By / Claude-Session lines the session supplies.
- Customer-facing copy uses pineapple words. Prompts addressed to Claude use plain, concrete words too.
- Engine rules Claude needs must live **inside** the System Prompt block. A Project never sees the rest of the markdown file.
- Test before claiming something works; say plainly what wasn't tested.
