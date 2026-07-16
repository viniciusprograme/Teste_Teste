export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,_rgba(2,6,23,0.95),_rgba(2,8,23,0.98))]" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            left: `${(index * 11) % 100}%`,
            top: `${(index * 17) % 100}%`,
            animationDelay: `${index * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}
