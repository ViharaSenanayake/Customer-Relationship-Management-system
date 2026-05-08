import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Send } from 'lucide-react';

interface NoteFormProps {
  onSubmit: (content: string) => Promise<unknown>;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (err) {
      console.error('Failed to add note', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a note about this lead..."
        rows={2}
        className="flex-1 rounded-lg border-0 bg-white/5 py-2.5 px-4 text-sm text-white placeholder-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 resize-none transition-all"
      />
      <Button type="submit" disabled={isLoading || !content.trim()} size="sm">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
