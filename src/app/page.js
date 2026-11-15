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

  // PALITAN MO NG GCASH DETAILS MO DITO:
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
      particleCount: 120,
      spread: 80,
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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <audio ref={audioRef} src="/christmas-song.mp3" loop />

      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed top-5 right-5 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-white/20 transition"
          aria-label="Toggle Music"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 text-yellow-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      )}

      {!isOpen ? (
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="mb-6 text-center">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full">
              🎄 Maligayang Pasko 2026
            </span>
            <h1 className="text-2xl font-bold mt-3">May Digital Ampao Ka!</h1>
            <p className="text-sm text-gray-300 mt-1">
              Ilagay ang pangalan mo (optional) at pindutin ang sobre para buksan.
            </p>
          </div>

          <input
            type="text"
            placeholder="Pangalan mo (e.g., Ninong/Tita...)"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full mb-5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-center text-sm placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleOpenAmpao}
            className="group relative w-72 h-96 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.5)] border-2 border-yellow-400/60 flex flex-col items-center justify-between p-6 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-full text-center border-b border-yellow-400/30 pb-4">
              <p className="text-yellow-300 font-serif tracking-widest text-xs uppercase">
                Season&apos;s Greetings
              </p>
            </div>

            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 shadow-xl flex flex-col items-center justify-center text-red-950 font-bold group-hover:rotate-12 transition-transform">
              <Gift className="w-8 h-8 mb-1" />
              <span className="text-xs tracking-wider uppercase">Buksan</span>
            </div>

            <div className="text-center">
              <p className="text-yellow-200/90 text-sm font-medium">
                Tap to open your blessing ✨
              </p>
            </div>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur-xl border border-yellow-400/40 rounded-3xl p-6 shadow-2xl text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold mb-2">
            🎅 Merry Christmas & Happy New Year!
          </div>
          <h2 className="text-xl font-bold text-yellow-400">
            Namamasko Po! 🎶
          </h2>
          <p className="text-xs text-gray-300 mt-1 mb-4">
            Salamat sa pagbukas, <span className="font-semibold text-white">{senderName || "Kaibigan"}</span>! Tumatanggap po kami ng cashless pamasko. 😄
          </p>

          <div className="bg-white p-4 rounded-2xl shadow-inner mx-auto w-60 h-60 flex items-center justify-center">
            <img
              src="/gcash-qr.jpg"
              alt="GCash QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
            <div className="text-left">
              <p className="text-[11px] text-gray-400 uppercase">GCash Number ({accountName})</p>
              <p className="text-sm font-mono font-bold text-yellow-300">{gcashNumber}</p>
            </div>
            <button
              onClick={copyNumber}
              className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-semibold text-xs flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <a
            href="/gcash-qr.jpg"
            download="GCash-QR-Pamasko.png"
            className="mt-3 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Save QR Image to Phone
          </a>
        </div>
      )}
    </main>
  );
}
