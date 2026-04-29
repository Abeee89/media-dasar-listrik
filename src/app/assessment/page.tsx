"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Clock, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  // Chapter 1: Basic Units & Ohm's Law
  { id: 1, chapter: "Ch.1 — Units & Ohm's Law", question: "What is the SI unit of electrical resistance?", options: ["Ampere", "Volt", "Ohm", "Watt"], correctIndex: 2 },
  { id: 2, chapter: "Ch.1 — Units & Ohm's Law", question: "According to Ohm's Law, if V = 12V and R = 4Ω, what is the current (I)?", options: ["48 A", "3 A", "8 A", "0.33 A"], correctIndex: 1 },
  { id: 3, chapter: "Ch.1 — Units & Ohm's Law", question: "1 Coulomb is approximately equal to how many electrons?", options: ["6.242 × 10¹⁸", "1.602 × 10⁻¹⁹", "3.14 × 10¹⁶", "9.81 × 10²⁰"], correctIndex: 0 },
  { id: 4, chapter: "Ch.1 — Units & Ohm's Law", question: "Which formula correctly represents Ohm's Law?", options: ["P = V × I", "V = I × R", "W = P × t", "C = Q / V"], correctIndex: 1 },
  // Chapter 2: Series & Parallel
  { id: 5, chapter: "Ch.2 — Series & Parallel", question: "Three 100Ω resistors connected in parallel have a total resistance of:", options: ["300 Ω", "100 Ω", "33.3 Ω", "150 Ω"], correctIndex: 2 },
  { id: 6, chapter: "Ch.2 — Series & Parallel", question: "In a series circuit, what is constant across all components?", options: ["Voltage", "Resistance", "Current", "Power"], correctIndex: 2 },
  { id: 7, chapter: "Ch.2 — Series & Parallel", question: "Two resistors of 10Ω and 15Ω in series have total resistance of:", options: ["6 Ω", "25 Ω", "12.5 Ω", "5 Ω"], correctIndex: 1 },
  { id: 8, chapter: "Ch.2 — Series & Parallel", question: "In a parallel circuit, what is the same across all branches?", options: ["Current", "Resistance", "Voltage", "Inductance"], correctIndex: 2 },
  // Chapter 3: Power & Energy
  { id: 9, chapter: "Ch.3 — Power & Energy", question: "If V = 240V and I = 10A, what is the power?", options: ["24 W", "2400 W", "250 W", "2.4 W"], correctIndex: 1 },
  { id: 10, chapter: "Ch.3 — Power & Energy", question: "Which formula is NOT a valid power equation?", options: ["P = V × I", "P = I² × R", "P = V² / R", "P = R² × I"], correctIndex: 3 },
  { id: 11, chapter: "Ch.3 — Power & Energy", question: "A 100W lamp running for 10 hours consumes how many kWh?", options: ["1000 kWh", "1 kWh", "10 kWh", "0.1 kWh"], correctIndex: 1 },
  { id: 12, chapter: "Ch.3 — Power & Energy", question: "A motor with 750W input producing 600W output has efficiency of:", options: ["60%", "75%", "80%", "125%"], correctIndex: 2 },
  // Chapter 4: Safety
  { id: 13, chapter: "Ch.4 — Circuit Safety", question: "What device automatically trips during overload and can be reset?", options: ["Fuse", "MCB", "Transformer", "Capacitor"], correctIndex: 1 },
  { id: 14, chapter: "Ch.4 — Circuit Safety", question: "An ELCB/RCD trips when earth leakage exceeds:", options: ["300 mA", "30 mA", "3 A", "0.3 A"], correctIndex: 1 },
  { id: 15, chapter: "Ch.4 — Circuit Safety", question: "What is the primary purpose of earthing/grounding?", options: ["Increase voltage", "Prevent electric shock", "Reduce power consumption", "Amplify signals"], correctIndex: 1 },
  { id: 16, chapter: "Ch.4 — Circuit Safety", question: "MCB Type B is primarily designed for:", options: ["Motor loads", "Transformer loads", "Residential/lighting loads", "Industrial heavy equipment"], correctIndex: 2 },
  // Chapter 5: Components
  { id: 17, chapter: "Ch.5 — Components", question: "A 4-band resistor with Brown-Black-Red-Gold reads:", options: ["10 Ω ±5%", "100 Ω ±5%", "1 kΩ ±5%", "10 kΩ ±5%"], correctIndex: 2 },
  { id: 18, chapter: "Ch.5 — Components", question: "The forward voltage drop of a standard silicon diode is approximately:", options: ["0.3 V", "0.7 V", "1.2 V", "5.0 V"], correctIndex: 1 },
  { id: 19, chapter: "Ch.5 — Components", question: "Which component stores energy in an electric field?", options: ["Resistor", "Inductor", "Capacitor", "Diode"], correctIndex: 2 },
  { id: 20, chapter: "Ch.5 — Components", question: "A transistor (BJT) has which three terminals?", options: ["Anode, Cathode, Gate", "Source, Drain, Gate", "Base, Collector, Emitter", "Input, Output, Ground"], correctIndex: 2 },
];

