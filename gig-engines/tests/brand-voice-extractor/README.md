# Brand Voice Extractor test kit

A fictional shop (Karoo Home, linen, Prince Albert) with seven messy client files, planted traps, an answer key written before the run, and a grader.

## The traps (in `client_files/`)

| Trap | Where | Right handling |
| --- | --- | --- |
| Menus, cookie banner, footer, pop-up | home.txt, about.txt | removed as noise, never quoted |
| Agency fluff ("Elevate…premium…discerning") among real lines | home.txt | treated as not-their-voice; best "Before" |
| "we're super funny" but captions are only dry | notes.txt vs instagram.txt | ASPIRATION, not a proven trait |
| "NEVER use emojis" but 3 of 5 captions use one | notes.txt vs instagram.txt | named say-vs-do gap + question |
| "a friend who lives on a farm" with no farm anywhere | notes.txt | question, not used as fact |
| "won some kind of award…2022?? not sure" | notes.txt | [CONFIRM] only, never stated |
| "we HATE the word luxury" + competitor copy | notes.txt, hated-competitor.txt | luxury + competitor clichés banned |
| Two Afrikaans words | instagram.txt | noted, "English first" rule |

## Run a test

1. New chat in the **Gig 5 · Voice Extractor** Project. Upload the 7 files in `client_files/`.
2. Stage 1 Order Card: `ORDER: FO-TEST-0005 · Brand: Karoo Home · Tier: Premium · Language(s): English (some Afrikaans) · Spelling: en-ZA`. Client's words: *"Warm, a bit cheeky, never posh. Like a friend on a farm who has opinions."*
3. Operator answers used: no more material this week; drop the "Sign up" pop-up line; approve the 3 traits with "funny" folded into Trait 3; ban emojis everywhere for now.
4. Save the final guideline and grade it:
   ```bash
   python3 grade.py client_files path/to/guideline.md
   ```
   Expect `PASS 16  FAIL 0`. The grader checks every tagged quote word for word against the client files.

## First run (20 Oct 2026)

| | v1 (engine as first written) | v2 (after length + Before rules) |
| --- | --- | --- |
| Grader | 15 / 16 | **16 / 16** |
| Words | 3,127 | 1,761 |
| Tagged quotes, all word for word | 71 | 42 |
| Traps handled | all 8 | all 8 |

**What it did well:** caught every say-vs-do gap in Stage 1 before any analysis; found that the humour lives in the last 2–4 words of a line; labelled "funny" as an ASPIRATION instead of inventing proof; never stated the award; marked channel examples it had no evidence for as "built from the voice".

**What the run changed in the engine:**
1. **Length cap.** v1 was 3,127 words (about 6 pages). Now under 1,800, with 15–20 rows per vocabulary table, checked in Stage 6.
2. **Real "Before" examples.** v1's Example 2 only removed one emoji. Every Before now needs 3+ real changes.
3. **Never cut a flag to save words.** While trimming, v2 dropped the [CONFIRM] on care advice but kept "Skip the iron" on a general linen page. [CONFIRM] items and section 6 are now off-limits for cuts.

The third rule came from v2 and has not been re-run yet. v2 in `reference_output/` still lacks that care-advice flag.
