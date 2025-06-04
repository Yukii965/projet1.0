import React from 'react';
import QuoteContainer from './components/QuoteContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12">
      <div className="w-full px-4">
        <QuoteContainer />
      </div>
    </div>
  );
}

export default App;