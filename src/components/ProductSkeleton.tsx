export function ProductSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="aspect-square bg-white/10 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-white/10 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
        <div className="h-6 bg-white/10 rounded animate-pulse w-1/4" />
      </div>
    </div>
  );
}
