import { clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale/id";
import { toast } from "sonner";
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

export const showErrorToastLogin = (navigate) => {
  toast.error("Kamu belum login", {
    description: "Silahkan login untuk memberikan vote pada thread",
    action: {
      label: "Login",
      onClick: () => navigate("/login"),
    },
  });
};
