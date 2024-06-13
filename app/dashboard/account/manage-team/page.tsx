import { ROUTES } from "@/app/lib/constants/routes";
import { MobileSideNavSettings } from "@/app/ui/dashboard/MobileSideNavSettings";
import Link from "next/link";
import { ActiveUser } from "@/app/ui/dashboard/ManageTeam/ActiveUser/ActiveUser";
import { TeamTable } from "@/app/ui/dashboard/ManageTeam/TeamTable/TeamTable";

export default function ManageTeam() {
  return (
    <div className="px-4">
      <div className="flex items-center py-6 md:pt-0 justify-between">
        <h2 className="font-bold text-3xl xl:hidden">Manage Team</h2>
        <MobileSideNavSettings />
      </div>
      <div className="flex items-center pb-6 md:pt-0 justify-between">
        <h2 className="font-bold text-3xl hidden xl:flex">Manage Team</h2>
        <Link href={ROUTES.NEW} className="btn btn-success w-full xl:w-auto">
          Add User
        </Link>
      </div>
      <div>
        <p className="pb-4">
          Add or manage team members that need to log into our in the office
          or in the field. Dispatch them to job sites or give them access to
          more our features.
        </p>
      </div>
      <div className="flex flex-col 2xl:flex-row justify-between gap-4">
        <ActiveUser />
        <TeamTable />
      </div>
    </div>
  );
}
