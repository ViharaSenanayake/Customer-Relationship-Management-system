import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { LeadSource, LeadStatus } from '../models/types';
import { prisma } from '../prisma/db/client';
import { serializeLead } from '../prisma/db/serializers';
import type { Prisma } from '@prisma/client';

function leadParamId(req: Request): string {
  const raw = req.params.id;
  return Array.isArray(raw) ? String(raw[0]) : String(raw);
}

export const getLeads = (req: Request, res: Response): void => {
  (async () => {
    const { status, source, assignedTo, search } = req.query;

    const where: Prisma.LeadWhereInput = {};
    if (status && typeof status === 'string') where.status = status;
    if (source && typeof source === 'string') where.source = source;
    if (assignedTo && typeof assignedTo === 'string') where.assignedTo = assignedTo;
    if (search && typeof search === 'string') {
      const q = search;
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
      ];
    }

    const rows = await prisma.lead.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    res.json(rows.map(serializeLead));
  })().catch((err) => {
    console.error('Failed to fetch leads', err);
    res.status(500).json({ message: 'Failed to fetch leads' });
  });
};

export const getLeadById = (req: Request, res: Response): void => {
  (async () => {
    const lead = await prisma.lead.findUnique({ where: { id: leadParamId(req) } });
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }
    res.json(serializeLead(lead));
  })().catch((err) => {
    console.error('Failed to fetch lead', err);
    res.status(500).json({ message: 'Failed to fetch lead' });
  });
};

export const createLead = (req: Request, res: Response): void => {
  const { name, email, phone, company, source, status, dealValue, assignedTo } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: 'Name and email are required' });
    return;
  }

  (async () => {
    const id = uuidv4();
    const now = new Date();
    const stored = await prisma.lead.create({
      data: {
        id,
        name,
        email,
        phone: phone || '',
        company: company || '',
        source: (source as LeadSource) || 'Website',
        status: (status as LeadStatus) || 'New',
        dealValue: dealValue ? Number(dealValue) : 0,
        assignedTo: assignedTo || 'Admin User',
        createdAt: now,
        updatedAt: now,
      },
    });
    res.status(201).json(serializeLead(stored));
  })().catch((err) => {
    console.error('Failed to create lead', err);
    res.status(500).json({ message: 'Failed to create lead' });
  });
};

export const updateLead = (req: Request, res: Response): void => {
  (async () => {
    const id = leadParamId(req);
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }

    const dto = serializeLead(existing);
    const merged = { ...dto, ...req.body, id: dto.id };

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        name: String(merged.name),
        email: String(merged.email),
        phone: merged.phone != null ? String(merged.phone) : '',
        company: merged.company != null ? String(merged.company) : '',
        source: String(merged.source),
        status: String(merged.status),
        assignedTo: String(merged.assignedTo ?? ''),
        dealValue: Number(merged.dealValue) || 0,
      },
    });

    res.json(serializeLead(updated));
  })().catch((err) => {
    console.error('Failed to update lead', err);
    res.status(500).json({ message: 'Failed to update lead' });
  });
};

export const updateLeadStatus = (req: Request, res: Response): void => {
  (async () => {
    const id = leadParamId(req);
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: {
          status: String(status),
        },
      });
      res.json(serializeLead(updated));
    } catch {
      res.status(404).json({ message: 'Lead not found' });
    }
  })().catch((err) => {
    console.error('Failed to update status', err);
    res.status(500).json({ message: 'Failed to update status' });
  });
};

export const deleteLead = (req: Request, res: Response): void => {
  (async () => {
    try {
      await prisma.lead.delete({
        where: { id: leadParamId(req) },
      });
      res.json({ message: 'Lead deleted successfully' });
    } catch {
      res.status(404).json({ message: 'Lead not found' });
    }
  })().catch((err) => {
    console.error('Failed to delete lead', err);
    res.status(500).json({ message: 'Failed to delete lead' });
  });
};
