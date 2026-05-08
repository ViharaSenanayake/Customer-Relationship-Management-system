import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const StatCard = ({ name, value, icon: Icon, color, bg }: StatCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl glass p-6 card-hover">
      <dt>
        <div className={`absolute rounded-lg p-3 ${bg}`}>
          <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-400">{name}</p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
      </dd>
    </div>
  );
};
