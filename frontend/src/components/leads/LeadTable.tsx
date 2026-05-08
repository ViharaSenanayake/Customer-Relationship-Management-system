import { Lead } from '../../api/leads.api';
import { Badge } from '../common/Badge';
import { SOURCE_COLORS, LeadSource } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { StatusDropdown } from './StatusDropdown';

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (leadId: string, status: string) => void;
}

export const LeadTable = ({ leads, onStatusChange }: LeadTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-xl glass border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deal Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => navigate(`/leads/${lead.id}`)}
              className="hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{lead.name}</span>
                  <span className="text-xs text-gray-500">{lead.email}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{lead.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge text={lead.source} colors={SOURCE_COLORS[lead.source as LeadSource] || SOURCE_COLORS.Website} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div onClick={(e) => e.stopPropagation()}>
                  <StatusDropdown value={lead.status} onChange={(status) => onStatusChange(lead.id, status)} />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-400">
                {formatCurrency(lead.dealValue)}
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">No leads found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
