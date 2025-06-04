import { Quote } from '../types';
import { quotes } from '../data/quotes';

let previousIndex: number | null = null;

export const getRandomQuote = (): Quote => {
  if (quotes.length === 0) {
    return {
      text: "No quotes available",
      author: "Unknown"
    };
  }
  
  if (quotes.length === 1) {
    return quotes[0];
  }
  
  let randomIndex: number;
  
  // Ensure we don't get the same quote twice in a row
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === previousIndex && quotes.length > 1);
  
  previousIndex = randomIndex;
  return quotes[randomIndex];
};

export const getCategories = (): string[] => {
  const categories = new Set<string>();
  
  quotes.forEach(quote => {
    if (quote.category) {
      categories.add(quote.category);
    }
  });
  
  return Array.from(categories).sort();
};

export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};