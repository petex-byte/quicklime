# Deploy and DNS cutover

## Vercel preview (do first)

1. Import `petex-byte/quicklime` into Vercel. Framework: Next.js. No env vars needed yet.
2. Every push to a branch gets a preview URL. QA happens there.

## Before touching DNS

- [ ] In Afrihost, export the full zone for quicklime.co.za.
- [ ] **Check the MX records.** If mail runs through the domain, keep the MX, SPF, DKIM and DMARC records exactly as they are. Only the apex A record and the `www` CNAME move.
- [ ] Confirm `pipeline.quicklime.co.za` is its own record, and leave it alone.
- [ ] Lower the TTL on the records that will change to 300s, a day ahead.

## Cutover (last step, after QA passes on the preview URL)

1. Vercel → Project → Domains: add `quicklime.co.za` and `www.quicklime.co.za`.
2. In Afrihost, keep the nameservers and change only the apex A record to the address Vercel shows, plus `www` as a CNAME to Vercel's target. Moving nameservers to Vercel would mean recreating the MX and pipeline records there.
3. Wait for Vercel to issue the certificate, then check the site, email delivery and pipeline.quicklime.co.za.

## Analytics

Bklit (hosted vs self-hosted) is undecided, so no script is installed yet. Add it in `src/app/layout.tsx` once the decision is made.
