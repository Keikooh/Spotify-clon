import React, { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar/PlayerBar";
import SideBar from "../components/SideBar/SideBar";

import { getProfile } from "../services/SpotifyServices";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const accessToken: string | null = localStorage.getItem("access_token");
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getProfile(accessToken);

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
      {profile && <Header {...props} />}
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
