**NEVER DROP A ROW, NEVER INVENT A PRICE.**

**Step 1: Read-only check of supplier_list.csv.** Nothing was changed. All numbers below were printed by code I ran on the file.

**1. File basics**

| Item | Result |
|---|---|
| File type | CSV, plain text |
| Encoding | ASCII (no BOM, so it is also valid UTF-8) |
| Delimiter | Comma |
| Line endings | LF, not CRLF |
| Columns | 7 on every line |
| Header row | Line 3 (lines 1 and 2 are a title note and a blank line) |
| Total lines in file | 19 |
| Source rows under the header | 16 (S-0001 to S-0016) |

**2. Columns**

The % blank is out of the 16 rows under the header. That count includes the junk rows listed in section 4.

| Column | 3 sample values | % blank |
|---|---|---|
| ITEM CODE | FT-1001, FT-1002, FT-1003 | 6.2 |
| Product | LINEN SHIRT - OLIVE, Linen Shirt - Sand, Canvas Tote | 12.5 |
| Desc | Relaxed fit. 100% linen, Holds a 15" laptop, Ribbed knit. Merino blend | 12.5 |
| Colour | Olive, Sand, Natural | 18.8 |
| Sizes | S/M/L, "S, M, L, XL", One Size | 56.2 |
| Retail (ZAR) | "R 1 299,00", R1,299, POA | 6.2 |
| Was | R399, Was, #REF! | 75.0 |

There is no vendor column, no tags column, no stock, no barcode, no weight and no image link.

**3. Price columns**

Both are text, not numbers.

| Column | Raw samples |
|---|---|
| Retail (ZAR) | "R 1 299,00", R1,299, POA, R299, R299 |
| Was | R399, R399, Was, #REF! (only 4 non-blank values exist) |

More Retail values I can see in the file: "1.099,00", "R 249.5", "R 4 146,50" (on the subtotal line), "R 1,2345", "199-249", 0, "R 189,90", "R 349", "$45".

**4. Junk rows**

| Source row | Type | What it is |
|---|---|---|
| Above S-0001 | Title note | "Fynbos Textiles - Retail price list Oct 2026" (line 1) and a blank line (line 2). They sit above the header, so they get no S-ID. |
| S-0003 | Blank row | All cells empty |
| S-0009 | Subtotal | "Subtotal shirts", "R 4 146,50" |
| S-0012 | Repeat header | Same text as the header row |

- **Duplicates:** S-0005 and S-0006 are identical (FT-1004, Wool Beanie). Under the rules both will be HELD.
- **Merged cells:** none found.
- **Markup in a description:** S-0014 has `<span style="color:red">` in Desc.
- **Odd prices:** S-0013 is 0, S-0015 has `#REF!` in Was, and S-0016 is in dollars.

**5. How variants appear**

Sizes are in one cell. The separators differ from row to row:
- "S/M/L" (S-0001)
- "S, M, L, XL" (S-0002)
- "28/30/32" (S-0007)
- "Small, Medium, Lrg" (S-0008)
- "One Size" (S-0005, S-0006)
- Blank for the rest.

Each source row is one product, so a multi-size row will become several variant rows.

**6. Questions for you**

1. **S-0008 price "R 249.5":** one digit after the separator is read as the decimal mark under the rules, so this becomes 249.50. May I do that and log it?
2. **S-0007 "28/30/32":** these are not clothing letter sizes. What should Option1 Name be (for example "Size" or "Waist")? Separately, the duplicate pair S-0005 and S-0006 will both be HELD unless you say otherwise.
3. **Colour column:** the Shopify core headers have no colour field. Should Colour become a second option, go into Tags, or be left out?

I'll wait for your answers before Step 2.
