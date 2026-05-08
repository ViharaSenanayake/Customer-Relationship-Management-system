import { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadForm } from '../components/leads/LeadForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { Plus } from 'lucide-react';

export const LeadsPage = () => {
  const { leads, loading, filters, setFilters, createLead, updateLeadStatus } = useLeads();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setFormLoading(true);
    try {
      await createLead(data);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create lead', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Leads</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your sales pipeline and track prospects.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" /> Add Lead
        </Button>
      </div>

      <LeadFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <LeadTable leads={leads} onStatusChange={updateLeadStatus} />
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="New Lead">
        <LeadForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} isLoading={formLoading} />
      </Modal>
    </div>
  );
};
