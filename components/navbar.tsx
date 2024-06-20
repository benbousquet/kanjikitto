import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  console.log(session?.user?.image);
  return (
    <div className="lg:max-w-7xl max-w-fit mx-auto navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Kanji Kitto
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex flex-row items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          {session ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="PFP" src={session.user?.image!} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">soon</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <a className="justify-between">
                      Settings
                      <span className="badge">soon</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </li>
                </ul>
              </div>
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
