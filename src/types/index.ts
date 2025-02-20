export type CardInfo = {
  images: ["/pubg.png"];
  id: string;
  price: number;
  level?: number;
  description: string;
  genre: "pubg" | "freefire" | "cod" | "instagram" | "tiktok" | "youtube";
};
