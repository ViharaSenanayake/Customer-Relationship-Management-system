import type { Lead as PrismaLead, Note as PrismaNote } from '@prisma/client';
import type { Lead as LeadDTO, LeadSource, LeadStatus, Note as NoteDTO } from '../../models/types';

export function serializeLead(l: PrismaLead): LeadDTO {
  return {
    id: l.id,
    name: l.name,
    email: l.email,
    phone: l.phone,
    company: l.company,
    source: l.source as LeadSource,
    status: l.status as LeadStatus,
    dealValue: Number(l.dealValue),
    assignedTo: l.assignedTo,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  };
}

export function serializeNote(n: PrismaNote): NoteDTO {
  return {
    id: n.id,
    leadId: n.leadId,
    content: n.content,
    createdBy: n.createdBy,
    createdAt: n.createdAt.toISOString(),
  };
}
