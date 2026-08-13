import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Dumbbell, Home, ShoppingBag, Trophy, Utensils } from "lucide-react";
import type { ReactNode } from "react";
import { useAppState } from "@/lib/app-state";

export function CoinsPill() {
  const { coins } = useAppState();
  return (
    <Link
      to="/wallet"
      className="gradient-coin flex items-center gap-1.5 rounded-full px-3 py-1.5 text-coin-foreground shadow-sm active:scale-95 transition-transform"
    >
      <span className="grid size-4 place-items-center rounded-full bg-coin-foreground/85 text-[9px] font-bold text-coin">
        D
      </span>
      <span className="text-sm font-bold tabular-nums">{coins}</span>
    </Link>
  );
}

export function TopBar({
  title,
  subtitle,
  back,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  tone?: "light" | "dark";
}) {
  const router = useRouter();
  const dark = tone === "dark";
  return (
    <header
      className={
        "sticky top-0 z-20 flex items-center gap-3 px-4 pt-4 pb-3 " +
        (dark ? "bg-transparent" : "bg-background/90 backdrop-blur-md")
      }
    >
      {back ? (
        <button
          aria-label="Go back"
          onClick={() => router.history.back()}
          className={
            "grid size-9 shrink-0 place-items-center rounded-full border active:scale-95 transition " +
            (dark
              ? "border-white/25 bg-black/25 text-primary-foreground"
              : "border-border bg-card text-foreground")
          }
        >
          <ChevronLeft className="size-5" />
        </button>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1
          className={
            "truncate text-[25px] leading-[1.05] font-extrabold " +
            (dark ? "text-primary-foreground" : "text-foreground")
          }
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={
              "mt-0.5 truncate text-[12px] font-normal " +
              (dark ? "text-primary-foreground/70" : "text-muted-foreground")
            }
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <CoinsPill />
    </header>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/fitness", label: "Fitness", icon: Dumbbell },
  { to: "/events", label: "Events", icon: Trophy },
  { to: "/market", label: "Shop", icon: ShoppingBag },
  { to: "/meals", label: "Meals", icon: Utensils },
] as const;

function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-border bg-card/95 px-2 pt-2 pb-3 backdrop-blur-md shadow-[var(--shadow-float)]">
      {tabs.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          className="group flex flex-col items-center gap-1 rounded-xl py-1 text-muted-foreground data-[status=active]:text-primary"
        >
          <span className="rounded-full px-3 py-1 transition-colors group-data-[status=active]:bg-primary-soft">
            <Icon className="size-5" />
          </span>
          <span className="text-[10px] font-semibold">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center py-0 sm:py-8">
      <div className="relative flex w-full max-w-[390px] flex-col overflow-hidden bg-background sm:rounded-[2.2rem] sm:border-[10px] sm:border-foreground/90 sm:shadow-2xl">
        <div className="flex min-h-screen flex-col sm:min-h-[820px] sm:max-h-[820px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Screen({
  children,
  hero,
}: {
  children: ReactNode;
  hero?: ReactNode;
}) {
  return (
    <>
      {hero}
      <main className="no-scrollbar flex-1 overflow-y-auto pb-6">{children}</main>
      <BottomNav />
    </>
  );
}
