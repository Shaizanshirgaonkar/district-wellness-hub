# District Wellness Hub

Build a mobile-first web app prototype called "District Wellness" — a new 

health & wellness hub inside an existing consumer super-app (District, part 

of Eternal/Zomato). This is a clickable demo with mock data, not a production 

app — prioritize a polished, cohesive UI and working navigation over real 

backend logic.

BRAND & STYLE

- Clean, premium consumer app aesthetic (think Zomato/District's existing 

  visual language: bold typography, rounded cards, a confident accent color 

  — use a deep green or coral as the primary accent to signal "health/wellness" 

  distinct from District's core dining orange/red)

- Mobile viewport (390px wide), bottom tab navigation

- Use realistic mock data (Indian city names, INR pricing, Indian brand names)

APP STRUCTURE — 5 screens + wallet, connected by bottom nav:

1. HOME

   - Segmented tabs at top: Dining | Movies | Events | Wellness (Wellness is 

     highlighted/active, since this is the new segment)

   - Hero banner: "EAT HEALTHY, LIVE HEALTHY" campaign

   - Horizontal scroll cards: "Fitness Centers Near You", "Upcoming Sports 

     Events", "Wellness Brands"

   - Show a small District Coins balance pill in the top-right (persistent 

     across all screens)

2. WELLNESS & FITNESS DISCOVERY

   - List/grid of local, independent, or celebrity-run wellness centers 

     (NOT chain-branded — mock names like "Kinetic Studio", "Reform Wellness", 

     "Coach Arjun's Strength Lab")

   - Filters: category (Gym, Yoga, Recovery, Hybrid Training), distance, price

   - Tap a center → detail page with available time slots

   - Slot booking flow: pick a slot → "Pay with District Coins" or "Pay via 

     UPI" as two clear payment options → confirmation screen showing Coins 

     balance updated

3. DISTRICT SPORTS EVENTS

   - Card list of District-organized hybrid fitness events (Hyrox-style), 

     e.g. "District FORGE — Mumbai", with date, location, and a bundled 

     pricing structure: "Ticket + Finisher Kit + Recovery Session" as one price

   - Event detail page shows: event format, bundled inclusions, and a row of 

     "Powered by" brand logos (wearables, supplements) sponsoring the event

   - "Register" button → confirmation showing Coins earned for registering early

4. WELLNESS BRAND MARKETPLACE

   - Product grid: premium wearables and supplements (mock brands styled 

     like Whoop/Ultrahuman/protein brands)

   - Product detail page with price, and a small fulfillment note that reads 

     like a delivery status, not a redirect — e.g. "Fast items delivered in 

     60 min · Premium items sourced 2-4 days" with a subtle "District 

     Packaging" badge — NOT any mention of the backend partner by name

   - Checkout confirmation: "Delivered via District" tracking screen

5. EAT HEALTHY, LIVE HEALTHY (meal subscription)

   - Weekly meal plan calendar view

   - Each day shows a recommended meal with a "Keep" or "Swap" choice; 

     swapping opens a small modal with 3-4 alternative healthy meals

   - Subscription summary showing next delivery date/time

6. DISTRICT COINS WALLET (accessible from the top-right pill on every screen)

   - Balance, a simple transaction history showing Coins earned (from event 

     registration, meal subscription streaks) and spent (gym booking, 

     marketplace purchase) — this list should reference the mock transactions 

     created in screens 2-5 above, so the wallet visibly reflects app usage

   - This screen is the one that should make the "flywheel" obvious: Move → 

     Track → Fuel → Reward, all in one currency

INTERACTIVITY REQUIREMENTS

- All navigation must actually work (bottom nav, back buttons, modals)

- Coins balance should update (even if just via local state) when a booking, 

  purchase, or event registration is completed, and that change should be 

  visible on the Wallet screen

- No login/auth required — assume a logged-in demo user with a starting 

  balance of 500 District Coins

Keep the code in a single cohesive app structure so it can be shared as one 

live preview link.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/93a54003-c375-43e1-a722-a33f09f76678).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
