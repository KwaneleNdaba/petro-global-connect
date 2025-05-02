'use client';

export function StationCardSkeleton() {
  return (
    <div className="bg-surface text-text-primary shadow-lg rounded-xl p-5">
      {/* Image Skeleton */}
      <div className="h-40 w-full mb-3 bg-gray-200 rounded-lg animate-pulse"></div>

      {/* Name Skeleton */}
      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>

      {/* Location Skeleton */}
      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-3"></div>

      {/* Fuel Types Skeleton */}
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mb-1"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Facilities Skeleton */}
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mt-3 mb-1"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Bottom Section Skeleton */}
      <div className="flex justify-between mt-4">
        <div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
          <div className="h-5 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}