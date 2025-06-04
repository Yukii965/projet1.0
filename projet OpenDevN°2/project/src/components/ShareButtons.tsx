import React from 'react';
import { Twitter, Clipboard, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/quoteUtils';

interface ShareButtonsProps {
  quote: string;
  author: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ quote, author }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    await copyToClipboard(`"${quote}" - ${author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleTweet = () => {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };
  
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={handleCopy}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        title="Copy to clipboard"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <Clipboard size={18} className="text-gray-600" />}
      </button>
      
      <button
        onClick={handleTweet}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
        title="Share on Twitter"
      >
        <Twitter size={18} className="text-blue-500" />
      </button>
    </div>
  );
};

export default ShareButtons;