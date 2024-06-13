import { FC, ReactNode } from "react";

export type UiAuthPageLayoutProps = {
  title: string;
  description: string;
  children?: ReactNode;
  header?: ReactNode;
};

export const UiAuthPageLayout: FC<UiAuthPageLayoutProps> = ({
  title,
  description,
  children,
  header,
}) => {
  return (
    <main className={`min-h-screen grow flex flex-col first:antialiased`}>
      {header}
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4 sm:h-screen sm:w-screen">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};
