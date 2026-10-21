# SELF-CHECK

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Every clause in both versions is in the coverage count | PASS | EN 36 = 19 (chunk 1) + 17 (chunk 2). AF 35 = 19 + 16. Matches the Step 1 map. |
| 2 | Every quote copied exactly from the source | FAIL, FIXED | Re-checked every quote by exact text match against both files. F-011 quotes had the clause numbers ("9.1 ", "9.2 ") in front. F-015 joined two signature lines with " / ", which is not in the source. Fixed below: F-011 quotes the clause text only, F-015 quotes each line separately. All other quotes matched character for character. |
| 3 | No finding says which version is right or gives an opinion on the deal | PASS | Findings only show both texts and how they differ. |
| 4 | Every RED is M1, M2, M3, or an M6 that removes an obligation, right, amount or deadline | PASS | RED: F-001 M2, F-003 M1, F-004 M1, F-005 M1, F-007 M2, F-008 M3, F-010 M6 (removes an amount and an obligation), F-012 M3. |
| 5 | Report starts and ends with the one sentence | PASS | See below. |

---

I flag translation and text errors; I do not give legal advice.

## DOCUMENT
- English: "SUPPLY AGREEMENT" between FYNBOS TEXTILES (PTY) LTD and KAROO HOME (PTY) LTD. File: supply_agreement_EN.txt. Plain text, 62 lines, no page breaks.
- Afrikaans: "VERSKAFFINGSOOREENKOMS" between FYNBOS TEXTILE (EDMS) BPK and KAROO HOME (EDMS) BPK. File: verskaffingsooreenkoms_AF.txt. Plain text, 61 lines, no page breaks.
- Order FO-TEST-0003, Premium, BILINGUAL. Not scanned.

## COVERAGE
English: 36 clauses checked of 36. Afrikaans: 35 checked of 35.

## SUMMARY
| RED | AMBER | GREY | Total | UNSURE |
|---|---|---|---|---|
| 8 | 2 | 5 | 15 | 0 |

## FINDINGS TABLE

