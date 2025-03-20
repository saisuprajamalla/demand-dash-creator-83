
import React, { ReactNode, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface GoogleSheetsLayoutProps {
  children: ReactNode;
}

const GoogleSheetsLayout: React.FC<GoogleSheetsLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#f8f9fa]">
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

      {showSidebar ? (
        <ResizablePanelGroup 
          direction="horizontal" 
          className="flex-1 overflow-hidden"
        >
          {/* Sheets cells with proper grid lines */}
          <ResizablePanel defaultSize={75} minSize={30}>
            <div className="h-full overflow-auto">
              {/* Fixed corner */}
              <div className="sticky top-0 left-0 z-20">
                <div className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex-shrink-0"></div>
              </div>
              
              {/* Column headers */}
              <div className="sticky top-0 z-10 flex">
                <div className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex-shrink-0"></div>
                <div className="flex">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <div 
                      key={`header-${i}`} 
                      className="w-24 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex items-center justify-center text-xs text-gray-600 flex-shrink-0"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Row headers and cells */}
              <div className="flex">
                {/* Row headers */}
                <div className="sticky left-0 z-10">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div 
                      key={`row-header-${i}`} 
                      className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex items-center justify-center text-xs text-gray-600"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                {/* Cells */}
                <div>
                  {Array.from({ length: 100 }).map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex">
                      {Array.from({ length: 26 }).map((_, colIndex) => (
                        <div 
                          key={`cell-${rowIndex}-${colIndex}`} 
                          className="w-24 h-6 border-r border-b border-gray-300 hover:bg-blue-50 text-xs"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />

          {/* Forecasting add-on sidebar with close functionality */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full bg-white shadow-lg border-l border-gray-200 flex flex-col overflow-hidden">
              <div className="p-3 bg-[#f1f3f4] border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-2 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">FeatureBox AI</span>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                  onClick={handleCloseSidebar}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1 overflow-hidden">
          {/* Sheets cells with proper grid lines when sidebar is closed */}
          <div className="h-full relative bg-white border-r border-gray-200 overflow-auto">
            {/* Fixed corner */}
            <div className="sticky top-0 left-0 z-20">
              <div className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex-shrink-0"></div>
            </div>
            
            {/* Column headers */}
            <div className="sticky top-0 z-10 flex">
              <div className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex-shrink-0"></div>
              <div className="flex">
                {Array.from({ length: 26 }).map((_, i) => (
                  <div 
                    key={`header-${i}`} 
                    className="w-24 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex items-center justify-center text-xs text-gray-600 flex-shrink-0"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row headers and cells */}
            <div className="flex">
              {/* Row headers */}
              <div className="sticky left-0 z-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div 
                    key={`row-header-${i}`} 
                    className="w-10 h-6 bg-[#f8f9fa] border-r border-b border-gray-300 flex items-center justify-center text-xs text-gray-600"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {/* Cells */}
              <div>
                {Array.from({ length: 100 }).map((_, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex">
                    {Array.from({ length: 26 }).map((_, colIndex) => (
                      <div 
                        key={`cell-${rowIndex}-${colIndex}`} 
                        className="w-24 h-6 border-r border-b border-gray-300 hover:bg-blue-50 text-xs"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSheetsLayout;
