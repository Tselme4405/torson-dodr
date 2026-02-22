"use client";

export default function Page3() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <video className="w-full rounded-2xl" controls autoPlay>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
}
