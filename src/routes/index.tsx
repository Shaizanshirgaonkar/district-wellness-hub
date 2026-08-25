import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { CoinsPill, Screen, ThemeToggle } from "@/components/app-shell";
import { ArtBlock, Section } from "@/components/bits";
import { centers, events, inr, products } from "@/lib/wellness-data";
import tileGym from "@/assets/tile-gym.jpg";
import tileForge from "@/assets/tile-forge.jpg";
import tileShop from "@/assets/tile-shop.jpg";
import tileCoins from "@/assets/tile-coins.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "District Wellness — Move, Fuel, Reward" },
      {
        name: "description",
        content:
          "Book gyms and studios, join District FORGE races, shop wearables and subscribe to healthy meals — all rewarded in District Coins.",
      },
      { property: "og:title", content: "District Wellness — Move, Fuel, Reward" },
      {
        property: "og:description",
        content: "The new health & wellness segment inside District. Earn Coins for every move.",
      },
    ],
  }),
  component: HomeScreen,
});

const segments = ["Dining", "Movies", "Events", "Wellness"] as const;

function HomeScreen() {
  return (
    <Screen
      hero={
        <div className="bg-background px-4 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-normal tracking-[0.22em] text-muted-foreground">
                DISTRICT
              </p>
              <p className="flex items-center gap-1 text-[17px] leading-tight font-extrabold text-foreground">
                <MapPin className="size-4 text-primary" /> Indiranagar, Bengaluru
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <CoinsPill />
            </div>
          </div>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {segments.map((s) => (
              <span
                key={s}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold " +
                  (s === "Wellness"
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "bg-card text-muted-foreground")
                }
              >
                {s}
                {s === "Wellness" ? " ✦" : ""}
              </span>
            ))}
          </div>
        </div>
      }
    >
      <div className="px-4">
        <Link
          to="/meals"
          className="block overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)]"
        >
          <div className="gradient-hero relative px-5 py-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
              <Sparkles className="size-3" /> NEW CAMPAIGN
            </span>
            <h2 className="mt-3 text-2xl leading-[1.1] font-extrabold text-primary-foreground">
              EAT HEALTHY,
              <br />
              LIVE HEALTHY
            </h2>
            <p className="mt-2 max-w-[15rem] text-xs text-primary-foreground/80">
              7 chef-built meals a week. Keep, swap, repeat — and earn Coins for every streak.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary-foreground px-3.5 py-2 text-xs font-bold text-primary">
              Start at ₹1,899/wk <ArrowRight className="size-3.5" />
            </span>
            <span className="absolute -right-3 bottom-1 text-6xl opacity-90">🥗</span>
          </div>
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-4">
        {[
          { to: "/fitness", label: "Book Gym", img: tileGym },
          { to: "/events", label: "District FORGE", img: tileForge },
          { to: "/market", label: "Wellness Shop", img: tileShop },
          { to: "/wallet", label: "Coins Wallet", img: tileCoins },
        ].map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] active:scale-[0.98] transition"
          >
            <img
              src={q.img}
              alt={q.label}
              loading="lazy"
              width={512}
              height={512}
              className="h-24 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-3 pt-6 pb-2">
              <span className="font-headline text-[14px] text-primary-foreground">{q.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <Section
        title="Fitness Centers Near You"
        action={
          <Link to="/fitness" className="text-xs font-bold text-primary">
            See all
          </Link>
        }
      >
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
          {centers.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              to="/center/$id"
              params={{ id: c.id }}
              className="w-[190px] shrink-0 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]"
            >
              <ArtBlock emoji={c.emoji} className="h-24" />
              <div className="p-3">
                <p className="truncate text-[16px] leading-tight font-extrabold">{c.name}</p>
                <p className="mt-0.5 truncate text-[11px] font-normal text-muted-foreground">
                  {c.category} · {c.area}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="size-3 fill-current text-coin" /> {c.rating}
                  </span>
                  <span className="text-primary">{inr(c.pricePerSession)}/session</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>


      <Section
        title="Upcoming Sports Events"
        action={
          <Link to="/events" className="text-xs font-bold text-primary">
            See all
          </Link>
        }
      >
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {events.map((e) => (
            <Link
              key={e.id}
              to="/event/$id"
              params={{ id: e.id }}
              className="w-[230px] shrink-0 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]"
            >
              <div className="gradient-hero flex h-24 items-end justify-between px-3 pb-2">
                <span className="text-[11px] font-bold text-primary-foreground">{e.city}</span>
                <span className="text-3xl">{e.emoji}</span>
              </div>
              <div className="p-3">
                <p className="truncate text-[17px] leading-tight font-extrabold">{e.name}</p>
                <p className="mt-0.5 text-[11px] font-normal text-muted-foreground">{e.date}</p>
                <p className="mt-2 text-[12px] font-bold text-primary">
                  Bundle from {inr(e.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Wellness Brands"
        action={
          <Link to="/market" className="text-xs font-bold text-primary">
            See all
          </Link>
        }
      >
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {products.slice(0, 5).map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="w-[140px] shrink-0 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]"
            >
              <ArtBlock emoji={p.emoji} className="h-24" />
              <div className="p-2.5">
                <p className="text-[9.5px] font-normal tracking-widest text-muted-foreground uppercase">
                  {p.brand}
                </p>
                <p className="truncate text-[14px] leading-tight font-extrabold">{p.name}</p>
                <p className="mt-1 text-[13px] font-extrabold text-primary">{inr(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
