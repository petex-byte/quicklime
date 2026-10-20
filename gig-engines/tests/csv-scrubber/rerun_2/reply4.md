**NEVER DROP A ROW, NEVER INVENT A PRICE.**

**Step 4: Tests.** All 7 tests ran in code on the files on disk (`g4/work/tests.py`). There were no FAILs, so no fixes were needed and the table below is the final result. The price test uses a separate price reader from the one that built the files.

| # | Test | Result | Failing rows |
|---|---|---|---|
| 1 | Reconciliation adds up. Every source ID has one status. Every HELD row is in problem_rows. No HELD or SKIPPED row is in the output. | PASS | none |
| 2 | Price trace: every non-blank output price matches its source row's reformatted price | PASS | none |
| 3 | No price is 0, negative or has more than 2 decimals. Every blank-price product is Published FALSE / 0. | PASS | none |
| 4 | Header rows match the target lists exactly, in order | PASS | none |
| 5 | Shopify: handles valid and unique, every handle has a first row, no repeated option values in a handle | PASS | none |
| 6 | Woo: every variation's Parent matches a variable row's SKU | PASS | none |
| 7 | UTF-8, comma-separated, cells with commas or quotes are quoted | PASS | none |

**Printed counts**

| File | Data rows (header excluded) |
|---|---|
| FO-TEST-0001_shopify_import.csv | 20 |
| FO-TEST-0001_woocommerce_import.csv | 24 |
| FO-TEST-0001_change_log.csv | 69 |
| FO-TEST-0001_problem_rows.csv | 24 |

| Check | Result |
|---|---|
| Woo variable / variation / simple rows | 4 / 13 / 7 |
| Non-blank prices in the Shopify file | 16 |
| Non-blank prices in the Woo file | 16 |
| Products / variant rows (Shopify) | 11 / 20 |
| Source rows / MAPPED / HELD / SKIPPED | 16 / 11 / 2 / 3 |

**Price trace**
- 7 mapped products carry a price, and each matches its source: 1299.00 (S-0001, S-0002), 1099.00 (S-0007), 249.50 (S-0008, by your answer), 189.90 (S-0014), 349.00 (S-0015) and 45.00 (S-0016, flagged for a currency check).
- 4 mapped products have a blank price (S-0004, S-0010, S-0011, S-0013). All four are Published FALSE on Shopify and 0 on Woo.
