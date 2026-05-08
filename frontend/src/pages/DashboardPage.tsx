import { useState, useEffect } from 'react';
import { axiosClient } from '../api/axiosClient';
import { Users, DollarSign, Target, XCircle, Sparkles, Trophy } from 'lucide-react';

const STATUS_BAR_CLASS: Record<string, string> = {
  New: 'from-violet-500 to-violet-400',
  Contacted: 'from-cyan-500 to-cyan-400',
  Qualified: 'from-emerald-500 to-emerald-400',
  'Proposal Sent': 'from-amber-500 to-yellow-400',
  Won: 'from-fuchsia-500 to-pink-400',
  Lost: 'from-rose-500 to-red-400',
};

const STATUS_PILL_CLASS: Record<string, string> = {
  New: 'bg-violet-100 text-violet-800 border-violet-200',
  Contacted: 'bg-cyan-100 text-cyan-900 border-cyan-200',
  Qualified: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  'Proposal Sent': 'bg-amber-100 text-amber-900 border-amber-200',
  Won: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200',
  Lost: 'bg-rose-100 text-rose-900 border-rose-200',
};

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
  'from-emerald-500 to-green-600',
];

export const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosClient.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      accent: 'violet' as const,
    },
    {
      name: 'New Leads',
      value: stats?.byStatus?.New || 0,
      icon: Sparkles,
      accent: 'cyan' as const,
    },
    {
      name: 'Qualified Leads',
      value: stats?.byStatus?.Qualified || 0,
      icon: Target,
      accent: 'emerald' as const,
    },
    {
      name: 'Won Deals',
      value: stats?.wonLeads || 0,
      icon: Trophy,
      accent: 'amber' as const,
    },
    {
      name: 'Lost Deals',
      value: stats?.byStatus?.Lost || 0,
      icon: XCircle,
      accent: 'rose' as const,
    },
    {
      name: 'Total Estimated Deal Value',
      value: `$${(stats?.totalDealValue || 0).toLocaleString()}`,
      icon: DollarSign,
      accent: 'orange' as const,
    },
    {
      name: 'Total Value of Won Deals',
      value: `$${(stats?.wonValue || 0).toLocaleString()}`,
      icon: DollarSign,
      accent: 'fuchsia' as const,
    },
  ];

  const accentStyles: Record<
    (typeof statCards)[number]['accent'],
    { border: string; iconWrap: string; iconColor: string }
  > = {
    violet: {
      border: 'border-t-violet-500',
      iconWrap: 'bg-violet-500/15',
      iconColor: 'text-violet-400',
    },
    cyan: {
      border: 'border-t-cyan-400',
      iconWrap: 'bg-cyan-500/15',
      iconColor: 'text-cyan-400',
    },
    emerald: {
      border: 'border-t-emerald-500',
      iconWrap: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
    },
    amber: {
      border: 'border-t-amber-400',
      iconWrap: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
    },
    rose: {
      border: 'border-t-rose-500',
      iconWrap: 'bg-rose-500/15',
      iconColor: 'text-rose-400',
    },
    orange: {
      border: 'border-t-orange-400',
      iconWrap: 'bg-orange-500/15',
      iconColor: 'text-orange-400',
    },
    fuchsia: {
      border: 'border-t-fuchsia-500',
      iconWrap: 'bg-fuchsia-500/15',
      iconColor: 'text-fuchsia-400',
    },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 crm-dashboard">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-white">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-400">
          Here's what's happening with your sales pipeline today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const a = accentStyles[item.accent];
          return (
            <div
              key={item.name}
              data-accent={item.accent}
              className={`crm-stat-card dashboard-stat relative overflow-hidden rounded-2xl border border-white/10 border-t-4 ${a.border} glass p-6 card-hover shadow-lg shadow-black/5`}
            >
              <dt>
                <div className={`absolute rounded-xl p-3 ${a.iconWrap} stat-icon-well`}>
                  <item.icon className={`h-6 w-6 ${a.iconColor}`} aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-400 stat-label">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                <p className="stat-value text-2xl font-semibold text-white">{item.value}</p>
              </dd>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl border border-white/10 p-6 card-hover crm-chart-card shadow-lg shadow-black/5">
          <h3 className="text-lg font-medium text-white mb-4">Leads by Status</h3>
          <div className="space-y-4">
            {stats?.byStatus &&
              Object.entries(stats.byStatus).map(([status, count]: [string, any]) => {
                const bar = STATUS_BAR_CLASS[status] || 'from-violet-500 to-cyan-500';
                const pct = stats.totalLeads ? (count / stats.totalLeads) * 100 : 0;
                return (
                  <div key={status} className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-300 w-32 shrink-0">{status}</span>
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="status-bar-track w-full rounded-full h-2.5 mr-3 border overflow-hidden bg-white/5 border-white/10">
                        <div
                          className={`crm-status-bar-fill h-2.5 rounded-full bg-gradient-to-r ${bar} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="stat-value shrink-0 text-sm font-semibold text-white tabular-nums w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6 card-hover crm-recent-card shadow-lg shadow-black/5">
          <h3 className="text-lg font-medium text-white mb-4">Recent Leads</h3>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-white/10">
              {stats?.recentLeads?.map((lead: any, i: number) => {
                const initial = lead.name?.charAt(0)?.toUpperCase() || '?';
                const grad = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
                const pill = STATUS_PILL_CLASS[lead.status] || 'bg-slate-100 text-slate-800 border-slate-200';
                return (
                  <li
                    key={lead.id}
                    className="crm-recent-row py-4 flex items-center gap-3 group transition-colors hover:bg-white/5 -mx-4 px-4 rounded-xl cursor-pointer"
                  >
                    <div
                      className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-sm font-bold text-white shadow-md`}
                    >
                      {initial}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors truncate">
                        {lead.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">{lead.company}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-sm font-semibold text-emerald-400">
                        ${lead.dealValue?.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border leading-tight crm-status-pill ${pill}`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </li>
                );
              })}
              {(!stats?.recentLeads || stats.recentLeads.length === 0) && (
                <li className="py-4 text-center text-sm text-gray-500">No recent leads found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
