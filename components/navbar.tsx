import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  console.log(session);
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
          {session ? (
            <>
              <li>
                <Link href="/">Dashboard</Link>
              </li>
              <li>
                <Link href="/api/auth/signout">Sign Out</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/api/auth/signin">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
