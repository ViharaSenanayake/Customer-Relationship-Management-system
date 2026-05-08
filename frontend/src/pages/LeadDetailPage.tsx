import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leadsApi, Lead } from '../api/leads.api';
import { useNotes } from '../hooks/useNotes';
import { LeadForm } from '../components/leads/LeadForm';
import { NoteList } from '../components/notes/NoteList';
import { NoteForm } from '../components/notes/NoteForm';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { STATUS_COLORS, SOURCE_COLORS, LeadStatus, LeadSource } from '../utils/constants';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ArrowLeft, Edit3, Trash2, Building2, Mail, Phone, Calendar, DollarSign, User } from 'lucide-react';

export const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { notes, loading: notesLoading, addNote } = useNotes(id || '');

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return;
      try {
        const { data } = await leadsApi.getById(id);
        setLead(data);
      } catch (err) {
        console.error('Failed to fetch lead', err);
        navigate('/leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id, navigate]);

  const handleUpdate = async (data: Partial<Lead>) => {
    if (!id) return;
    setEditLoading(true);
    try {
      const { data: updated } = await leadsApi.update(id, data);
      setLead(updated);
      setShowEdit(false);
    } catch (err) {
      console.error('Failed to update lead', err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await leadsApi.delete(id);
      navigate('/leads');
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!lead) return <p className="text-center text-gray-500 py-12">Lead not found.</p>;

  const infoItems = [
    { icon: Mail, label: 'Email', value: lead.email },
    { icon: Phone, label: 'Phone', value: lead.phone || 'N/A' },
    { icon: Building2, label: 'Company', value: lead.company || 'N/A' },
    { icon: User, label: 'Assigned To', value: lead.assignedTo },
    { icon: DollarSign, label: 'Deal Value', value: formatCurrency(lead.dealValue) },
    { icon: Calendar, label: 'Created Date', value: formatDate(lead.createdAt) },
    { icon: Calendar, label: 'Last Updated Date', value: formatDate(lead.updatedAt) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/leads')} className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{lead.name}</h2>
          <div className="flex gap-2 mt-1">
            <Badge text={lead.status} colors={STATUS_COLORS[lead.status as LeadStatus] || STATUS_COLORS.New} />
            <Badge text={lead.source} colors={SOURCE_COLORS[lead.source as LeadSource] || SOURCE_COLORS.Website} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>
            <Edit3 className="h-4 w-4" /> Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Lead Details</h3>
          <div className="space-y-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm text-gray-200">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Notes & Activity</h3>
          <NoteForm onSubmit={addNote} />
          <div className="mt-4">
            <NoteList notes={notes} loading={notesLoading} />
          </div>
        </div>
      </div>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Lead">
        <LeadForm initialData={lead} onSubmit={handleUpdate} onCancel={() => setShowEdit(false)} isLoading={editLoading} />
      </Modal>
    </div>
  );
};
