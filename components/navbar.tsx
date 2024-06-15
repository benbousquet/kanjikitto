import Link from "next/link";

export default function Navbar() {
  return (
    <div className="lg:max-w-7xl max-w-fit mx-auto navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Kanji Kitto
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
