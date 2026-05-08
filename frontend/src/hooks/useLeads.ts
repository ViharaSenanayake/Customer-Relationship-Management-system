import { useState, useEffect, useCallback } from 'react';
import { leadsApi, Lead } from '../api/leads.api';

export const useLeads = (initialFilters?: { status?: string; source?: string; assignedTo?: string; search?: string }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilters || {});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await leadsApi.getAll(filters);
      setLeads(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const createLead = async (lead: Partial<Lead>) => {
    const { data } = await leadsApi.create(lead);
    setLeads((prev) => [data, ...prev]);
    return data;
  };

  const updateLead = async (id: string, lead: Partial<Lead>) => {
    const { data } = await leadsApi.update(id, lead);
    setLeads((prev) => prev.map((l) => (l.id === id ? data : l)));
    return data;
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const { data } = await leadsApi.updateStatus(id, status);
    setLeads((prev) => prev.map((l) => (l.id === id ? data : l)));
    return data;
  };

  const deleteLead = async (id: string) => {
    await leadsApi.delete(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return {
    leads,
    loading,
    error,
    filters,
    setFilters,
    fetchLeads,
    createLead,
    updateLead,
    updateLeadStatus,
    deleteLead,
  };
};
