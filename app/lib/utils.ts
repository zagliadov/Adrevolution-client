import { UserDto } from "./api/generated";
import { CalendarEvent, CalendarResource } from "./definitions";

export const transformUsersToResources = (
  users: UserDto[]
): CalendarResource[] => {
  return users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    eventColor: "blue", // Или другой цвет, если нужно
    meta: { job: "Developer"}
  }));
};

export const transformUsersToEvents = (users: UserDto[]): CalendarEvent[] => {
  return users.map((user) => ({
    id: user.id,
    name: `Some - event`,
    startDate: user.lastLogin ?? new Date().toISOString(), // Используем lastLogin или текущую дату для startDate
    allDay: true,
    endDate: new Date(
      new Date(user.lastLogin ?? new Date()).getTime() + 60 * 60 * 1000
    ).toISOString(), // Пример длительности 1 час
    resourceId: user.id, // Привязка события к пользователю
  }));
};
