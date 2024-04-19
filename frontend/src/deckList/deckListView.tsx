type DeckInfo = {
  name: string;
  description: string;
  id: string;
  author: string;
  length: number;
  dateCreated: Date;
};

function DeckViewList() {
  return (
    <div className="bg-white max-w-96 w-full">
      <p>Test</p>
    </div>
  );
}

export { type DeckInfo };
export default DeckViewList;
