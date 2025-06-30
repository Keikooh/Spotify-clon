import PlayButton from "./Buttons/PlayButton";

type Props = {
  data: {
    id: string;
    uri: string;
    image: string;
    title: string;
    subtitle: string;
    type: string;
  };
  playMode?: "single" | "context";
};

const CardItem: React.FC<Props> = ({ data, playMode }) => {
  const { id, uri, image, title, subtitle, type } = data;
  return (
    <li
      key={id}
      className="group w-1/5 flex flex-col gap-y-2 p-3 rounded-lg hover:bg-gray-900 transition duration-150 cursor-pointer"
    >
      <div className="relative">
        <img
          className={`w-48 h-48 object-cover ${
            type === "artist" ? "rounded-full" : "rounded-lg"
          } drop-shadow-xl `}
          src={image}
          alt={title}
        />
        {playMode && (
          <PlayButton
            uri={uri}
            isArtist={type === "artist"}
            playMode={playMode}
            variant="floating"
            styles="size-12 hidden absolute bottom-2 right-2 group-hover:flex"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm opacity-70">{subtitle}</p>
      </div>
    </li>
  );
};

export default CardItem;
