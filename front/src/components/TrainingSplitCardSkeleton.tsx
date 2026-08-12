const TrainingSplitCardSkeleton = () => (
  <div className="w-full max-w-[300px] rounded-xl bg-mediumGrey border border-transparent overflow-hidden animate-pulse">
    <div className="h-14 bg-darkGrey" />
    <div className="p-4 flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-darkGrey" />
        <div className="h-5 w-20 rounded-full bg-darkGrey" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-12 rounded-md bg-darkGrey" />
        <div className="h-12 rounded-md bg-darkGrey" />
        <div className="h-12 rounded-md bg-darkGrey" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 rounded bg-darkGrey" />
        <div className="h-4 rounded bg-darkGrey w-4/5" />
        <div className="h-4 rounded bg-darkGrey w-3/5" />
      </div>
      <div className="h-10 rounded-md bg-darkGrey mt-2" />
    </div>
  </div>
);

export default TrainingSplitCardSkeleton;
