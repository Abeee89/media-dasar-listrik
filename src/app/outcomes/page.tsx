"use client";

import { Target, BrainCircuit, TrendingUp, AlertTriangle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OutcomesPage() {
  const ringRef = useRef(null);
  const ringInView = useInView(ringRef, { once: true });

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-6 md:p-16 max-w-6xl mx-auto w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learning <span className="neon-text-cyan">Outcomes</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Personalized strengths and weaknesses analysis powered by Gemini AI based on your latest assessment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-1 space-y-6">
          {/* Score ring */}
          <motion.div
            ref={ringRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card border border-slate-700/40 p-6 shadow-xl flex flex-col items-center text-center"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
                <motion.circle
                  cx="64" cy="64" r="56"
                  fill="transparent"
                  stroke="url(#outcomeGrad)"
                  strokeWidth="8"
                  strokeDasharray="351.858"
                  initial={{ strokeDashoffset: 351.858 }}
                  animate={ringInView ? { strokeDashoffset: 87.96 } : {}}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.4))" }}
                />
                <defs>
                  <linearGradient id="outcomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-4xl font-bold neon-text-blue">75%</span>
            </div>
            <h3 className="text-xl font-bold text-white">Module 1 Score</h3>
            <p className="text-slate-400 text-sm mt-1">Completed passing requirement!</p>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card border border-slate-700/40 p-6 shadow-xl"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 neon-text-green" />
              Strengths
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                Excellent understanding of series circuit principles.
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                Successfully identified basic Ohm&apos;s Law formulas.
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                Good grasp of power and energy calculations.
              </li>
            </ul>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-card border border-slate-700/40 p-6 shadow-xl"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Needs Improvement
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                Struggled with calculating parallel resistance.
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                Needs practice on resistor color code reading.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right column — AI Evaluation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="glass-card border border-slate-700/40 p-8 shadow-xl h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                <BrainCircuit className="w-8 h-8 neon-text-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Gemini Evaluation</h2>
                <p className="text-slate-400 text-sm">Generated just now</p>
              </div>
            </div>

            <div className="flex-1 text-slate-300 leading-relaxed space-y-4">
              <p>
                Hi Student! I have analyzed your recent exam on Ohm&apos;s Law and Circuit Systems. You demonstrated a highly solid grasp of how Voltage, Current, and Resistance correlate when arranged sequentially (series contexts).
              </p>
              <p>
                However, your calculations regarding <strong className="text-white">parallel circuits</strong> showed a misunderstanding of the inverse rule <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400 text-sm">1/Rt = 1/R1 + 1/R2</code>. On Question 5, you selected 300 ohms instead of the correct 33.3 ohms for three 100-ohm resistors. Instead of dividing the resistance, you added them as if they were in series.
              </p>
              <p>
                Your understanding of <strong className="text-white">circuit safety</strong> concepts was strong — you correctly identified MCB functions and grounding purposes. For <strong className="text-white">electronic components</strong>, review the resistor color code system to improve accuracy.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6"
              >
                <h4 className="neon-text-blue font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Recommended Next Action
                </h4>
                <p className="text-sm">
                  Please return to the <strong className="text-white">Circuit Sandbox Simulator</strong> and construct a parallel circuit containing three resistors. Notice how the current flow divides among the branches, effectively lowering total resistance!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
