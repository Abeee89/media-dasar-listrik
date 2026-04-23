"use client";

import { BookOpen, Download, Bookmark, ChevronDown, FileText, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Basic Electrical Units & Ohm's Law",
    color: "blue",
    materials: [
      {
        id: 1,
        title: "SI Electrical Units",
        objective: "Understand fundamental and derived electrical quantities according to SI standards.",
        content: "The International System of Units (SI) defines Ampere (A) as the unit of electric current, Volt (V) for voltage/potential difference, Ohm (Ω) for resistance, and Watt (W) for power. These base units are derived from fundamental physical constants. For example, 1 Volt is defined as the potential difference that moves 1 Coulomb of charge with 1 Joule of energy. Understanding SI prefixes (milli-, micro-, kilo-, mega-) is essential for practical calculations in electronics. Electric charge is measured in Coulombs (C), where 1 Coulomb equals approximately 6.242 × 10¹⁸ electrons.",
        source: "Thomas L. Floyd, 'Principles of Electric Circuits', 10th Edition, Pearson Education",
      },
      {
        id: 2,
        title: "Ohm's Law (V = I × R)",
        objective: "Apply Ohm's Law to calculate voltage, current, and resistance in simple circuits.",
        content: "Ohm's Law states that the current flowing through a conductor is directly proportional to the voltage across it and inversely proportional to the resistance. Mathematically: V = I × R, where V is voltage (Volts), I is current (Amperes), and R is resistance (Ohms). This law can be rearranged to find any variable: I = V/R or R = V/I. For example, a 12V battery connected to a 4Ω resistor produces 3A of current. Georg Simon Ohm discovered this relationship in 1827, and it remains the most fundamental law in electrical engineering.",
        source: "Thomas L. Floyd, 'Principles of Electric Circuits', 10th Edition, Pearson Education",
      },
    ],
  },
  {
    id: "ch2",
    title: "Chapter 2: Series & Parallel Circuits",
    color: "cyan",
    materials: [
      {
        id: 3,
        title: "Series Circuits",
        objective: "Analyze voltage division and current flow in series-connected components.",
        content: "In a series circuit, components are connected end-to-end forming a single path for current flow. Key properties: (1) Current is the same through all components: I_total = I₁ = I₂ = I₃. (2) Total resistance is the sum of individual resistances: R_total = R₁ + R₂ + R₃. (3) Voltage divides proportionally across each resistor: V_n = I × R_n. The voltage divider rule states V_n = V_total × (R_n / R_total). If one component fails open, the entire circuit stops working since there is only one current path.",
        source: "Robert L. Boylestad, 'Introductory Circuit Analysis', 13th Edition, Pearson",
      },
      {
        id: 4,
        title: "Parallel Circuits",
        objective: "Calculate total resistance and branch currents in parallel configurations.",
        content: "In a parallel circuit, components are connected across the same two nodes, providing multiple paths for current. Key properties: (1) Voltage is the same across all branches: V_total = V₁ = V₂ = V₃. (2) Total resistance is calculated using the reciprocal formula: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃. For two resistors: R_total = (R₁ × R₂)/(R₁ + R₂). (3) Current divides among branches: I_n = V/R_n. The total resistance in parallel is always less than the smallest individual resistance. Three 100Ω resistors in parallel yield 33.3Ω.",
        source: "Robert L. Boylestad, 'Introductory Circuit Analysis', 13th Edition, Pearson",
      },
      {
        id: 5,
        title: "Mixed (Series-Parallel) Circuits",
        objective: "Solve combination circuits by simplifying series and parallel sections step by step.",
        content: "Mixed circuits contain both series and parallel combinations. The analysis strategy is: (1) Identify which components are in series and which are in parallel. (2) Simplify parallel groups into equivalent resistances. (3) Add series resistances. (4) Repeat until you have a single equivalent resistance. (5) Use the total to find total current, then work backwards to find individual voltages and currents. This technique is called 'reduction' and is fundamental to circuit analysis.",
        source: "Robert L. Boylestad, 'Introductory Circuit Analysis', 13th Edition, Pearson",
      },
    ],
  },
  {
    id: "ch3",
    title: "Chapter 3: Electrical Power & Energy",
    color: "purple",
    materials: [
      {
        id: 6,
        title: "Power Formulas",
        objective: "Calculate electrical power using multiple formula variations.",
        content: "Electrical power is the rate at which energy is consumed or produced. The fundamental formula is P = V × I (Watts). By substituting Ohm's Law, we derive two additional forms: P = I²R (useful when current and resistance are known) and P = V²/R (useful when voltage and resistance are known). For example, a 240V heater with 20Ω resistance consumes P = 240²/20 = 2,880W or 2.88kW. Power ratings on appliances indicate their energy consumption rate under normal operating conditions.",
        source: "C.L. Wadhwa, 'Basic Electrical Engineering', New Age International Publishers",
      },
      {
        id: 7,
        title: "Electrical Energy & Efficiency",
        objective: "Compute energy consumption and system efficiency in practical applications.",
        content: "Electrical energy is power consumed over time: W = P × t, measured in Joules (J) or more practically in kilowatt-hours (kWh). 1 kWh = 3,600,000 J. For example, a 100W lamp running for 10 hours consumes 1 kWh. Efficiency is the ratio of useful output power to total input power: η = (P_out / P_in) × 100%. A motor rated at 750W input producing 600W of mechanical output has efficiency η = (600/750) × 100% = 80%. Understanding energy consumption is crucial for cost calculation and sustainable electrical design.",
        source: "C.L. Wadhwa, 'Basic Electrical Engineering', New Age International Publishers",
      },
    ],
  },
  {
    id: "ch4",
    title: "Chapter 4: Circuit Safety & Protection",
    color: "red",
    materials: [
      {
        id: 8,
        title: "Fuses and MCB Protection",
        objective: "Analyze overcurrent protection devices: fuses and Miniature Circuit Breakers.",
        content: "Overcurrent protection is essential to prevent fires and equipment damage. Fuses contain a thin wire that melts (blows) when current exceeds the rated value, breaking the circuit. They are one-time-use and must be replaced. Miniature Circuit Breakers (MCB) use a bimetallic strip (thermal) and an electromagnet (magnetic) mechanism to trip automatically during overload or short circuit conditions. MCBs can be reset after tripping. Selection criteria include rated current, breaking capacity, and trip characteristics (Type B for residential, Type C for motors, Type D for transformers).",
        source: "SNI 0225:2011 (PUIL 2011) — Indonesian National Electrical Installation Standard",
      },
      {
        id: 9,
        title: "Grounding & ELCB Systems",
        objective: "Understand grounding/earthing systems and Earth Leakage Circuit Breakers.",
        content: "Grounding (earthing) connects metallic parts of equipment to earth, providing a low-resistance path for fault currents. This prevents electric shock by ensuring that if a live wire touches a metal casing, the fault current flows to earth and trips the protective device. Earth Leakage Circuit Breakers (ELCB/RCD) detect imbalance between live and neutral currents — a sign that current is leaking through a person or to earth. They trip within 30ms when leakage exceeds 30mA, providing life-saving protection against electrocution.",
        source: "SNI 0225:2011 (PUIL 2011) — Indonesian National Electrical Installation Standard",
      },
    ],
  },
  {
    id: "ch5",
    title: "Chapter 5: Electronic Components",
    color: "amber",
    materials: [
      {
        id: 10,
        title: "Passive Components: Resistors, Capacitors, Inductors",
        objective: "Identify passive component types, symbols, and their roles in circuits.",
        content: "Passive components do not amplify signals. Resistors oppose current flow and are measured in Ohms. They use a color code system: each band represents a digit or multiplier (e.g., Brown-Black-Red-Gold = 1,0,×100, ±5% = 1kΩ ±5%). Capacitors store electrical energy in an electric field, measured in Farads (F). Common types include ceramic, electrolytic, and film capacitors. Inductors store energy in a magnetic field when current flows through a coil, measured in Henrys (H). They oppose changes in current and are used in filters, transformers, and energy storage.",
        source: "Boylestad & Nashelsky, 'Electronic Devices and Circuit Theory', 11th Edition, Pearson",
      },
      {
        id: 11,
        title: "Active Components: Diodes & Transistors",
        objective: "Explain the operating principles of semiconductor diodes and transistors.",
        content: "Active components can amplify or switch electronic signals. A diode is a two-terminal semiconductor device that allows current to flow primarily in one direction (forward bias). The PN junction has a forward voltage drop of approximately 0.7V for silicon diodes. In reverse bias, only a tiny leakage current flows until the breakdown voltage. Transistors (BJT) are three-terminal devices (Base, Collector, Emitter) that amplify current. A small base current controls a much larger collector current. The current gain (β or hFE) typically ranges from 50 to 300. Transistors operate in cutoff, active, and saturation regions.",
        source: "Boylestad & Nashelsky, 'Electronic Devices and Circuit Theory', 11th Edition, Pearson",
      },
    ],
  },
];

