import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const DashboardLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <header>Header dashboard</header>
      <main className="flex-grow">{children}</main>
      <footer>Footer</footer>
    </>
  );
};

export default DashboardLayout;
