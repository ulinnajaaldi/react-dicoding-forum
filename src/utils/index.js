import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const putAccessToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
