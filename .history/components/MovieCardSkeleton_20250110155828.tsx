export default function MovieCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full pt-[150%]">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gray-700 animate-pulse" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/4" />
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );
} 