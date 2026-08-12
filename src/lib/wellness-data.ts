export type Center = {
  id: string;
  name: string;
  tagline: string;
  category: "Gym" | "Yoga" | "Recovery" | "Hybrid Training";
  area: string;
  city: string;
  distanceKm: number;
  pricePerSession: number;
  rating: number;
  emoji: string;
  about: string;
  slots: string[];
};

export const centers: Center[] = [
  {
    id: "kinetic-studio",
    name: "Kinetic Studio",
    tagline: "Small-group strength & conditioning",
    category: "Hybrid Training",
    area: "Indiranagar",
    city: "Bengaluru",
    distanceKm: 1.2,
    pricePerSession: 649,
    rating: 4.8,
    emoji: "🏋️",
    about:
      "A 12-person floor built around sled work, kettlebells and rowing intervals. Coaches cap every class so form never slips.",
    slots: ["06:00 AM", "07:30 AM", "06:00 PM", "07:30 PM"],
  },
  {
    id: "reform-wellness",
    name: "Reform Wellness",
    tagline: "Reformer pilates & mobility",
    category: "Yoga",
    area: "Bandra West",
    city: "Mumbai",
    distanceKm: 2.4,
    pricePerSession: 899,
    rating: 4.9,
    emoji: "🧘",
    about:
      "Slow, precise reformer sessions in a daylight studio. Great for desk-bound backs and post-run hips.",
    slots: ["07:00 AM", "09:00 AM", "05:30 PM", "08:00 PM"],
  },
  {
    id: "coach-arjun-strength-lab",
    name: "Coach Arjun's Strength Lab",
    tagline: "Powerlifting with a national coach",
    category: "Gym",
    area: "Jubilee Hills",
    city: "Hyderabad",
    distanceKm: 3.8,
    pricePerSession: 1099,
    rating: 4.7,
    emoji: "💪",
    about:
      "Run by Arjun Menon, ex-national powerlifter. Calibrated plates, competition bars and video-reviewed lifts.",
    slots: ["06:30 AM", "08:00 AM", "07:00 PM"],
  },
  {
    id: "thaw-recovery-rooms",
    name: "Thaw Recovery Rooms",
    tagline: "Ice baths, sauna, compression",
    category: "Recovery",
    area: "Koregaon Park",
    city: "Pune",
    distanceKm: 4.1,
    pricePerSession: 549,
    rating: 4.6,
    emoji: "🧊",
    about:
      "45-minute contrast protocol: 12°C plunge, 85°C sauna, then legs-up compression with breathwork audio.",
    slots: ["08:00 AM", "12:00 PM", "06:00 PM", "09:00 PM"],
  },
  {
    id: "surya-shala",
    name: "Surya Shala",
    tagline: "Ashtanga, led primary series",
    category: "Yoga",
    area: "Alwarpet",
    city: "Chennai",
    distanceKm: 2.0,
    pricePerSession: 499,
    rating: 4.8,
    emoji: "🌅",
    about:
      "Traditional led primary series at sunrise on a rooftop shala. Mats, props and filter coffee included.",
    slots: ["05:45 AM", "07:15 AM", "06:30 PM"],
  },
  {
    id: "loop-run-club-house",
    name: "Loop Run Club House",
    tagline: "Treadmill blocks & gait clinic",
    category: "Hybrid Training",
    area: "Hauz Khas",
    city: "New Delhi",
    distanceKm: 5.6,
    pricePerSession: 749,
    rating: 4.5,
    emoji: "🏃",
    about:
      "Threshold treadmill blocks with live pace screens, plus a monthly gait screening with a physio.",
    slots: ["06:00 AM", "07:00 AM", "07:00 PM", "08:30 PM"],
  },
];

export const categories = ["All", "Gym", "Yoga", "Recovery", "Hybrid Training"] as const;

export type SportsEvent = {
  id: string;
  name: string;
  city: string;
  venue: string;
  date: string;
  price: number;
  earlyCoins: number;
  emoji: string;
  format: string[];
  inclusions: string[];
  sponsors: { name: string; kind: string }[];
};

