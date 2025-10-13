export default function LoadingShimmer() {
  return (
    <div className="space-y-4 animate-slide-up">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 rounded-2xl bg-card overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
