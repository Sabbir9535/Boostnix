// The site's signature visual motif: four bars stepping upward, like a
// follower-count graph mid-climb. Used as the logomark and, larger, as
// the on-hover "spark" inside service cards.
export default function GrowthMark({
  className = "",
  barWidth = 4,
  heights = [8, 13, 18, 24],
}: {
  className?: string;
  barWidth?: number;
  heights?: number[];
}) {
  return (
    <span className={`inline-flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className="origin-bottom rounded-sm bg-signal animate-rise"
          style={{ height: `${h}px`, width: `${barWidth}px`, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </span>
  );
}
