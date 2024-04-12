import { useState } from "react";

function FlashCard({
  front,
  back,
  cb,
}: {
  front: string;
  back: string;
  cb: Function;
}) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    if (!isShown) {
      setIsShown(true);
      return;
    }
    cb();
    setIsShown(false);
  };
  return (
    <div className="flex flex-col bg-gray-600 w-80 h-96 pt-5 pb-5 rounded-lg items-center">
      <div className="flex flex-col h-4/6 items-center text-white">
        <p>{front}</p>
        <p>{isShown ? back : ""}</p>
      </div>
      <button
        className="border-2 w-5/6 h-3/6 rounded-lg bg-white"
        onClick={handleClick}
      >
        {isShown ? "Next" : "Show Answer"}
      </button>
    </div>
  );
}

export default FlashCard;
