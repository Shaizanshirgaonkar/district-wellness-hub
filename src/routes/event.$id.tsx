import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { CoinTag, PrimaryButton, SuccessBadge, Tile } from "@/components/bits";
import { events, inr } from "@/lib/wellness-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/event/$id")({
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.event.name ?? "Event unavailable";
    const desc = loaderData
      ? `${loaderData.event.date} at ${loaderData.event.venue}. Ticket, finisher kit and recovery session bundled from ${inr(loaderData.event.price)}.`
      : "This District event is unavailable.";
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
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const { addTxn, coins } = useAppState();
  const [done, setDone] = useState(false);

  function register() {
    addTxn({
      label: `${event.name} · registration`,
      sub: "Early-bird registration bonus",
      amount: event.earlyCoins,
      pillar: "Move",
    });
    setDone(true);
  }

  if (done) {
    return (
      <Screen hero={<TopBar title="You're registered" back />}>
        <div className="px-4 pt-6 text-center">
          <SuccessBadge />
          <h2 className="mt-4 text-xl font-extrabold">See you at {event.city}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {event.name} · {event.date}
          </p>

          <Tile className="mt-5 p-4 text-left">
            <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
              EARLY REGISTRATION BONUS
            </p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[15px] font-extrabold">Coins credited</p>
              <CoinTag amount={event.earlyCoins} />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              New balance: {coins} District Coins
            </p>
          </Tile>

          <Tile className="mt-3 p-4 text-left">
            <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
              BUNDLE CONFIRMED
            </p>
            <ul className="mt-2 space-y-1 text-[12px] text-foreground/80">
              {event.inclusions.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </Tile>

          <div className="mt-6 space-y-2">
            <Link to="/wallet" className="block">
              <PrimaryButton variant="coin">View Coins Wallet</PrimaryButton>
            </Link>
            <Link to="/events" className="block">
              <PrimaryButton variant="outline">Back to events</PrimaryButton>
            </Link>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen hero={<TopBar title={event.name} subtitle={event.city} back />}>
      <div className="px-4">
        <div className="gradient-hero relative overflow-hidden rounded-3xl px-5 py-6">
          <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
            HYBRID FITNESS RACE
          </span>
          <h2 className="mt-3 text-2xl leading-tight font-extrabold text-primary-foreground">
            {event.name}
          </h2>
          <p className="mt-2 flex flex-col gap-1 text-[12px] text-primary-foreground/80">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" /> {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {event.venue}
            </span>
          </p>
          <span className="absolute -right-2 -bottom-3 text-7xl opacity-90">{event.emoji}</span>
        </div>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">Event format</h3>
        <Tile className="divide-y divide-border">
          {event.format.map((f) => (
            <p key={f} className="px-4 py-2.5 text-[12.5px] text-foreground/85">
              {f}
            </p>
          ))}
        </Tile>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">One price, everything in</h3>
        <Tile className="p-4">
          <ul className="space-y-2">
            {event.inclusions.map((i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary-soft text-[9px] font-bold text-primary">
                  ✓
                </span>
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <div>
              <p className="text-[22px] leading-none font-extrabold">{inr(event.price)}</p>
              <p className="text-[10px] text-muted-foreground">bundled · taxes included</p>
            </div>
            <CoinTag amount={event.earlyCoins} />
          </div>
        </Tile>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">Powered by</h3>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {event.sponsors.map((s) => (
            <div
              key={s.name}
              className="min-w-[110px] shrink-0 rounded-2xl border border-border bg-card px-3 py-3 text-center shadow-[var(--shadow-card)]"
            >
              <div className="mx-auto grid size-8 place-items-center rounded-full bg-secondary text-[11px] font-extrabold text-secondary-foreground">
                {s.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-1.5 text-[12px] font-bold">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.kind}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={register}>Register · {inr(event.price)}</PrimaryButton>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Register before 1 Sep to earn {event.earlyCoins} District Coins
          </p>
        </div>
      </div>
    </Screen>
  );
}
