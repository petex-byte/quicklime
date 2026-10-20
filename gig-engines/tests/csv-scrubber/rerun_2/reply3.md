**NEVER DROP A ROW, NEVER INVENT A PRICE.**

**Step 3: Files built.** Your changes are applied:
- Multi-size products have a blank Variant SKU on every size row, flagged once per product as "client to send size SKUs".
- Single-variant products keep ITEM CODE as Variant SKU.
- Variant Compare At Price is omitted, because no mapped row needs it.

The scripts are in `/tmp/claude-0/-home-user-quicklime/eee8f167-296e-5815-8d89-4eab1e664b27/scratchpad/rerun/g4/work/`.

**Files written to `g4/out/`**
- `FO-TEST-0001_shopify_import.csv` (11 headers: the core 10 plus Variant SKU)
- `FO-TEST-0001_woocommerce_import.csv` (14 headers)
- `FO-TEST-0001_change_log.csv`
- `FO-TEST-0001_problem_rows.csv`

**Reconciliation** (printed by code from the files on disk)

| source rows | MAPPED | HELD | SKIPPED | adds up? | rows flagged in problem_rows |
|---|---|---|---|---|---|
| 16 | 11 | 2 | 3 | yes | 13 (11 MAPPED, 2 HELD) |

- **HELD:** S-0005 and S-0006, each marked "duplicate of" the other (FT-1004, Wool Beanie). Neither is in the output.
- **SKIPPED:** S-0003 (blank), S-0009 (subtotal), S-0012 (repeat header).
- **Above the header:** the title note and the blank line above the header are not source rows and have no S-ID.

**What the files contain**

| File | Rows | Detail |
|---|---|---|
| Shopify | 20 data rows | 11 products |
| WooCommerce | 24 data rows | 4 variable, 13 variation, 7 simple |
| change_log | 69 lines | |
| problem_rows | 24 lines | 13 source rows, listed below |

**Problem rows by kind**
- **Blank price, product set to Published FALSE (Woo 0): 4 products.**
  - S-0004 (POA)
  - S-0010 ("R 1,2345", unsure)
  - S-0011 (range 199-249)
  - S-0013 (0)
- **Client to send size SKUs: 4 products.** S-0001, S-0002, S-0007 and S-0008.
- **Currency to confirm:** S-0016, "$45", kept as 45.00 and not converted.
- **Bad "Was" value:** S-0015 has #REF!, so no compare-at price is written.
- **Colour blank:** S-0013.
- **Type blank:** every product has no type in the source. This is one problem line per product and can be filtered out.
- **Duplicates:** S-0005 and S-0006.

**Decisions to check**
- Prices written: 1299.00 (two products), 1099.00, 249.50, 189.90, 349.00 and 45.00. Each traces to one source price.
- On Woo, the parent SKU is the source ITEM CODE. Variation SKUs are blank, and the size-SKU flag covers them.
- On Shopify, Option1 Name appears on the first row of each product only. The later size rows carry the option value.

Waiting for Step 4.
