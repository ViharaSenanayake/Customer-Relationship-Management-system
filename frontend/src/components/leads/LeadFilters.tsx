import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils/constants';

interface LeadFiltersProps {
  filters: { status?: string; source?: string; assignedTo?: string; search?: string };
  onChange: (filters: { status?: string; source?: string; assignedTo?: string; search?: string }) => void;
}

export const LeadFilters = ({ filters, onChange }: LeadFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Search leads..."
        value={filters.search || ''}
        onChange={(e) => onChange({ ...filters, search: e.target.value || undefined })}
        className="rounded-lg border-0 bg-white/5 py-2 px-4 text-sm text-white placeholder-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 transition-all w-full sm:w-64"
      />
      <select
        value={filters.status || ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}
        className="rounded-lg border-0 bg-white/5 py-2 px-4 text-sm text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 transition-all"
      >
        <option value="" className="bg-gray-900 text-[#ffffff]">All Statuses</option>
        {LEAD_STATUSES.map((s) => <option key={s} value={s} className="bg-gray-900 text-[#ffffff]">{s}</option>)}
      </select>
      <select
        value={filters.source || ''}
        onChange={(e) => onChange({ ...filters, source: e.target.value || undefined })}
        className="rounded-lg border-0 bg-white/5 py-2 px-4 text-sm text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 transition-all"
      >
        <option value="" className="bg-gray-900 text-[#ffffff]">All Sources</option>
        {LEAD_SOURCES.map((s) => <option key={s} value={s} className="bg-gray-900 text-[#ffffff]">{s}</option>)}
      </select>
      <input
        type="text"
        placeholder="Assigned salesperson..."
        value={filters.assignedTo || ''}
        onChange={(e) => onChange({ ...filters, assignedTo: e.target.value || undefined })}
        className="rounded-lg border-0 bg-white/5 py-2 px-4 text-sm text-white placeholder-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-violet-500 transition-all w-full sm:w-64"
      />
    </div>
  );
};
