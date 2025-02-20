import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUsername = () => {
  return "user_" + generateRandom8DigitNumber();
};

export const generateRandom8DigitNumber = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};
