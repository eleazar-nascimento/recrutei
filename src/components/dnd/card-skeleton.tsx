export function CardSkeleton() {
  return (
    <div className="relative bg-card w-full p-4 flex flex-col rounded-3xl gap-2 animate-pulse">
      <div className="h-6 w-6 bg-gray-300 rounded-full mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-1/2 bg-gray-300 rounded mb-4"></div>
      <div className="border-dashed border border-sky-500 p-2 w-full flex items-center justify-between rounded-3xl mb-4">
        <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-start w-full gap-2">
        <div className="h-6 w-10 bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-10 bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
