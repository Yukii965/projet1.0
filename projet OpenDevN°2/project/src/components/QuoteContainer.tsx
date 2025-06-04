import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';
import QuoteButton from './QuoteButton';
import CategoryFilter from './CategoryFilter';
import { Quote } from '../types';
import { getRandomQuote } from '../utils/quoteUtils';
import { quotes } from '../data/quotes';

const QuoteContainer: React.FC = () => {
  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredQuotes = selectedCategory 
    ? quotes.filter(q => q.category === selectedCategory)
    : quotes;
  
  const getNewQuote = () => {
    setIsLoading(true);
    setIsVisible(false);
    
    setTimeout(() => {
      let newQuote: Quote;
      
      if (filteredQuotes.length === 0) {
        // If no quotes match the category, use any quote
        newQuote = getRandomQuote();
      } else {
        // Get a random quote from filtered quotes
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        newQuote = filteredQuotes[randomIndex];
      }
      
      setQuote(newQuote);
      setIsVisible(true);
      setIsLoading(false);
    }, 500);
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  useEffect(() => {
    // Get a new quote when category changes
    if (filteredQuotes.length > 0) {
      getNewQuote();
    }
  }, [selectedCategory]);
  
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">
        Wisdom Whispers
      </h1>
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />
      
      <QuoteCard quote={quote} isVisible={isVisible} />
      
      <div className="mt-8">
        <QuoteButton onClick={getNewQuote} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default QuoteContainer;