import { ProfileForm } from "@/app/ui/companyDetails/ProfileForm/ProfileForm";

export default function Profile() {
  return (
    <div className="pt-6">
      <h3 className="text-3xl font-bold text-gray-700">
        Your free trial is now active!
      </h3>
      <span className="text-gray-700">Welcome! — Let`s get you started.</span>
      <ProfileForm />
    </div>
  );
}
