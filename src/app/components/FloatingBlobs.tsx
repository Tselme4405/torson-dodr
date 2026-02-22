type Props = { count?: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function FloatingBlobs({ count = 18 }: Props) {
  return (
    <div className="blob-wrap" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        // deterministic “random-ish”
        const x = (i * 37) % 100; // 0..99
        const y = (i * 53) % 100;
        const size = 14 + (i % 6) * 4; // px
        const t1 = 2.6 + (i % 6) * 0.45; // өмнө нь 6+ байсан (одоо хурдан)
        const t2 = 4.2 + (i % 7) * 0.55; // өмнө нь 10+ байсан (одоо хурдан)

        const d1 = (i % 8) * 0.3; // sec delay
        const d2 = (i % 9) * 0.25;

        // edge дээр шахахгүй жаахан clamp
        const left = clamp(x, 2, 96);
        const top = clamp(y, 2, 96);

        return (
          <span
            key={i}
            className="blob"
            style={{
              // CSS variables
              ["--x" as any]: `${left}%`,
              ["--y" as any]: `${top}%`,
              ["--size" as any]: `${size}px`,
              ["--t1" as any]: `${t1}s`,
              ["--t2" as any]: `${t2}s`,
              ["--d1" as any]: `${d1}s`,
              ["--d2" as any]: `${d2}s`,
            }}
          />
        );
      })}
    </div>
  );
}
