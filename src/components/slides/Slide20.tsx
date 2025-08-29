'use client';

import React, { useState, useRef } from 'react';

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
  },
};

// --- Helper: Icon Components ---
const IconLoader = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{...style, animation: 'spin 1s linear infinite'}}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>);
const IconUpload = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>);
const IconFileText = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>);
const IconImage = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>);
const IconSparkles = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M12 3L9.5 8.5 4 10l5.5 5.5L8 21l4-3 4 3-1.5-5.5L22 10l-5.5-1.5z" /></svg>);
const IconBarChart = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>);
const IconHelpCircle = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>);
const IconMic = ({ style }: { style?: React.CSSProperties }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>);

// --- Card Components ---

const HARDCODED_SUMMARY = 'The document outlines a strategic initiative to leverage AI across various business units. Key focus areas include predictive analytics for market trends, natural language processing for customer support automation, and computer vision for quality control in manufacturing. The projected ROI is an 18% increase in operational efficiency within the first two years.';
function SummarizerCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');
  const handleSummarize = async () => {
    if (!fileName) { alert('Please upload a dummy PDF first.'); return; }
    setIsLoading(true); setSummary('');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSummary(HARDCODED_SUMMARY); setIsLoading(false);
  };
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}><IconFileText style={{...styles.icon, color: '#60A5FA'}} /><h2 style={styles.cardTitle}>Document Summarization</h2></div>
      <p style={styles.cardParagraph}>Upload any PDF. The system will process it and show a pre-defined summary.</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <label style={{...styles.button, flexGrow: 1, backgroundColor: '#4B5563'}}><IconUpload style={styles.smallIcon} />{fileName || 'Upload Dummy PDF'}<input type="file" style={{display: 'none'}} accept=".pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} /></label>
        <button onClick={handleSummarize} disabled={isLoading || !fileName} style={{...styles.button, backgroundColor: '#2563EB', opacity: (isLoading || !fileName) ? 0.5 : 1 }}>Summarize</button>
      </div>
      {isLoading && (<div style={styles.loadingContainer}><IconLoader style={styles.icon} /><span>Processing document...</span></div>)}
      {summary && (<div style={styles.outputContainer}><h3 style={styles.outputTitle}>Generated Summary:</h3><p style={styles.outputText}>{summary}</p></div>)}
    </div>
  );
}

