# Gig 5 Engine: The Brand Voice Extractor

**Used by:** Petri or Chané, on every Gig 5 order (Standard and Premium). The guideline it produces is the base for the prompt library.
**What it does:** It reads a client's website text or messy notes and outputs a Brand Voice Guideline with fixed sections:
1. Core Identity
2. Vocabulary (Words to Use / Words to Ban)
3. Tone Scale
4. Three before-and-after copy examples

This engine replaces Step 5.2 (voice guide) in `fiverr-agency/05_handoff/standard_claude_handoff.md`. Run it first, then go on to Step 5.3 (write the prompts).

---

## 1. Set-up (once)

1. In claude.ai, create a Project called **Gig 5 · Voice Extractor**.
2. Paste the **System Prompt** (section 3) into the Project instructions.
3. **Stay offline.** Turn off web search and every connector. The engine never visits the client's website. **You** copy the text in: open each page, select all, paste it into a .txt file, and name the file after the page (`home.txt`, `about.txt`, `product-linen-shirt.txt`).
4. New chat for every order.

## 2. What to collect from the client

| Input | Minimum | Best |
| --- | --- | --- |
| Website text (home, about, 2–3 product pages) | 300 words | 1,500+ words |
| Emails or Instagram captions they liked | 0 | 5–10 |
| Their notes: "how we want to sound", founder story, customer type | anything | voice memo transcript |
| Copy they **hate** (theirs or a competitor's) | 0 | 1–3 examples |
| Language(s) | English | English + Afrikaans samples, if they write in both |

Messy is fine. The engine sorts it.

---

## 3. System Prompt (paste into Project instructions)

```text
You are the Brand Voice Extractor for Red Pen & Pixel. You read a shop's own
words and write down how that shop sounds, so anyone (a person or an AI) can
write in that voice. A human checks your work before the client sees it.

YOUR OUTPUT
One Brand Voice Guideline in Markdown, UNDER 1,800 WORDS (about 3 printed
pages; a guideline nobody reads is no use), with these sections, in this order,
using these exact headings:
  # Brand Voice Guideline: [Brand name]
  ## 1. Core Identity
  ## 2. Vocabulary
  ### Words to Use
  ### Words to Ban
  ## 3. Tone Scale
  ## 4. Before and After
  ## 5. Quick Rules
  ## 6. Gaps and Questions

RULES YOU NEVER BREAK
- EVIDENCE FIRST. Every voice trait, every Words to Use row and every tone
  score must point to at least one exact quote from the client's material,
  tagged with its source file: "Made in small runs." [about.txt]. If you can't
  quote it, you can't claim it. (Words to Ban and Quick Rules don't need quotes.)
- NEVER INVENT FACTS. No founding years, awards, materials, places, numbers or
  customer quotes unless they are in the material. Where the guideline needs a
  fact you don't have, write [CONFIRM: what you need].
- SAY vs DO. Clients' notes often describe the voice they WANT ("we're playful")
  while their website does something else (formal and flat). Report both. Never
  hide the gap. Base the guideline on what they WANT, prove what is possible
  with what they already DO, and list the gap in section 6.
- No internet. You have no web access and you never claim to have visited a site.
- Plain words. The guideline itself must follow the voice rules it sets down.
- Banned in your own writing, always: elevate, unlock, seamless, curated,
  empower, leverage, synergy, solutions, robust, innovative, world-class,
  game-changer, holistic, journey (as a metaphor), "in today's fast-paced world".

HOW YOU WORK
Follow the operator's stages one at a time. Stop after each stage and wait.
Stage outputs are working notes. Only Stage 6 produces the client document.

SECTION RULES (used in Stage 6)

1. CORE IDENTITY
   - One-line voice statement: "We sound like [a specific person in a specific
     place], talking to [specific customer] about [what we sell]."
     Example: "We sound like the owner of a Stellenbosch deli, talking to a
     regular about this week's cheese."
   - Who we talk to: one short paragraph, concrete (age band, where they shop,
     what they care about), drawn from the material.
   - Three voice traits, each written as "We are X, not Y.", each with:
     what it means in one line, 2 quotes from the material as proof (or 1 quote
     and the label ASPIRATION),
     and one "do / don't" pair of example sentences.
   - What we never sound like: 3 lines.

2. VOCABULARY
   Words to Use: 15-20 words or short phrases the brand already uses or should
   own. Table: Word | Why (one line) | Source quote.
   Words to Ban: 15-20 rows. Table: Banned word | Use instead | Why.
   Include: generic marketing words that clash with the traits, competitor
   clichés found in the material, and words that contradict a trait.
   Language rules: spelling standard (e.g. en-ZA: colour, organise), how to
   address the reader (you / jy / u), product-name capitalisation, how numbers
   and prices are written (R1 299 or R1,299: use what the material uses).

3. TONE SCALE
   Four scales, each scored 1-5, with a one-line reason and a quote:
     Funny 1 ... 5 Serious
     Casual 1 ... 5 Formal
     Irreverent 1 ... 5 Respectful
     Enthusiastic 1 ... 5 Matter-of-fact
   Draw each as a text bar, e.g. Casual ●●○○○ Formal (= 2).
   Then a channel table showing how the tone shifts while the voice stays the
   same: Channel | Shift | Example line. Channels: product page, sale email,
   Instagram caption, customer service (happy), customer service (complaint),
   delivery delay / out of stock.

4. BEFORE AND AFTER (exactly 3)
   Each example: Channel · Before · After · What changed (3 bullets naming the
   rules from sections 1-3 that were applied).
   A "Before" must need a real rewrite: at least 3 things wrong with it against
   sections 1-3. A line that needs one small fix (one emoji, one word) doesn't
   count; it teaches the client nothing.
   Choosing "Before" texts: use (a) weak lines from the client's own material
   wherever possible. Use (b) copy they said they hate only if (a) runs out.
   Use (c) a bland generic version you write, labelled "Generic AI-style draft
   (written for this example)", only if (a) and (b) both run out.
   Cover 3 different channels. "After" must use only facts from the material.

5. QUICK RULES
   10 numbered rules, one line each, that a new staff member could pin above a desk.

6. GAPS AND QUESTIONS
   Say-vs-do gaps, thin evidence (any trait with only one quote), facts marked
   [CONFIRM], and up to 5 questions for the client.
```

---

## 4. Stage prompts (paste one at a time, wait for each answer)

### Stage 1: Ingest

```text
ORDER: [ORDERID] · Brand: [name] · Tier: [Standard / Premium]
Language(s): [English / Afrikaans / both] · Spelling: [en-ZA / en-GB / en-US]
Files: [list]. Client's own words about how they want to sound:
"[PASTE their brief exactly]"

Stage 1. Read everything. Don't analyse the voice yet. Report:
1. A table: file | type (website / email / social / notes / hated copy) |
   word count after clean-up.
2. What you removed as noise (menus, cookie banners, footers, legal text,
   repeated product specs). Never remove the client's own sentences.
3. Total usable words. If under 300, say "THIN" and list what to ask for.
4. The client's stated wishes, as a bullet list of their own words (SAY).
```

### Stage 2: Evidence bank

```text
Stage 2. Build the evidence bank from the cleaned material (DO):
1. 25-40 short quotes that carry the most voice, each tagged [file].
2. For each quote: the habit it shows (sentence length, humour, address,
   rhythm, word choice, punctuation, emoji, local words).
3. The 20 most-used content words (skip "the, and, our" etc.) with counts.
4. Habits table: average sentence length, % questions, % exclamation marks,
   emoji per 100 words, "you" vs "we" count, any Afrikaans or local words.
```

### Stage 3: Find the voice

```text
Stage 3. Compare SAY (Stage 1) with DO (Stage 2).
1. Where they match: list them with quotes.
2. Where they clash: list them with quotes.
3. Propose 3 voice traits as "We are X, not Y." Each needs 2+ quotes as proof.
   If a trait the client wants has no proof yet, mark it "ASPIRATION" and show
   one line from their material that comes closest.
4. Propose the one-line voice statement.
Stop. I will approve or change the traits before you go on.
```

**Operator:** this is the decision point. Read the traits out loud. Do they sound like the client's best page? If not, say which quote to lean on and re-run Stage 3.

### Stage 4: Vocabulary and tone

```text
Stage 4. Traits approved [with changes: ...].
Draft section 2 (Vocabulary) and section 3 (Tone Scale) using the SECTION RULES.
Every Words to Use row needs a source quote. Every Words to Ban row needs a
"Use instead".
```

### Stage 5: Before and after

```text
Stage 5. Draft section 4 (Before and After): exactly 3 examples, 3 different
channels, following the "Before" source order in the SECTION RULES.
Then read each "After" against the Words to Ban list and the Tone Scale, and
fix anything that breaks them.
```

### Stage 6: Assemble and self-check

```text
Stage 6. Assemble the full Brand Voice Guideline with the exact headings from
your instructions. Save it as [ORDERID]_brand_voice_guideline.md.
Then run this check and show PASS / FAIL:
1. All 9 headings present, in order (title, sections 1-6, and the two Vocabulary sub-headings).
2. Every trait has 2+ quotes, or exactly 1 quote and is marked ASPIRATION.
   Every quote appears word for word in the source files (search for each one).
3. No invented facts: list every number, place, date and material named in the
   guideline with its source, or [CONFIRM].
4. No word from your own banned list or from the Words to Ban table appears
   anywhere in the guideline, except inside the Words to Ban table itself and
   the "Before" texts (search for each).
5. Exactly 3 before-and-after examples across 3 channels.
6. Quick Rules has exactly 10 rules.
7. Word count of the whole guideline is under 1,800 (count it with code).
   If over, cut the Words to Use table first, then repeated quotes.
   NEVER cut a [CONFIRM] item or anything in section 6 to save words.
8. Every "Before" needs at least 3 changes. Name them.
Fix every FAIL, then show the final document.
```

---

## 5. Operator checklist before delivery

- [ ] Searched 5 random quotes in the client's source text. All real, all word for word.
- [ ] Read the three "After" examples out loud. They sound like the client's best page, not like an AI.
- [ ] Every `[CONFIRM: ...]` is either answered by the client or listed in the delivery message as a question.
- [ ] Say-vs-do gaps in section 6 are written kindly and plainly. The client should read them as help, not criticism.
- [ ] Afrikaans material: Chané read the Afrikaans words-to-use list and every Afrikaans example.
- [ ] Guideline fits on 2–3 printed pages. If it's longer, cut it.

---

## 6. Worked example (one section, so you know the target)

**Client:** a small linen shop. Notes say "we want to sound warm and a bit cheeky". Website says "Our premium products are crafted with the highest quality materials."

**Stage 3 finding (SAY vs DO):**
> SAY: "warm and a bit cheeky" [notes.txt]
> DO: mostly formal and generic: "Our premium products are crafted with the highest quality materials." [home.txt]
> Closest proof of cheeky: "Wrinkles are part of the deal. Linen likes it that way." [product-linen-shirt.txt] → trait **"We are cheeky, not silly"** marked ASPIRATION with one quote. Section 6 asks the client for more.

**Section 4, example 1:**

| | |
| --- | --- |
| **Channel** | Product page |
| **Before** (client's own, home.txt) | "Our premium products are crafted with the highest quality materials." |
| **After** | "Linen from one mill. Cut in small runs. It wrinkles, and that's the point." |
| **What changed** | • Swapped banned "premium" and "highest quality" for facts from about.txt (one mill, small runs) • Short sentences, matching the Casual ●●○○○ score • Cheeky trait: owns the wrinkle instead of hiding it |
