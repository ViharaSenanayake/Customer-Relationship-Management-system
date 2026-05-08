import { useState, useEffect, useCallback } from 'react';
import { notesApi, Note } from '../api/notes.api';

export const useNotes = (leadId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await notesApi.getByLead(leadId);
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    if (leadId) fetchNotes();
  }, [leadId, fetchNotes]);

  const addNote = async (content: string) => {
    const { data } = await notesApi.create(leadId, content);
    setNotes((prev) => [data, ...prev]);
    return data;
  };

  return { notes, loading, fetchNotes, addNote };
};
