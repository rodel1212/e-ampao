"use client";

import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Gift, Volume2, VolumeX, Copy, Check, Download } from "lucide-react";

export default function DigitalAmpao() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const audioRef = useRef(null);

  const gcashNumber = "0956-326-9602";
  const accountName = "HE**N M.";

  const handleOpenAmpao = async () => {
    setIsOpen(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
      setIsPlaying(true);
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#dc2626", "#facc15", "#16a34a", "#ffffff"],
    });

    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName || "Anonymous Ninong/Ninang",
          openedAt: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
        }),
      });
    } catch (error) {
      console.error("Webhook error:", error);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(gcashNumber.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex flex-col items-center justify-center px-4 py-6 relative overflow-x-hidden select-none">
      <audio ref={audioRef} src="/christmas-song.mp3" loop preload="auto" />

      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-white/15 backdrop-blur-md border border-white/25 p-3 rounded-full active:scale-90 transition touch-manipulation shadow-lg"
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-yellow-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-300" />
          )}
        </button>
      )}

      {!isOpen ? (
        <div className="w-full max-w-[340px] sm:max-w-sm flex flex-col items-center">
          <div className="mb-5 text-center">
            <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full">
              🎄 Maligayang Pasko 2026
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-2.5">
              May Digital Ampao Ka!
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 px-2">
              Ilagay ang pangalan mo (optional) at pindutin ang sobre para buksan.
            </p>
          </div>

          <input
            type="text"
            placeholder="Pangalan mo (e.g., Ninong/Tita...)"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full mb-5 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-center text-base sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
          />

          <button
            onClick={handleOpenAmpao}
            className="group relative w-64 h-80 sm:w-72 sm:h-96 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl shadow-[0_0_45px_rgba(220,38,38,0.5)] border-2 border-yellow-400/70 flex flex-col items-center justify-between p-5 sm:p-6 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
          >
            <div className="w-full text-center border-b border-yellow-400/30 pb-3 sm:pb-4">
              <p className="text-yellow-300 font-serif tracking-widest text-[11px] sm:text-xs uppercase">
                Season&apos;s Greetings
              </p>
            </div>

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 shadow-xl flex flex-col items-center justify-center text-red-950 font-bold group-hover:rotate-12 group-active:rotate-12 transition-transform">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 mb-1" />
              <span className="text-[11px] sm:text-xs tracking-wider uppercase">
                Buksan
              </span>
            </div>

            <div className="text-center">
              <p className="text-yellow-200/90 text-xs sm:text-sm font-medium">
                Tap to open your blessing ✨
              </p>
            </div>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[360px] sm:max-w-sm bg-slate-900/90 backdrop-blur-xl border border-yellow-400/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] sm:text-xs font-semibold mb-2">
            🎅 Merry Christmas &amp; Happy New Year!
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-yellow-400">
            Namamasko Po! 🎶
          </h2>
          <p className="text-xs text-gray-300 mt-1 mb-4 leading-relaxed">
            Salamat sa pagbukas,{" "}
            <span className="font-semibold text-white">
              {senderName || "Kaibigan"}
            </span>
            ! Tumatanggap po kami ng cashless pamasko. 😄
          </p>

          <div className="bg-blue-600 p-1.5 rounded-2xl shadow-lg mx-auto w-full max-w-[260px] sm:max-w-[280px] overflow-hidden flex items-center justify-center">
            <img
              src="/gcash-qr.jpg"
              alt="GCash QR Code"
              className="w-full h-auto max-h-[340px] object-contain rounded-xl"
            />
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="text-left min-w-0 flex-1">
              <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase truncate">
                GCash ({accountName})
              </p>
              <p className="text-sm font-mono font-bold text-yellow-300 tracking-wide">
                {gcashNumber}
              </p>
            </div>
            <button
              onClick={copyNumber}
              className="shrink-0 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition touch-manipulation"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <a
            href="/gcash-qr.jpg"
            download="GCash-QR-Pamasko.jpg"
            className="mt-3 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-2 transition touch-manipulation"
          >
            <Download className="w-4 h-4" />
            Save QR Image to Phone
          </a>
        </div>
      )}
    </main>
  );
}