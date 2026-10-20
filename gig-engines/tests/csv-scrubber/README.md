# CSV Scrubber test kit

A messy supplier file with 14 planted traps, an answer-key grader, and the output from the first blind run (20 Oct 2026, all 47 checks passed).

## Run a test

1. New chat in the **Gig 4 · CSV Scrubber** Project. Upload `supplier_list.csv`.
2. Paste the Step 1 prompt with this Order Card:
   `ORDER: FO-TEST-0001 · Tier: Standard 500 products · Platform: both · Woo vendor column: Meta: vendor · Vendor name if missing: Fynbos Textiles · Currency: ZAR · Publish: yes · Files: supplier_list.csv`
3. Operator answers used in the reference run:
   - Step 2: `R 249.5` → 249.50 is fine; option name "Size" for 28/30/32; beanie stays HELD; Colour goes to Tags in lower case. **Don't supply Type.** The engine should leave it blank and flag it.
   - Step 3: blank Variant SKU on multi-size rows; omit Variant Compare At Price; keep the $ flag.
4. Download the four output files into a folder and grade them:
   ```bash
   python3 grade.py path/to/folder
   ```
   Expect `PASS 47  FAIL 0`.

## The traps

| Source row | Trap | Right answer |
| --- | --- | --- |
| above header | title banner + blank line | header found on line 3 |
| S-0001 | `R 1 299,00`, sizes `S/M/L`, ALL CAPS title | 1299.00 × 3 sizes, "Linen Shirt - Olive" |
| S-0002 | `R1,299` | 1299.00 (comma = thousands) |
| S-0003 | blank row | SKIPPED |
| S-0004 | `POA` | price blank, Published FALSE, flagged |
| S-0005 / S-0006 | same SKU, identical rows | both HELD, never deleted |
| S-0007 | `1.099,00` | 1099.00 (dot = thousands, comma = decimal) |
| S-0008 | `R 249.5`, sizes `Small, Medium, Lrg` | 249.50; sizes S, M, L |
| S-0009 | subtotal row with a price | SKIPPED, price never used |
| S-0010 | `R 1,2345` | UNSURE: blank, unpublished, flagged |
| S-0011 | `199-249` range | blank, unpublished, flagged |
| S-0012 | repeat header row | SKIPPED |
| S-0013 | `0`, no colour | blank, unpublished, flagged |
| S-0014 | `<span style>` in description | stripped, words kept |
| S-0015 | `#REF!` in Was column | flagged, not used |
| S-0016 | `$45` in a ZAR order | 45.00, not converted, flagged |

Reconciliation: 16 = 11 MAPPED + 2 HELD + 3 SKIPPED. Shopify 20 rows; Woo 4 variable / 13 variation / 7 simple.

## What the first run taught us

- **Files: perfect.** Every price traced, every row accounted for, Type left blank instead of guessed, `$45` flagged without being told to.
- **Chat summaries: not always right.** The engine said "14 variations" and "15 prices" when the files held 13 and 16. The engine now has to print every count from code. Still check the numbers in the delivery message against the files.