export default function AssessmentPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  }, []);

  useEffect(() => {
    if (!examStarted || submitted || timeLeft <= 0) return;

    const timeout = setTimeout(() => {
      setTimeLeft((p) => Math.max(0, p - 1));
      if (timeLeft === 1) handleSubmit();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [examStarted, submitted, timeLeft, handleSubmit]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const selectAnswer = (optIndex: number) => {
    if (submitted) return;
    const updated = [...answers];
    updated[currentQ] = optIndex;
    setAnswers(updated);
  };

  const score = answers.reduce(
    (acc: number, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
    0
  );
  const pct = Math.round((score / questions.length) * 100);

  const resetExam = () => {
    setExamStarted(false);
    setCurrentQ(0);
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setTimeLeft(20 * 60);
  };

  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-6 md:p-16 max-w-5xl mx-auto w-full space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border border-slate-700/40"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Comprehensive <span className="neon-text-purple">Assessment</span>
        </h1>
        <p className="text-slate-400">
          20 questions covering all 5 chapters. You have 20 minutes.
        </p>
      </motion.div>

      {/* Pre-exam screen */}
      {!examStarted && !submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 glass-card border border-slate-700/40 text-center"
        >
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <Clock className="w-16 h-16 text-slate-500 mb-6" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Ready to begin?</h2>
          <p className="text-slate-400 mb-8 max-w-md">
            20 multiple-choice questions across all chapters. The timer starts immediately and cannot be paused.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setExamStarted(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/25"
          >
            <Play className="w-5 h-5" />
            Start Exam
          </motion.button>
        </motion.div>
      )}

      {/* Active exam */}
      {examStarted && !submitted && (
        <div className="space-y-5">
          {/* Timer & progress bar */}
          <div className="sticky top-[68px] z-40 glass-card border border-slate-700/40 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white text-sm">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                {answeredCount}/{questions.length} answered
              </span>
              <div
                className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1 rounded-lg border ${
                  timeLeft < 60
                    ? "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse"
                    : "bg-slate-800/60 border-slate-700 text-slate-300"
                }`}
              >
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full progress-neon"
                animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-card border border-slate-700/40 p-6 md:p-8"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                {questions[currentQ].chapter}
              </span>
              <h3 className="text-xl text-white font-medium mb-6 leading-relaxed">
                {questions[currentQ].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, oi) => (
                  <motion.label
                    key={oi}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      answers[currentQ] === oi
                        ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                        : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${currentQ}`}
                      checked={answers[currentQ] === oi}
                      onChange={() => selectAnswer(oi)}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-slate-200">{opt}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((p) => p + 1)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Assessment
              </motion.button>
            )}
          </div>

          {/* Question dots */}
          <div className="flex flex-wrap gap-2 justify-center pt-4">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  i === currentQ
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : answers[i] !== null
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card border border-slate-700/40 p-8 md:p-12 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Trophy className={`w-20 h-20 mx-auto ${pct >= 70 ? "neon-text-green" : "neon-text-pink"}`} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white">Assessment Complete!</h2>
          <div className="text-6xl font-bold neon-text-blue">{pct}%</div>
          <p className="text-slate-400">
            You answered <strong className="text-white">{score}</strong> out of{" "}
            <strong className="text-white">{questions.length}</strong> correctly.
          </p>

          {/* Per-question review */}
          <div className="text-left space-y-3 max-h-96 overflow-y-auto mt-6">
            {questions.map((q, i) => {
              const correct = answers[i] === q.correctIndex;
              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-sm ${
                    correct
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-slate-300 font-medium">{q.question}</p>
                      {!correct && (
                        <p className="text-xs text-slate-500 mt-1">
                          Correct: <span className="text-emerald-400">{q.options[q.correctIndex]}</span>
                          {answers[i] !== null && (
                            <> — Your answer: <span className="text-red-400">{q.options[answers[i]!]}</span></>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={resetExam}
            className="flex items-center gap-2 mx-auto bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium border border-slate-700 transition-colors mt-4"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
