
import React, { useState, useCallback } from 'react';
import { analyzePerformance } from './services/geminiService';
import type { AnalysisResult } from './types';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [performanceText, setPerformanceText] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!performanceText.trim()) {
      setError('Please enter performance review text.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzePerformance(performanceText);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze performance. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [performanceText]);

  const exampleText = `John has consistently exceeded his sales targets this quarter, demonstrating excellent client relationship skills. He is proactive in identifying new leads and has a strong understanding of our product. However, his administrative tasks, such as updating the CRM, are often delayed, impacting team reporting. He could also be more collaborative during team meetings, sometimes working in a silo. With some focus on his administrative responsibilities and team collaboration, John can become a top performer.`;


  return (
    <div className="min-h-screen bg-slate-100/50 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">HR Performance Analysis</h1>
          <p className="text-lg text-slate-600">Leverage AI to get instant insights from employee reviews.</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="flex flex-col">
              <label htmlFor="performance-text" className="text-lg font-semibold text-slate-700 mb-2">
                Employee Performance Review
              </label>
              <textarea
                id="performance-text"
                value={performanceText}
                onChange={(e) => setPerformanceText(e.target.value)}
                placeholder="Paste or write the employee's performance review here..."
                className="flex-grow w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 min-h-[300px] text-base"
                disabled={isLoading}
              />
              <button
                onClick={() => setPerformanceText(exampleText)}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 self-start"
                disabled={isLoading}
              >
                Load Example
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !performanceText.trim()}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Analyze Performance
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-slate-50/70 p-6 rounded-lg border border-slate-200 min-h-[300px] flex flex-col justify-center">
              {isLoading && <LoadingSpinner large={true} />}
              {error && <ErrorMessage message={error} />}
              {!isLoading && !error && analysis && <AnalysisDisplay result={analysis} />}
              {!isLoading && !error && !analysis && (
                <div className="text-center text-slate-500">
                  <h2 className="text-xl font-semibold mb-2">Analysis will appear here</h2>
                  <p>Enter some text and click "Analyze Performance" to begin.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
