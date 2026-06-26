"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Heart = {
  left: number;
  x: number;
  duration: number;
  delay: number;
};

export default function Page() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const photos = [
    "photo1.jpg.jpg",
    "photo2.jpg.jpg",
    "photo3.jpg.jpg",
    "photo4.jpg.jpg",
    "photo5.jpg.jpg",
    "photo6.jpg.jpg",
  ];

  useEffect(() => {
    setHearts(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        x: Math.random() * 120 - 60,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };
  const prevPhoto = () => {
  if (selected === null) return;
  setSelected((selected - 1 + photos.length) % photos.length);
};

  const nextPhoto = () => {
    if (selected === null) return;
    setSelected((selected + 1) % photos.length);
  };

  const swipeThreshold = 80;

const handleDragEnd = (
  _: MouseEvent | TouchEvent | PointerEvent,
  info: { offset: { x: number } }
) => {
  if (info.offset.x < -swipeThreshold) {
    nextPhoto();
  } else if (info.offset.x > swipeThreshold) {
    prevPhoto();
  }
};
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (selected === null) return;

      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [selected]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ffd6e7,#ffeef5,#fff7fb)",
        padding: "40px 20px",
        overflow: "hidden",
        fontFamily: "Arial",
      }}
    >
      <audio ref={audioRef} loop>
        <source src="/love-song.mpeg" type="audio/mpeg" />
      </audio>
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -900],
            x: [0, heart.x],
            opacity: [0.2, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
          }}
          style={{
            position: "fixed",
            left: `${heart.left}%`,
            bottom: "-40px",
            fontSize: "24px",
            pointerEvents: "none",
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          fontSize: "56px",
          color: "#fff",
          textShadow: "0 0 20px hotpink",
          marginBottom: "10px",
        }}
      >
        💖 Our Love Gallery 💖
      </motion.h1>

      <p
        style={{
          textAlign: "center",
          color: "#ff4d88",
          fontSize: "22px",
          marginBottom: "20px",
        }}
      >
        Forever Together 💞
      </p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={toggleMusic}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "30px",
            background: "#ff4d88",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {playing ? "⏸ Pause Music" : "🎵 Play Music"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(index)}
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              padding: "14px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 15px 35px rgba(255,105,180,0.25)",
            }}
          >
            <img
              src={`/${photo}`}
              alt={`Photo ${index + 1}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "18px",
                display: "block",
              }}
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
             <motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0.8 }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  onClick={(e) => e.stopPropagation()}
  style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "0",
                  fontSize: "30px",
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>

              <button
                onClick={prevPhoto}
                style={{
                  position: "absolute",
                  left: "-60px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "40px",
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ⬅
              </button>

              <img
                src={`/${photos[selected]}`}
                alt=""
                style={{
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  borderRadius: "20px",
                }}
              />

              <button
                onClick={nextPhoto}
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "40px",
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ➡
              </button>

              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "18px",
                }}
              >
                {selected + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
  );
}