const colorMap: Record<string, { accent: string; bg: string; border: string; icon: string }> = {
  blue: { accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-500" },
  cyan: { accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "text-cyan-500" },
  purple: { accent: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-500" },
  red: { accent: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: "text-red-500" },
  amber: { accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "text-amber-500" },
};

export default function MaterialsPage() {
  const [openMaterial, setOpenMaterial] = useState<number | null>(null);

  const toggle = (id: number) => setOpenMaterial(openMaterial === id ? null : id);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-6 md:p-16 max-w-5xl mx-auto w-full space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learning <span className="neon-text-green">Materials</span>
        </h1>
        <p className="text-slate-400 text-lg">
          5 comprehensive chapters covering Basic Electricity fundamentals.
          Expand each topic to read the full content.
        </p>
      </motion.div>

      <div className="space-y-14">
        {chapters.map((chapter, ci) => {
          const c = colorMap[chapter.color] || colorMap.blue;
          return (
            <motion.section
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: ci * 0.08, duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <Bookmark className={`w-6 h-6 ${c.icon}`} />
                <h2 className="text-2xl md:text-3xl font-bold text-white">{chapter.title}</h2>
              </div>

              <div className="space-y-4">
                {chapter.materials.map((mat, mi) => {
                  const isOpen = openMaterial === mat.id;
                  return (
                    <motion.div
                      key={mat.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: mi * 0.1, duration: 0.4 }}
                      className="glass-card overflow-hidden border border-slate-700/40 hover:border-slate-600/60 transition-colors"
                    >
                      {/* Header — clickable accordion */}
                      <button
                        onClick={() => toggle(mat.id)}
                        className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 group"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {mat.title}
                          </h3>
                          <div className={`mt-3 flex gap-3 ${c.bg} border ${c.border} ${c.accent} p-3 rounded-lg`}>
                            <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-xs uppercase tracking-wider mb-0.5">
                                Learning Objective:
                              </span>
                              <p className="text-sm leading-relaxed opacity-90">{mat.objective}</p>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </motion.div>
                      </button>

                      {/* Expandable content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="accordion-content"
                          >
                            <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-slate-800/60 pt-5 space-y-4">
                              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                {mat.content}
                              </p>

                              {/* Source citation */}
                              <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/40">
                                <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                                    Source
                                  </span>
                                  <p className="text-xs text-slate-400">{mat.source}</p>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-1">
                                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-700 text-sm font-medium">
                                  <Download className="w-4 h-4" />
                                  Download PDF
                                </button>
                                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                  <ExternalLink className="w-4 h-4" />
                                  View Reference
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
