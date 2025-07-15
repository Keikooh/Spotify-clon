import React, { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import PlayerBar from "../components/partials/PlayerBar";
import SideBar from "../components/SideBar/SideBar";

import { getUserProfile } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/partials/MainNavbar";

const MainHome = () => {
  const accessToken: string | null = localStorage.getItem("access_token");
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getUserProfile(accessToken);

      setProfile(result);
    };

    getData();

    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

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
          <SideBar />

          {/* MainContent */}
          <MainContent />
        </div>
      </main>
      <PlayerBar />
    </div>
  );
};

export default MainHome;
