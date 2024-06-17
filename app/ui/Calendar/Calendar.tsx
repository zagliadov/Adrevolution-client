import { BryntumCalendar } from "@bryntum/calendar-react";

interface IProps {
  calendarRef: React.MutableRefObject<BryntumCalendar | null>; // Позволяем ref быть null
  children?: React.ReactNode; // Делаем children опциональным
  calendarConfig?: any; // Пропущен в Schedule.tsx, добавляем его здесь
}

export default function Calendar({ calendarRef, ...props }: any) {
  return <BryntumCalendar {...props} ref={calendarRef}/>
}