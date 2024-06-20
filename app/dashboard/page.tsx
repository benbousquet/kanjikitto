import {
  Bookmark,
  CircleX,
  History,
  Pencil,
  Search,
  Trash,
  User,
} from "lucide-react";
import CreateButton from "./_components/createButton";
import db from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";

export const dynamic = "force-dynamic"

export default async function Dashboard() {
  // repeated code maybe consolidate into component later
  const session = await auth();

  if (!session || session === undefined) {
    return (
      <div className="flex flex-col items-center max-w-fit lg:max-w-7xl mx-auto py-8 lg:py-24 text-left">
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! You need to be logged in to access this page.</span>
        </div>
      </div>
    );
  }

  const decks = await db.deck.findMany({
    where: { authorId: session.user?.id },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return (
    <div className="flex flex-col lg:max-w-7xl mx-auto py-8 lg:py-24">
      <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center lg:space-x-28">
        <h1 className="text-4xl lg:text-6xl">Dashboard</h1>
        <label className="input input-bordered flex items-center gap-2 flex-grow">
          <input type="text" className="grow" placeholder="Search for deck" />
          <Search />
        </label>
        <CreateButton />
      </div>
      <div className="divider"></div>
      <div className="flex flex-col lg:flex-row [&>div]:flex-grow [&>div]:bg-neutral [&>div]:h-96 [&>div]:lg:h-full [&>div]:rounded-lg [&>div]:space-y-2 space-y-10 lg:space-x-10 lg:space-y-0 ">
        <div>
          <div className="flex flex-row items-center p-6 space-x-2">
            <p className="text-2xl">History</p>
            <History className="text-primary" />
          </div>
          <div className="space-y-2 px-1 py-1">
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                Genki 2 Vocab
              </div>
              <div className="collapse-content content-end">
                <p>Contains all the vocab from Genki 2</p>
                <button className="btn btn-primary">Study</button>
              </div>
            </div>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                JLPT N2 Vocab
              </div>
              <div className="collapse-content">
                <p>Contains all the vocab for JLPT N2</p>
                <button className="btn btn-primary">Study</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center p-6 space-x-2">
            <p className="text-2xl">Saved</p>
            <Bookmark className="text-primary" />
          </div>
          <div className="space-y-2 px-1 py-1">
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                Genki 2 Vocab
              </div>
              <div className="collapse-content content-end">
                <p>Contains all the vocab from Genki 2</p>
                <button className="btn btn-primary">Study</button>
              </div>
            </div>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                JLPT N2 Vocab
              </div>
              <div className="collapse-content">
                <p>Contains all the vocab for JLPT N2</p>
                <button className="btn btn-primary">Study</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center p-6 space-x-2">
            <p className="text-2xl">My Decks</p>
            <User className="text-primary" />
          </div>
          <div className="space-y-2 px-1 py-1">
            {decks.map((deck) => {
              return (
                <div
                  key={deck.id}
                  tabIndex={0}
                  className="collapse bg-base-200"
                >
                  <div className="collapse-title text-xl font-medium flex flex-row justify-between items-center">
                    {deck.title}
                    <div className="flex flex-row items-center space-x-1">
                      <Link
                        className="btn btn-secondary"
                        href={"/deck/review/" + deck.id}
                      >
                        Study
                      </Link>
                      <Link
                        className="btn btn-accent"
                        href={"/deck/edit/" + deck.id}
                      >
                        <Pencil />
                      </Link>
                      <Link
                        className="btn btn-error"
                        href={"/deck/delete/" + deck.id}
                      >
                        <Trash />
                      </Link>
                      {/* <DeleteButton id={deck.id} /> */}
                    </div>
                  </div>
                  <div className="collapse-content content-end">
                    <p>{deck.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div>
          <div className="flex flex-row items-center p-6 space-x-2">
            <p className="text-2xl">Stats</p>
            <BarChartBig className="text-primary" />
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap">
            <div className="stat w-fit">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat w-fit">
              <div className="stat-title">New Users</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
