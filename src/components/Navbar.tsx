import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
};
const Navbar: React.FC<Props> = ({ icon, title, subtitle, children }) => (
  <div className="relative bg-white sm:border-b-2 border-gray-100 p-4 container mx-auto flex items-center flex-wrap">
    <div className="inline-flex flex-row p-2 sm:p-0">
      <div className="mr-2 flex flex-col self-stretch items-start">
        <h1 className="text-2xl sm:text-3xl">{icon}</h1>
      </div>
      <div className="flex flex-row flex-grow items-center flex-wrap">
        <div className="flex flex-col mr-8">
          <h1 className="text-2xl sm:text-3xl break-all">{title}</h1>
          <p className="text-xs sm:text-base break-all">{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="flex-grow block my-3">{children}</div>
  </div>
);

export default Navbar;
