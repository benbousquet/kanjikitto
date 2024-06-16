import { BarChartBig, Bookmark, History, Info, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:max-w-7xl mx-auto py-8 lg:py-24">
      <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center lg:space-x-28">
        <h1 className="text-6xl">Dashboard</h1>
        <label className="input input-bordered flex items-center gap-2 flex-grow">
          <input type="text" className="grow" placeholder="Search for deck" />
          <Search />
        </label>
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
        </div>
      </div>
    </div>
  );
}
