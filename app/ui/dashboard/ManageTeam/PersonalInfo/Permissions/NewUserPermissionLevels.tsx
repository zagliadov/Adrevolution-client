import { IFormField, PERMISSION_LEVEL } from "@/app/lib/definitions";
import React, { FC, useEffect } from "react";
import {
  useForm,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface PermissionLevel {
  value: string;
  label: string;
  description: string;
  permissions: Record<string, boolean | string>;
}

const permissionLevels: PermissionLevel[] = [
  {
    value: PERMISSION_LEVEL.WORKER,
    label: "Worker",
    description:
      "Can view all clients, quotes, and jobs, including pricing details.",
    permissions: {
      schedule: "Edit their own schedule",
      timeTracking: "View, record, and edit their own",
      notes: "View all notes",
      expenses: "View, record, and edit everyone's",
      showPricing: true,
      jobCosting: false,
      clientsAndProperties: "View full client and property info",
      showClientsInJobberMenu: true,
      requests: "View, create, and edit",
      showRequestsOnMenu: true,
      quotes: "View, create, and edit",
      showQuotesOnMenu: true,
      jobs: "View, create, and edit",
      showJobsOnMenu: true,
      invoices: "View, create, and edit",
      showInvoicesOnMenu: true,
      reports: true,
      showSchedule: true,
      showTimeTracking: true,
    },
  },
  {
    value: PERMISSION_LEVEL.MANAGER,
    label: "Manager",
    description:
      "Can manage all areas excluding reports and payroll. Recommended for management.",
    permissions: {
      schedule: "Edit and delete everyone's schedule",
      timeTracking: "View, record, and edit everyone's",
      notes: "View, edit, and delete all",
      expenses: "View, record, and edit their own",
      showPricing: true,
      jobCosting: true,
      clientsAndProperties: "View and edit full client and property info",
      showClientsInJobberMenu: true,
      requests: "View, create, and edit",
      showRequestsOnMenu: true,
      quotes: "View, create, and edit",
      showQuotesOnMenu: true,
      jobs: "View, create, and edit",
      showJobsOnMenu: true,
      invoices: "View, create, and edit",
      showInvoicesOnMenu: true,
      reports: true,
    },
  },
];

interface IProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const NewUserPermissionLevels: FC<IProps> = ({
  register,
  watch,
  setValue,
}) => {
  const selectedLevel = watch(IFormField.PERMISSION_LEVEL);

  useEffect(() => {
    // Set default permission level to "Worker" if none is selected
    if (!selectedLevel) {
      setValue(IFormField.PERMISSION_LEVEL, PERMISSION_LEVEL.WORKER);
    }
  }, [selectedLevel, setValue]);

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl">Preset permission levels</h2>
      <p>
        Start with a preset permission level, and customize further as needed.
      </p>
      <div className="space-y-2">
        {permissionLevels.map((level) => (
          <label key={level.value} className="flex items-start space-x-2">
            <input
              type="radio"
              {...register(IFormField.PERMISSION_LEVEL)}
              value={level.value}
              checked={selectedLevel === level.value}
              className="radio radio-primary"
            />
            <div>
              <span className="font-bold">{level.label}</span>
              {level.description && (
                <p className="text-sm text-gray-600">{level.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// import React, { useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";

// interface PermissionLevel {
//   value: string;
//   label: string;
//   description: string;
//   permissions: Record<string, boolean | string>;
// }

// const permissionLevels: PermissionLevel[] = [
//   {
//     value: "Limited worker",
//     label: "Limited worker",
//     description:
//       "Can view their schedule, mark work complete, and track their time.",
//     permissions: {
//       schedule: "View and complete their own schedule",
//       timeTracking: "View and record their own",
//       notes: "View notes on jobs and visits only",
//       expenses: "View, record, and edit their own",
//       showPricing: false,
//       jobCosting: false,
//       clientsAndProperties: "View client name and address only",
//       showClientsInJobberMenu: false,
//       requests: "View only",
//       showRequestsOnMenu: false,
//       quotes: "View only",
//       showQuotesOnMenu: false,
//       jobs: "View only",
//       showJobsOnMenu: false,
//       invoices: "View only",
//       showInvoicesOnMenu: false,
//       reports: false,
//       showSchedule: true,
//       showTimeTracking: true,
//     },
//   },
//   {
//     value: "Worker",
//     label: "Worker",
//     description:
//       "Can view all clients, quotes, and jobs, including pricing details.",
//     permissions: {
//       schedule: "Edit their own schedule",
//       timeTracking: "View, record, and edit their own",
//       notes: "View all notes",
//       expenses: "View, record, and edit everyone's",
//       showPricing: true,
//       jobCosting: false,
//       clientsAndProperties: "View full client and property info",
//       showClientsInJobberMenu: true,
//       requests: "View, create, and edit",
//       showRequestsOnMenu: true,
//       quotes: "View, create, and edit",
//       showQuotesOnMenu: true,
//       jobs: "View, create, and edit",
//       showJobsOnMenu: true,
//       invoices: "View, create, and edit",
//       showInvoicesOnMenu: true,
//       reports: true,
//       showSchedule: true,
//       showTimeTracking: true,
//     },
//   },
//   {
//     value: "Dispatcher",
//     label: "Dispatcher",
//     description:
//       "Can edit job, team and client details. Recommended for team leads.",
//     permissions: {
//       schedule: "Edit everyone's schedule",
//       timeTracking: "View, record, and edit everyone's",
//       notes: "View and edit all",
//       expenses: "View, record, and edit their own",
//       showPricing: true,
//       jobCosting: true,
//       clientsAndProperties: "View and edit full client and property info",
//       showClientsInJobberMenu: true,
//       requests: "View, create, and edit",
//       showRequestsOnMenu: true,
//       quotes: "View, create, and edit",
//       showQuotesOnMenu: true,
//       jobs: "View, create, and edit",
//       showJobsOnMenu: true,
//       invoices: "View, create, and edit",
//       showInvoicesOnMenu: true,
//       reports: true,
//     },
//   },
//   {
//     value: "Manager",
//     label: "Manager",
//     description:
//       "Can manage all areas excluding reports and payroll. Recommended for management.",
//     permissions: {
//       schedule: "Edit and delete everyone's schedule",
//       timeTracking: "View, record, and edit everyone's",
//       notes: "View, edit, and delete all",
//       expenses: "View, record, and edit their own",
//       showPricing: true,
//       jobCosting: true,
//       clientsAndProperties: "View and edit full client and property info",
//       showClientsInJobberMenu: true,
//       requests: "View, create, and edit",
//       showRequestsOnMenu: true,
//       quotes: "View, create, and edit",
//       showQuotesOnMenu: true,
//       jobs: "View, create, and edit",
//       showJobsOnMenu: true,
//       invoices: "View, create, and edit",
//       showInvoicesOnMenu: true,
//       reports: true,
//     },
//   },
//   {
//     value: "Custom",
//     label: "Custom",
//     description: "",
//     permissions: {
//       schedule: "View their own schedule",
//       timeTracking: "View and record their own",
//       notes: "View notes on jobs and visits only",
//       expenses: "View, record, and edit their own",
//       showPricing: false,
//       jobCosting: false,
//       clientsAndProperties: "View client name and address only",
//       showClientsInJobberMenu: false,
//       requests: "View only",
//       showRequestsOnMenu: false,
//       quotes: "View only",
//       showQuotesOnMenu: false,
//       jobs: "View only",
//       showJobsOnMenu: false,
//       invoices: "View only",
//       showInvoicesOnMenu: false,
//       reports: false,
//     },
//   },
// ];

// const PermissionLevels: React.FC = () => {
//   const { control, watch, setValue } = useForm({
//     defaultValues: {
//       permissionLevel: "Limited Worker",
//       permissions: permissionLevels[0].permissions,
//     },
//   });

//   const selectedLevel = watch("permissionLevel");

//   useEffect(() => {
//     const level = permissionLevels.find(
//       (level) => level.value === selectedLevel
//     );
//     if (level && selectedLevel !== "Custom") {
//       setValue("permissions", level.permissions);
//     }
//   }, [selectedLevel, setValue]);

//   return (
//     <div className="space-y-4">
//       <h2 className="font-bold text-2xl">Preset permission levels</h2>
//       <p>
//         Start with a preset permission level, and customize further as needed.
//       </p>
//       <div className="space-y-2">
//         {permissionLevels.map((level) => (
//           <Controller
//             key={level.value}
//             name="permissionLevel"
//             control={control}
//             render={({ field }) => (
//               <label className="flex items-start space-x-2">
//                 <input
//                   type="radio"
//                   {...field}
//                   value={level.value}
//                   checked={field.value === level.value}
//                   className="radio radio-primary"
//                 />
//                 <div>
//                   <span className="font-bold">{level.label}</span>
//                   {level.description && (
//                     <p className="text-sm text-gray-600">{level.description}</p>
//                   )}
//                 </div>
//               </label>
//             )}
//           />
//         ))}
//       </div>
//       <PermissionsForm control={control} watch={watch} />
//     </div>
//   );
// };

// interface PermissionsFormProps {
//   control: any;
//   watch: any;
// }

// const PermissionsForm: React.FC<PermissionsFormProps> = ({
//   control,
//   watch,
// }) => {
//   const permissions = watch("permissions");
//   const clientsAndProperties = watch("permissions.clientsAndProperties");

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between">
//         <Section
//           title="Schedule"
//           name="schedule"
//           control={control}
//           watch={watch}
//           options={[
//             {
//               label: "View their own schedule",
//               value: "View their own schedule",
//             },
//             {
//               label: "View and complete their own schedule",
//               value: "View and complete their own schedule",
//             },
//             {
//               label: "Edit their own schedule",
//               value: "Edit their own schedule",
//             },
//             {
//               label: "Edit everyone's schedule",
//               value: "Edit everyone's schedule",
//             },
//             {
//               label: "Edit and delete everyone's schedule",
//               value: "Edit and delete everyone's schedule",
//             },
//           ]}
//         />
//         <Controller
//           name="permissions.showSchedule"
//           control={control}
//           render={({ field }) => (
//             <label className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 {...field}
//                 checked={field.value}
//                 className="toggle toggle-success"
//               />
//             </label>
//           )}
//         />
//       </div>

//       <div className="flex justify-between">
//         <Section
//           title="Time tracking and timesheet"
//           name="timeTracking"
//           control={control}
//           watch={watch}
//           options={[
//             {
//               label: "View and record their own",
//               value: "View and record their own",
//             },
//             {
//               label: "View, record, and edit their own",
//               value: "View, record, and edit their own",
//             },
//             {
//               label: "View, record, and edit everyone's",
//               value: "View, record, and edit everyone's",
//             },
//           ]}
//         />
//         <Controller
//           name="permissions.showTimeTracking"
//           control={control}
//           render={({ field }) => (
//             <label className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 {...field}
//                 checked={field.value}
//                 className="toggle toggle-success"
//               />
//             </label>
//           )}
//         />
//       </div>

//       <Section
//         title="Notes"
//         name="notes"
//         control={control}
//         watch={watch}
//         options={[
//           {
//             label: "View notes on jobs and visits only",
//             value: "View notes on jobs and visits only",
//           },
//           { label: "View all notes", value: "View all notes" },
//           { label: "View and edit all", value: "View and edit all" },
//           {
//             label: "View, edit, and delete all",
//             value: "View, edit, and delete all",
//           },
//         ]}
//         description="Includes all notes across Jobber. You can hide notes for a feature by turning off permissions for that feature."
//       />
//       <Section
//         title="Expenses"
//         name="expenses"
//         control={control}
//         watch={watch}
//         options={[
//           {
//             label: "View, record, and edit their own",
//             value: "View, record, and edit their own",
//           },
//           {
//             label: "View, record, and edit everyone's",
//             value: "View, record, and edit everyone's",
//           },
//         ]}
//       />
//       <div className="flex items-end justify-between">
//         <div>
//           <h3 className="font-bold text-lg">Show pricing</h3>
//           <span>
//             Allows editing of quotes, invoices, and line items on jobs.
//           </span>
//         </div>

//         <Controller
//           name="permissions.showPricing"
//           control={control}
//           render={({ field }) => (
//             <label className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 {...field}
//                 checked={field.value}
//                 className="toggle toggle-success"
//               />
//             </label>
//           )}
//         />
//       </div>
//       <div className="flex items-end justify-between">
//         <div>
//           <h3 className="font-bold text-lg">Job costing</h3>
//           <span>
//             Show job profit by tracking revenue and costs from line items,
//             labor, and expenses.
//           </span>
//         </div>

//         <Controller
//           name="permissions.jobCosting"
//           control={control}
//           render={({ field }) => (
//             <label className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 {...field}
//                 checked={field.value}
//                 className="toggle toggle-success"
//               />
//             </label>
//           )}
//         />
//       </div>
//       <Section
//         title="Clients and properties"
//         name="clientsAndProperties"
//         control={control}
//         watch={watch}
//         options={[
//           {
//             label: "View client name and address only",
//             value: "View client name and address only",
//           },
//           {
//             label: "View full client and property info",
//             value: "View full client and property info",
//           },
//           {
//             label: "View and edit full client and property info",
//             value: "View and edit full client and property info",
//           },
//           {
//             label: "View, edit, and delete full client and property info",
//             value: "View, edit, and delete full client and property info",
//           },
//         ]}
//         description="Includes access to all client custom fields."
//         extraCheckbox={{
//           label: "Show clients on their Jobber menu",
//           name: "showClientsInJobberMenu",
//         }}
//       />
//       <Section
//         title="Requests"
//         name="requests"
//         control={control}
//         watch={watch}
//         options={[
//           { label: "View only", value: "View only" },
//           { label: "View, create, and edit", value: "View, create, and edit" },
//           {
//             label: "View, create, edit, and delete",
//             value: "View, create, edit, and delete",
//           },
//         ]}
//         extraCheckbox={{
//           label: "Show requests on their Jobber menu",
//           name: "showRequestsOnMenu",
//         }}
//         disabled={clientsAndProperties === "View client name and address only"}
//         disableMessage="Select view full client and property info to give access to requests."
//       />
//       <Section
//         title="Quotes"
//         name="quotes"
//         control={control}
//         watch={watch}
//         options={[
//           { label: "View only", value: "View only" },
//           { label: "View, create, and edit", value: "View, create, and edit" },
//           {
//             label: "View, create, edit, and delete",
//             value: "View, create, edit, and delete",
//           },
//         ]}
//         extraCheckbox={{
//           label: "Show quotes on their Jobber menu",
//           name: "showQuotesOnMenu",
//         }}
//         disabled={clientsAndProperties === "View client name and address only"}
//         disableMessage="Select view full client and property info to give access to quotes."
//       />
//       <Section
//         title="Jobs"
//         name="jobs"
//         control={control}
//         watch={watch}
//         options={[
//           { label: "View only", value: "View only" },
//           { label: "View, create, and edit", value: "View, create, and edit" },
//           {
//             label: "View, create, edit, and delete",
//             value: "View, create, edit, and delete",
//           },
//         ]}
//         extraCheckbox={{
//           label: "Show jobs on their Jobber menu",
//           name: "showJobsOnMenu",
//         }}
//         disabled={clientsAndProperties === "View client name and address only"}
//         disableMessage="Select view full client and property info to give access to jobs."
//       />
//       <Section
//         title="Invoices"
//         name="invoices"
//         control={control}
//         watch={watch}
//         options={[
//           { label: "View only", value: "View only" },
//           { label: "View, create, and edit", value: "View, create, and edit" },
//           {
//             label: "View, create, edit, and delete",
//             value: "View, create, edit, and delete",
//           },
//         ]}
//         extraCheckbox={{
//           label: "Show invoices on their Jobber menu",
//           name: "showInvoicesOnMenu",
//         }}
//         disabled={clientsAndProperties === "View client name and address only"}
//         disableMessage="Select view full client and property info to give access to invoices."
//       />
//       <div>
//         <h3 className="font-bold text-lg">Reports</h3>
//         <p>
//           Users will only be able to see reports available to them based on
//           their other permissions.
//         </p>
//         <Controller
//           name="permissions.reports"
//           control={control}
//           render={({ field }) => (
//             <label className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 {...field}
//                 checked={field.value}
//                 disabled={
//                   clientsAndProperties === "View client name and address only"
//                 }
//                 className="toggle toggle-success"
//               />
//               <span>Enable reports</span>
//             </label>
//           )}
//         />
//         {clientsAndProperties === "View client name and address only" && (
//           <p>
//             Select view full client and property info to give access to reports.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// interface SectionProps {
//   title: string;
//   name: string;
//   control: any;
//   watch: any;
//   options: { label: string; value: string }[];
//   description?: string;
//   extraCheckbox?: { label: string; name: string };
//   disabled?: boolean;
//   disableMessage?: string;
//   isCheckbox?: boolean;
// }

// const Section: React.FC<SectionProps> = ({
//   title,
//   name,
//   control,
//   watch,
//   options,
//   description,
//   extraCheckbox,
//   disabled,
//   disableMessage,
//   isCheckbox,
// }) => {
//   const selectedOption = watch(`permissions.${name}`);
//   const isToggleOn = watch(
//     `permissions.show${name.charAt(0).toUpperCase() + name.slice(1)}`
//   );

//   return (
//     <div>
//       <h3 className="font-bold text-lg">{title}</h3>
//       {description && <p className="text-sm text-gray-600">{description}</p>}
//       {disabled ? (
//         <p className="text-sm text-gray-600 mt-2">{disableMessage}</p>
//       ) : (
//         isToggleOn && (
//           <div className="mt-4 space-y-2">
//             {options.map((option) => (
//               <Controller
//                 key={option.value}
//                 name={`permissions.${name}`}
//                 control={control}
//                 render={({ field }) => (
//                   <label className="flex items-start space-x-2">
//                     <input
//                       type="radio"
//                       {...field}
//                       value={option.value}
//                       checked={field.value === option.value}
//                       className="radio radio-primary"
//                     />
//                     <span>{option.label}</span>
//                   </label>
//                 )}
//               />
//             ))}
//             {isCheckbox && (
//               <Controller
//                 name={`permissions.${name}`}
//                 control={control}
//                 render={({ field }) => (
//                   <label className="flex items-start space-x-2">
//                     <input
//                       type="checkbox"
//                       {...field}
//                       checked={field.value}
//                       className="toggle toggle-success"
//                     />
//                   </label>
//                 )}
//               />
//             )}
//           </div>
//         )
//       )}
//       {extraCheckbox && !disabled && isToggleOn && (
//         <div className="mt-2">
//           <Controller
//             name={`permissions.${extraCheckbox.name}`}
//             control={control}
//             render={({ field }) => (
//               <div>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...field}
//                     disabled={
//                       selectedOption === "View client name and address only"
//                     }
//                     checked={
//                       selectedOption !== "View client name and address only" &&
//                       field.value
//                     }
//                     className="checkbox checkbox-primary"
//                   />
//                   <span>{extraCheckbox.label}</span>
//                 </label>
//                 {selectedOption === "View client name and address only" && (
//                   <div>
//                     <p>
//                       Select{" "}
//                       <span className="font-bold">View, create, and edit</span>{" "}
//                       to see a list of all {title.toLowerCase()}.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PermissionLevels;
