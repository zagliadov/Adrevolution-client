import { BusinessForm } from "@/app/ui/companyDetails/BusinessFrom/BusinessFrom";

export default function Business() {

  return (
    <div className="pt-6">
      <h3 className="text-3xl font-bold text-gray-700">Set up your business</h3>
      <span className="text-gray-700">
        This will help us customize your experience at our.
      </span>
      <BusinessForm />
    </div>
  );
}
