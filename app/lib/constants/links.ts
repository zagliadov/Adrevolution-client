import {
  HomeIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  IdentificationIcon,
  InboxArrowDownIcon,
  CodeBracketSquareIcon,
  WrenchIcon,
  MegaphoneIcon,
  ClipboardDocumentListIcon,
  ReceiptPercentIcon,
  ClockIcon,
  SquaresPlusIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "./routes";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

interface ILinks {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export const links: ILinks[] = [
  { name: "Home", href: ROUTES.DASHBOARD, icon: HomeIcon },
  { name: "Schedule", href: ROUTES.SCHEDULE, icon: CalendarIcon },
  { name: "Clients", href: ROUTES.CLIENTS, icon: IdentificationIcon },
  { name: "Requests", href: ROUTES.REQUESTS, icon: InboxArrowDownIcon },
  { name: "Quotes", href: ROUTES.QUOTES, icon: CodeBracketSquareIcon },
  { name: "Jobs", href: ROUTES.JOBS, icon: WrenchIcon },
  {
    name: "Invoices",
    href: ROUTES.INVOICES,
    icon: DocumentDuplicateIcon,
  },
  { name: "Marketing", href: ROUTES.MARKETING, icon: MegaphoneIcon },
  {
    name: "Reports",
    href: ROUTES.REPORTS,
    icon: ClipboardDocumentListIcon,
  },
  { name: "Expenses", href: ROUTES.EXPENSES, icon: ReceiptPercentIcon },
  { name: "Timesheets", href: ROUTES.TIMESHEETS, icon: ClockIcon },
  { name: "Apps", href: ROUTES.APPS, icon: SquaresPlusIcon },
  {
    name: "Refer and Friend",
    href: ROUTES.REFER_AND_FRIEND,
    icon: GiftIcon,
  },
];

interface ISimpleLink {
  name: string;
  href: string;
}
export const dashboardSettingsLinks: ISimpleLink[] = [
  { name: "Settings", href: ROUTES.COMPANY_SETTINGS },
  { name: "Manage Team", href: ROUTES.MANAGE_TEAM },
  { name: "Refer and Friend", href: ROUTES.REFER_AND_FRIEND },
];
