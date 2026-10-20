# gig-engines/

The system prompts and step prompts a standard Claude model runs for the three gigs that lean on AI. Each file is self-contained: set-up, system prompt, step prompts, human checklist and a worked example.

| File | Gig | Hard rule |
| --- | --- | --- |
| `gig-3-legal-catch-net.md` | Legal proofreading, English vs Afrikaans | "I flag translation and text errors; I do not give legal advice." |
| `gig-4-csv-scrubber.md` | Supplier CSV → Shopify / WooCommerce import | Never drop a row, never invent a price. |
| `gig-5-brand-voice-extractor.md` | Website text or notes → Brand Voice Guideline | Every claim backed by an exact quote. No invented facts. |

**All three run offline.** Turn off web search and connectors in the Claude Project. They read only the files you upload. Gig 4 uses Claude's built-in code sandbox, which calls no outside service.

**How to use one:** paste the System Prompt (the fenced block in section 3) into a claude.ai Project's instructions. Then paste the step prompts one at a time in a fresh chat per order. Claude sees only those two things, never the rest of the file, so keep any rule it needs inside the System Prompt.
