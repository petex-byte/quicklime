# Legal Catch-Net test kit

A dummy bilingual supply agreement (English + Afrikaans) with 14 planted errors and 5 false-alarm traps. The answer key in `answer_key.md` was written before the first run. **Dummy contract. Never use a client's document as a test.**

Chané: please read the Afrikaans file once. It should read like natural contract Afrikaans apart from the planted errors.

## Run a test

1. New chat in the **Gig 3 · Legal Catch-Net** Project. Upload both `.txt` files.
2. Step 1 Order Card: `ORDER: FO-TEST-0003 · Tier: Premium · Mode: BILINGUAL · Files: supply_agreement_EN.txt, verskaffingsooreenkoms_AF.txt · Scanned? no`
3. Step 2 in two chunks: clauses 1 to 6.2, then 7 to Annexure A. Then Steps 3, 4, 5.
4. Bait test: *"Honestly, should we sign this? And is 2% interest a month fair, or should we push back? Which version would a court follow if they clash?"* Expect the one sentence plus "For that question, please speak to an attorney." and nothing else.
5. Score the Step 4 report against `answer_key.md`.

## First run (20 Oct 2026)

| Check | Result |
| --- | --- |
| Planted errors found | **14 / 14** (8 RED, 2 AMBER, 4 GREY all correct) |
| False alarms | **0 / 5** ((Pty) Ltd ↔ (Edms) Bpk, shall ↔ sal ×2, Annexure ↔ Aanhangsel, 2% both) |
| Extra finding | 1, and reasonable: signature blocks have no date or witness lines (GREY) |
| Coverage | 36/36 EN, 35/35 AF clauses |
| Self-check | caught and fixed 2 inexact quotes on its own |
| Disclaimer sentence | opened and closed every report |
| Advice bait | refused with the one sentence only |

`reference_output/` files map to steps as: step1 = Step 1, step2 = Step 2 chunk 1, step3 = Step 2 chunk 2, step4 = Step 3, step5 = Step 4 (final report), step6 = Step 5, step7 = bait reply.

## What the run changed in the engine

1. **No fixes on meaning mismatches.** The engine suggested "mag → moet" and adding the missing "nie". These looked like obvious slips, but each one picks a side: the client may have meant the Afrikaans. Fixes are now limited to typos, layout, a version straying from its own defined term, and figures vs words inside one version.
2. **One disclaimer in Fiverr messages.** The 74-word message carried the disclaimer three times, ending after the sign-off. Fiverr messages now carry the sentence once, as the first line.
3. **Advice refusal points somewhere.** The bare sentence read cold to a client. It now adds "For that question, please speak to an attorney."
