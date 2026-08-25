import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Txn = {
  id: string;
  label: string;
  sub: string;
  amount: number; // positive = earned, negative = spent
  when: string;
  pillar: "Move" | "Track" | "Fuel" | "Reward";
};

const seed: Txn[] = [
  {
    id: "t0",
    label: "Welcome bonus",
    sub: "District Wellness launch drop",
    amount: 300,
    when: "2 Sep · 10:12 AM",
    pillar: "Reward",
  },
  {
    id: "t1",
    label: "Meal streak · 7 days",
    sub: "Eat Healthy, Live Healthy",
    amount: 120,
    when: "4 Sep · 8:04 AM",
    pillar: "Fuel",
  },
  {
    id: "t2",
    label: "Steps goal · 3 weeks",
    sub: "Coming soon — Synced from Pulseband Arc",
    amount: 80,
    when: "6 Sep · 11:40 PM",
    pillar: "Track",
  },
];

type State = {
  coins: number;
  txns: Txn[];
  addTxn: (t: Omit<Txn, "id" | "when">) => void;
};

const Ctx = createContext<State | null>(null);

function now() {
  return new Date().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [txns, setTxns] = useState<Txn[]>(seed);
  const [coins, setCoins] = useState(500);

  const value = useMemo<State>(
    () => ({
      coins,
      txns,
      addTxn: (t) => {
        setCoins((c) => c + t.amount);
        setTxns((prev) => [
          { ...t, id: Math.random().toString(36).slice(2), when: now() },
          ...prev,
        ]);
      },
    }),
    [coins, txns],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
