import { Link } from "react-router-dom";
import { DeckInfo } from "./deckListView";

function DeckCard(props: { deck: DeckInfo }) {
  const { name, description, id, author, length, dateCreated } = props.deck;
  return (
    <div className="w-72 h-96 border-gray-300 border-2 m-1 rounded-lg flex flex-col justify-between p-3">
      <div>
        <p className="font-bold text-xl">{name}</p>
        <p className="text-md text-gray-500">{description}</p>
        <p>Created by {author}</p>
        <p>{length} cards</p>
        <p>
          Posted{" "}
          {dateCreated.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Link to={`/study/${id}`}>
        <button className="border-2 rounded-lg bg-gray-200  h-14 w-full">
          Study
        </button>
      </Link>
    </div>
  );
}

export default DeckCard;
