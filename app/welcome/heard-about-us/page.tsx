import { HeardAboutUsForm } from "@/app/ui/companyDetails/HeardAboutUsForm/HeardAboutUsForm";

export default function HeardAboutUs() {
  return (
    <div className="pt-6">
      <h3 className="text-3xl font-bold text-gray-700">One last thing...</h3>
      <span className="text-gray-700">
        How did you find out about us? We`d love to know!
      </span>
      <HeardAboutUsForm />
    </div>
  );
}
