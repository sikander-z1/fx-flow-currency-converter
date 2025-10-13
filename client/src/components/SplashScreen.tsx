import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-800 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(to bottom right, #0A1931, #0A1931, #1a3a52)"
      }}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-[120px] h-[120px] rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <ArrowRightLeft className="w-16 h-16" style={{ color: "#FFFFFF" }} strokeWidth={2} />
        </div>
        <h1 className="text-5xl font-bold" style={{ color: "#FFFFFF" }}>FxFlow</h1>
        <p className="text-lg" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Currency Converter</p>
      </div>
    </div>
  );
}
