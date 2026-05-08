import { Request, Response } from 'express';
import { prisma } from '../prisma/db/client';
import { serializeLead } from '../prisma/db/serializers';

export const getDashboardStats = (_req: Request, res: Response): void => {
  (async () => {
    const totalLeads = await prisma.lead.count();

    const totalSum = await prisma.lead.aggregate({
      _sum: { dealValue: true },
    });
    const totalDealValue = Number(totalSum._sum.dealValue ?? 0);

    const wonWhere = { status: 'Won' };
    const wonLeads = await prisma.lead.count({ where: wonWhere });
    const wonSum = await prisma.lead.aggregate({
      where: wonWhere,
      _sum: { dealValue: true },
    });
    const wonValue = Number(wonSum._sum.dealValue ?? 0);

    const byStatusRows = await prisma.lead.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const byStatus: Record<string, number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Proposal Sent': 0,
      Won: 0,
      Lost: 0,
    };
    for (const r of byStatusRows) {
      byStatus[r.status] = r._count._all;
    }

    const bySourceRows = await prisma.lead.groupBy({
      by: ['source'],
      _count: { _all: true },
    });
    const bySource: Record<string, number> = {};
    for (const r of bySourceRows) {
      bySource[r.source] = r._count._all;
    }

    const dealValueByStatusRows = await prisma.lead.groupBy({
      by: ['status'],
      _sum: { dealValue: true },
    });
    const dealValueByStatus = dealValueByStatusRows.map((r) => ({
      status: r.status,
      value: Number(r._sum.dealValue ?? 0),
    }));

    const recentLeadsRecords = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

    res.json({
      totalLeads,
      newLeads: byStatus.New || 0,
      qualifiedLeads: byStatus.Qualified || 0,
      lostLeads: byStatus.Lost || 0,
      totalDealValue,
      wonLeads,
      wonValue,
      conversionRate,
      byStatus,
      bySource,
      dealValueByStatus,
      recentLeads: recentLeadsRecords.map(serializeLead),
    });
  })().catch((err) => {
    console.error('Failed to fetch dashboard stats', err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  });
};
