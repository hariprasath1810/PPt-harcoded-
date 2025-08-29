'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- Style Definitions ---
const styles: { [key: string]: React.CSSProperties } = {
  slideContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#030712', // A dark, neutral background
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)', // bg-gray-800 with opacity
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    color: '#E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    overflow: 'auto',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
  },
  cardParagraph: {
    color: '#9CA3AF',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  button: {
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s, opacity 0.2s',
    border: 'none',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  input: {
    flexGrow: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    border: '1px solid #4B5563',
    borderRadius: '8px',
    padding: '10px 14px',
    color: 'white',
    fontSize: '0.9rem',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  smallIcon: {
    width: '16px',
    height: '16px',
  },
  loadingContainer: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#D1D5DB',
  },
  outputContainer: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
  },
  outputTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#F3F4F6',
  },
  outputText: {
    color: '#D1D5DB',
    lineHeight: 1.6,
    fontSize: '0.9rem',
    whiteSpace: 'pre-wrap',
  },

  // --- 2x3 image card grid (existing Image card) ---
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  imageCard: {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    paddingBottom: '66%', // ~3:2 aspect ratio
    overflow: 'hidden',
  },
  imageTag: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    fontSize: '0.75rem',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.12)',
  },

  // --- NEW: chart grid + chart card styles for Talk to Your Data ---
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginTop: '12px',
  },
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '12px',
  },
  chartTitle: {
    fontSize: '0.9rem',
    color: '#E5E7EB',
    marginBottom: '8px',
    fontWeight: 600,
  },
  svgWrap: {
    width: '100%',
    height: '160px',
  },
};

// --- Helper: Icon Components ---
const IconLoader = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ ...style, animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const IconUpload = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconFileText = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconImage = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const IconSparkles = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 3L9.5 8.5 4 10l5.5 5.5L8 21l4-3 4 3-1.5-5.5L22 10l-5.5-1.5z" />
  </svg>
);
const IconBarChart = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);
const IconHelpCircle = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconMic = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// --- Card Components ---

const HARDCODED_SUMMARY =
  'The document outlines a strategic initiative to leverage AI across various business units. Key focus areas include predictive analytics for market trends, natural language processing for customer support automation, and computer vision for quality control in manufacturing. The projected ROI is an 18% increase in operational efficiency within the first two years.';
function SummarizerCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');
  const handleSummarize = async () => {
    if (!fileName) {
      alert('Please upload a dummy PDF first.');
      return;
    }
    setIsLoading(true);
    setSummary('');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSummary(HARDCODED_SUMMARY);
    setIsLoading(false);
  };
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <IconFileText style={{ ...styles.icon, color: '#60A5FA' }} />
        <h2 style={styles.cardTitle}>Document Summarization</h2>
      </div>
      <p style={styles.cardParagraph}>Upload any PDF. The system will process it and show a pre-defined summary.</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <label style={{ ...styles.button, flexGrow: 1, backgroundColor: '#4B5563' }}>
          <IconUpload style={styles.smallIcon} />
          {fileName || 'Upload Dummy PDF'}
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".pdf"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
        </label>
        <button
          onClick={handleSummarize}
          disabled={isLoading || !fileName}
          style={{ ...styles.button, backgroundColor: '#2563EB', opacity: isLoading || !fileName ? 0.5 : 1 }}
        >
          Summarize
        </button>
      </div>
      {isLoading && (
        <div style={styles.loadingContainer}>
          <IconLoader style={styles.icon} />
          <span>Processing document...</span>
        </div>
      )}
      {summary && (
        <div style={styles.outputContainer}>
          <h3 style={styles.outputTitle}>Generated Summary:</h3>
          <p style={styles.outputText}>{summary}</p>
        </div>
      )}
    </div>
  );
}

