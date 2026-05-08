export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'] as const;
export const LEAD_SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event'] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Contacted: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Qualified: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Proposal Sent': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  Won: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Lost: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

export const SOURCE_COLORS: Record<LeadSource, { bg: string; text: string; border: string }> = {
  Website: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  LinkedIn: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  Referral: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  'Cold Email': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  Event: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
};
