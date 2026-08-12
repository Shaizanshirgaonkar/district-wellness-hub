import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Package } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { CoinTag } from "@/components/bits";
import { events, inr } from "@/lib/wellness-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "District Sports Events — FORGE & TRAIL" },
      {
        name: "description",
        content:
          "Hybrid fitness races organised by District. One bundled price for ticket, finisher kit and a recovery session.",
      },
      { property: "og:title", content: "District Sports Events — FORGE & TRAIL" },
      {
        property: "og:description",
        content: "Race, recover and earn Coins for registering early.",
      },
    ],
  }),
  component: EventsScreen,
});

function EventsScreen() {
  return (
    <Screen hero={<TopBar title="District Sports" subtitle="Hybrid fitness race series" />}>
      <div className="space-y-4 px-4">
        {events.map((e) => (
          <Link
            key={e.id}
            to="/event/$id"
            params={{ id: e.id }}
            className="block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] active:scale-[0.99] transition"
          >
            <div className="gradient-hero relative px-4 py-5">
              <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
                DISTRICT ORGANISED
              </span>
              <h2 className="mt-2 pr-12 text-lg leading-tight font-extrabold text-primary-foreground">
                {e.name}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" /> {e.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" /> {e.venue}
                </span>
              </p>
              <span className="absolute top-4 right-3 text-4xl">{e.emoji}</span>
            </div>
            <div className="p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                <Package className="size-3.5" /> Bundle includes
              </p>
              <ul className="mt-2 space-y-1">
                {e.inclusions.map((i) => (
                  <li key={i} className="text-[12px] text-foreground/80">
                    · {i}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div>
                  <p className="text-[17px] font-extrabold">{inr(e.price)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    all-in · ticket + kit + recovery
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <CoinTag amount={e.earlyCoins} />
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    early-bird reward
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
