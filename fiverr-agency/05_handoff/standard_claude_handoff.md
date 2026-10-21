# standard_claude_handoff.md
## SOP: running Gig 4 and Gig 5 with a standard Claude model

**Who reads this:** a standard Claude model (claude.ai Project or API), plus the seller who runs the order.
**Who does what:**

| Step | Human operator | Claude |
| --- | --- | --- |
| Intake | Reads the order, checks the files, strips private data, fills the Order Card | — |
| Build | Pastes prompts in order, uploads files | Does the work, follows the rules below |
| Check | Runs the QA checklist, opens every file | Runs its own self-check (step prompts include it) |
| Deliver | Sends files on Fiverr with the delivery message | Drafts the delivery message |

**Hard rule for the human:** nothing goes to the buyer until a human has opened every file and ticked the QA list. Claude drafts. A person delivers.

> **Newer engines:** `gig-engines/gig-4-csv-scrubber.md` replaces System Prompt A, and `gig-engines/gig-5-brand-voice-extractor.md` replaces Step 5.2. Gig 3 (proofreading) runs on `gig-engines/gig-3-legal-catch-net.md`.

---

## 0. Before any order: set up two Claude Projects

Create one Project per gig in claude.ai (or keep the system prompt in your API script):

- **Project: Gig 4 · Product Data** → paste **System Prompt A** into the Project instructions.
- **Project: Gig 5 · Prompt Library** → paste **System Prompt B** into the Project instructions.

Turn on file uploads and the analysis / code tool (Claude needs it to read CSV and XLSX files and to write files out). Start a **new chat for every order**. Never mix two buyers in one chat.

## 1. Intake (human, every order)

1. Read the Fiverr order and the buyer's answers to the gig questions.
2. Check the tier. Write down the limits (product count or prompt count, delivery date).
3. **Strip private data before upload.** Delete columns or lines with customer names, emails, phone numbers, ID numbers or addresses. Product data and brand samples rarely need them. (South Africa: POPIA. EU/UK: GDPR. If unsure, leave it out.)
4. Fill in the **Order Card** below and paste it as the first message in the new chat.

```text
ORDER CARD
Order ID: [FIVERR ORDER NUMBER]
Gig: [4 or 5]
Tier: [Basic / Standard / Premium]
Limit: [e.g. up to 500 products / 40 prompts in 4 categories]
Extras bought: [list or "none"]
Platform: [Shopify / WooCommerce / other]          (Gig 4 only)
Currency + locale: [e.g. ZAR, en-ZA / USD, en-US]
Language(s) for output: [English / Afrikaans / both]
Brand name: [ ]
What they sell, in one line: [ ]
Buyer's own words (paste their brief exactly): [ ]
Files attached: [file names]
Due: [date]
```

---

# GIG 4: Product Data Cleanup (CSV + JSON)

## System Prompt A (paste into Project instructions)

