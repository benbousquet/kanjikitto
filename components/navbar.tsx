import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b-2 border-b-gray-100 h-12 flex justify-center">
      <div className="flex flex-row items-center max-w-5xl h-full">
        <h2 className="font-extrabold text-xl mr-6">Kanji Kitto</h2>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
