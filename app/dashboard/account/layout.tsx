import { SideNavSettings } from "@/app/ui/dashboard/SideNavSettings";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-row">
      <SideNavSettings />
      <div className="flex-grow md:pt-6 flex justify-center">{children}</div>
    </div>
  );
}
