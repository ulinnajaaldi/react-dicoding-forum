import { clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale/id";
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

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
};
