# Red Pen & Pixel: handoff for the next Claude session

**Read this first.** It holds everything a new session needs to carry on the Red Pen & Pixel work in this repo. The rest of the repo (Quicklime, the art-story site) is a separate project with its own `HANDOVER.md`. Don't touch it unless asked.

- **Repo:** `petex-byte/quicklime`
- **Branch:** `ccr-13c64072-nsau5m` (all work below is pushed here; no PR opened)
- **Last updated:** 20 Oct 2026

---

## 1. Who and what

- **The user:** runs a two-person studio, **Red Pen & Pixel**, launching on Fiverr from South Africa.
  - **Petri:** Figma UI/UX, email design, HTML email.
  - **Chané:** 10 years in law; English/Afrikaans contract proofreading.
  - Plus two Claude-run gigs.
- **Writing rule the user set:** "pineapple words" (Mark Pollard / Sweathead). Concrete, picturable words only; no corporate jargon. Banned: empower, leverage, optimize, synergy, impactful, solutions, seamless, elevate, unlock, robust, innovative, world-class, holistic, streamline, game-changer, curated.
- **Standing user preference:** never change, delete or add anything in any Klaviyo account without the user's explicit approval. Nothing so far has touched Klaviyo; the email template is a local file only.
- **Domain:** the user typed `work.quicklim.co.za`. We used `work.quicklime.co.za` (matches this repo). **Still unconfirmed**; ask once.

## 2. What exists (all in this repo)

| Folder | What | State |
| --- | --- | --- |
| `fiverr-agency/` | Brand strategy (Target/Problem/Insight/Strategy), 3 names (pick: **Red Pen & Pixel**), 560-char bio, 5 gigs with 5-Benefits drill-downs, titles, tags, 3-tier prices + extras, Hyperframes storyboards, thumbnail text, subdomain wireframe, first SOP (`05_handoff/standard_claude_handoff.md`) | Done |
| `portfolio-site/` | Static site for `work.quicklime.co.za`: hero, video slots with skeleton fallbacks, before/after contract slider, Fiverr order list, light/dark, keyboard keys | Done. Live preview artifact (private): https://claude.ai/artifact/CGstyoHKvB4U5pVi7URro8 |
| `klaviyo-templates/` | `premium-master.html`: 12-module Klaviyo HTML email (VIP conditional, first name, unique coupon, cart loop, Outlook VML buttons, dark mode) + 3 snippets | Done, but **only checked in a browser**, never in Klaviyo preview or real inboxes |
| `gig-engines/` | System prompts + step prompts + human checklists for **Gig 3 Legal Catch-Net**, **Gig 4 CSV Scrubber**, **Gig 5 Brand Voice Extractor** | Done and **tested twice** (see §3) |
| `gig-engines/tests/` | One test kit per engine: planted-trap inputs, answer key, grader, operator script, first-run and re-run outputs | Done |

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

**Known minor issue:** the Legal Catch-Net re-run quoted F-011 with its clause number ("9.1 A party…"), so the quote isn't exact. Run 1's self-check caught this; the re-run didn't. Chané's checklist covers it. Possible fix: in Step 4 check 2, say "quotes exclude the clause number".

### How to re-run a test

Full steps are in each `gig-engines/tests/*/README.md`. In short:

1. Extract the System Prompt and step prompts (the ```` ```text ```` blocks) from the engine file.
2. Give a fresh agent the system prompt, the test inputs and `operator_script.txt`. The agent handles one message at a time and writes `replyN.md`.
3. Grade the output:
   - CSV: `python3 grade.py <dir with output CSVs>`
   - Brand Voice: `python3 grade.py client_files <guideline.md>`
   - Legal: compare the Step 4 report with `answer_key.md` by hand.

## 4. Open items (in rough priority)

1. **Confirm the domain** (quicklime vs quicklim).
2. **Fill placeholders:**
   - `REPLACE_USERNAME` and the gig slugs in `portfolio-site/index.html`.
   - `[PORTFOLIO_URL]` and `[TRUST_SITE_URL]` in `fiverr-agency/03_visual/hyperframes_storyboard.md`.
   - `REPLACE_COUPON_NAME` and the brand tokens in the Klaviyo template.
3. **Test the Klaviyo template** in Klaviyo's preview and in Litmus or real inboxes (Outlook desktop especially). **Ask before touching any Klaviyo account.**
4. **Chané reviews the Afrikaans** in `gig-engines/tests/legal-catch-net/verskaffingsooreenkoms_AF.txt` and the Legal engine's M2/M3 word hints.
5. **Check Fiverr's current limits** (gig video length/size, gallery image size, tag rules). The numbers in the storyboard came from memory.
6. **Render the Hyperframes videos** and drop the MP4s into `portfolio-site/media/` (specs in `media/README.md`).
7. Optional: open a PR from the branch when the user asks. No PR has been opened.

## 5. Working conventions used so far

- Commit and push every change to `ccr-13c64072-nsau5m`. Commit messages end with the Co-Authored-By / Claude-Session lines the session supplies.
- Customer-facing copy uses pineapple words. Prompts addressed to Claude use plain, concrete words too.
- Engine rules Claude needs must live **inside** the System Prompt block. A Project never sees the rest of the markdown file.
- Test before claiming something works; say plainly what wasn't tested.
