import { Open_Sans } from "next/font/google";
import { Inter } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--var-open_sans",
});
export const inter = Inter({ subsets: ["latin"], variable: "--var-inter" });
