# klaviyo-templates/

The master file for the **Gig 2 Premium** package: one HTML email built from 12 modules, ready to restyle for each client.

| File | What |
| --- | --- |
| `premium-master.html` | The master. 600 px wide, columns that stack on phones, VML buttons for Outlook, dark mode, Klaviyo tags |
| `snippets/product-card-catalog.html` | Product card filled from the Klaviyo catalog (swap for a static card in module 06) |
| `snippets/browse-abandon.html` | "Viewed Product" block for browse-abandon flows |
| `snippets/countdown.html` | Countdown timer slot (GIF from a timer service) |

## Modules

| # | Module | Dynamic? | Klaviyo tag(s) |
| --- | --- | --- | --- |
| 00 | Preheader + web view | | `{% web_view %}` |
| 01 | Header: logo (light + dark versions) + nav | | |
| 02 | Announcement bar | VIP vs everyone else | `{% if person\|lookup:'Loyalty Tier' == 'VIP' %}` |
| 03 | Hero + button | First name with fallback | `{{ first_name\|default:'Hello' }}` |
| 04 | Coupon | Unique code per person | `{% coupon_code 'REPLACE_COUPON_NAME' %}` |
| 05 | Cart recovery | Loops up to 3 cart items; hides itself with no event | `event.extra.line_items`, `event.extra.checkout_url` |
| 06 | Product grid 2×2 | Static (catalog version in snippets) | |
| 07 | Feature split | | |
| 08 | Review quote | | |
| 09 | Promise row, 3 columns | | |
| 10 | Final call to action | | |
| 11 | Footer | Required | `{% manage_preferences %}`, `{% unsubscribe %}`, `{{ organization.name }}`, `{{ organization.full_address }}` |

Every module sits between `▼` and `▲` comments. Delete a whole block to drop a module. Module 05 only makes sense in a flow triggered by Shopify "Started Checkout"; in a campaign it hides itself.

## Restyle for a client (about 20 minutes)

1. Find and replace the 8 hex codes in the token list at the top of the file.
2. Replace `BRAND_NAME`, `https://example.com`, the currency `R` and the `REPLACE_*` values.
3. Swap the `placehold.co` images for the client's images, hosted in Klaviyo (upload to the image library and copy the URL). Hero 1200×900, product cards 500×625, feature image 500×500, logo 280×64 at 2× (one dark-ink version, one light-ink version for dark mode).
4. Rewrite the copy. Keep alt text on every image.

## Load it into Klaviyo (the client's account, with the client's go-ahead)

1. Content › Templates › Create template › **HTML** (not drag-and-drop) › paste the file.
2. Preview with a real profile, and with a real "Started Checkout" event for flows. Check every dynamic tag shows what you expect. The cart field names (`item.product.title`, `item.line_price`, `item.product.images.0.src`, `item.variant_title`) follow Klaviyo's Shopify checkout event. Confirm them against the preview data, because custom setups can differ.
3. Make the coupon in Content › Coupons first; the name in the tag must match exactly.
4. Send tests to Gmail (web + app), Outlook desktop (Windows), Outlook.com, Apple Mail (light + dark) and iOS Mail. If the client has Litmus or Email on Acid, run it there too.

## Built-in checks

- 600 px max width, fluid below that. Columns stack under 600 px.
- Buttons are 52 px tall and full width on phones.
- Outlook desktop gets VML buttons and fixed-width ghost tables, so nothing collapses.
- Dark mode: Apple Mail and iOS swap to dark colours and the light-ink logo; Outlook.com uses the `[data-ogsc]` rules. Gmail app does its own colour inversion and can't be controlled; the palette is picked to survive it.
- Web fonts (Fraunces, Inter) load in Apple Mail and iOS; everyone else gets Georgia / Arial.
- Hidden preheader text with spacer characters, so the inbox preview doesn't pull in body text.
- Keep the file under 100 KB once the copy is in, or Gmail clips the message and can hide the unsubscribe link.
