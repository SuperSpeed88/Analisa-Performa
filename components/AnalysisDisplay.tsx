
import React from 'react';
import type { AnalysisResult } from '../types';
import { ThumbsUpIcon, ThumbsDownIcon, DocumentTextIcon } from './icons';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  return (
    <div className="fade-in animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Performance Analysis</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-2">
            <DocumentTextIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Overall Summary
          </h3>
          <p className="text-slate-600 bg-white p-3 rounded-md border border-slate-200">{result.summary}</p>
        </div>

        <div>
          <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-2">
            <ThumbsUpIcon className="w-5 h-5 mr-2 text-green-500" />
            Strengths
          </h3>
          <ul className="list-none space-y-2">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start bg-green-50/70 p-3 rounded-md border border-green-200">
                <span className="text-green-600 font-bold mr-2">✔</span>
                <span className="text-slate-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-2">
            <ThumbsDownIcon className="w-5 h-5 mr-2 text-amber-500" />
            Areas for Improvement
          </h3>
          <ul className="list-none space-y-2">
            {result.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start bg-amber-50/70 p-3 rounded-md border border-amber-200">
                 <span className="text-amber-600 font-bold mr-2">⚡</span>
                <span className="text-slate-700">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
