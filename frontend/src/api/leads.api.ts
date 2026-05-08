import { axiosClient } from './axiosClient';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  dealValue: number;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export const leadsApi = {
  getAll: (params?: { status?: string; source?: string; assignedTo?: string; search?: string }) =>
    axiosClient.get<Lead[]>('/leads', { params }),
  getById: (id: string) => axiosClient.get<Lead>(`/leads/${id}`),
  create: (lead: Partial<Lead>) => axiosClient.post<Lead>('/leads', lead),
  update: (id: string, lead: Partial<Lead>) => axiosClient.put<Lead>(`/leads/${id}`, lead),
  updateStatus: (id: string, status: string) => axiosClient.patch<Lead>(`/leads/${id}/status`, { status }),
  delete: (id: string) => axiosClient.delete(`/leads/${id}`),
};
