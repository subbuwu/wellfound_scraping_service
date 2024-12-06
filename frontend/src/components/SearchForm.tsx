import React, { useState, KeyboardEvent } from 'react';
import { Search, Loader2, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { SearchFormProps } from '../types';

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(keywords)
    if(keywords.length == 0){
      toast.error("Add one or more keyword to search")
      return;
    }
    if (keywords.length > 0) {
      onSearch(keywords);
    }
  };

  const addKeyword = () => {
    const trimmedInput = currentInput.trim();
    if (trimmedInput && !keywords.includes(trimmedInput)) {
      setKeywords([...keywords, trimmedInput]);
      setCurrentInput('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.map(keyword => (
              <Badge 
                key={keyword} 
                variant="secondary" 
                className="flex text-sm items-center gap-1 border-none rounded-xl bg-green-300 hover:bg-green-300 duration-0 "
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-1 hover:text-destructive"
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter keyword (e.g., Blockchain, Laravel)"
            className="flex-1 outline-none focus:border-blue-400"
            disabled={loading}
          />
          <Button
            type="button"
            variant="default"
            onClick={addKeyword}
            className={` ${loading || !currentInput.trim() ? "cursor-not-allowed" : "cursor-pointer"} bg-purple-500 hover:bg-purple-500 `}
            disabled={loading}
            size="icon"
          >
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          type="submit"
          className='rounded-3xl bg-black hover:opacity-90 transition-all duration-150'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;