const HARDCODED_IMAGES = [{ model: 'Midjourney', src: 'https://images.pexels.com/photos/45201/pexels-photo-45201.jpeg?auto=compress&cs=tinysrgb&h=350' }, { model: 'Stable Diffusion', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' }, { model: 'DALL·E 3', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' }, { model: 'Imagen', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' }];
function ImageGeneratorCard() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const handleGenerate = async () => {
    if (!prompt) { alert('Please enter a prompt.'); return; }
    setIsLoading(true); setShowImages(false);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowImages(true); setIsLoading(false);
  };
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}><IconImage style={{...styles.icon, color: '#A78BFA'}} /><h2 style={styles.cardTitle}>Image Generation</h2></div>
      <p style={styles.cardParagraph}>Enter any prompt to see a showcase of pre-generated images from different models.</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A cat in a spaceship" style={styles.input} />
        <button onClick={handleGenerate} disabled={isLoading || !prompt} style={{...styles.button, backgroundColor: '#7C3AED', opacity: (isLoading || !prompt) ? 0.5 : 1 }}><IconSparkles style={styles.smallIcon}/>Generate</button>
      </div>
      {isLoading && (<div style={styles.loadingContainer}><IconLoader style={styles.icon} /><span>Generating images...</span></div>)}
      {showImages && (<div style={{...styles.outputContainer, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>{HARDCODED_IMAGES.map(img => (<div key={img.model} style={{position: 'relative'}}><img src={img.src} alt={img.model} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} /><div style={{position: 'absolute', bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.75rem', padding: '2px 6px', margin: '4px', borderRadius: '4px'}}>{img.model}</div></div>))}</div>)}
    </div>
  );
}

const HARDCODED_ANALYSIS = 'Based on the provided data, the analysis indicates a strong positive correlation between marketing spend and quarterly revenue (R² = 0.87). The peak sales period is identified as Q4, consistently outperforming other quarters by an average of 32%. Recommendation: Increase marketing allocation in late Q3 to maximize Q4 performance.';
function DataAnalysisCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [fileName, setFileName] = useState('');
  const [question, setQuestion] = useState('');
  const handleAnalyze = async () => {
    if (!fileName || !question) { alert('Please upload a CSV and enter a question.'); return; }
    setIsLoading(true); setAnalysis('');
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setAnalysis(HARDCODED_ANALYSIS); setIsLoading(false);
  };
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}><IconBarChart style={{...styles.icon, color: '#34D399'}} /><h2 style={styles.cardTitle}>Talk to Your Data</h2></div>
      <p style={styles.cardParagraph}>Upload a dummy CSV and ask any question to get a pre-defined insight.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
        <label style={{...styles.button, backgroundColor: '#4B5563'}}><IconUpload style={styles.smallIcon} />{fileName || 'Upload Dummy CSV'}<input type="file" style={{display: 'none'}} accept=".csv" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} /></label>
        <div style={{position: 'relative', display: 'flex'}}><IconHelpCircle style={{...styles.icon, position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF'}} /><input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask any question about the data..." style={{...styles.input, paddingLeft: '40px'}} /></div>
        <button onClick={handleAnalyze} disabled={isLoading || !fileName || !question} style={{...styles.button, backgroundColor: '#059669', opacity: (isLoading || !fileName || !question) ? 0.5 : 1 }}>Get Insight</button>
      </div>
      {isLoading && (<div style={styles.loadingContainer}><IconLoader style={styles.icon} /><span>Analyzing data...</span></div>)}
      {analysis && (<div style={styles.outputContainer}><h3 style={styles.outputTitle}>Generated Insight:</h3><p style={styles.outputText}>{analysis}</p></div>)}
    </div>
  );
}

function MultimodalCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [output, setOutput] = useState<{ type: 'audio' | 'text' | null; content: string; }>({ type: null, content: '' });
  const videoInputRef = useRef<HTMLInputElement>(null);
  const handleInteraction = async (type: 'voice' | 'vti' | 'video', videoFileName?: string) => {
    setIsLoading(true); setOutput({ type: null, content: '' });
    if (type === 'voice') setLoadingText('Analyzing voice input...');
    else if (type === 'vti') setLoadingText('Processing combined inputs...');
    else if (type === 'video') setLoadingText('Analyzing video file...');
    await new Promise((resolve) => setTimeout(resolve, 2800));
    if (type === 'voice') setOutput({ type: 'audio', content: 'This is a simulated audio response generated from your voice input.' });
    else if (type === 'vti') setOutput({ type: 'text', content: 'Simulated analysis from voice, text, and image: The image shows a sunset over a mountain range. The text asks to describe it poetically. Here is the result: "Crimson hues bleed across the sky, as ancient peaks slumber under a blanket of twilight."' });
    else setOutput({ type: 'text', content: `Video analysis for "${videoFileName}" is complete. The main subject is a golden retriever playing fetch in a park on a sunny day.`});
    setIsLoading(false); setLoadingText('');
  };
  const handleVoiceButtonClick = () => { if (isRecording) { setIsRecording(false); handleInteraction('voice'); } else { setIsRecording(true); setOutput({ type: null, content: '' }); setIsLoading(false); }};
  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) { handleInteraction('video', file.name); }};
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}><IconMic style={{...styles.icon, color: '#F97316'}} /><h2 style={styles.cardTitle}>Multimodal Interactions</h2></div>
      <p style={styles.cardParagraph}>Simulate complex AI interactions. Outputs are hardcoded.</p>
      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <button onClick={handleVoiceButtonClick} disabled={isLoading} style={{...styles.button, backgroundColor: isRecording ? '#DC2626' : '#9A3412', opacity: isLoading ? 0.5 : 1, fontSize: '0.8rem'}}>{isRecording ? 'Stop Recording' : 'Voice-to-Voice'}</button>
        <button onClick={() => handleInteraction('vti')} disabled={isLoading || isRecording} style={{...styles.button, backgroundColor: '#9A3412', opacity: (isLoading || isRecording) ? 0.5 : 1, fontSize: '0.8rem'}}>Voice+Text+Image</button>
        <button onClick={() => videoInputRef.current?.click()} disabled={isLoading || isRecording} style={{...styles.button, backgroundColor: '#9A3412', opacity: (isLoading || isRecording) ? 0.5 : 1, fontSize: '0.8rem'}}>Video-to-Text</button>
        <input type="file" ref={videoInputRef} style={{display: 'none'}} accept="video/*" onChange={handleVideoFileChange} />
      </div>
      {isRecording && !isLoading && (<div style={styles.loadingContainer}><div style={{width: '12px', height: '12px', backgroundColor: '#4ADE80', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out'}}></div><span>Recording...</span></div>)}
      {isLoading && (<div style={styles.loadingContainer}><IconLoader style={styles.icon} /><span>{loadingText}</span></div>)}
      {output.type && (<div style={styles.outputContainer}>
        <h3 style={styles.outputTitle}>Generated Output:</h3>
        {output.type === 'audio' ? <p style={styles.outputText}>"{output.content}" (Simulated Audio)</p> : <p style={styles.outputText}>{output.content}</p>}
      </div>)}
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
