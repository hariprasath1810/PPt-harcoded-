import type React from 'react';
import { useEffect } from 'react';
import ReactFlow, { Background, Controls, type Node, type Edge, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
import Slide20 from './slides/Slide20';
import Slide21 from './slides/Slide21';
import Slide22 from './slides/Slide22';
import Slide23 from './slides/Slide23';
import Slide24 from './slides/Slide24';
import Slide25 from './slides/Slide25';
import Slide26 from './slides/Slide26';
import Slide27 from './slides/Slide27';
import { useStore } from '../store';

const nodeTypes = {
  slideNode: ({ data }: { data: { component: React.ReactNode } }) => {
    return (
      <div style={{ width: 1600, height: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ width: '95%', height: '95%', position: 'relative' }}>
          {data.component}
        </div>
      </div>
    );
  },
};

const initialNodes: Node[] = [
  // Level 0: Root
  { id: '1', type: 'slideNode', position: { x: 0, y: 0 }, data: { component: <Slide1 /> }, width: 1600, height: 900 },

  // Level 1: Main Branches
  { id: '2', type: 'slideNode', position: { x: -2000, y: 1200 }, data: { component: <Slide2 /> }, width: 1600, height: 900 },
  { id: '9', type: 'slideNode', position: { x: 0, y: 1200 }, data: { component: <Slide9 /> }, width: 1600, height: 900 },
  { id: '21', type: 'slideNode', position: { x: 2000, y: 1200 }, data: { component: <Slide21 /> }, width: 1600, height: 900 },
  { id: '26', type: 'slideNode', position: { x: 4000, y: 1200 }, data: { component: <Slide26 /> }, width: 1600, height: 900 },
  { id: '27', type: 'slideNode', position: { x: 6000, y: 1200 }, data: { component: <Slide27 /> }, width: 1600, height: 900 },

  // Level 2: "Introduction to AI" Branch
  { id: '3', type: 'slideNode', position: { x: -3000, y: 2400 }, data: { component: <Slide3 /> }, width: 1600, height: 900 },
  { id: '4', type: 'slideNode', position: { x: -2500, y: 2400 }, data: { component: <Slide4 /> }, width: 1600, height: 900 },
  { id: '5', type: 'slideNode', position: { x: -2000, y: 2400 }, data: { component: <Slide5 /> }, width: 1600, height: 900 },
  { id: '6', type: 'slideNode', position: { x: -1500, y: 2400 }, data: { component: <Slide6 /> }, width: 1600, height: 900 },
  { id: '8', type: 'slideNode', position: { x: -1000, y: 2400 }, data: { component: <Slide8 /> }, width: 1600, height: 900 },

  // Level 3: "Introduction to AI" Sub-branch
  { id: '7', type: 'slideNode', position: { x: -2500, y: 3600 }, data: { component: <Slide7 /> }, width: 1600, height: 900 },

  // Level 2: "Generative AI" Branch
  { id: '12', type: 'slideNode', position: { x: 0, y: 2400 }, data: { component: <Slide12 /> }, width: 1600, height: 900 },

  // Level 3: "Generative AI" Sub-branch
  { id: '10', type: 'slideNode', position: { x: -500, y: 3600 }, data: { component: <Slide10 /> }, width: 1600, height: 900 },
  { id: '13', type: 'slideNode', position: { x: 0, y: 3600 }, data: { component: <Slide13 /> }, width: 1600, height: 900 },
  { id: '15', type: 'slideNode', position: { x: 500, y: 3600 }, data: { component: <Slide15 /> }, width: 1600, height: 900 },

  // Level 4: "Generative AI" Sub-sub-branch
  { id: '19', type: 'slideNode', position: { x: -500, y: 4800 }, data: { component: <Slide19 /> }, width: 1600, height: 900 },
  { id: '14', type: 'slideNode', position: { x: -250, y: 4800 }, data: { component: <Slide14 /> }, width: 1600, height: 900 },
  { id: '16', type: 'slideNode', position: { x: 0, y: 4800 }, data: { component: <Slide16 /> }, width: 1600, height: 900 },
  { id: '17', type: 'slideNode', position: { x: 250, y: 4800 }, data: { component: <Slide17 /> }, width: 1600, height: 900 },
  { id: '18', type: 'slideNode', position: { x: 500, y: 4800 }, data: { component: <Slide18 /> }, width: 1600, height: 900 },

  // Level 5: "Generative AI" Sub-sub-sub-branch
  { id: '20', type: 'slideNode', position: { x: -500, y: 6000 }, data: { component: <Slide20 /> }, width: 1600, height: 900 },

  // Level 2: "Agentic AI" Branch
  { id: '11', type: 'slideNode', position: { x: 1500, y: 2400 }, data: { component: <Slide11 /> }, width: 1600, height: 900 },
  { id: '22', type: 'slideNode', position: { x: 2000, y: 2400 }, data: { component: <Slide22 /> }, width: 1600, height: 900 },
  { id: '25', type: 'slideNode', position: { x: 2500, y: 2400 }, data: { component: <Slide25 /> }, width: 1600, height: 900 },

  // Level 3: "Agentic AI" Sub-branch
  { id: '23', type: 'slideNode', position: { x: 2000, y: 3600 }, data: { component: <Slide23 /> }, width: 1600, height: 900 },

  // Level 4: "Agentic AI" Sub-sub-branch
  { id: '24', type: 'slideNode', position: { x: 2000, y: 4800 }, data: { component: <Slide24 /> }, width: 1600, height: 900 },
];

// Define non-linear navigation relationships
const childrenMap: Record<string, string[]> = {
    // Root
    '1': ['2', '9', '21', '26', '27'], // Main hub

    // "Introduction to AI" Branch
    '2': ['3', '4', '5', '6', '8'],
    '3': [],
    '4': ['7'],
    '5': [],
    '6': [],
    '7': [],
    '8': [],

    // "Generative AI" Branch
    '9': ['12'],
    '12': ['10', '13', '15'],
    '10': ['19'],
    '13': ['14', '16', '17', '18'],
    '14': [],
    '15': [],
    '16': [],
    '17': [],
    '18': [],
    '19': ['20'],
    '20': [],

    // "Agentic AI" Branch
    '21': ['11', '22', '25'],
    '11': [],
    '22': ['23'],
    '23': ['24'],
    '24': [],
    '25': [],

    // Conclusion Branch
    '26': [],
    '27': [],
};

const parentMap: Record<string, string | undefined> = Object.keys(childrenMap).reduce((acc, key) => {
    for (const child of childrenMap[key]) {
        acc[child] = acc[child] ?? key;
    }
    return acc;
}, {} as Record<string, string | undefined>);

const initialEdges: Edge[] = Object.entries(childrenMap).flatMap(([source, targets]) =>
    targets.map(target => ({ id: `e${source}-${target}`, source, target, animated: true }))
);

// Buttons removed; using keyboard navigation only

const Presentation = () => {
    const { fitView } = useReactFlow();
    const currentSlide = useStore((state) => state.currentSlide);
    const goTo = useStore((state) => state.actions.goTo);

    useEffect(() => {
        // Ensure the canvas initially fits all slides
        fitView({ padding: 0.2, duration: 500 });
    }, [fitView]);

    useEffect(() => {
        // Focus the current slide when it changes
        fitView({ nodes: [{ id: currentSlide }], duration: 800, padding: 0.2 });
    }, [currentSlide, fitView]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const parent = parentMap[currentSlide];
            const siblings = parent ? childrenMap[parent] : [];
            const currentIndex = siblings.indexOf(currentSlide);

            if (e.key === 'ArrowRight') {
                if (siblings.length > 1) {
                    const nextIndex = (currentIndex + 1) % siblings.length;
                    goTo(siblings[nextIndex]);
                }
            } else if (e.key === 'ArrowLeft') {
                if (siblings.length > 1) {
                    const prevIndex = (currentIndex - 1 + siblings.length) % siblings.length;
                    goTo(siblings[prevIndex]);
                }
            } else if (e.key === 'ArrowDown') {
                const children = childrenMap[currentSlide] || [];
                if (children[0]) {
                    goTo(children[0]);
                }
            } else if (e.key === 'ArrowUp') {
                if (parent) {
                    goTo(parent);
                }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentSlide, goTo]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {/* Keyboard navigation only; on-screen buttons removed */}
    </div>
  );
};

const PresentationWrapper = () => (
    <ReactFlowProvider>
        <Presentation />
    </ReactFlowProvider>
)

export default PresentationWrapper;
