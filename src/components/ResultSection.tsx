import React from "react";
import CardItem from "./CardItem";

type data = {
  id: string;
  uri: string;
  image: string;
  title: string;
  subtitle: string;
  type: string;
};
type props = {
  title: string;
  itemList: data[];
  playMode?: "single" | "context";
};

const ResultSection: React.FC<props> = ({ title, itemList, playMode }) => {
  return (
    itemList.length > 0 && (
      <section className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl px-3">{title}</h2>
        <ul className="flex w-full">
          {itemList.map((item) => (
            <CardItem
              data={item}
              playMode={playMode}
              // track={}
            />
          ))}
        </ul>
      </section>
    )
  );
};

export default ResultSection;
