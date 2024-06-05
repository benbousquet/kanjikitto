import KanjiDrawing from "../components/kanjiDrawing";
export default function Home() {
  return (
    <main>
      <p>Home</p>
      <KanjiDrawing word={{ hiragana: "おいしい", kanji: "美味しい" }} />
    </main>
  );
}
