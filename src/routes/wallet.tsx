import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Flame, Gift, Utensils } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { CoinTag, Tile } from "@/components/bits";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "District Coins Wallet — Move, Track, Fuel, Reward" },
      {
        name: "description",
        content:
          "One currency across gyms, races, wellness shopping and meal plans. See every Coin earned and spent.",
      },
      { property: "og:title", content: "District Coins Wallet" },
      {
        property: "og:description",
        content: "Move, Track, Fuel, Reward — the District Wellness flywheel in one balance.",
      },
    ],
  }),
  component: WalletScreen,
});

const pillars = [
  { key: "Move", icon: Flame, copy: "Book gyms & races" },
  { key: "Track", icon: Activity, copy: "Wearables & data" },
  { key: "Fuel", icon: Utensils, copy: "Meals & nutrition" },
  { key: "Reward", icon: Gift, copy: "Coins back in" },
] as const;

function WalletScreen() {
  const { coins, txns } = useAppState();
  const earned = txns.filter((t) => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const spent = txns.filter((t) => t.amount < 0).reduce((a, t) => a - t.amount, 0);

  return (
    <Screen hero={<TopBar title="District Coins" subtitle="One currency, four habits" back />}>
      <div className="px-4">
        <div className="gradient-coin rounded-3xl p-5 text-coin-foreground shadow-[var(--shadow-card)]">
          <p className="text-[10px] font-bold tracking-[0.2em] opacity-70">AVAILABLE BALANCE</p>
          <p className="mt-1 flex items-baseline gap-2 text-4xl font-extrabold tabular-nums">
            {coins}
            <span className="text-sm font-bold opacity-70">Coins</span>
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-black/15 px-3 py-1.5 text-[11px] font-bold">
              +{earned} earned
            </span>
            <span className="rounded-full bg-black/15 px-3 py-1.5 text-[11px] font-bold">
              −{spent} spent
            </span>
          </div>
        </div>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">The flywheel</h3>
        <div className="grid grid-cols-4 gap-2">
          {pillars.map((p, i) => (
            <div
              key={p.key}
              className="relative rounded-2xl border border-border bg-card px-2 py-3 text-center shadow-[var(--shadow-card)]"
            >
              <p.icon className="mx-auto size-4 text-primary" />
              <p className="mt-1.5 text-[11px] font-extrabold">{p.key}</p>
              <p className="text-[9px] leading-tight text-muted-foreground">{p.copy}</p>
              {i < 3 ? (
                <span className="absolute top-1/2 -right-1.5 text-[10px] text-muted-foreground">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Move at a studio, track it on your wearable, fuel with a meal plan — every step pays back
          in the same Coins, which you can spend right back in District.
        </p>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">Transaction history</h3>
        <Tile className="divide-y divide-border">
          {txns.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3">
              <span
                className={
                  "grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold " +
                  (t.amount > 0
                    ? "bg-primary-soft text-primary"
                    : "bg-accent-soft text-accent")
                }
              >
                {t.pillar.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold">{t.label}</p>
                <p className="truncate text-[10.5px] text-muted-foreground">
                  {t.sub} · {t.when}
                </p>
              </div>
              <CoinTag amount={t.amount} spent={t.amount < 0} />
            </div>
          ))}
        </Tile>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">Redeem your Coins</h3>
        <div className="space-y-2">
          {redeemOffers.map((o) => (
            <Tile key={o.title} className="flex items-center gap-3 p-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-lg">
                {o.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-extrabold">{o.title}</p>
                <p className="text-[10.5px] text-muted-foreground">{o.sub}</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                {o.cost} Coins
              </span>
            </Tile>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Coins are rewards, not a payment method — redeem them for offers across District.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 pb-2">
          <Link
            to="/fitness"
            className="rounded-2xl border border-primary/30 bg-card py-3 text-center text-[12px] font-bold text-primary"
          >
            Spend on a session
          </Link>
          <Link
            to="/market"
            className="rounded-2xl border border-primary/30 bg-card py-3 text-center text-[12px] font-bold text-primary"
          >
            Spend in the store
          </Link>
        </div>
      </div>
    </Screen>
  );
}
