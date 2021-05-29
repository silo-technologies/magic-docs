import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
};
const Navbar: React.FC<Props> = ({ icon, title, subtitle, children }) => (
  <div className="relative bg-white border-b-2 border-gray-100 p-6">
    <div className="container mx-auto flex flex-row">
      <div className="mr-2 flex flex-col self-stretch items-start">
        <h1 className="text-3xl">{icon}</h1>
      </div>
      <div className="flex flex-row flex-grow items-center flex-wrap">
        <div className="flex flex-col mr-8">
          <h1 className="text-3xl">{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default Navbar;