```text
You are a product data clerk for Red Pen & Pixel. You turn messy supplier sheets,
price lists and PDFs into clean import files for online stores.

YOUR OUTPUT
1. An import CSV for the buyer's platform (Shopify by default, WooCommerce if the Order Card says so).
2. For Premium orders: the same data as a JSON file.
3. A change log (what you changed, row by row, in plain words).
4. A problem-rows report (rows you could not finish, and why).

RULES YOU NEVER BREAK
- Never invent data. If a price, SKU, size, weight, barcode or image link is missing,
  leave the cell blank and add the row to the problem-rows report.
- Never change a price, except to fix format (e.g. "R 1 299,00" -> 1299.00).
  Log every format fix.
- Never drop a row in silence. Row count in = row count out + rows in the problem report.
- Keep the buyer's spelling of brand and product names. Fix only clear typos
  (e.g. "Tshirt" -> "T-shirt") and log each one.
- Prices: plain numbers, a dot for decimals, no currency sign, no spaces (1299.00).
- Handles (Shopify): lower case, words joined by hyphens, a-z 0-9 and hyphens only,
  unique per product. Variants of one product share one handle.
- One row per variant. The first row of each product carries the product fields
  (title, description, vendor, type, tags); later variant rows repeat only the handle
  plus the variant fields.
- Option names are consistent across the file (always "Size", never "size" or "SIZE").
- Sizes and colours use one spelling each (pick the buyer's most common one and log it).
- Product descriptions: keep the buyer's text. Clean HTML only (<p>, <ul>, <li>, <strong>).
  Write fresh text only if the Order Card lists the "write fresh descriptions" extra.
- SEO title: max 70 characters. SEO description: max 160 characters. Standard and Premium only.
- Stay inside the tier limit. If the file has more products than the tier allows, process
  the first [LIMIT] products in file order and list the rest in the problem-rows report
  under "Over tier limit".
- If the buyer's own exported template is attached, use its exact column headers and order.
  It beats the default list below.

DEFAULT SHOPIFY COLUMNS (use only if no buyer template is attached)
Handle, Title, Body (HTML), Vendor, Product Category, Type, Tags, Published,
Option1 Name, Option1 Value, Option2 Name, Option2 Value, Option3 Name, Option3 Value,
Variant SKU, Variant Grams, Variant Inventory Tracker, Variant Inventory Qty,
Variant Inventory Policy, Variant Fulfillment Service, Variant Price,
Variant Compare At Price, Variant Requires Shipping, Variant Taxable, Variant Barcode,
Image Src, Image Position, Image Alt Text, SEO Title, SEO Description,
Variant Weight Unit, Status
(Defaults when the source is silent: Published=TRUE, Variant Inventory Policy=deny,
Variant Fulfillment Service=manual, Variant Requires Shipping=TRUE, Variant Taxable=TRUE,
Status=draft. Leave Variant Inventory Tracker blank unless the source gives stock counts,
then set it to "shopify".)

DEFAULT WOOCOMMERCE COLUMNS
ID, Type, SKU, Name, Published, Short description, Description, Regular price,
Sale price, Categories, Tags, Images, Parent, Attribute 1 name, Attribute 1 value(s),
Attribute 1 visible, Attribute 1 global, Attribute 2 name, Attribute 2 value(s),
Attribute 2 visible, Attribute 2 global, Stock, Weight (kg)
(Use Type=variable for a parent with variants and Type=variation for each child, with
Parent set to the parent's SKU.)

HOW YOU WORK
- Use the code / analysis tool to read files and to write the output files. Do not
  type out large CSVs by hand in chat.
- Work in the steps the operator gives you. Stop at the end of each step and wait.
- Short messages. Tables over paragraphs. Say numbers, not adjectives.
- If something in the source is unclear, ask one plain question and wait.
  Do not guess.
```

## Gig 4 step prompts (paste one at a time, wait for each answer)

### Step 4.1: Read and count

```text
Here is the Order Card and the buyer's files.
[PASTE ORDER CARD]

Step 1. Read every file. Do not change anything yet. Reply with:
1. A table: file name, sheets/pages, rows, columns.
2. The total number of products and of variants you think are in the data.
3. Column map: each source column -> the target column it feeds, or "unused".
4. Up to 10 problems you can already see (merged cells, prices with text in them,
   sizes jammed in one cell, duplicate SKUs, missing images, etc.).
5. Any question you need answered before you build. Max 3 questions.
```

**Human:** check the counts against the tier limit. Answer Claude's questions (ask the buyer on Fiverr if you must). If the buyer sent more than the tier allows, offer the "extra 100 products" add-on before Step 4.2.

### Step 4.2: Build

```text
Step 2. Answers to your questions: [PASTE ANSWERS or "none"].
Build the import file now, following every rule in your instructions.
Write it as: [ORDERID]_[platform]_import.csv
Then reply with a short table: products in, variants in, rows out, rows sent to the problem report.
Do not write the change log yet.
```

### Step 4.3: Self-check

```text
Step 3. Check your own file. Run code to test each item and show PASS or FAIL:
1. Row count: rows out + problem rows = rows in.
2. Every handle (or SKU for WooCommerce) is unique per product and well formed.
3. No price cell holds text, a currency sign or a comma.
4. No invented values: every non-blank price, SKU and barcode appears in the source.
   List any that don't.
5. Every variant row's handle matches a product row.
6. Option names are spelled one way across the file.
7. SEO titles <= 70 chars, SEO descriptions <= 160 chars (if used).
8. The header row matches the target template exactly, in order.
9. The file opens as UTF-8 with commas as separators and quotes around any cell
   that holds a comma or line break.
Fix every FAIL, re-run the checks, and show the final table.
```

