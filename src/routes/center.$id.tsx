import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Star } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { ArtBlock, CoinTag, PrimaryButton, SuccessBadge, Tile } from "@/components/bits";
import { centers, inr } from "@/lib/wellness-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/center/$id")({
  loader: ({ params }) => {
    const center = centers.find((c) => c.id === params.id);
    if (!center) throw notFound();
    return { center };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.center.name ?? "Center unavailable";
    const desc = loaderData?.center.about ?? "This wellness center is unavailable.";
    return {
      meta: [
        { title: `${name} — District Wellness` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — District Wellness` },
        { property: "og:description", content: desc },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: CenterDetail,
});

const COIN_RATE = 2; // 1 coin = ₹2 of value

function CenterDetail() {
  const { center } = Route.useLoaderData();
  const { addTxn, coins } = useAppState();
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "pay" | "done">("select");
  const [method, setMethod] = useState<"coins" | "upi" | null>(null);

  const coinCost = Math.round(center.pricePerSession / COIN_RATE);
  const coinsEarned = Math.round(center.pricePerSession / 20);

  function confirm(m: "coins" | "upi") {
    setMethod(m);
    if (m === "coins") {
      addTxn({
        label: `${center.name} · ${slot}`,
        sub: "Slot booked with Coins",
        amount: -coinCost,
        pillar: "Move",
      });
    } else {
      addTxn({
        label: `${center.name} · ${slot}`,
        sub: `Paid ${inr(center.pricePerSession)} via UPI · workout reward`,
        amount: coinsEarned,
        pillar: "Move",
      });
    }
    setStep("done");
  }

  if (step === "done") {
    return (
      <Screen hero={<TopBar title="Booking confirmed" back />}>
        <div className="px-4 pt-6 text-center">
          <SuccessBadge />
          <h2 className="mt-4 text-xl font-extrabold">You're in for {slot}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {center.name} · {center.area}, {center.city}
          </p>

          <Tile className="mt-6 divide-y divide-border text-left">
            <Row label="Session" value={center.category} />
            <Row
              label={method === "coins" ? "Paid with" : "Paid via"}
              value={method === "coins" ? `${coinCost} District Coins` : `UPI · ${inr(center.pricePerSession)}`}
            />
            <Row
              label={method === "coins" ? "Coins spent" : "Coins earned"}
              value={
                method === "coins" ? (
                  <CoinTag amount={coinCost} spent />
                ) : (
                  <CoinTag amount={coinsEarned} />
                )
              }
            />
            <Row label="New balance" value={`${coins} Coins`} />
          </Tile>

          <div className="mt-6 space-y-2">
            <Link to="/wallet" className="block">
              <PrimaryButton variant="coin">View Coins Wallet</PrimaryButton>
            </Link>
            <Link to="/fitness" className="block">
              <PrimaryButton variant="outline">Book another session</PrimaryButton>
            </Link>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen hero={<TopBar title={center.name} subtitle={center.tagline} back />}>
      <div className="px-4">
        <ArtBlock emoji={center.emoji} className="h-40 rounded-3xl" size="text-6xl" />

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold">
          <span className="flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-primary">
            <Star className="size-3 fill-current" /> {center.rating} · 240 ratings
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
            {center.category}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
            <MapPin className="size-3" /> {center.distanceKm} km
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{center.about}</p>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">Today's slots</h3>
        <div className="grid grid-cols-2 gap-2">
          {center.slots.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={
                "flex items-center justify-center gap-1.5 rounded-2xl border py-3 text-[13px] font-bold transition active:scale-95 " +
                (slot === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground")
              }
            >
              <Clock className="size-3.5" /> {s}
            </button>
          ))}
        </div>

        {step === "pay" && slot ? (
          <div className="mt-6 space-y-3">
            <h3 className="text-[15px] font-extrabold">Pay for {slot}</h3>
            <button
              onClick={() => setMethod("coins")}
              className={
                "flex w-full items-center justify-between rounded-2xl border p-4 text-left " +
                (method === "coins" ? "border-primary bg-primary-soft" : "border-border bg-card")
              }
            >
              <div>
                <p className="text-[14px] font-extrabold">Pay with District Coins</p>
                <p className="text-[11px] text-muted-foreground">
                  {coinCost} Coins · balance {coins}
                </p>
              </div>
              <span className="text-2xl">🪙</span>
            </button>
            <button
              onClick={() => setMethod("upi")}
              className={
                "flex w-full items-center justify-between rounded-2xl border p-4 text-left " +
                (method === "upi" ? "border-primary bg-primary-soft" : "border-border bg-card")
              }
            >
              <div>
                <p className="text-[14px] font-extrabold">Pay via UPI</p>
                <p className="text-[11px] text-muted-foreground">
                  {inr(center.pricePerSession)} · earn {coinsEarned} Coins
                </p>
              </div>
              <span className="text-2xl">📲</span>
            </button>
            <PrimaryButton
              disabled={!method || (method === "coins" && coins < coinCost)}
              onClick={() => method && confirm(method)}
            >
              {method === "coins" && coins < coinCost
                ? "Not enough Coins"
                : `Confirm booking · ${slot}`}
            </PrimaryButton>
          </div>
        ) : (
          <div className="mt-6">
            <PrimaryButton disabled={!slot} onClick={() => setStep("pay")}>
              {slot ? `Continue with ${slot}` : "Select a slot"}
            </PrimaryButton>
          </div>
        )}
      </div>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-[13px] font-bold">{value}</span>
    </div>
  );
}
