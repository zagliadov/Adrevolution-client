import { TopPriorityForm } from "@/app/ui/companyDetails/TopPriorityFrom/TopPriorityForm";

export default function TopPriority() {
  return (
    <div className="pt-6">
      <h3 className="text-3xl font-bold text-gray-700">
        What is your top priority?
      </h3>
      <span className="text-gray-700">
        While we is committed to helping you succeed in all aspects, which is
        your immediate focus for this year?
      </span>
      <TopPriorityForm />
    </div>
  );
}
