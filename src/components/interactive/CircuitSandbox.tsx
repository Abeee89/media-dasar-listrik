"use client";

import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Handle,
  Position,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Battery, Zap, Activity } from 'lucide-react';

const BatteryNode = () => (
  <div className="bg-slate-800 border-2 border-blue-500 rounded p-2 text-white shadow-xl w-24">
    <div className="text-center font-bold text-xs mb-1">BATTERY 9V</div>
    <Handle type="target" position={Position.Left} id="in" style={{ background: '#3b82f6' }} />
    <Battery className="w-full text-blue-400" />
    <Handle type="source" position={Position.Right} id="out" style={{ background: '#ef4444' }} />
  </div>
);

const ResistorNode = () => (
  <div className="bg-slate-800 border-2 border-orange-500 rounded p-2 text-white shadow-xl w-24">
    <Handle type="target" position={Position.Left} id="in" />
    <div className="text-center font-bold text-xs mb-1">330Ω</div>
    <svg width="100%" height="20" viewBox="0 0 100 20">
      <path d="M0,10 L15,10 L20,0 L30,20 L40,0 L50,20 L60,0 L70,20 L80,0 L85,10 L100,10" fill="none" stroke="#f97316" strokeWidth="3" />
    </svg>
    <Handle type="source" position={Position.Right} id="out" />
  </div>
);

const LEDNode = ({ data }: { data: { lit: boolean, burnt: boolean } }) => (
  <div className={`bg-slate-800 border-2 rounded p-2 shadow-xl w-20 flex flex-col items-center
      ${data.burnt ? 'border-amber-900 bg-amber-950' : data.lit ? 'border-emerald-400 shadow-[0_0_15px_#34d399]' : 'border-slate-600'}
  `}>
    <Handle type="target" position={Position.Top} id="in" />
    <div className="text-center font-bold text-[10px] text-slate-400 mb-1">LED</div>
    <div className={`w-8 h-8 rounded-full mb-1 transition-all ${data.burnt ? 'bg-amber-900' : data.lit ? 'bg-emerald-400 shadow-[0_0_20px_#34d399]' : 'bg-slate-700'}`}></div>
    <Handle type="source" position={Position.Bottom} id="out" />
  </div>
);

const nodeTypes = {
  battery: BatteryNode,
  resistor: ResistorNode,
  led: LEDNode,
};

let idString = 3;
const getId = () => `${++idString}`;

function CircuitSandboxContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [analysis, setAnalysis] = useState("Drag components onto the board to build a circuit.");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const updateCircuitState = useCallback((currentEdges: Edge[], currentNodes: Node[]) => {
    // Collect all batteries and LEDs
    const batteries = currentNodes.filter(n => n.type === 'battery');
    const leds = currentNodes.filter(n => n.type === 'led');
    
    // Very simplified check looking at all edges
    let anyComplete = false;
    let anyBurnt = false;

    // Reset all LEDs first
     let updatedNodes = currentNodes.map(n => {
       if(n.type === 'led') n.data = { lit: false, burnt: false };
       return n;
    });

    if (batteries.length > 0 && leds.length > 0) {
      batteries.forEach(battery => {
         leds.forEach(led => {
            const hasPathFromBattery = currentEdges.some(e => e.source === battery.id);
            const hasPathToBattery = currentEdges.some(e => e.target === battery.id);
            const hasPathToLED = currentEdges.some(e => e.target === led.id);
            
            const directBurn = currentEdges.find(e => e.source === battery.id && e.target === led.id);
            const hasResistorConnection = currentEdges.some(e => {
                const sourceNode = currentNodes.find(n => n.id === e.source);
                const targetNode = currentNodes.find(n => n.id === e.target);
                return sourceNode?.type === 'resistor' || targetNode?.type === 'resistor';
            });

            const isComplete = hasPathFromBattery && hasPathToBattery && hasPathToLED;
            const isBurnt = isComplete && !hasResistorConnection;

            if (isComplete && !isBurnt) anyComplete = true;
            if (isBurnt) anyBurnt = true;

            updatedNodes = updatedNodes.map(n => {
              if (n.id === led.id) {
                // Determine cumulative status
                n.data = { 
                    lit: n.data.lit || (isComplete && !isBurnt), 
                    burnt: n.data.burnt || isBurnt || !!(directBurn && hasPathToBattery) 
                };
              }
              return n;
            });
         });
      });
    }

    setNodes(updatedNodes);

    if (anyBurnt) {
      setAnalysis("⚠️ Warning: Circuit Overload! A battery was hooked up to an LED without a resistor. The LED has blown.");
    } else if (anyComplete) {
      setAnalysis("✅ Success: Circuit is complete and safely regulated by a resistor. The LED is lit.");
    } else {
      setAnalysis("Circuit is incomplete. Connect the Battery (+) through components and back to Battery (-).");
    }

  }, [setNodes]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => {
      const newEdges = applyEdgeChanges(changes, eds);
      updateCircuitState(newEdges, nodes);
      return newEdges;
    }),
    [nodes, updateCircuitState],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => {
      const newEdges = addEdge({ ...params, animated: true, style: { stroke: '#facc15', strokeWidth: 3 } }, eds);
      updateCircuitState(newEdges, nodes);
      return newEdges;
    }),
    [nodes, updateCircuitState],
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: type === 'led' ? { lit: false, burnt: false } : {},
      };

      setNodes((nds) => {
         const newNodes = nds.concat(newNode);
         updateCircuitState(edges, newNodes);
         return newNodes;
      });
    },
    [screenToFlowPosition, edges, updateCircuitState],
  );

  return (
     <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto h-[600px]">
        {/* Component Palette */}
        <aside className="w-full md:w-64 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col shrink-0">
           <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
             <Zap className="w-5 h-5 text-blue-400" /> Components
           </h3>
           <p className="text-xs text-slate-400 mb-4">Drag elements onto the canvas</p>
           
           <div className="space-y-3">
             <div 
               onDragStart={(event) => onDragStart(event, 'battery')} 
               draggable 
               className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-3"
             >
               <Battery className="w-5 h-5 text-blue-400" />
               <span className="text-sm font-semibold text-white">9V Battery</span>
             </div>
             
             <div 
               onDragStart={(event) => onDragStart(event, 'resistor')} 
               draggable 
               className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-3"
             >
               <Activity className="w-5 h-5 text-orange-400" />
               <span className="text-sm font-semibold text-white">330Ω Resistor</span>
             </div>

             <div 
               onDragStart={(event) => onDragStart(event, 'led')} 
               draggable 
               className="bg-slate-800 border border-slate-700 p-3 rounded-lg cursor-grab hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-3"
             >
               <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-emerald-400" />
               </div>
               <span className="text-sm font-semibold text-white">Light (LED)</span>
             </div>
           </div>

           <div className="mt-auto pt-4 border-t border-slate-800">
             <button onClick={() => {setEdges([]); setNodes([]); setAnalysis("Board cleared.")}} className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20 text-sm font-bold">
               Clear Board
             </button>
           </div>
        </aside>

        {/* Sandbox Canvas */}
        <div className="flex-1 flex flex-col relative h-full">
           <div className="absolute top-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-sm border border-slate-800 p-4 rounded-xl shadow-lg">
             <h4 className="text-sm font-bold text-slate-300 mb-1">Analysis Tool</h4>
             <p className={`text-sm ${analysis.includes('Warning') ? 'text-red-400 font-bold' : analysis.includes('Success') ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
               {analysis}
             </p>
           </div>
           
           <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative" ref={reactFlowWrapper}>
             <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onConnect={onConnect}
               onDrop={onDrop}
               onDragOver={onDragOver}
               nodeTypes={nodeTypes}
               fitView
               colorMode="dark"
             >
               <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#334155" />
               <Controls />
             </ReactFlow>
           </div>
        </div>
     </div>
  );
}

export function CircuitSandbox() {
   return (
     <ReactFlowProvider>
       <CircuitSandboxContent />
     </ReactFlowProvider>
   )
}
