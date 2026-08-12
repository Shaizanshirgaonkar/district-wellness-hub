import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PackageCheck, Truck } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { ArtBlock, CoinTag, PrimaryButton, SuccessBadge, Tile } from "@/components/bits";
import { inr, products } from "@/lib/wellness-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData ? `${loaderData.product.brand} ${loaderData.product.name}` : "Product unavailable";
    const desc = loaderData?.product.about ?? "This product is unavailable.";
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
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addTxn, coins } = useAppState();
  const [done, setDone] = useState(false);
  const earned = Math.round(product.price / 100);

  function buy() {
    addTxn({
      label: `${product.brand} ${product.name}`,
      sub: `Store purchase ${inr(product.price)} · shopping reward`,
      amount: earned,
      pillar: "Track",
    });
    setDone(true);
  }

  const fulfilment = product.fast
    ? "Fast items delivered in 60 min"
    : "Premium items sourced in 2–4 days";

  if (done) {
    return (
      <Screen hero={<TopBar title="Order placed" back />}>
        <div className="px-4 pt-6 text-center">
          <SuccessBadge />
          <h2 className="mt-4 text-xl font-extrabold">Delivered via District</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.brand} {product.name}
          </p>

          <Tile className="mt-5 p-4 text-left">
            <div className="space-y-3">
              {[
                { t: "Order confirmed", s: "Payment successful · UPI", on: true },
                {
                  t: "District Packaging",
                  s: "Sealed and quality-checked at the hub",
                  on: true,
                },
                {
                  t: product.fast ? "Out for delivery" : "Sourcing your item",
                  s: fulfilment,
                  on: false,
                },
                { t: "Arriving", s: product.fast ? "Today, 7:40 PM" : "Thu, 11 Sep", on: false },
              ].map((s) => (
                <div key={s.t} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={
                        "grid size-5 place-items-center rounded-full text-[9px] font-bold " +
                        (s.on
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-muted-foreground")
                      }
                    >
                      ✓
                    </span>
                    <span className="mt-1 h-4 w-px bg-border last:hidden" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold">{s.t}</p>
                    <p className="text-[11px] text-muted-foreground">{s.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          <Tile className="mt-3 flex items-center justify-between p-4">
            <p className="text-[13px] font-bold">Coins earned</p>
            <div className="flex items-center gap-2">
              <CoinTag amount={earned} />
              <span className="text-[11px] text-muted-foreground">bal {coins}</span>
            </div>
          </Tile>

          <div className="mt-6 space-y-2">
            <Link to="/wallet" className="block">
              <PrimaryButton variant="coin">View Coins Wallet</PrimaryButton>
            </Link>
            <Link to="/market" className="block">
              <PrimaryButton variant="outline">Continue shopping</PrimaryButton>
            </Link>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen hero={<TopBar title={product.brand} subtitle={product.kind} back />}>
      <div className="px-4">
        <ArtBlock emoji={product.emoji} className="h-48 rounded-3xl" size="text-7xl" />

        <h2 className="mt-4 text-xl leading-tight font-extrabold">{product.name}</h2>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold">{inr(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
          <span className="text-[11px] font-bold text-accent">
            {Math.round((1 - product.price / product.mrp) * 100)}% off
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.about}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {product.specs.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-border bg-card px-3 py-2 text-[11.5px] font-semibold"
            >
              {s}
            </div>
          ))}
        </div>

        <Tile className="mt-4 p-4">
          <p className="flex items-center gap-2 text-[12.5px] font-bold">
            <Truck className="size-4 text-primary" />
            Fast items delivered in 60 min · Premium items sourced 2–4 days
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            This item: {fulfilment}. Order tracking lives in your District orders.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold text-primary">
            <PackageCheck className="size-3" /> DISTRICT PACKAGING
          </span>
        </Tile>

        <div className="mt-5">
          <PrimaryButton onClick={buy}>Buy now · {inr(product.price)}</PrimaryButton>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Earn {earned} District Coins on this order
          </p>
        </div>
      </div>
    </Screen>
  );
}
