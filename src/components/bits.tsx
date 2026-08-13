import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between px-4">
        <h2 className="text-[19px] leading-tight font-extrabold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground")
      }
    >
      {children}
    </button>
  );
}

export function CoinTag({ amount, spent }: { amount: number; spent?: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold " +
        (spent ? "bg-accent-soft text-accent" : "bg-coin/25 text-coin-foreground")
      }
    >
      <span className="grid size-3.5 place-items-center rounded-full bg-current text-[7px] text-card">
        D
      </span>
      {spent ? "−" : "+"}
      {Math.abs(amount)}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  variant = "primary",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "coin" | "outline";
  disabled?: boolean;
}) {
  const base =
    "w-full rounded-2xl px-4 py-3.5 text-[15px] font-bold transition active:scale-[0.98] disabled:opacity-50";
  const styles = {
    primary: "bg-primary text-primary-foreground shadow-[var(--shadow-card)]",
    coin: "gradient-coin text-coin-foreground shadow-[var(--shadow-card)]",
    outline: "border border-primary/30 bg-card text-primary",
  } as const;
  return (
    <button disabled={disabled} onClick={onClick} className={base + " " + styles[variant]}>
      {children}
    </button>
  );
}

export function SuccessBadge() {
  return (
    <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft">
      <div className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-6" strokeWidth={3} />
      </div>
    </div>
  );
}

export function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] " + className
      }
    >
      {children}
    </div>
  );
}

export function ArtBlock({
  emoji,
  className = "",
  size = "text-4xl",
}: {
  emoji: string;
  className?: string;
  size?: string;
}) {
  return (
    <div
      className={
        "grid place-items-center bg-gradient-to-br from-secondary via-primary-soft to-coin/25 " +
        className
      }
    >
      <span className={size}>{emoji}</span>
    </div>
  );
}
