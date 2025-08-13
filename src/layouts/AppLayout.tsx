import React, { useEffect, useState } from "react";
import PlayerBar from "@components/PlayerBar";
import AsideBar from "@components/AsideBar";

import { getUserProfile } from "../services/userServices";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavbar from "@components/navbars/MainNavbar";

const AppLayout = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getUserProfile();

      setProfile(result);
    };

    getData();
  }, []);

  const props = {
    image: profile?.images[0].url || "Not found",
    name: profile?.display_name || "Not found",
  };

  return (
    <div className="flex flex-col h-screen bg-black select-none">
      {profile && <MainNavbar {...props} />}
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full gap-3">
          {/* SideBar */}
          <AsideBar />

          {/* App content */}
          <section className="flex-1 scroll overflow-hidden bg-gray-950 h-full">
            <Outlet />
          </section>
        </div>
      </main>
      <PlayerBar />
    </div>
  );
};

export default AppLayout;
