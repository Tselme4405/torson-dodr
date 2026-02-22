"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Page2() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll progress (page2 дээр доош гүйлгэхэд эффект)
  const { scrollYProgress } = useScroll({ container: ref });
  const fishScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  return (
    <main className="min-h-screen bg-white">
      {/* Scroll container */}
      <div ref={ref} className="h-screen overflow-y-auto">
        <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-xl text-center space-y-5">
            <h2 className="text-3xl font-bold">Төрсөн өдрийн мэнд! 🎉</h2>
            <p className="text-gray-700 leading-relaxed">
              Чамд хамгийн сайхан бүхнийг хүсье. Эрүүл энх, амжилт, аз жаргал
              үргэлж хамт байх болтугай. ❤️
            </p>

            <div className="mx-auto w-fit rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/photo.jpg"
                alt="Birthday photo"
                width={520}
                height={360}
              />
            </div>

            <p className="text-sm text-gray-500">
              Доош гүйлгээд загаснууд дээр очоорой ⬇️
            </p>
          </div>
        </section>

        {/* Spacer content to make scrolling */}
        <section className="min-h-[120vh] p-6 flex items-center justify-center">
          <div className="max-w-xl text-center space-y-4">
            <h3 className="text-2xl font-semibold">Жижиг сюрприз байна...</h3>
            <p className="text-gray-600">
              Доош үргэлжлүүлээд хар/цагаан 2 загас эргэлдэж байгааг хараарай.
              Нэгийг нь дарвал видео гарна.
            </p>
          </div>
        </section>

        {/* Fish section */}
        <section className="min-h-screen flex flex-col items-center justify-center gap-10 p-6 bg-black text-white">
          <h3 className="text-2xl font-semibold">
            🖤🤍 Аль загасыг сонгох вэ?
          </h3>

          <div className="flex items-center gap-10">
            {/* Black fish (click -> page3) */}
            <motion.button
              onClick={() => router.push("/page3")}
              className="rounded-2xl p-3 bg-white/10 hover:bg-white/15 transition"
              style={{ scale: fishScale }}
              whileTap={{ scale: 0.95 }}
              aria-label="Black fish to video"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="/fish-black.png"
                  alt="Black fish"
                  width={140}
                  height={140}
                />
              </motion.div>
              <div className="mt-2 text-sm opacity-80">Дарвал видео</div>
            </motion.button>

            {/* White fish (also can go page3 if you want) */}
            <motion.button
              onClick={() => router.push("/page3")}
              className="rounded-2xl p-3 bg-white/10 hover:bg-white/15 transition"
              style={{ scale: fishScale }}
              whileTap={{ scale: 0.95 }}
              aria-label="White fish to video"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="/fish-white.png"
                  alt="White fish"
                  width={140}
                  height={140}
                />
              </motion.div>
              <div className="mt-2 text-sm opacity-80">Дарвал видео</div>
            </motion.button>
          </div>

          <p className="text-xs opacity-60">
            (Зураг: public/fish-black.png, public/fish-white.png)
          </p>
        </section>
      </div>
    </main>
  );
}
