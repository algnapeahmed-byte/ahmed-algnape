
import React, { useState } from 'react';

interface BrowserProps {
  onGoBack: () => void;
}

const Browser: React.FC<BrowserProps> = ({ onGoBack }) => {
  const [url, setUrl] = useState<string>('https://www.google.com/webhp?igu=1');
  const [iframeSrc, setIframeSrc] = useState<string>('https://www.google.com/webhp?igu=1');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = `https://${url}`;
    }
    setIframeSrc(finalUrl);
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col">
      <header className="bg-gray-900 p-3 flex items-center space-x-4 shadow-lg z-10">
        <button
          onClick={onGoBack}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          ←
        </button>
        <form onSubmit={handleNavigate} className="flex-grow flex items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="https://example.com"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-200"
          >
            Go
          </button>
        </form>
      </header>
      <main className="flex-grow">
        <iframe
          src={iframeSrc}
          className="w-full h-full border-0"
          title="Secret Browser"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
        ></iframe>
      </main>
    </div>
  );
};

export default Browser;
