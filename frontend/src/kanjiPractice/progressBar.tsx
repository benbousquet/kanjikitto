function ProgressBar({progress, outOf}: {progress: number, outOf: number}) {
  return (
    <div className="h-2 w-full bg-zinc-200 rounded-md">
      <div className="h-2 bg-yellow-200 rounded-md" style={{ width: `${Math.floor((progress/outOf) * 100)}%` }}></div>
    </div>
  );
}

export default ProgressBar;
