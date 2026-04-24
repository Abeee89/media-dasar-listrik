"use client";

import { BookOpen, Download, Bookmark, FileText, ExternalLink, X, Battery, Zap, ZapOff, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Basic Electrical Units & Ohm's Law",
    color: "cyan",
    level: "dasar",
    reviews: "6661",
    icon: Battery,
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
    color: "blue",
    level: "intermediate",
    reviews: "5307",
    icon: Zap,
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
    level: "mastery",
    reviews: "4969",
    icon: ZapOff,
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
    color: "pink",
    level: "intermediate",
    reviews: "4685",
    icon: ShieldAlert,
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
    color: "green",
    level: "dasar",
    reviews: "2189",
    icon: Cpu,
    materials: [
      {
        id: 10,
        title: "Passive Components",
        objective: "Identify passive component types, symbols, and their roles in circuits.",
        content: "Passive components do not amplify signals. Resistors oppose current flow and are measured in Ohms. They use a color code system: each band represents a digit or multiplier (e.g., Brown-Black-Red-Gold = 1,0,×100, ±5% = 1kΩ ±5%). Capacitors store electrical energy in an electric field, measured in Farads (F). Common types include ceramic, electrolytic, and film capacitors. Inductors store energy in a magnetic field when current flows through a coil, measured in Henrys (H). They oppose changes in current and are used in filters, transformers, and energy storage.",
        source: "Boylestad & Nashelsky, 'Electronic Devices and Circuit Theory', 11th Edition",
      },
      {
        id: 11,
        title: "Active Components",
        objective: "Explain the operating principles of semiconductor diodes and transistors.",
        content: "Active components can amplify or switch electronic signals. A diode is a two-terminal semiconductor device that allows current to flow primarily in one direction (forward bias). The PN junction has a forward voltage drop of approximately 0.7V for silicon diodes. In reverse bias, only a tiny leakage current flows until the breakdown voltage. Transistors (BJT) are three-terminal devices (Base, Collector, Emitter) that amplify current. A small base current controls a much larger collector current. The current gain (β or hFE) typically ranges from 50 to 300.",
        source: "Boylestad & Nashelsky, 'Electronic Devices and Circuit Theory', 11th Edition",
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; button: string; iconColor: string }> = {
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/30 border-b border-cyan-200 dark:border-cyan-800", button: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20", iconColor: "text-cyan-600 dark:text-cyan-400" },
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800", button: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20", iconColor: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-100 dark:bg-purple-900/30 border-b border-purple-200 dark:border-purple-800", button: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20", iconColor: "text-purple-600 dark:text-purple-400" },
  pink: { bg: "bg-pink-100 dark:bg-pink-900/30 border-b border-pink-200 dark:border-pink-800", button: "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20", iconColor: "text-pink-600 dark:text-pink-400" },
  green: { bg: "bg-emerald-100 dark:bg-emerald-900/30 border-b border-emerald-200 dark:border-emerald-800", button: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
};

const springTransition = { type: "spring" as const, stiffness: 350, damping: 30 };

export default function MaterialsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-6 md:p-12 lg:p-16 w-full space-y-12 max-w-7xl mx-auto transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
          Learning <span className="neon-text-blue">Materials</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl transition-colors duration-300">
          Comprehensive curriculum covering Basic Electricity fundamentals.
          Select a module to start learning.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {chapters.map((chapter, index) => {
          const c = colorMap[chapter.color] || colorMap.blue;
          const Icon = chapter.icon;
          
          return (
            <motion.div
              key={chapter.id}
              onClick={() => setSelectedId(chapter.id)}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl dark:shadow-none dark:border dark:border-slate-800 dark:hover:border-slate-700 flex flex-col h-full group transition-all duration-300"
            >
              {/* Top Half */}
              <div 
                className={`relative h-48 sm:h-56 ${c.bg} flex items-center justify-center overflow-hidden transition-colors duration-500`}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 text-slate-700 dark:text-slate-200 shadow-sm z-10 transition-colors duration-300">
                  <FileText className={`w-3.5 h-3.5 ${c.iconColor}`} />
                  {chapter.materials.length} Materi
                </div>

                {/* Best Seller badge for mastery */}
                {chapter.level === 'mastery' && (
                   <div className="absolute top-4 right-4 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm z-10 transition-colors duration-300">
                     <span>✨</span> Best Seller
                   </div>
                )}
                
                {/* Left vertical text */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-slate-900/5 dark:text-white/5 font-black text-2xl tracking-[0.3em] uppercase whitespace-nowrap z-0 transition-colors duration-300">
                  {chapter.level}
                </div>
                
                {/* Right vertical text */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-slate-900/5 dark:text-white/5 font-black text-2xl tracking-[0.3em] uppercase whitespace-nowrap z-0 transition-colors duration-300">
                  {chapter.level}
                </div>

                {/* Center Icon Cube equivalent */}
                <div 
                  className="w-24 h-24 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center transform rotate-12 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10 backdrop-blur-sm border border-black/5 dark:border-white/10"
                >
                   <Icon className={`w-12 h-12 ${c.iconColor} -rotate-12 group-hover:-rotate-6 transition-transform duration-300`} />
                </div>
              </div>

              {/* Bottom Half */}
              <div className="p-6 flex flex-col flex-grow bg-white dark:bg-slate-900 transition-colors duration-300">
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl mb-4 line-clamp-2 transition-colors duration-300">
                  {chapter.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-end gap-1 h-4">
                    <div className={`w-1.5 rounded-sm ${chapter.level === 'dasar' ? 'bg-green-500 h-2' : chapter.level === 'intermediate' ? 'bg-green-500 h-3' : 'bg-green-500 h-4'}`}></div>
                    <div className={`w-1.5 rounded-sm ${chapter.level === 'dasar' ? 'bg-slate-200 dark:bg-slate-800 h-3' : 'bg-green-500 h-3'}`}></div>
                    <div className={`w-1.5 rounded-sm ${chapter.level === 'mastery' ? 'bg-green-500 h-4' : 'bg-slate-200 dark:bg-slate-800 h-4'}`}></div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-bold capitalize transition-colors duration-300">
                    {chapter.level === 'dasar' ? 'Pemula' : chapter.level === 'intermediate' ? 'Menengah' : 'Mahir'}
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500 ml-1 transition-colors duration-300">({chapter.reviews} ulasan)</span>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-slate-400 dark:text-slate-500 font-medium line-through text-sm transition-colors duration-300">Rp 150.000</span>
                    <span className="text-red-600 dark:text-rose-500 font-black text-lg tracking-tight transition-colors duration-300">GRATIS</span>
                  </div>
                  
                  <button className={`w-full ${c.button} font-bold py-3 rounded-xl transition-all active:scale-[0.98]`}>
                    Pelajari
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* EXPANDED VIEW MODAL */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />
            
            {chapters.filter(c => c.id === selectedId).map(chapter => {
              const c = colorMap[chapter.color] || colorMap.blue;
              const Icon = chapter.icon;

              return (
                <motion.div
                  key="expanded-card"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="bg-white dark:bg-slate-950 w-full max-w-4xl rounded-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh] shadow-2xl dark:border dark:border-slate-800"
                >
                  {/* Top Header */}
                  <div 
                    className={`h-40 sm:h-48 md:h-56 ${c.bg} relative flex items-center justify-center shrink-0 transition-colors duration-300`}
                  >
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-white/50 dark:bg-black/20 rounded-2xl flex items-center justify-center transform rotate-12 shadow-inner border border-black/5 dark:border-white/10"
                    >
                       <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${c.iconColor} -rotate-12`} />
                    </div>
                  </div>

                  <button 
                     className="absolute top-4 right-4 bg-white/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40 text-slate-800 dark:text-white rounded-full p-2 transition-colors z-20 backdrop-blur-sm"
                     onClick={() => setSelectedId(null)}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Content Scrollable */}
                  <div 
                    className="p-6 md:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex-grow transition-colors duration-300"
                  >
                     <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-3 transition-colors duration-300">
                       {chapter.title}
                     </h2>
                     <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm sm:text-base max-w-3xl transition-colors duration-300">
                       Explore the materials below to master this topic. This module covers essential theoretical concepts and practical applications required for a complete understanding of {chapter.title.split(':')[1] || chapter.title}.
                     </p>

                     <div className="space-y-4 sm:space-y-6">
                       {chapter.materials.map((mat, idx) => (
                         <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 + (idx * 0.05) }}
                           key={mat.id} 
                           className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all group"
                         >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 transition-colors">
                                  {mat.title}
                                </h4>
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50 mb-4 transition-colors duration-300">
                                  <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                      Learning Objective
                                    </span>
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                                    {mat.objective}
                                  </p>
                                </div>
                                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed hidden sm:block transition-colors duration-300">
                                  {mat.content.length > 150 ? `${mat.content.substring(0, 150)}...` : mat.content}
                                </p>
                              </div>
                              <div className="shrink-0 flex flex-row md:flex-col gap-3 justify-end items-end md:items-center">
                                <button className={`${c.button} px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm w-full md:w-auto text-center`}>
                                  Buka Materi
                                </button>
                                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full md:w-auto flex justify-center items-center">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                         </motion.div>
                       ))}
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
