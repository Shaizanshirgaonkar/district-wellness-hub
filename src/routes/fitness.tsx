import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { ArtBlock, Chip } from "@/components/bits";
import { categories, centers, inr } from "@/lib/wellness-data";

export const Route = createFileRoute("/fitness")({
  head: () => ({
    meta: [
      { title: "Wellness & Fitness Near You — District Wellness" },
      {
        name: "description",
        content:
          "Discover independent gyms, yoga shalas, recovery rooms and coach-led strength labs. Book a slot with District Coins or UPI.",
      },
      { property: "og:title", content: "Wellness & Fitness Near You — District Wellness" },
      {
        property: "og:description",
        content: "Independent studios, coach-led labs and recovery rooms, bookable by the slot.",
      },
    ],
  }),
  component: FitnessScreen,
});

const distances = ["Any", "< 2 km", "< 4 km"] as const;
const prices = ["Any", "< ₹700", "₹700+"] as const;

function FitnessScreen() {
  const [cat, setCat] = useState<string>("All");
  const [dist, setDist] = useState<string>("Any");
  const [price, setPrice] = useState<string>("Any");

  const list = useMemo(
    () =>
      centers.filter((c) => {
        if (cat !== "All" && c.category !== cat) return false;
        if (dist === "< 2 km" && c.distanceKm >= 2) return false;
        if (dist === "< 4 km" && c.distanceKm >= 4) return false;
        if (price === "< ₹700" && c.pricePerSession >= 700) return false;
        if (price === "₹700+" && c.pricePerSession < 700) return false;
        return true;
      }),
    [cat, dist, price],
  );

  return (
    <Screen hero={<TopBar title="Wellness & Fitness" subtitle="Independent studios near you" />}>
      <div className="space-y-2 px-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {distances.map((d) => (
            <Chip key={d} active={dist === d} onClick={() => setDist(d)}>
              {d === "Any" ? "Any distance" : d}
            </Chip>
          ))}
          {prices.map((p) => (
            <Chip key={p} active={price === p} onClick={() => setPrice(p)}>
              {p === "Any" ? "Any price" : p}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-4 px-4 text-xs font-semibold text-muted-foreground">
        {list.length} centers available today
      </p>

      <div className="mt-2 space-y-3 px-4">
        {list.map((c) => (
          <Link
            key={c.id}
            to="/center/$id"
            params={{ id: c.id }}
            className="flex gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] active:scale-[0.99] transition"
          >
            <ArtBlock emoji={c.emoji} className="size-20 shrink-0 rounded-xl" size="text-3xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-[14px] font-extrabold">{c.name}</p>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
                  <Star className="size-2.5 fill-current" />
                  {c.rating}
                </span>
              </div>
              <p className="truncate text-[11px] text-muted-foreground">{c.tagline}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="size-3" /> {c.area}, {c.city} · {c.distanceKm} km
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                  {c.category}
                </span>
                <span className="text-[12px] font-extrabold">
                  {inr(c.pricePerSession)}
                  <span className="text-[10px] font-semibold text-muted-foreground">/session</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        {list.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            No centers match these filters.
          </p>
        ) : null}
      </div>
    </Screen>
  );
}
