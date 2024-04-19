import { Link } from "react-router-dom";
import { DeckInfo } from "./deckListView";

function DeckCard(deck: DeckInfo) {
  const {name, description, id, author, length, dateCreated} = deck;
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <p>{author}</p>
      <p>{length} cards</p>
      <p>{dateCreated.toString()}</p>
      <Link to={`study/${id}`}>Study</Link>
    </div>
  );
}

export default DeckCard;
