import FireworksCanvas from "./components/FireworksCanvas";
import FloatingBlobs from "./components/FloatingBlobs";
import LetterEnvelope from "./components/LetterEnvelope";
import TypewriterFade from "./components/Typewriter";
import Typewriter from "./components/Typewriter";

export default function Page() {
  const message = ``;

  return (
    <main className="min-h-screen relative overflow-hidden bg-sky-50">
      <FireworksCanvas intensity={1} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-center font-dancing text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg pb-2">
          Happy Birthday
        </h1>
        <div className="relative h-screen w-full overflow-hidden">
          {/* таны fireworks background энд */}

          <LetterEnvelope />
        </div>
        <p className="text-slate-700 text-xl leading-relaxed whitespace-pre-line">
          <TypewriterFade text={message} speed={30} />
        </p>
      </div>
    </main>
  );
}
