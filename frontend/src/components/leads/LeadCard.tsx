import { Lead } from '../../api/leads.api';
import { Badge } from '../common/Badge';
import { STATUS_COLORS, SOURCE_COLORS, LeadStatus, LeadSource } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/leads/${lead.id}`)}
      className="glass rounded-xl p-5 border border-white/10 card-hover cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-white truncate pr-2">{lead.name}</h3>
        <Badge text={lead.status} colors={STATUS_COLORS[lead.status as LeadStatus] || STATUS_COLORS.New} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Building2 className="h-3.5 w-3.5" />
          <span>{lead.company || 'No company'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{lead.email}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge text={lead.source} colors={SOURCE_COLORS[lead.source as LeadSource] || SOURCE_COLORS.Website} />
        <span className="text-sm font-semibold text-emerald-400">{formatCurrency(lead.dealValue)}</span>
      </div>
    </div>
  );
};
