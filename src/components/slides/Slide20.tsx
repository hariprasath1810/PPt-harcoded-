'use client';

import React, { useState, useRef } from 'react';

// --- Helper: Icon Components (to replace lucide-react for a self-contained file) ---
// Using inline SVGs to avoid external dependencies.

const IconLoader = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const IconUpload = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconFileText = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconImage = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IconSparkles = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3L9.5 8.5 4 10l5.5 5.5L8 21l4-3 4 3-1.5-5.5L22 10l-5.5-1.5z" />
  </svg>
);

const IconBarChart = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const IconHelpCircle = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconMic = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// --- Component: SummarizerCard ---
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

    // Simulate a 2-second processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSummary(HARDCODED_SUMMARY);
    setIsLoading(false);
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <IconFileText className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">
          Document Summarization
        </h2>
      </div>
      <p className="text-gray-400 mb-6">
        Upload any PDF. The system will process it and show a pre-defined
        summary.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="w-full sm:w-auto flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors text-white font-bold py-2 px-4 rounded-md text-center">
          <IconUpload className="w-4 h-4 inline-block mr-2" />
          {fileName || 'Upload Dummy PDF'}
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
        </label>
        <button
          onClick={handleSummarize}
          disabled={isLoading || !fileName}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Summarize
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
          <IconLoader className="w-5 h-5 animate-spin" />
          <span>Processing document...</span>
        </div>
      )}

      {summary && (
        <div className="mt-6 p-4 bg-black/30 rounded-lg animate-fade-in">
          <h3 className="font-bold text-lg mb-2 text-gray-100">
            Generated Summary:
          </h3>
          <p className="text-gray-300 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}

// --- Component: ImageGeneratorCard ---
const HARDCODED_IMAGES = [
    { model: 'Midjourney', src: 'https://images.pexels.com/photos/45201/pexels-photo-45201.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { model: 'Stable Diffusion', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { model: 'DALL·E 3', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' },
    { model: 'Imagen', src: 'https://images.pexels.com/photos/104827/pexels-photo-104827.jpeg?auto=compress&cs=tinysrgb&h=350' },
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

    // Simulate a 3-second generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setShowImages(true);
    setIsLoading(false);
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <IconImage className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Image Generation</h2>
      </div>
      <p className="text-gray-400 mb-6">
        Enter any prompt to see a showcase of pre-generated images from
        different models.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cat in a spaceship"
          className="flex-1 w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <IconSparkles className="w-4 h-4 inline-block mr-1" />
          Generate
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
          <IconLoader className="w-5 h-5 animate-spin" />
          <span>Generating images...</span>
        </div>
      )}

      {showImages && (
        <div className="mt-6 grid grid-cols-2 gap-4 animate-fade-in">
          {HARDCODED_IMAGES.map((img) => (
            <div
              key={img.model}
              className="relative group overflow-hidden rounded-lg aspect-video" // Added aspect-video for consistent size
            >
              <img
                src={img.src}
                alt={img.model}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 bg-black/60 text-white text-sm px-2 py-1 rounded-tr-lg rounded-bl-lg">
                {img.model}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Component: DataAnalysisCard ---
const HARDCODED_ANALYSIS =
  'Based on the provided data, the analysis indicates a strong positive correlation between marketing spend and quarterly revenue (R² = 0.87). The peak sales period is identified as Q4, consistently outperforming other quarters by an average of 32%. Recommendation: Increase marketing allocation in late Q3 to maximize Q4 performance.';

function DataAnalysisCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [fileName, setFileName] = useState('');
  const [question, setQuestion] = useState('');

  const handleAnalyze = async () => {
    if (!fileName || !question) {
      alert('Please upload a CSV and enter a question.');
      return;
    }
    setIsLoading(true);
    setAnalysis('');

    // Simulate a 2.5-second analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setAnalysis(HARDCODED_ANALYSIS);
    setIsLoading(false);
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <IconBarChart className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Talk to Your Data</h2>
      </div>
      <p className="text-gray-400 mb-6">
        Upload a dummy CSV and ask any question to get a pre-defined insight.
      </p>

      <div className="space-y-4">
        <label className="w-full flex cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors text-white font-bold py-2 px-4 rounded-md text-center">
          <IconUpload className="w-4 h-4 inline-block mr-2" />
          {fileName || 'Upload Dummy CSV'}
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
        </label>
        <div className="relative">
          <IconHelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any question about the data..."
            className="w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !fileName || !question}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Get Insight
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
          <IconLoader className="w-5 h-5 animate-spin" />
          <span>Analyzing data...</span>
        </div>
      )}

      {analysis && (
        <div className="mt-6 p-4 bg-black/30 rounded-lg animate-fade-in">
          <h3 className="font-bold text-lg mb-2 text-gray-100">
            Generated Insight:
          </h3>
          <p className="text-gray-300 leading-relaxed">{analysis}</p>
        </div>
      )}
    </div>
  );
}

// --- Component: MultimodalCard ---
function MultimodalCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [output, setOutput] = useState<{
    type: 'audio' | 'text' | null;
    content: string;
  }>({ type: null, content: '' });
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleInteraction = async (
    type: 'voice' | 'vti' | 'video',
    videoFileName?: string
  ) => {
    setIsLoading(true);
    setOutput({ type: null, content: '' });

    if (type === 'voice') setLoadingText('Analyzing voice input...');
    else if (type === 'vti') setLoadingText('Processing combined inputs...');
    else if (type === 'video') setLoadingText('Analyzing video file...');

    await new Promise((resolve) => setTimeout(resolve, 2800));

    if (type === 'voice') {
      setOutput({
        type: 'audio',
        content:
          'This is a simulated audio response generated from your voice input.',
      });
    } else if (type === 'vti') {
      setOutput({
        type: 'text',
        content:
          'Simulated analysis from voice, text, and image: The image shows a sunset over a mountain range. The text asks to describe it poetically. Here is the result: "Crimson hues bleed across the sky, as ancient peaks slumber under a blanket of twilight."',
      });
    } else {
      setOutput({
        type: 'text',
        content: `Video analysis for "${videoFileName}" is complete. The main subject is a golden retriever playing fetch in a park on a sunny day.`,
      });
    }

    setIsLoading(false);
    setLoadingText('');
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      setIsRecording(false);
      handleInteraction('voice');
    } else {
      setIsRecording(true);
      setOutput({ type: null, content: '' });
      setIsLoading(false);
    }
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  const handleVideoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInteraction('video', file.name);
    }
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <IconMic className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-semibold text-white">
          Multimodal Interactions
        </h2>
      </div>
      <p className="text-gray-400 mb-6">
        Simulate complex AI interactions. Outputs are hardcoded.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleVoiceButtonClick}
            disabled={isLoading}
            className={`transition-colors text-white font-semibold py-2 px-3 rounded-md text-sm disabled:bg-gray-500 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-orange-600/80 hover:bg-orange-600'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Voice-to-Voice'}
          </button>
          <button
            onClick={() => handleInteraction('vti')}
            disabled={isLoading || isRecording}
            className="bg-orange-600/80 hover:bg-orange-600 transition-colors text-white font-semibold py-2 px-3 rounded-md disabled:bg-gray-500 text-sm"
          >
            Voice+Text+Image
          </button>
          <button
            onClick={handleVideoUploadClick}
            disabled={isLoading || isRecording}
            className="bg-orange-600/80 hover:bg-orange-600 transition-colors text-white font-semibold py-2 px-3 rounded-md disabled:bg-gray-500 text-sm"
          >
            Video-to-Text
          </button>
        </div>

        {/* Hidden file input for video */}
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={handleVideoFileChange}
        />
      </div>

      {isRecording && !isLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>Recording...</span>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
          <IconLoader className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </div>
      )}

      {output.type && (
        <div className="mt-6 p-4 bg-black/30 rounded-lg animate-fade-in">
          <h3 className="font-bold text-lg mb-2 text-gray-100">
            Generated Output:
          </h3>
          {output.type === 'audio' && (
            <div className="flex items-center gap-3">
              <p className="text-gray-300 italic">"{output.content}"</p>
              <div className="text-gray-400 text-sm">
                (Simulated Audio Player)
              </div>
            </div>
          )}
          {output.type === 'text' && (
            <p className="text-gray-300 leading-relaxed">{output.content}</p>
          )}
        </div>
      )}
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white p-4 sm:p-8">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[25%] w-[400px] h-[400px] bg-green-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          AI Features Prototype
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          An interactive showcase of AI capabilities. All outputs are hardcoded
          to simulate a real, functional frontend.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <SummarizerCard />
        <ImageGeneratorCard />
        <DataAnalysisCard />
        <MultimodalCard />
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
