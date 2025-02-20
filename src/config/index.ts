export const navLinks = [
  {
    name: "Home",
    value: "/",
  },
  {
    name: "Buy accounts",
    value: "/buy",
  },
  {
    name: "Sell accounts",
    value: "/sell",
  },
];

export const BASE_URL = process.env.BASE_URL as string;
export const VERCEL_URL = BASE_URL;

// for getting the abs url
export const absoulteUrl = (path: string) => {
  if (typeof window !== "undefined") return path;
  if (VERCEL_URL) return `${VERCEL_URL}${path}`;
  return `${BASE_URL}${path}`;
};

export const paymentMethods = [
  {
    id: "telebirr",
    name: "Telebirr",
  },
  {
    id: "cbebirr",
    name: "CBEBirr",
  },
];

export type paymentMethodTypes = "telebirr" | "cbebirr";
export const paymentMethodLists = ["telebirr", "cbebirr"];

export const accountTypesNamed = [
  {
    id: "pubg",
    name: "PUBG",
  },
  {
    id: "freefire",
    name: "Free Fire",
  },
  {
    id: "codm",
    name: "Call of Duty Mobile",
  },
  {
    id: "fortnite",
    name: "Fortnite",
  },
  {
    id: "other",
    name: "Other",
  },
  {
    id: "tiktok",
    name: "TikTok",
  },
  {
    id: "instagram",
    name: "Instagram",
  },
];

export type accountTypes =
  | "pubg"
  | "freefire"
  | "codm"
  | "fortnite"
  | "other"
  | "tiktok"
  | "instagram";
export const accountTypeLists = [
  "pubg",
  "freefire",
  "codm",
  "fortnite",
  "other",
  "tiktok",
  "instagram",
];

export const gameAccountTypesLists = ["pubg", "freefire", "codm", "fortnite"];
export const socialsAccountTypesLists = ["tiktok", "instagram"];