| ID | Sev | Code | EN clause | AF clause | English text (exact) | Afrikaans text (exact) | What doesn't match | Suggested fix (for the proofreader to confirm) |
|---|---|---|---|---|---|---|---|---|
| F-001 | RED | M2 | Parties block | Parties block | FYNBOS TEXTILES (PTY) LTD | FYNBOS TEXTILE (EDMS) BPK | Supplier's company name differs: "TEXTILES" in English, "TEXTILE" in Afrikaans. Registration number is the same in both (2019/123456/07). | Ask client which is intended |
| F-002 | GREY | M8 | 2.1 | 2.1 | This Agreement starts on 1 November 2026 and runs for 24 months. | Hierdie Ooreenkms begin op 1 November 2026 en duur vir 24 maande. | Typo in Afrikaans: "Ooreenkms" for the defined term "Ooreenkoms". Date and term match. | Change "Ooreenkms" to "Ooreenkoms" |
| F-003 | RED | M1 | 4.1 | 4.1 | The minimum order value is R25 000 (twenty thousand rand) per month. | Die minimum bestelwaarde is R25 000 (vyf-en-twintigduisend rand) per maand. | English figure and words disagree: R25 000 vs "twenty thousand". Afrikaans figure and words agree (R25 000 = vyf-en-twintigduisend). | Change English words to "twenty-five thousand rand" |
| F-004 | RED | M1 | 4.2 | 4.2 | Payment is due within 30 days of the invoice date. | Betaling is verskuldig binne 60 dae na faktuurdatum. | Payment period differs: 30 days in English, 60 dae in Afrikaans. | Ask client which is intended |
| F-005 | RED | M1 | 5.1 | 5.1 | The Supplier shall deliver the Goods within 5 Business Days of order confirmation. | Die Verskaffer moet die Goedere binne 5 dae na bevestiging van die bestelling lewer. | English says "Business Days" (defined term). Afrikaans says "dae", not "Werksdae". Business days vs days. | Ask client which is intended |
| F-006 | GREY | M8 | 5.2 | 5.2 | The Buyer shall recieve the Goods at its warehouse in Paarl. | Die Koper moet die Goedere by sy pakhuis in Paarl ontvang. | Typo in English: "recieve". Afrikaans is fine. | Change "recieve" to "receive" |
| F-007 | RED | M2 | 6.2 | 6.2 | The Buyer shall pay for transport insurance. | Die Verskaffer moet vir vervoerversekering betaal. | Paying party differs: the Buyer in English, die Verskaffer (the Supplier) in Afrikaans. Roles swapped. | Ask client which is intended |
| F-008 | RED | M3 | 7.1 | 7.1 | The Supplier shall replace defective Goods within 10 Business Days of written notice. | Die Leweransier mag gebrekkige Goedere binne 10 Werksdae na skriftelike kennisgewing vervang. | English "shall" (obligation) became Afrikaans "mag" (option). | Change "mag" to "moet" |
| F-009 | AMBER | M4 | 7.1 | 7.1 | The Supplier shall replace defective Goods within 10 Business Days of written notice. | Die Leweransier mag gebrekkige Goedere binne 10 Werksdae na skriftelike kennisgewing vervang. | Afrikaans uses "Leweransier". The defined term is "die Verskaffer" everywhere else in the Afrikaans. "Leweransier" is never defined. | Change "Leweransier" to "Verskaffer" |
| F-010 | RED | M6 | 8.3 | none | The insurance cover shall not be less than R1 000 000 per claim. | (no matching clause; Afrikaans clause 8 ends at 8.2) | Sub-clause in English only. Removes an amount and an obligation from the Afrikaans. | Ask client which is intended |
| F-011 | GREY | M7 | 9.1 (second) | 9.2 | A party may end this Agreement immediately if the other party breaches clause 4 and does not fix the breach within 7 days of written notice. | 'n Party kan hierdie Ooreenkoms onmiddellik beëindig indien die ander party klousule 4 verbreek en nie die verbreking binne 7 dae na skriftelike kennisgewing regstel nie. | English numbers two clauses "9.1". The second should follow as 9.2. Afrikaans numbers it 9.2. Content matches. | Renumber the second English "9.1" as "9.2" |
| F-012 | RED | M3 | 10.1 | 10.1 | The Buyer may not assign this Agreement without the Supplier's written consent. | Die Koper mag hierdie Ooreenkoms sonder die Verskaffer se skriftelike toestemming oordra. | Negation in English only. English: Buyer may NOT assign without consent. Afrikaans: Koper MAY assign without consent. | Change Afrikaans to "Die Koper mag hierdie Ooreenkoms nie sonder die Verskaffer se skriftelike toestemming oordra nie." |
| F-013 | AMBER | M5 | 11.2 | 11.2 | Subject to clause 11.3, any dispute not settled within 30 days goes to arbitration in Cape Town. | Behoudens klousule 11.3 word enige geskil wat nie binne 30 dae geskik is nie, na arbitrasie in Kaapstad verwys. | Both versions refer to clause 11.3. Neither version has a clause 11.3. Clause 11 ends at 11.2 in both. | Ask client which is intended |
| F-014 | GREY | M7 | 12 | 12 | Signed at __________ on [●] 2026. | Geteken te __________ op [●] 2026. | Blank fields in both: place (____) and day/month ([●]). Also blank in both: "Name: __________" for each party (Supplier and Buyer). | Fill all blank fields before signing (client to supply) |
| F-015 | GREY | M7 | 12 | 12 | For the Supplier: __________ Name: __________<br>For the Buyer: __________ Name: __________ | Namens die Verskaffer: __________ Naam: __________<br>Namens die Koper: __________ Naam: __________ | Signature blocks in both versions have no date line and no witness line. Same in both. | Ask client whether date and witness lines are wanted |

## UNPAIRED CLAUSES
| Version | Clause | Text |
|---|---|---|
| English only | 8.3 | The insurance cover shall not be less than R1 000 000 per claim. |
| Afrikaans only | none | |

Note: English has two clauses numbered 9.1. They pair with Afrikaans 9.1 and 9.2 by content (F-011).

## COULD NOT CHECK
Nothing. Both files are readable plain text. No scanned pages, images or cut-off text.

I flag translation and text errors; I do not give legal advice.
