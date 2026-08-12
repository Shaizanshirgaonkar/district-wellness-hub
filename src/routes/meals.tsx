import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Repeat, X } from "lucide-react";
import { Screen, TopBar } from "@/components/app-shell";
import { CoinTag, PrimaryButton, Tile } from "@/components/bits";
import { mealAlternatives, weekPlan, type Meal } from "@/lib/wellness-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/meals")({
  head: () => ({
    meta: [
      { title: "Eat Healthy, Live Healthy — Weekly Meal Plan" },
      {
        name: "description",
        content:
          "A chef-built weekly meal plan you can keep or swap each day, with Coins for every streak you hold.",
      },
      { property: "og:title", content: "Eat Healthy, Live Healthy — Weekly Meal Plan" },
      {
        property: "og:description",
        content: "Keep or swap each day's meal and earn District Coins for streaks.",
      },
    ],
  }),
  component: MealsScreen,
});

function MealsScreen() {
  const { addTxn } = useAppState();
  const [plan, setPlan] = useState(weekPlan);
  const [kept, setKept] = useState<Record<string, boolean>>({});
  const [swapDay, setSwapDay] = useState<string | null>(null);

  function keep(day: string) {
    setKept((k) => ({ ...k, [day]: true }));
  }

  function swap(day: string, meal: Meal) {
    setPlan((p) => p.map((d) => (d.day === day ? { ...d, meal } : d)));
    setKept((k) => ({ ...k, [day]: true }));
    setSwapDay(null);
  }

  const confirmed = Object.keys(kept).length;

  return (
    <Screen hero={<TopBar title="Eat Healthy, Live Healthy" subtitle="Week of 8–14 Sep" />}>
      <div className="px-4">
        <Tile className="gradient-hero border-0 p-4">
          <p className="text-[10px] font-bold tracking-widest text-primary-foreground/70">
            ACTIVE SUBSCRIPTION
          </p>
          <p className="mt-1 text-lg font-extrabold text-primary-foreground">
            High-Protein Indian · 7 dinners
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-primary-foreground/80">
            <CalendarClock className="size-3.5" /> Next delivery: Mon, 8 Sep · 7:00–8:00 PM
          </p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
            <span className="text-[11px] font-semibold text-primary-foreground/85">
              {confirmed}/7 days confirmed
            </span>
            <span className="text-[11px] font-bold text-primary-foreground">₹1,899/week</span>
          </div>
        </Tile>

        <h3 className="mt-6 mb-2 text-[15px] font-extrabold">This week's plan</h3>
        <div className="space-y-2.5">
          {plan.map((d) => (
            <Tile key={d.day} className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-11 shrink-0 rounded-xl bg-secondary py-1.5 text-center">
                  <p className="text-[11px] font-extrabold text-secondary-foreground">{d.day}</p>
                  <p className="text-[9px] text-muted-foreground">{d.date}</p>
                </div>
                <span className="text-2xl">{d.meal.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold">{d.meal.name}</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    {d.meal.kcal} kcal · {d.meal.protein}g protein · {d.meal.note}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={() => keep(d.day)}
                  className={
                    "flex-1 rounded-xl py-2 text-[12px] font-bold transition active:scale-95 " +
                    (kept[d.day]
                      ? "bg-primary-soft text-primary"
                      : "bg-primary text-primary-foreground")
                  }
                >
                  {kept[d.day] ? "Confirmed ✓" : "Keep"}
                </button>
                <button
                  onClick={() => setSwapDay(d.day)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-[12px] font-bold text-foreground active:scale-95"
                >
                  <Repeat className="size-3.5" /> Swap
                </button>
              </div>
            </Tile>
          ))}
        </div>

        <Tile className="mt-5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-extrabold">Streak reward</p>
              <p className="text-[11px] text-muted-foreground">
                Confirm all 7 days to bank your weekly Coins
              </p>
            </div>
            <CoinTag amount={120} />
          </div>
          <div className="mt-3">
            <PrimaryButton
              variant="coin"
              disabled={confirmed < 7}
              onClick={() =>
                addTxn({
                  label: "Meal streak · week of 8 Sep",
                  sub: "All 7 dinners confirmed",
                  amount: 120,
                  pillar: "Fuel",
                })
              }
            >
              {confirmed < 7 ? `Confirm ${7 - confirmed} more day(s)` : "Claim 120 Coins"}
            </PrimaryButton>
          </div>
        </Tile>
      </div>

      {swapDay ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/45 px-2 pb-2">
          <div className="w-full max-w-[374px] rounded-3xl bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-extrabold">Swap {swapDay}'s meal</h3>
                <p className="text-[11px] text-muted-foreground">Same plan, no extra charge</p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setSwapDay(null)}
                className="grid size-8 place-items-center rounded-full bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-2">
              {mealAlternatives.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  onClick={() => swap(swapDay, m)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-left active:scale-[0.99]"
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold">{m.name}</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      {m.kcal} kcal · {m.protein}g protein · {m.note}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Screen>
  );
}
