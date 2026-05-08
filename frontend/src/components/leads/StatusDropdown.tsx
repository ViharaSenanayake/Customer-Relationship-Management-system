import { LEAD_STATUSES, STATUS_COLORS, LeadStatus } from '../../utils/constants';

interface StatusDropdownProps {
  value: string;
  onChange: (status: string) => void;
}

export const StatusDropdown = ({ value, onChange }: StatusDropdownProps) => {
  const colors = STATUS_COLORS[value as LeadStatus] || STATUS_COLORS.New;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-full border px-3 py-1 text-xs font-medium cursor-pointer transition-all ${colors.bg} ${colors.text} ${colors.border} focus:ring-2 focus:ring-violet-500 focus:outline-none`}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s} className="bg-gray-900 text-[#ffffff]">{s}</option>
        ))}
      </select>
    </div>
  );
};
