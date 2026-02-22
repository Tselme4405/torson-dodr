"use client";

import { useState } from "react";

export default function LetterEnvelope() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 h-[">
      <div className="relative">
        {/* Захианы доторх цаас (томруулсан + padding нэмсэн) */}
        <div
          className={[
            "absolute left-1/2 -translate-x-1/2",
            "w-[360px] sm:w-[520px]", // том
            "bg-white/95 rounded-3xl shadow-2xl border border-white/60",
            "px-8 sm:px-12 py-8 sm:py-10", // илүү чихсэн
            "text-center",
            "transition-all duration-500 ease-out",
            open
              ? "-top-[220px] opacity-100 translate-y-0"
              : "-top-10 opacity-0 translate-y-6 pointer-events-none",
          ].join(" ")}
        >
          <p className="text-gray-700 text-base sm:text-lg mb-3 leading-relaxed">
            Inged 18 hurleedee 18 nasaa goy enjoy hiigeerei
          </p>
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
            10:40 surguuliin 5 davhart ireerei
          </p>

          <button
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-pink-500 text-white hover:bg-pink-600 transition text-sm sm:text-base"
          >
            Close
          </button>
        </div>

        {/* Дугтуй — open болсон үед алга болно */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="relative w-[320px] h-[210px] sm:w-[420px] sm:h-[270px]" // том
            style={{ perspective: "1000px" }}
            aria-label="Open letter"
          >
            {/* Доод хэсэг */}
            <div className="absolute inset-0 bg-pink-100/90 rounded-3xl shadow-xl border border-white/60" />

            {/* Дээд flap (онгойх хэсэг) */}
            <div
              className="absolute left-0 right-0 top-0 h-[55%] origin-top transition-transform duration-500 ease-out"
              style={{
                transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244,114,182,0.35), rgba(251,207,232,0.85))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            </div>

            {/* Дунд V хэлбэртэй ирмэг */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                background: "rgba(236,72,153,0.12)",
              }}
            />

            {/* “Захиа” текст */}
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <div className="px-5 py-2.5 rounded-full bg-white/75 border border-white/60 shadow">
                <span className="text-pink-600 font-semibold text-base sm:text-lg">
                  Захиа дээр дар 💌
                </span>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
