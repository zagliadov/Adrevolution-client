import { format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Formats a date to the 'dd MMM. yyyy' format
 * @param isoDate - The date in ISO format
 * @returns The date in 'dd MMM. yyyy' format
 */
export const formatEnglishDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return format(date, "dd MMM. yyyy", { locale: enUS });
};
