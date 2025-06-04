import React from 'react';
import { Quote } from '../types';
import ShareButtons from './ShareButtons';

interface QuoteCardProps {
  quote: Quote;
  isVisible: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isVisible }) => {
  return (
    <div 
      className={`max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 ease-in-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-8'
      }`}
    >
      <div className="p-8 md:p-10">
        <div className="uppercase tracking-wide text-sm text-amber-500 font-semibold">
          {quote.category || 'Quote'}
        </div>
        
        <div className="relative mt-4">
          <div className="absolute -left-4 -top-4 text-6xl text-amber-200 font-serif">"</div>
          <blockquote className="relative z-10 text-slate-800 text-xl md:text-2xl font-serif leading-relaxed italic px-4 pt-2">
            {quote.text}
          </blockquote>
          <div className="absolute -bottom-8 -right-2 text-6xl text-amber-200 font-serif">"</div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <p className="text-right text-slate-600">
            <span className="block text-sm">— </span>
            <span className="font-medium">{quote.author}</span>
          </p>
        </div>
        
        <ShareButtons quote={quote.text} author={quote.author} />
      </div>
    </div>
  );
};

export default QuoteCard;