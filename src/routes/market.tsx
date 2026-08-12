import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Zap } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { ArtBlock, Chip } from "@/components/bits";
import { inr, products } from "@/lib/wellness-data";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Wellness Brand Marketplace — District Wellness" },
      {
        name: "description",
        content:
          "Shop premium wearables, supplements and recovery gear. Fast items in 60 minutes, premium items sourced in 2-4 days.",
      },
      { property: "og:title", content: "Wellness Brand Marketplace — District Wellness" },
      {
        property: "og:description",
        content: "Wearables, protein and recovery gear delivered via District.",
      },
    ],
  }),
  component: MarketScreen,
});

const kinds = ["All", "Wearable", "Supplement", "Recovery"] as const;

function MarketScreen() {
  const [kind, setKind] = useState<string>("All");
  const list = products.filter((p) => kind === "All" || p.kind === kind);

  return (
    <Screen hero={<TopBar title="Wellness Store" subtitle="Delivered via District" />}>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4">
        {kinds.map((k) => (
          <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
            {k}
          </Chip>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {list.map((p) => (
          <Link
            key={p.id}
            to="/product/$id"
            params={{ id: p.id }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] active:scale-[0.99] transition"
          >
            <div className="relative">
              <ArtBlock emoji={p.emoji} className="h-28" size="text-5xl" />
              {p.fast ? (
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-accent-foreground">
                  <Zap className="size-2.5" /> 60 MIN
                </span>
              ) : null}
            </div>
            <div className="p-3">
              <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                {p.brand}
              </p>
              <p className="mt-0.5 line-clamp-2 min-h-[2.2rem] text-[12.5px] leading-tight font-bold">
                {p.name}
              </p>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-[14px] font-extrabold">{inr(p.price)}</span>
                <span className="text-[10px] text-muted-foreground line-through">
                  {inr(p.mrp)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
