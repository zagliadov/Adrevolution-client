"use client";

import { ResourceStore, ProjectModel } from "@bryntum/calendar";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGetUsersOfCompany } from "@/app/lib/queries/company";
import {
  transformUsersToEvents,
  transformUsersToResources,
} from "@/app/lib/utils";

const Calendar = dynamic(() => import("@/app/ui/Calendar/Calendar"), {
  ssr: false,
});

const resourceData = [
  {
    id: 1,
    name: "Austin",
    expanded: true,
    children: [
      { id: 2, name: "Dan" },
      { id: 3, name: "Macy" },
      { id: 4, name: "Mark" },
    ],
  },
  {
    id: 5,
    name: "San Diego",
    expanded: true,
    children: [
      { id: 6, name: "Dave" },
      { id: 7, name: "Lisa" },
      { id: 8, name: "Rob" },
    ],
  },
];

const eventData = [
  {
    id: 1,
    resourceId: 2,
    startDate: "2024-06-18",
    endDate: "2024-06-19",
    name: "Event 1",
  },
  {
    id: 2,
    resourceId: 6,
    startDate: "2024-06-20",
    endDate: "2024-06-21",
    name: "Event 2",
  },
  // Добавьте другие события по мере необходимости
];

export default function Schedule() {
  const calendarRef = useRef(null);
  const { data: users, isLoading, error } = useGetUsersOfCompany();

  const resources = transformUsersToResources(users || []);
  const events = transformUsersToEvents(users || []);

  const [resourceStore] = useState(
    () =>
      new ResourceStore({
        data: resources,
      })
  );
  const [project] = useState(
    () =>
      new ProjectModel({
        resourceStore,
        eventStore: { data: events },
        assignmentStore: {},
        dependencyStore: {},
      })
  );

  useEffect(() => {
    const loadData = async () => {
      await project.commitAsync();
    };

    loadData();
  }, [project]);

  return (
    <Calendar
      calendarRef={calendarRef}
      project={project}
      startDate={new Date(2024, 5, 18)}
      endDate={new Date(2024, 5, 25)}
      viewPreset="dayAndWeek"
      columns={[{ text: "Name", field: "name", width: 130 }]}
    />
  );
}

// "use client";
// import { calendarConfig as defaultCalendarConfig } from "@/app/CalendarConfig";
// import { useGetUsersOfCompany } from "@/app/lib/queries/company";
// import {
//   transformUsersToEvents,
//   transformUsersToResources,
// } from "@/app/lib/utils";
// import dynamic from "next/dynamic";
// import { useRef, useEffect, useState } from "react";
// import { BryntumCalendar } from "@bryntum/calendar-react";

// const Calendar = dynamic(() => import("@/app/ui/Calendar/Calendar"), {
//   ssr: false,
// });

// export default function Schedule() {
//   const calendarRef = useRef<BryntumCalendar | null>(null);
//   const { data: users, isLoading, error } = useGetUsersOfCompany();

//   // Проверка загруженных данных
//   useEffect(() => {
//     console.log("Loaded users:", users);
//   }, [users]);

//   const resources = transformUsersToResources(users || []);
//   const events = transformUsersToEvents(users || []);

//   // Проверка преобразованных данных
//   useEffect(() => {
//     console.log("Resources:", resources);
//     console.log("Events:", events);
//   }, [resources, events]);

//   const [hideEmptyResources, setHideEmptyResources] = useState(false);
//   const [showAvatars, setShowAvatars] = useState(true);
//   const [hideWeekends, setHideWeekends] = useState(true);
//   const [resourceWidth, setResourceWidth] = useState(10);

//   useEffect(() => {
//     console.log(showAvatars, "showAvatars");
//   }, [showAvatars]);

//   const [calendarConfig] = useState({
//     ...defaultCalendarConfig,
//     resources,
//     events,
//     modes: {
//       day: null,
//       week: null,
//       month: null,
//       year: null,
//       agenda: null,
//       dayresource: {
//         hideNonWorkingDays: hideWeekends,
//         minResourceWidth: `${resourceWidth}em`,
//         shortEventDuration: "1 hour",
//       },
//     },
//     sidebar: {
//       items: {
//         datePicker: {
//           tbar: {
//             items: {
//               prevYear: false,
//               nextYear: false,
//             },
//           },
//         },
//         resourceFilter: {
//           minHeight: "22em",
//           store: {
//             groupers: [{ field: "team", ascending: true }],
//           },
//           selected: [1, 2, 3],
//         },
//       },
//     },
//     tbar: {
//       items: {
//         hideEmptyResources: {
//           type: "checkbox",
//           text: "Hide unscheduled resources",
//           weight: 600,
//           checked: hideEmptyResources,
//           style: "margin: 0 1em",
//           onChange: ({ value }: { value: boolean }) =>
//             setHideEmptyResources(value),
//         },
//         showAvatars: {
//           type: "checkbox",
//           text: "Show avatar",
//           weight: 600,
//           checked: showAvatars,
//           style: "margin: 0 1em",
//           onChange: ({ value }: { value: boolean }) => setShowAvatars(value),
//         },
//         hideWeekends: {
//           type: "checkbox",
//           text: "Hide weekends",
//           weight: 600,
//           checked: hideWeekends,
//           style: "margin: 0 1em",
//           onChange: ({ value }: { value: boolean }) => setHideWeekends(value),
//         },
//         viewWidth: {
//           type: "slider",
//           text: "Resource width",
//           weight: 640,
//           min: 4,
//           max: 35,
//           value: resourceWidth,
//           width: 150,
//           unit: "em",
//           showValue: false,
//           showTooltip: true,
//           onInput: ({ value }: { value: number }) => setResourceWidth(value),
//         },
//       },
//     },
//   });

//   const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     if (calendarRef.current) {
//       console.log(calendarRef.current.instance);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       Schedule
//       <button onClick={clickHandler}>ref test</button>
//       <Calendar calendarRef={calendarRef} {...calendarConfig} />
//     </div>
//   );
// }
