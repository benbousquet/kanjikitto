import { KanjiInfo as KanjiInfoType } from "./flashCard";
function KanjiInfo({ state }: { state: KanjiInfoType }) {
  const { shown, word } = state;

  const genSvgUrl = (kanji: string) => {
    let unicode = kanji.charCodeAt(0).toString(16);
    while (unicode.length < 5) {
      unicode = "0" + unicode;
    }
    return `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${unicode}.svg`;
  };

  const kanjiSVG = () => {
    return <img src={genSvgUrl(word)} className="w-full" />;
  };

  return <div className={`max-w-96 h-96 w-screen rounded-lg bg-opacity-95 border-2 bg-white absolute ${!shown && "hidden"} bottom-10`}>{shown && kanjiSVG()}</div>;
}

export default KanjiInfo;