export const events: SportsEvent[] = [
  {
    id: "forge-mumbai",
    name: "District FORGE — Mumbai",
    city: "Mumbai",
    venue: "NSCI Dome, Worli",
    date: "Sat, 12 Sep · 6:30 AM",
    price: 3499,
    earlyCoins: 250,
    emoji: "🔥",
    format: [
      "8 stations · 1 km run between each",
      "Sled push, ski erg, wall balls, farmer's carry",
      "Solo, Pro and Doubles categories",
      "Live splits on the District app",
    ],
    inclusions: [
      "Race ticket with timed chip",
      "Finisher kit — tee, medal, band",
      "60-min recovery session at Thaw Rooms",
    ],
    sponsors: [
      { name: "Pulseband", kind: "Wearables" },
      { name: "Nuvo Whey", kind: "Supplements" },
      { name: "Hydra9", kind: "Hydration" },
    ],
  },
  {
    id: "forge-bengaluru",
    name: "District FORGE — Bengaluru",
    city: "Bengaluru",
    venue: "Kanteerava Stadium",
    date: "Sun, 27 Sep · 6:00 AM",
    price: 3299,
    earlyCoins: 200,
    emoji: "⚡",
    format: [
      "6 stations · 800 m run between each",
      "Rower, burpee broad jumps, sandbag lunges",
      "Beginner-friendly Open wave",
      "Pace teams for first-timers",
    ],
    inclusions: [
      "Race ticket with timed chip",
      "Finisher kit — tee, medal, band",
      "Recovery session at Kinetic Studio",
    ],
    sponsors: [
      { name: "Pulseband", kind: "Wearables" },
      { name: "Grain & Gains", kind: "Nutrition" },
      { name: "Thaw", kind: "Recovery" },
    ],
  },
  {
    id: "district-trail-lonavala",
    name: "District TRAIL — Lonavala",
    city: "Lonavala",
    venue: "Tiger Point Base",
    date: "Sat, 10 Oct · 5:30 AM",
    price: 2799,
    earlyCoins: 180,
    emoji: "⛰️",
    format: [
      "14 km ghat trail with 2 strength gates",
      "Monsoon-graded route, marshalled",
      "Cut-off 3h 30m",
      "Shuttle from Pune & Mumbai",
    ],
    inclusions: [
      "Trail bib & aid stations",
      "Finisher kit — tee, medal, band",
      "Post-run stretch + breakfast",
    ],
    sponsors: [
      { name: "Pulseband", kind: "Wearables" },
      { name: "Saltwave", kind: "Electrolytes" },
    ],
  },
];

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  mrp: number;
  kind: "Wearable" | "Supplement" | "Recovery";
  fast: boolean;
  emoji: string;
  about: string;
  specs: string[];
};

