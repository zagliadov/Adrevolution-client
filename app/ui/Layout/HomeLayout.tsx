import { FC, ReactNode } from "react";
import { Header } from "../home/Header/Header";
import { Footer } from "../home/Footer/Footer";

interface IProps {
  children: ReactNode;
}
const HomeLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
