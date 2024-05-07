import { useEffect, useState } from "react";
import FlashCard from "./flashCard";
import ProgressBar from "./progressBar";
import { useParams } from "react-router-dom";
import { DeckInfo } from "../deckList/deckListView";
import { Switch } from "../@/components/ui/switch";
import { Label } from "../@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

type Card = {
  front: string;
  back: string;
  definition: string;
};

type HistoryEntry = {
  card: Card;
  answeredCorrect: boolean;
  date: Date;
};

type SessionStatistics = {
  answeredCorrect: number;
  totalAnswered: number;
};

type Options = {
  shuffle: boolean;
};

enum StateValues {
  start = 0,
  started,
  finished,
}

type Params = {
  deckId: string;
};

function KanjiPractice() {
  const [currentCard, setCurrentCard] = useState(0);

  const [answerHistory, setAnswerHistory] = useState<HistoryEntry[]>([]);

  const [queue, setQueue] = useState<Card[]>([]);

  const [deckInfo, setDeckInfo] = useState<DeckInfo>({
    name: "",
    description: "",
    id: "0",
    author: "",
    length: 0,
    dateCreated: new Date(),
  });

  const [options, setOptions] = useState<Options>({ shuffle: false });

  const [state, setState] = useState<StateValues>(StateValues.start);

  const { deckId } = useParams<Params>();

  useEffect(() => {
    let deckIdChecked = "0";
    deckId === undefined ? (deckIdChecked = "-1") : (deckIdChecked = deckId);
    // make request here
    const res: { info: DeckInfo; cards: Card[] } = {
      info: {
        name: "my first deck!",
        description: "basic kanji",
        id: deckIdChecked?.toString(),
        author: "jeff",
        length: 7,
        dateCreated: new Date(),
      },
      cards: [
        { back: "綺麗", front: "きれい", definition: "pretty, clean" },
        { back: "優しい", front: "やさしい", definition: "kind" },
        { back: "家", front: "いえ", definition: "home" },
        { back: "日本", front: "にほん", definition: "japan" },
        { back: "可愛い", front: "かわいい", definition: "cute" },
        { back: "甘い", front: "あまい", definition: "sweet" },
        { back: "赤い", front: "あかい", definition: "red" },
      ],
    };
    setQueue(res.cards);
    setDeckInfo(res.info);
  }, []);

  const handleStateChange = (newState: StateValues) => {
    switch (newState) {
      case StateValues.start:
        break;
      case StateValues.started:
        if (options.shuffle) {
          // shuffle code maybe refactor later
          let shuffledQueue = [...queue];
          for (var i = shuffledQueue.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [shuffledQueue[i], shuffledQueue[rand]] = [
              shuffledQueue[rand],
              shuffledQueue[i],
            ];
          }
          setQueue(shuffledQueue);
        }
        setState(newState);
        break;
      case StateValues.finished:
        setState(newState);
        break;
      default:
        break;
    }
    return;
  };

  const handleShuffleClick = () => {
    setOptions({ ...options, shuffle: !options.shuffle });
  };

  const renderStart = () => {
    return (
      <div className="w-screen h-screen">
        <Card className="h-screen">
          <CardHeader>
            <CardTitle>Deck Practice</CardTitle>
            <CardDescription>{deckInfo.name} by Jeff</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This deck is Blah Blah Blah</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How to use?</AccordionTrigger>
                <AccordionContent>
                  Grab a whiteboard, write kanji from shown hiragana, click show
                  answer, erase and repeat
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center space-x-2">
              <Switch
                id="shuffle"
                checked={options.shuffle}
                onCheckedChange={handleShuffleClick}
              />
              <Label htmlFor="shuffle">Shuffle</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => console.log("Back")}
            >
              Back
            </Button>
            <Button
              onClick={() => handleStateChange(StateValues.started)}
            >
              Start
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderReview = () => {
    return (
      <div className="max-w-md">
        <div className="flex flex-col items-center">
          <p className="text-2xl text-white">Score</p>
          <p className="text-xl text-white">
            {getStatistics().answeredCorrect} / {getStatistics().totalAnswered}
          </p>
        </div>
        <div className="flex flex-col grow items-center">
          <div className="w-full my-2">
            <ProgressBar
              progress={getStatistics().totalAnswered}
              outOf={queue.length}
            />
          </div>
          <FlashCard card={queue[currentCard]} cb={nextClick} />
        </div>
      </div>
    );
  };

  // convert to memo hook !!
  const getStatistics = (): SessionStatistics => {
    let totalCorrect = 0;
    for (const answer of answerHistory) {
      if (answer.answeredCorrect) {
        totalCorrect++;
      }
    }
    return {
      answeredCorrect: totalCorrect,
      totalAnswered: answerHistory.length,
    };
  };

  const nextClick = (answeredCorrect: boolean) => {
    if (queue.length - 1 > currentCard) {
      setAnswerHistory([
        ...answerHistory,
        {
          card: queue[currentCard],
          answeredCorrect: answeredCorrect,
          date: new Date(),
        },
      ]);
      setCurrentCard((prev) => {
        return prev + 1;
      });
    } else {
      handleStateChange(StateValues.finished);
    }
  };

  return (
    <>
      {state == StateValues.start ? (
        renderStart()
      ) : state == StateValues.started ? (
        renderReview()
      ) : (
        <p>Finished</p>
      )}
    </>
  );
}

export { type Card };
export default KanjiPractice;
