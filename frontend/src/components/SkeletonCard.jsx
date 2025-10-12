export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border border-muted animate-pulse">
      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
      <div className="mt-4 pt-4 border-t border-muted flex justify-between items-center">
        <div className="h-3 bg-muted rounded w-1/4"></div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-muted rounded-full"></div>
          <div className="h-5 w-5 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
