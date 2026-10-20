**NEVER DROP A ROW, NEVER INVENT A PRICE.**

**Step 2: Proposed column map.** Nothing is built yet. Your answers are applied:
1. "R 249.5" becomes 249.50 and the change is logged.
2. The 28/30/32 sizes use Option1 Name "Size". Duplicates stay HELD.
3. Colour goes into Tags in lower case, not into an option.

The preview figures below were printed by code from the source file. They are 13 product rows, 12 distinct item codes, 2 duplicate rows (HELD), 11 products to map and 20 variant rows. The tier limit is 500, so nothing goes over.

**Shopify: core 10 headers**

| Target header | Source column(s) | Rule applied | Confidence |
|---|---|---|---|
| Handle | Product | Built from the cleaned title: lower case, a-z, 0-9 and hyphens only. Suffix -2/-3 if two products clash (logged). | High |
| Title | Product | Trim spaces. ALL CAPS becomes Title Case (S-0001, S-0016). "Tshirt" becomes "T-shirt" (S-0008). Each change is logged. | Med |
| Body (HTML) | Desc | Supplier words kept, wrapped in `<p>…</p>`. The `<span style="color:red">` in S-0014 is stripped and logged. The 15" in S-0004 stays as is. | High |
| Vendor | none | The file has no vendor column, so I use the Order Card name "Fynbos Textiles" on every product and log it. | High |
| Type | none | The source has no category. Left blank. Flagged once per product in problem_rows ("client to send product type"). | High |
| Tags | Colour | Lower case, one cell, no duplicates. S-0013 has no colour, so its Tags stay blank and it is flagged. | Med |
| Published | Order Card, price | TRUE (Publish: yes). FALSE on any product whose price ends up blank. | High |
| Option1 Name | Sizes | "Size" when the product has sizes (including 28/30/32). Otherwise "Title". | High |
| Option1 Value | Sizes | Split on "/" and ",", trimmed. Spellings unified (see Low rows). No sizes gives "Default Title". | Low |
| Variant Price | Retail (ZAR) | Format change only. Every size row of a product carries that product's one price. | High |

**Extra Shopify headers I can fill**

| Target header | Source column(s) | Rule applied | Confidence |
|---|---|---|---|
| Variant SKU | ITEM CODE | Kept on single-variant products. Left blank on multi-size rows, because one code cannot be split into per-size SKUs without inventing them. Flagged once per product: "client to send size SKUs". | Low |
| Variant Compare At Price | Was | The only usable "Was" values (R399) are on the two duplicate Wool Beanie rows, which are HELD. S-0015 has #REF!, which is flagged and left blank. Proposal: omit this column. | Med |

I cannot fill these because the source has no data: Variant Inventory Qty, Variant Barcode, Variant Grams, Image Src, Image Alt Text, Option2 Name/Value (Colour is in Tags) and Status.

**Prices I would write (Retail column)**

| Source row | Raw | Output | Note |
|---|---|---|---|
| S-0001 | R 1 299,00 | 1299.00 | |
| S-0002 | R1,299 | 1299.00 | |
| S-0004 | POA | blank | Published FALSE, flagged |
| S-0007 | 1.099,00 | 1099.00 | |
| S-0008 | R 249.5 | 249.50 | Per your answer |
| S-0010 | R 1,2345 | blank | UNSURE, Published FALSE, flagged |
| S-0011 | 199-249 | blank | Range, Published FALSE, flagged |
| S-0013 | 0 | blank | Published FALSE, flagged |
| S-0014 | R 189,90 | 189.90 | |
| S-0015 | R 349 | 349.00 | Was = #REF!, flagged |
| S-0016 | $45 | 45.00 | Not converted. Flagged: "confirm the price is in ZAR" |
| S-0005, S-0006 | R299 | not written | Both HELD as duplicates |

**WooCommerce mapping** (Order Card: Meta: vendor)

| Target header | Source / rule | Confidence |
|---|---|---|
| Type | variable (multi-size parent), variation (each size), simple (no sizes) | High |
| SKU | ITEM CODE on simple rows and on variable parents. Variation SKUs left blank and flagged. | Med |
| Name | Title | Med |
| Published | 1 or 0, same rule as Shopify. A blank-price product gets 0 on the parent and on every variation. | High |
| Description | Body (HTML) | High |
| Categories | Blank (no source) | High |
| Tags | Colour, lower case | Med |
| Meta: vendor | "Fynbos Textiles" | High |
| Regular price | Price on variation and simple rows. Blank on parent rows. | High |
| Parent | Parent SKU on variation rows | High |
| Attribute 1 name / value(s) / visible / global | "Size"; parent lists all values, each variation holds one; visible 1, global 1 | High |

**Source columns and rows I will not use**
- **Was:** not written to the output, for the reasons above.
- **Title note, blank row, subtotal and repeat header (S-0003, S-0009, S-0012):** SKIPPED and logged. The subtotal "R 4 146,50" is a total, not a price.
- **Duplicate pair S-0005 and S-0006:** HELD.

**Low-confidence rows: 3 examples each**

*Variant SKU*
- FT-1001, sizes S/M/L: S, M and L rows all get a blank SKU, flagged once.
- FT-1005, sizes 28/30/32: 28, 30 and 32 rows get a blank SKU, flagged once.
- FT-1003, no sizes: Variant SKU = FT-1003.

*Option1 Value (the only spelling change)*
- S-0008 "Small" becomes "S".
- S-0008 "Medium" becomes "M".
- S-0008 "Lrg" becomes "L".

Waiting for your approval or changes before Step 3.
