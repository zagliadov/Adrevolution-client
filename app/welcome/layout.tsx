"use client";
import { ROUTES } from "../lib/constants/routes";
import { usePathname } from "next/navigation";

const steps = [
  ROUTES.WELCOME_PROFILE,
  ROUTES.WELCOME_BUSINESS,
  ROUTES.WELCOME_TOP_PRIORITY,
  ROUTES.WELCOME_HEARD_ABOUT_US,
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen flex-col px-20 py-40 bg-gray-50 overflow-hidden">
      <nav className="flex flex-col">
        <h2 className="text-4xl font-bold pb-10 text-primary">Adrevolution</h2>
        <div className="flex text-sm gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-28 h-2 rounded-full ${
                steps.indexOf(pathname) >= index ? "bg-success" : "bg-base-200"
              }`}
            ></div>
          ))}
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
