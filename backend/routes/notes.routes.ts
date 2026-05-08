/**
Defines Express routes for managing lead notes.
Allows adding and retrieving notes associated with specific leads.
**/
import { Router } from 'express';
import { getNotesByLead, createNote } from '../controllers/notes.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', getNotesByLead);
router.post('/', createNote);

export default router;
