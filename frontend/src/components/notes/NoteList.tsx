import { Note } from '../../api/notes.api';
import { formatDateTime } from '../../utils/formatters';
import { MessageSquare } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  loading: boolean;
}

export const NoteList = ({ notes, loading }: NoteListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-10 w-10 text-gray-600 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No notes yet. Add the first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="rounded-lg bg-white/5 border border-white/10 p-4 transition-all hover:border-violet-500/30">
          <p className="text-sm text-gray-200 whitespace-pre-wrap">{note.content}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-400">{note.createdBy}</span>
            <span>•</span>
            <span>{formatDateTime(note.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
