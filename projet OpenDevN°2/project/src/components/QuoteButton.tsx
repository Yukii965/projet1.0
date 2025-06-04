import React from 'react';
import { RefreshCw } from 'lucide-react';

interface QuoteButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const QuoteButton: React.FC<QuoteButtonProps> = ({ onClick, isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 shadow-md"
      disabled={isLoading}
    >
      <RefreshCw size={20} className={`${isLoading ? 'animate-spin' : ''}`} />
      <span>New Quote</span>
    </button>
  );
};

export default QuoteButton;