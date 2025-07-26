import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <section className="flex-1 scroll overflow-hidden bg-gray-950 px-5 py-4 h-full">
      <Outlet />
    </section>
  );
};

export default MainContent;
