import { CompanyDetailsForm } from "@/app/ui/dashboard/Account/CompanySettingsForm/CompanyDetailsForm";
import { MobileSideNavSettings } from "@/app/ui/dashboard/MobileSideNavSettings";

export default function Account() {
  return (
    <div className="px-4">
      <div className="flex items-center py-6 md:pt-0 justify-between">
        <h2 className="font-bold text-3xl">Company settings</h2>
        <MobileSideNavSettings />
      </div>
      <CompanyDetailsForm />
    </div>
  );
}