// --- UPDATED: 6 images + 6 model names in a 2x3 grid card view ---
const HARDCODED_IMAGES = [
  { model: 'Midjourney', src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=350' },
  { model: 'DALL·E', src: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&h=350' },
  { model: 'Stable Diffusion', src: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&h=350' },
  { model: 'Imagen', src: 'https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&h=350' },
  { model: 'Nova', src: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&h=350' },
  { model: 'Llama', src: 'https://images.pexels.com/photos/128817/pexels-photo-128817.jpeg?auto=compress&cs=tinysrgb&h=350' },
];

function ImageGeneratorCard() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setShowImages(false);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowImages(true);
    setIsLoading(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <IconImage style={{ ...styles.icon, color: '#A78BFA' }} />
        <h2 style={styles.cardTitle}>Image Generation</h2>
      </div>
      <p style={styles.cardParagraph}>Enter any prompt to see a showcase of pre-generated images from different models.</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cat in a spaceship"
          style={styles.input}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          style={{ ...styles.button, backgroundColor: '#7C3AED', opacity: isLoading || !prompt ? 0.5 : 1 }}
        >
          <IconSparkles style={styles.smallIcon} />
          Generate
        </button>
      </div>

      {isLoading && (
        <div style={styles.loadingContainer}>
          <IconLoader style={styles.icon} />
          <span>Generating images...</span>
        </div>
      )}

      {showImages && (
        <div style={{ ...styles.outputContainer }}>
          <div style={styles.imageGrid}>
            {HARDCODED_IMAGES.map((img) => (
              <div key={img.model} style={styles.imageCard}>
                <div style={styles.imageWrap}>
                  <img
                    src={img.src}
                    alt={img.model}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={styles.imageTag}>{img.model}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** -----------------------
 * TALK TO YOUR DATA (unchanged from your last working version)
 ------------------------*/
const HARD_CODED_SUMMARIES = [
  'Chart review: Category C spiked while A and B held steady. Consider reallocating budget toward C and D next cycle.',
  'Insight: Week 4 shows a clear acceleration versus prior weeks. A timed promotion likely amplified conversions.',
  'Observation: The top three segments contribute ~75% of volume. Focus retention tactics there for fastest wins.',
  'Pattern: Seasonality is visible with periodic peaks. Pull forward inventory and staffing ahead of the next crest.',
  'Signal: Outliers in Region South skewed the mean upward. Median is a better central tendency for planning.',
];

type Point = { x: number; y: number };
type PieSlice = { label: string; value: number };

function rnd(min = 10, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genBarData(n = 6): Point[] {
  return Array.from({ length: n }, (_, i) => ({ x: i + 1, y: rnd(12, 95) }));
}
function genLineData(n = 8): Point[] {
  let base = rnd(30, 60);
  return Array.from({ length: n }, (_, i) => {
    base = Math.max(5, base + rnd(-12, 18));
    return { x: i + 1, y: base };
  });
}
function genPieData(): PieSlice[] {
  const labels = ['A', 'B', 'C', 'D', 'E'];
  const vals = labels.map(() => rnd(5, 30));
  return labels.map((label, i) => ({ label, value: vals[i] }));
}

/** Simple inline SVG BAR chart */
function BarChart({ data }: { data: Point[] }) {
  const width = 320;
  const height = 160;
  const padding = 24;
  const maxY = Math.max(...data.map((d) => d.y)) || 1;
  const barW = (width - padding * 2) / data.length - 6;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={styles.svgWrap}>
      {/* axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />
      {data.map((d, i) => {
        const x = padding + i * ((width - padding * 2) / data.length) + 3;
        const h = ((d.y / maxY) * (height - padding * 2)) || 0;
        const y = height - padding - h;
        return <rect key={i} x={x} y={y} width={barW} height={h} fill="rgba(96,165,250,0.9)" />;
      })}
    </svg>
  );
}

/** Simple inline SVG LINE chart */
function LineChart({ data }: { data: Point[] }) {
  const width = 320;
  const height = 160;
  const padding = 24;
  const maxY = Math.max(...data.map((d) => d.y)) || 1;
  const stepX = (width - padding * 2) / (data.length - 1 || 1);

  const points = data
    .map((d, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (d.y / maxY) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={styles.svgWrap}>
      <polyline points={points} fill="none" stroke="rgba(52,211,153,0.95)" strokeWidth="2.5" />
      {data.map((d, i) => {
        const x = padding + i * stepX;
        const y = height - padding - (d.y / maxY) * (height - padding * 2);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(52,211,153,0.95)" />;
      })}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />
    </svg>
  );
}

/** Simple inline SVG DONUT chart */
function DonutChart({ data }: { data: PieSlice[] }) {
  const r = 60;
  const cx = 90;
  const cy = 85;
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  let startAngle = -Math.PI / 2;

  const arcs = data.map((slice, i) => {
    const angle = (slice.value / total) * Math.PI * 2;
    const endAngle = startAngle + angle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    startAngle = endAngle;

    const palette = [
      'rgba(129,140,248,0.95)',
      'rgba(244,114,182,0.95)',
      'rgba(250,204,21,0.95)',
      'rgba(96,165,250,0.95)',
      'rgba(34,197,94,0.95)',
    ];
    return <path key={i} d={path} fill={palette[i % palette.length]} />;
  });

  return (
    <svg viewBox="0 0 180 180" style={styles.svgWrap}>
      {arcs}
      <circle cx={cx} cy={cy} r={32} fill="rgba(3,7,18,0.9)" />
    </svg>
  );
}

const HARDCODED_ANALYSIS_FALLBACK =
  'Quick take: The bar chart highlights a dominant category, the line shows a late upswing, and the donut confirms concentration in a few slices. Consider doubling down where momentum and share overlap.';

function DataAnalysisCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [chartsReady, setChartsReady] = useState(false);
  const [barData, setBarData] = useState<Point[]>([]);
  const [lineData, setLineData] = useState<Point[]>([]);
  const [pieData, setPieData] = useState<PieSlice[]>([]);
  const [question, setQuestion] = useState('');
  const [typedSummary, setTypedSummary] = useState('');
  const [fullSummary, setFullSummary] = useState('');

  const handleGenerateCharts = async () => {
    if (!fileName) {
      alert('Please upload a CSV/Excel file first.');
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setBarData(genBarData());
    setLineData(genLineData());
    setPieData(genPieData());
    setChartsReady(true);
    setIsLoading(false);
    setTypedSummary('');
    setFullSummary('');
  };

  useEffect(() => {
    if (!fullSummary) return;
    setTypedSummary('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedSummary(fullSummary.slice(0, i));
      if (i >= fullSummary.length) clearInterval(id);
    }, Math.floor(Math.random() * 20) + 18);
    return () => clearInterval(id);
  }, [fullSummary]);

  const handleExplain = () => {
    if (!chartsReady) {
      alert('Please generate charts first.');
      return;
    }
    if (!question.trim()) {
      alert('Please enter a prompt about the charts.');
      return;
    }
    const pick = HARD_CODED_SUMMARIES[Math.floor(Math.random() * HARD_CODED_SUMMARIES.length)] || HARDCODED_ANALYSIS_FALLBACK;
    setFullSummary(pick);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <IconBarChart style={{ ...styles.icon, color: '#34D399' }} />
        <h2 style={styles.cardTitle}>Talk to Your Data</h2>
      </div>
      <p style={styles.cardParagraph}>
        Upload a CSV/Excel file, auto-generate random charts (demo), then ask a question to get a hardcoded summary typed out live.
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ ...styles.button, backgroundColor: '#4B5563', flex: 1 }}>
          <IconUpload style={styles.smallIcon} />
          {fileName || 'Upload CSV / Excel'}
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
        </label>
        <button
          onClick={handleGenerateCharts}
          disabled={isLoading || !fileName}
          style={{ ...styles.button, backgroundColor: '#10B981', opacity: isLoading || !fileName ? 0.5 : 1 }}
        >
          Generate Charts
        </button>
      </div>

      {isLoading && (
        <div style={styles.loadingContainer}>
          <IconLoader style={styles.icon} />
          <span>Preparing charts...</span>
        </div>
      )}

      {chartsReady && (
        <div style={{ ...styles.outputContainer }}>
          <div style={styles.chartGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Category Performance (Bar)</div>
              <BarChart data={barData} />
            </div>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Trend Over Time (Line)</div>
              <LineChart data={lineData} />
            </div>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Share by Segment (Donut)</div>
              <DonutChart data={pieData} />
            </div>
          </div>
        </div>
      )}

      {chartsReady && (
        <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <IconHelpCircle
              style={{ ...styles.icon, position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
            />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about these charts..."
              style={{ ...styles.input, paddingLeft: 40 }}
            />
          </div>
          <button onClick={handleExplain} style={{ ...styles.button, backgroundColor: '#059669' }}>
            Explain
          </button>
        </div>
      )}

      {typedSummary && (
        <div style={styles.outputContainer}>
          <h3 style={styles.outputTitle}>Chart Summary:</h3>
          <p style={styles.outputText}>{typedSummary}</p>
        </div>
      )}
    </div>
  );
}

/** -----------------------
 * MULTIMODAL INTERACTIONS (UPDATED)
 * - Voice-to-Voice: record mic, then play 5s hardcoded voice (no text).
 * - Voice+Text+Image: record mic, then play 5s hardcoded voice + typewriter text + image.
 * - Video-to-Text: unchanged.
 ------------------------*/
function MultimodalCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [recordMode, setRecordMode] = useState<'voice' | 'vti' | null>(null);

  const [typedText, setTypedText] = useState('');
  const [fullText, setFullText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [playCountdown, setPlayCountdown] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for VTI
  useEffect(() => {
    if (!fullText) return;
    setTypedText('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 18 + Math.floor(Math.random() * 18));
    return () => clearInterval(id);
  }, [fullText]);

  // Countdown display while voice is "playing"
  useEffect(() => {
    if (!isPlayingVoice) return;
    setPlayCountdown(5);
    const id = setInterval(() => {
      setPlayCountdown((c) => {
        if (c <= 1) {
          clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPlayingVoice]);

  // --- Helpers: play a 5s hardcoded TTS voice, then stop
  const playFiveSecondVoice = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Fallback: just show a transient "playing" state
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 5000);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    // Start speaking
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setIsPlayingVoice(true);
    // Force stop at 5s
    setTimeout(() => {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
    }, 5000);
  };

  // --- Mic recording controls
  const startRecording = async (mode: 'voice' | 'vti') => {
    try {
      setIsLoading(false);
      setLoadingText('');
      setRecordMode(mode);
      setTypedText('');
      setFullText('');
      setImageUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      // We don't need the audio data in this demo—just capture briefly
      recorder.ondataavailable = () => {};
      recorder.onstop = () => {
        // Clean up tracks
        stream.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;

        // After recording, "process" based on mode
        if (mode === 'voice') {
          // Voice-to-Voice: play hardcoded 5s voice, no text
          playFiveSecondVoice('This is your hardcoded voice reply.');
        } else if (mode === 'vti') {
          // Voice+Text+Image: play 5s voice + typewriter + image
          playFiveSecondVoice('Here is a combined hardcoded response with voice, text, and image.');
          setFullText(
            'Simulated multimodal result: your voice was received. Here is a hardcoded explanation streaming letter by letter.'
          );
          setImageUrl('https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg');
        }
      };

      recorder.start();
    } catch (e) {
      console.error(e);
      alert('Microphone access was blocked or unavailable.');
      stopRecording(false);
    }
  };

  const stopRecording = (shouldStop = true) => {
    if (!isRecording) return;
    setIsRecording(false);
    if (shouldStop && mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    // If something failed, ensure tracks are closed
    if (!shouldStop && mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;
    }
  };

  // --- Video-to-Text: UNCHANGED
  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setTypedText('');
    setFullText('');
    setImageUrl(null);
    setRecordMode(null);

    // Simulate processing delay
    setLoadingText('Analyzing video file...');
    setTimeout(() => {
      setIsLoading(false);
      setLoadingText('');
      setFullText('');
      setTypedText(`Video analysis for "${file.name}" is complete. The main subject is a golden retriever playing fetch in a park on a sunny day.`);
      setImageUrl(null);
    }, 2800);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <IconMic style={{ ...styles.icon, color: '#F97316' }} />
        <h2 style={styles.cardTitle}>Multimodal Interactions</h2>
      </div>
      <p style={styles.cardParagraph}>
        Record your voice and get demo outputs. Voice-to-Voice plays a 5s reply. Voice+Text+Image also shows text (typewriter) and an image.
      </p>

      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {/* VOICE-TO-VOICE */}
        {!isRecording || recordMode !== 'voice' ? (
          <button
            onClick={() => startRecording('voice')}
            disabled={isLoading || isRecording}
            style={{ ...styles.button, backgroundColor: '#9A3412', opacity: isLoading || isRecording ? 0.5 : 1, fontSize: '0.8rem' }}
          >
            Voice-to-Voice
          </button>
        ) : (
          <button
            onClick={() => stopRecording(true)}
            style={{ ...styles.button, backgroundColor: '#DC2626', fontSize: '0.8rem' }}
          >
            Stop Recording
          </button>
        )}

        {/* VOICE + TEXT + IMAGE */}
        {!isRecording || recordMode !== 'vti' ? (
          <button
            onClick={() => startRecording('vti')}
            disabled={isLoading || isRecording}
            style={{ ...styles.button, backgroundColor: '#9A3412', opacity: isLoading || isRecording ? 0.5 : 1, fontSize: '0.8rem' }}
          >
            Voice+Text+Image
          </button>
        ) : (
          <button
            onClick={() => stopRecording(true)}
            style={{ ...styles.button, backgroundColor: '#DC2626', fontSize: '0.8rem' }}
          >
            Stop Recording
          </button>
        )}

        {/* VIDEO-TO-TEXT (UNCHANGED) */}
        <button
          onClick={() => videoInputRef.current?.click()}
          disabled={isLoading || isRecording}
          style={{ ...styles.button, backgroundColor: '#9A3412', opacity: isLoading || isRecording ? 0.5 : 1, fontSize: '0.8rem' }}
        >
          Video-to-Text
        </button>
        <input type="file" ref={videoInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleVideoFileChange} />
      </div>

      {/* Recording state indicator */}
      {isRecording && (
        <div style={styles.loadingContainer}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#4ADE80', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <span>Recording ({recordMode === 'voice' ? 'Voice-to-Voice' : 'Voice+Text+Image'})...</span>
        </div>
      )}

      {/* Loading (only used for video flow) */}
      {isLoading && (
        <div style={styles.loadingContainer}>
          <IconLoader style={styles.icon} />
          <span>{loadingText}</span>
        </div>
      )}

      {/* Voice playback indicator (5s) */}
      {isPlayingVoice && (
        <div style={styles.loadingContainer}>
          <span>Playing voice response… {playCountdown}s</span>
        </div>
      )}

      {/* Outputs (for VTI text+image and video text) */}
      {(typedText || imageUrl) && (
        <div style={styles.outputContainer}>
          {(typedText || fullText) && <h3 style={styles.outputTitle}>Generated Output:</h3>}
          {typedText && <p style={styles.outputText}>{typedText}</p>}
          {imageUrl && (
            <div style={{ marginTop: '12px' }}>
              <img
                src={imageUrl}
                alt="Generated visual"
                style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

// --- Main Slide Component ---
const Slide20 = () => {
  return (
    <div style={styles.slideContainer}>
      <SummarizerCard />
      <ImageGeneratorCard />
      <DataAnalysisCard />
      <MultimodalCard />
    </div>
  );
};

export default Slide20;