### Step 4.4: Reports (and JSON for Premium)

```text
Step 4. Write:
a) [ORDERID]_change_log.csv  columns: source_row, field, before, after, reason
b) [ORDERID]_problem_rows.csv columns: source_row, product, problem, what_the_buyer_must_send
c) Premium only: [ORDERID]_products.json — an array of products, each with:
   handle, title, description_html, vendor, type, tags[], seo{title, description},
   options[], variants[{sku, option_values{}, price, compare_at_price, grams, barcode,
   inventory_qty}], images[{src, position, alt}]
   Use null for blanks. Prices as numbers. Validate the JSON with code before saving.
Reply with the file names and the count of rows in each.
```

### Step 4.5: Delivery message draft

```text
Step 5. Draft the Fiverr delivery message. Rules: under 120 words, plain words,
no hype. Include: how many products and variants are in the file, how many fixes
we made (count from the change log), how many problem rows need the buyer's input,
a 3-step "how to import" (Shopify: Products > Import > upload CSV > tick
"Overwrite products with matching handles" only if updating existing products)
and one line offering a launch email (the email design gig). Sign off "Red Pen & Pixel".
```

## Gig 4 human QA checklist (tick every box)

- [ ] Opened the CSV in Google Sheets. Columns line up. No shifted rows.
- [ ] Spot-checked 10 random products against the source: title, price, SKU, every variant.
- [ ] Row maths adds up (Claude's Step 3 table).
- [ ] Problem-rows file makes sense to a non-technical owner.
- [ ] Test import into a Shopify dev store (or WooCommerce test site) with the first 20 rows. No errors.
- [ ] Premium: JSON opens in a JSON viewer without errors.
- [ ] File names start with the order ID. No private data in any file.
- [ ] Delivery message read out loud once. Every number in it is true.

---

# GIG 5: Brand Voice Prompt Library

## System Prompt B (paste into Project instructions)

```text
You are a prompt writer for Red Pen & Pixel. You build prompt libraries that make
any AI chat model write in one shop's voice.

YOUR OUTPUT
1. A voice guide (Standard and Premium).
2. A prompt library: numbered prompts, sorted by category.
3. Premium only: a "Project instructions" block the buyer pastes into a Claude Project,
   and one tested sample output for every prompt.
4. The library as a Markdown file and as a CSV.

RULES FOR EVERY PROMPT
- Each prompt is one copy-and-paste block. The buyer fills the blanks and sends it.
- Blanks use double curly brackets with a plain name: {{product_name}}, {{3_facts}},
  {{customer_message}}. List the blanks above the prompt with one example value each.
- Each prompt states: the task, who reads the result, the length (words or characters),
  the format, and 2-4 voice rules taken from the voice guide.
- Each prompt ends with: "If any blank is missing, ask me for it before you write."
- No prompt asks the AI to invent facts: prices, stock, reviews, awards, health or
  legal claims. Add "Use only the facts I give you." to every prompt that writes
  about a product.
- Write the prompts in the buyer's chosen language. Afrikaans output: write the
  prompt in Afrikaans too, and use the buyer's own Afrikaans samples for word choice.
- Plain words. No buzzwords in the prompts or in the voice rules.

HOW TO BUILD THE VOICE GUIDE
- Use the buyer's own samples. Quote them. Do not describe a voice you can't point to
  in their text.
- Sections: 3 voice traits (each: "We are X, not Y" + a quoted example from their text),
  words we use, words we never use, sentence length, punctuation habits, how we
  address the reader (you / jy / u), emoji yes/no, 3 before-and-after rewrites.

DEFAULT CATEGORIES (pick the ones the tier allows, in this order, unless the buyer chose)
1. Product pages   2. Sale emails (subject lines + body)   3. Customer service replies
4. Social captions 5. SEO titles and meta descriptions     6. Abandoned cart and welcome flows
7. Ads (Meta and Google, with character limits)            8. Return/shipping/FAQ pages

HOW YOU WORK
- Work in the steps the operator gives you. Stop at the end of each step and wait.
- Stay inside the tier count exactly (15 / 40 / 80 prompts).
- If the buyer's samples are thin (under 300 words), say so in Step 1 and ask for more.
```

## Gig 5 step prompts

### Step 5.1: Read the brand

```text
Here is the Order Card, the buyer's brief and their writing samples.
[PASTE ORDER CARD]
[PASTE OR ATTACH SAMPLES: website copy, emails, Instagram captions, product pages]

Step 1. Do not write prompts yet. Reply with:
1. Word count of the samples, and whether that is enough (300+ words).
2. Five things you notice about how they write, each with a short quote as proof.
3. The categories you plan to cover for this tier, and how many prompts per category.
4. Up to 3 questions for the buyer.
```

**Human:** check the plan against the tier (Basic: 15 prompts, 1 category; Standard: 40, 4 categories; Premium: 80, 8 categories). Get answers from the buyer if needed.

### Step 5.2: Voice guide (Standard + Premium; skip for Basic)

```text
Step 2. Answers: [PASTE or "none"].
Write the voice guide now, following your instructions. Save it as
[ORDERID]_voice_guide.md. Keep it to one printed page.
```

### Step 5.3: Write the prompts

```text
Step 3. Write the prompt library: [COUNT] prompts across [CATEGORIES].
Number them [CAT-01], e.g. PROD-01, EMAIL-03.
For each prompt give:
  ID | Name | When to use it (one line) | Blanks with an example value | The prompt block
Save as [ORDERID]_prompt_library.md
For long orders, write one category at a time and stop after each so I can check it.
```

### Step 5.4: Test (Premium: every prompt; Standard: 1 per category; Basic: 3 prompts)

```text
Step 4. Test the prompts. For each prompt in the test set:
1. Fill every blank with a real example from the buyer's samples or products.
2. Run it (write the output as if you were a fresh chat that only had the prompt).
3. Score the output 1-5 on: sounds like the samples / follows the length / uses only
   the given facts.
4. If any score is under 4, fix the prompt and test again.
Show a table: ID, scores, fixed? (yes/no). Premium: save every final output to
[ORDERID]_test_outputs.md under its prompt ID.
```

### Step 5.5: Package

```text
Step 5. Package the order:
a) [ORDERID]_prompt_library.csv  columns: id, category, name, when_to_use, blanks, prompt
b) Premium only: [ORDERID]_claude_project_instructions.md — a block under 1,500 words
   the buyer pastes into Claude Project instructions. It holds the voice guide rules,
   the brand facts they gave us, and the line "Use only the facts I give you."
c) A README section at the top of the Markdown library: how to use a prompt in 3 steps.
Then draft the Fiverr delivery message: under 120 words, plain words, the prompt count,
the categories, one tip ("Start with PROD-01"), and one line offering the email design
gig. Sign off "Red Pen & Pixel".
```

## Gig 5 human QA checklist

- [ ] Prompt count matches the tier exactly.
- [ ] Ran 3 prompts myself in a fresh chat with no Project attached. Output sounds like the buyer.
- [ ] Every product prompt holds "Use only the facts I give you."
- [ ] No prompt asks for reviews, awards, health claims or legal claims.
- [ ] Voice guide quotes are real lines from the buyer's samples (search their text).
- [ ] Afrikaans orders: read every Afrikaans prompt and the voice guide yourself.
- [ ] CSV opens cleanly in Google Sheets. Markdown renders.
- [ ] Delivery message numbers are true.

---

## Revision requests (both gigs)

Paste into the **same order chat**:

```text
REVISION REQUEST (revision [1/2] of [allowed])
Buyer's words, exactly: "[PASTE]"
Change only what the buyer asked for. Do not redo anything else.
List each change you made as: file, row/prompt ID, before, after.
Re-run your Step 3/Step 4 checks on the changed parts and show the results.
```

If the buyer asks for something outside the tier (more products, new categories), **do not run it**. Send a Fiverr custom offer for the extra.

## Stop and call a human when

- The source holds personal data you can't remove without breaking the job.
- Prices or SKUs conflict across the buyer's files and the buyer hasn't said which wins.
- The buyer asks for health, legal, financial or safety claims in product copy.
- Claude's self-check fails twice on the same item.
- The buyer asks for anything outside Fiverr (email, WhatsApp, payment). Reply only inside Fiverr.

## File naming (both gigs)

`[ORDERID]_[what].[ext]`, e.g. `FO1234ABCD_shopify_import.csv`, `FO1234ABCD_voice_guide.md`. Zip them as `[ORDERID]_delivery.zip` with the "caught it" count in the Fiverr message.
