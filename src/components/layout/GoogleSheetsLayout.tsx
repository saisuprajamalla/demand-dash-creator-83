
import React, { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface GoogleSheetsLayoutProps {
  children: ReactNode;
}

const GoogleSheetsLayout: React.FC<GoogleSheetsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Google Sheets-like header */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 flex items-center">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-lg font-medium text-gray-800">Demand Forecast</span>
        </div>
        <div className="ml-8 flex space-x-4">
          <button className="text-gray-600 text-sm">File</button>
          <button className="text-gray-600 text-sm">Edit</button>
          <button className="text-gray-600 text-sm">View</button>
          <button className="text-gray-600 text-sm">Insert</button>
          <button className="text-gray-600 text-sm">Format</button>
          <button className="text-gray-600 text-sm">Data</button>
          <button className="text-gray-600 text-sm">Tools</button>
          <button className="text-gray-600 text-sm">Extensions</button>
          <button className="text-gray-600 text-sm">Help</button>
        </div>
      </div>

      {/* Google Sheets-like toolbar */}
      <div className="bg-white border-b border-gray-200 py-1 px-4 flex items-center">
        <div className="flex space-x-2">
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sheets cells background */}
        <div className="flex-1 relative bg-white border-r border-gray-200 overflow-hidden">
          <div className="absolute inset-0">
            <div className="grid grid-cols-[repeat(26,minmax(60px,1fr))] w-full h-full">
              {Array.from({ length: 26 }).map((_, i) => (
                <div key={`col-${i}`} className="border-r border-gray-200"></div>
              ))}
            </div>
            <div className="grid grid-rows-[repeat(100,24px)] w-full h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={`row-${i}`} className="border-b border-gray-200"></div>
              ))}
            </div>
          </div>
          
          {/* Column headers */}
          <div className="sticky top-0 z-10">
            <div className="flex">
              <div className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-200 flex-shrink-0"></div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={`header-${i}`} 
                  className="w-24 h-6 bg-[#f8f9fa] border-r border-b border-gray-200 flex items-center justify-center text-xs text-gray-600 flex-shrink-0"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Row headers */}
          <div className="sticky left-0 z-10">
            <div className="flex flex-col">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`row-header-${i}`} 
                  className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-200 flex items-center justify-center text-xs text-gray-600"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forecasting add-on sidebar */}
        <div className="w-[550px] bg-white shadow-lg border-l border-gray-200 overflow-y-auto flex flex-col">
          <div className="p-3 bg-[#f1f3f4] border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-2 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">AI-Powered Demand Forecasting</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsLayout;
