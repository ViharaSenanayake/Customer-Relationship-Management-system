import { axiosClient } from './axiosClient';

export interface Note {
  id: string;
  leadId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export const notesApi = {
  getByLead: (leadId: string) => axiosClient.get<Note[]>(`/leads/${leadId}/notes`),
  create: (leadId: string, content: string) =>
    axiosClient.post<Note>(`/leads/${leadId}/notes`, { content }),
};
