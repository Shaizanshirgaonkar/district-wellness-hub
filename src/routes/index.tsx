import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { CoinsPill, Screen } from "@/components/app-shell";
import { ArtBlock, Section } from "@/components/bits";
import { centers, events, inr, products } from "@/lib/wellness-data";

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
        <div className="gradient-hero px-4 pt-4 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary-foreground/70">
                DISTRICT
              </p>
              <p className="flex items-center gap-1 text-sm font-bold text-primary-foreground">
                <MapPin className="size-3.5" /> Indiranagar, Bengaluru
              </p>
            </div>
            <CoinsPill />
          </div>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {segments.map((s) => (
              <span
                key={s}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold " +
                  (s === "Wellness"
                    ? "bg-primary-foreground text-primary"
                    : "bg-white/12 text-primary-foreground/75")
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
      <div className="-mt-2 px-4">
        <Link
          to="/meals"
          className="block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
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

      <div className="mt-5 grid grid-cols-4 gap-2 px-4">
        {[
          { to: "/fitness", label: "Book Gym", emoji: "🏋️" },
          { to: "/events", label: "FORGE", emoji: "🔥" },
          { to: "/market", label: "Shop", emoji: "⌚" },
          { to: "/wallet", label: "Coins", emoji: "🪙" },
        ].map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card py-3 text-[10px] font-bold shadow-[var(--shadow-card)]"
          >
            <span className="text-xl">{q.emoji}</span>
            {q.label}
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
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {centers.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              to="/center/$id"
              params={{ id: c.id }}
              className="w-[190px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <ArtBlock emoji={c.emoji} className="h-24" />
              <div className="p-3">
                <p className="truncate text-[13px] font-extrabold">{c.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {c.category} · {c.area}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-primary">
                    <Star className="size-3 fill-current" /> {c.rating}
                  </span>
                  <span>{inr(c.pricePerSession)}/session</span>
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
              className="w-[230px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="gradient-hero flex h-24 items-end justify-between px-3 pb-2">
                <span className="text-[11px] font-bold text-primary-foreground">{e.city}</span>
                <span className="text-3xl">{e.emoji}</span>
              </div>
              <div className="p-3">
                <p className="truncate text-[13px] font-extrabold">{e.name}</p>
                <p className="text-[11px] text-muted-foreground">{e.date}</p>
                <p className="mt-2 text-[11px] font-bold text-accent">
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
              className="w-[140px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <ArtBlock emoji={p.emoji} className="h-24" />
              <div className="p-2.5">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  {p.brand}
                </p>
                <p className="truncate text-[12px] font-bold">{p.name}</p>
                <p className="mt-1 text-[12px] font-extrabold">{inr(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
