export default function CardMovieOptionSkeleton() {
  return (
    <div className="flex-shrink-0 w-[220px] md:w-[260px] bg-gray-800 border border-gray-700 rounded-lg animate-pulse p-3">
      <div className="relative aspect-[2/3] mb-3 bg-gray-700 rounded-md" />
      <div className="h-5 bg-gray-600 rounded w-3/4 mb-2" />
      <div className="flex gap-2 mb-2">
        <div className="h-4 w-12 bg-gray-700 rounded" />
        <div className="h-4 w-8 bg-gray-700 rounded" />
      </div>
      <div className="h-3 bg-gray-700 rounded w-1/2" />
    </div>
  );
}
