import { usePathname } from "next/navigation";
import { ROUTES } from "../../constants/routes";

interface ICurrentLink {
  name: string;
  href: string;
  current: boolean;
}

interface IReturn {
  businessManagementLinks: ICurrentLink[];
  teamOrganizationLinks: ICurrentLink[];
  clientCommunicationLinks: ICurrentLink[];
}

const useCompanySettingsNavigation = (): IReturn => {
  const pathname = usePathname();

  const businessManagementLinks: ICurrentLink[] = [
    {
      name: "Company Settings",
      href: ROUTES.COMPANY_SETTINGS,
      current: pathname === `${ROUTES.COMPANY_SETTINGS}`,
    },
    {
      name: "Branding",
      href: ROUTES.BRANDING,
      current: pathname === `${ROUTES.BRANDING}`,
    },
    {
      name: "Products & Services",
      href: ROUTES.PRODUCTS_SERVICES,
      current: pathname === `${ROUTES.PRODUCTS_SERVICES}`,
    },
    {
      name: "Custom Fields",
      href: ROUTES.CUSTOM_FIELDS,
      current: pathname === `${ROUTES.CUSTOM_FIELDS}`,
    },
    {
      name: "Expense Tracking",
      href: ROUTES.EXPENSE_TRACKING,
      current: pathname === `${ROUTES.EXPENSE_TRACKING}`,
    },
  ];
  const teamOrganizationLinks: ICurrentLink[] = [
    {
      name: "Manage Team",
      href: ROUTES.MANAGE_TEAM,
      current: pathname === `${ROUTES.MANAGE_TEAM}`,
    },
    {
      name: "Work Settings",
      href: ROUTES.WORK_SETTINGS,
      current: pathname === `${ROUTES.WORK_SETTINGS}`,
    },
    {
      name: "Schedule",
      href: ROUTES.SCHEDULE_SETTINGS,
      current: pathname === `${ROUTES.SCHEDULE_SETTINGS}`,
    },
    {
      name: "Location Services",
      href: ROUTES.LOCATION_SERVICES,
      current: pathname === `${ROUTES.LOCATION_SERVICES}`,
    },
    {
      name: "Route Optimization",
      href: ROUTES.ROUTE_OPTIMIZATION,
      current: pathname === `${ROUTES.ROUTE_OPTIMIZATION}`,
    },
    {
      name: "Job Forms",
      href: ROUTES.JOB_FORMS,
      current: pathname === `${ROUTES.JOB_FORMS}`,
    },
  ];
  const clientCommunicationLinks: ICurrentLink[] = [
    {
      name: "Client Hub",
      href: ROUTES.CLIENT_HUB,
      current: pathname === `${ROUTES.CLIENT_HUB}`,
    },
    {
      name: "Emails",
      href: ROUTES.EMAILS,
      current: pathname === `${ROUTES.EMAILS}`,
    },
    {
      name: "Requests",
      href: ROUTES.REQUESTS_SETTINGS,
      current: pathname === `${ROUTES.REQUESTS_SETTINGS}`,
    },
    {
      name: "Online Booking",
      href: ROUTES.ONLINE_BOOKING,
      current: pathname === `${ROUTES.ONLINE_BOOKING}`,
    },
  ];

  return {
    businessManagementLinks,
    teamOrganizationLinks,
    clientCommunicationLinks,
  };
};

export default useCompanySettingsNavigation;
