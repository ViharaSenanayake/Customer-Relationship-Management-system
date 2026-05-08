import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../prisma/db/client';
import { serializeNote } from '../prisma/db/serializers';

export const getNotesByLead = (req: Request, res: Response): void => {
  (async () => {
    const leadId = String((req.params as { id?: string }).id ?? '');
    const rows = await prisma.note.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(rows.map(serializeNote));
  })().catch((err) => {
    console.error('Failed to fetch notes', err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  });
};

export const createNote = (req: Request, res: Response): void => {
  const { content } = req.body;
  const authUser = (req as any).user;

  if (!content || !content.trim()) {
    res.status(400).json({ message: 'Note content is required' });
    return;
  }

  (async () => {
    const leadId = String((req.params as { id?: string }).id ?? '');
    const created = await prisma.note.create({
      data: {
        id: uuidv4(),
        leadId,
        content: content.trim(),
        createdBy: authUser?.name || 'Admin User',
      },
    });
    res.status(201).json(serializeNote(created));
  })().catch((err) => {
    console.error('Failed to create note', err);
    res.status(500).json({ message: 'Failed to create note' });
  });
};
