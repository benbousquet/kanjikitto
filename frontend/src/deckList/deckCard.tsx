import { Link } from "react-router-dom";
import { DeckInfo } from "./deckListView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

function DeckCard(props: { deck: DeckInfo }) {
  const { name, description, id, author, length, dateCreated } = props.deck;
  return (
    <Card className="w-screen my-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Created by {author}
          <br />
          {dateCreated.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <br />
          {length} cards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Link to={`/study/${id}`}>
          <Button>Study</Button>
        </Link>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}

export default DeckCard;