export const products: Product[] = [
  {
    id: "pulseband-arc",
    brand: "Pulseband",
    name: "Arc Screenless Tracker",
    price: 21999,
    mrp: 24999,
    kind: "Wearable",
    fast: false,
    emoji: "⌚",
    about:
      "Screenless band that reads HRV, skin temperature and sleep staging, with a recovery score each morning.",
    specs: ["6-day battery", "HRV + SpO2 + temp", "Titanium shell", "1-yr membership included"],
  },
  {
    id: "vytal-ring",
    brand: "Vytal",
    name: "Smart Ring Gen 3",
    price: 27499,
    mrp: 29999,
    kind: "Wearable",
    fast: false,
    emoji: "💍",
    about: "Sleep-first smart ring with glucose-trend insights and a metabolic score.",
    specs: ["7-day battery", "Sleep staging", "Sizes 6–13", "Ceramic finish"],
  },
  {
    id: "nuvo-whey-isolate",
    brand: "Nuvo",
    name: "Whey Isolate 1kg · Cold Coffee",
    price: 3299,
    mrp: 3899,
    kind: "Supplement",
    fast: true,
    emoji: "🥛",
    about: "27 g protein per scoop, lab-tested each batch, zero added sugar.",
    specs: ["27 g protein", "0 g added sugar", "33 servings", "Batch report in app"],
  },
  {
    id: "saltwave-electrolytes",
    brand: "Saltwave",
    name: "Electrolyte Sticks · 30 pack",
    price: 899,
    mrp: 1099,
    kind: "Supplement",
    fast: true,
    emoji: "🧂",
    about: "Sodium-forward mix for humid Indian summers and long sessions.",
    specs: ["500 mg sodium", "No sugar", "Nimbu-pudina", "30 sticks"],
  },
  {
    id: "grain-gains-bars",
    brand: "Grain & Gains",
    name: "Protein Bar Box · 12",
    price: 1149,
    mrp: 1299,
    kind: "Supplement",
    fast: true,
    emoji: "🍫",
    about: "Millet-base bars with 15 g protein and real dates, made in Coimbatore.",
    specs: ["15 g protein", "Millet base", "12 bars", "No palm oil"],
  },
  {
    id: "thaw-roller",
    brand: "Thaw",
    name: "Percussion Recovery Gun",
    price: 8499,
    mrp: 9999,
    kind: "Recovery",
    fast: false,
    emoji: "🔧",
    about: "Quiet brushless motor, five heads, three-hour charge for calves and quads.",
    specs: ["45 dB", "5 heads", "3h battery", "Travel case"],
  },
];

export type Meal = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  note: string;
  emoji: string;
};

export const mealAlternatives: Meal[] = [
  { id: "m1", name: "Millet Khichdi Bowl", kcal: 480, protein: 22, note: "Light on ghee", emoji: "🍲" },
  { id: "m2", name: "Grilled Paneer Tikka Salad", kcal: 520, protein: 31, note: "High protein", emoji: "🥗" },
  { id: "m3", name: "Chicken Chettinad + Red Rice", kcal: 610, protein: 42, note: "Spice level 2", emoji: "🍛" },
  { id: "m4", name: "Rajma Quinoa Bowl", kcal: 540, protein: 26, note: "Vegan", emoji: "🫘" },
  { id: "m5", name: "Egg White Akuri + Multigrain", kcal: 430, protein: 29, note: "Breakfast swap", emoji: "🍳" },
  { id: "m6", name: "Fish Curry + Kerala Rice", kcal: 570, protein: 38, note: "Omega-3", emoji: "🐟" },
];

export const weekPlan: { day: string; date: string; meal: Meal }[] = [
  { day: "Mon", date: "8 Sep", meal: { id: "d1", name: "Moong Chilla + Mint Chutney", kcal: 460, protein: 24, note: "Gut friendly", emoji: "🥞" } },
  { day: "Tue", date: "9 Sep", meal: { id: "d2", name: "Chicken Tikka Rice Bowl", kcal: 600, protein: 44, note: "Post-workout", emoji: "🍗" } },
  { day: "Wed", date: "10 Sep", meal: { id: "d3", name: "Palak Paneer + Bajra Roti", kcal: 530, protein: 28, note: "Iron rich", emoji: "🥬" } },
  { day: "Thu", date: "11 Sep", meal: { id: "d4", name: "Prawn Ghee Roast + Salad", kcal: 500, protein: 36, note: "Low carb", emoji: "🍤" } },
  { day: "Fri", date: "12 Sep", meal: { id: "d5", name: "Chole + Brown Rice", kcal: 560, protein: 25, note: "Fibre boost", emoji: "🫓" } },
  { day: "Sat", date: "13 Sep", meal: { id: "d6", name: "Kerala Fish Curry Meal", kcal: 570, protein: 38, note: "Omega-3", emoji: "🐟" } },
  { day: "Sun", date: "14 Sep", meal: { id: "d7", name: "Sunday Reset Thali", kcal: 640, protein: 30, note: "Cheat-lite", emoji: "🍽️" } },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
