import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import posterImage from "@/assets/poster.jpg";
import videoThumbnail from "@/assets/videoThumbnail.jpg";
import QRcode from "@/assets/QR.jpg";

const VIDEO_URL = "https://youtu.be/RgnQ3KSjH6g?si=EnJxBaUrR5cB3rQL";
const QR_LINK = "https://docs.google.com/document/d/1-ALFAqUIJEG-oxICF0QzORpq2sZ_Dybs/edit?usp=sharing&ouid=112914405909596528275&rtpof=true&sd=true";

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);
  const [essayOpen, setEssayOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const updateScrollRange = useCallback(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth =
        scrollRef.current.parentElement?.clientWidth || window.innerWidth;
      setScrollRange(Math.max(0, scrollWidth - viewportWidth));
    }
  }, []);

  useEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, [updateScrollRange]);

  useEffect(() => {
    document.body.style.overflow = essayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [essayOpen]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const panelCount = 3;

  return (
    <section
      ref={containerRef}
      style={{ height: `${panelCount * 100}vh` }}
      className="bg-background relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-0">

          {/* VIDEO PANEL */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6">
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden relative shadow-lg group"
            >
              <img
                src={videoThumbnail}
                alt="Film preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-black ml-1" />
                </motion.div>
              </div>
            </a>
          </div>

          {/* ESSAY PANEL */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16">
            <div className="max-w-3xl w-full">
              <h3
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                className="font-serif text-charcoal mb-6"
              >
                About This Project
              </h3>
              <div
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
                className="text-muted-foreground leading-relaxed space-y-4"
              >
                <p>
                  This film examines the patriarchal gaze as more than something men impose.
                  It is also something women can internalise and turn upon themselves.
                  Looking becomes a discipline: a way of measuring, correcting, and containing
                  the feminine body.
                </p>
                <p>
                  The film insists that a 'female gaze' is not inherently liberatory.
                  When femininity is shaped to be seen, approved, and controlled,
                  the same hierarchies quietly reassert themselves.
                </p>
              </div>
              <div className="mt-10 mb-8">
                <p
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                  className="font-serif text-charcoal leading-snug"
                >
                  "They called me the Lakshmi of this house…<br />
                  and then they took my wings."
                </p>
              </div>
              <button
                onClick={() => setEssayOpen(true)}
                className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Read more about the film's themes →
              </button>
            </div>
          </div>

          {/* POSTER + QR PANEL */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-5xl w-full">

              {/* Poster */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-ivory border border-border rounded-xl shadow-lg w-full max-w-sm overflow-hidden"
              >
                <img
                  src={posterImage}
                  alt="Film poster"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* QR Code */}
<motion.a
  href={QR_LINK}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  className="bg-ivory border border-border rounded-xl p-6 shadow-lg w-full max-w-xs flex flex-col items-center justify-center cursor-pointer"
>
  <img
    src={QRcode}
    alt="QR Code"
    className="w-40 h-40 mb-4 object-contain"
  />
  <p className="mt-2 text-sm text-charcoal/80 italic text-center">
    Scan or click to view essay
  </p>
</motion.a>


            </div>
          </div>

          <div className="w-16 flex-shrink-0" />
        </motion.div>
      </div>

      {/* MODAL */}
      {essayOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ivory max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 rounded-lg shadow-2xl"
          >
            <button
              onClick={() => setEssayOpen(false)}
              className="mb-8 text-sm text-charcoal/60 hover:text-charcoal"
            >
              Close
            </button>
            <div
              style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
              className="text-muted-foreground leading-relaxed space-y-4"
            >
              <p>The opening image is a goddess statue, still, sacred, idolised.</p>
              <p>Cultural symbols become double-edged.</p>
              <p>Beauty reshaped into compliance.</p>
              <p>Kali is not fear. She is courage — the goddess within every woman.</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HorizontalGallery;
