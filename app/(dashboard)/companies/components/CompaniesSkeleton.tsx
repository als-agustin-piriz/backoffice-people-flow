export function CompaniesSkeleton() {
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="w-full gap-4 grid grid-cols-3">
      {skeletonCards.map((_, index) => (
        <div key={index} className="mb-4 w-full">
          <div className="rounded-xl p-6 bg-gray-100 animate-pulse relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-gray-200 rounded-lg inline-flex mb-4 w-10 h-10"></div>
            </div>

            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-6"></div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};