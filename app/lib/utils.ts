import { UserDto } from "./api/generated";
import { Resource, Event } from "./definitions";

export const transformUsersToResources = (users: UserDto[]): Resource[] => {
  return users.map((user, index) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    lastLogin: user.lastLogin,
  }));
};

export const transformUsersToEvents = (users: UserDto[]): Event[] => {
  return users.map((user, index) => {
    const startDate = user.lastLogin ? new Date(user.lastLogin) : new Date();
    const endDate = new Date(startDate.getTime() + 3600000);

    return {
      id: index + 1,
      resourceId: user.id,
      startDate,
      endDate,
      name: `Event for ${user.firstName} ${user.lastName}`,
    };
  });
};
