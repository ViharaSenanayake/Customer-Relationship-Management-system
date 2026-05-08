import React, { useState, useEffect } from 'react';
import { Lead } from '../../api/leads.api';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils/constants';

interface LeadFormProps {
  initialData?: Partial<Lead>;
  onSubmit: (data: Partial<Lead>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LeadForm = ({ initialData, onSubmit, onCancel, isLoading }: LeadFormProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New',
    dealValue: 0,
    assignedTo: 'Admin User',
  });

  useEffect(() => {
    if (initialData) setForm((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'dealValue' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Company" name="company" value={form.company} onChange={handleChange} />
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Source</label>
          <select name="source" value={form.source} onChange={handleChange}
            className="block w-full rounded-lg border-0 bg-white/5 py-2.5 px-4 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 sm:text-sm transition-all">
            {LEAD_SOURCES.map((s) => <option key={s} value={s} className="bg-gray-900 text-[#ffffff]">{s}</option>)}
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="block w-full rounded-lg border-0 bg-white/5 py-2.5 px-4 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 sm:text-sm transition-all">
            {LEAD_STATUSES.map((s) => <option key={s} value={s} className="bg-gray-900 text-[#ffffff]">{s}</option>)}
          </select>
        </div>
        <Input label="Deal Value ($)" name="dealValue" type="number" value={String(form.dealValue)} onChange={handleChange} />
        <Input label="Assigned To" name="assignedTo" value={form.assignedTo} onChange={handleChange} />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : initialData?.id ? 'Update Lead' : 'Create Lead'}</Button>
      </div>
    </form>
  );
};
