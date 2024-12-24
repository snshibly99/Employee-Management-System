import express from 'express';
import { addNote, getNote, getNotesByEmployeeId, getAllNotes, updateNote } from '../controllers/noteController.js';
import authMiddleware from '../middleware/authMiddlware.js'

const router = express.Router();

router.post('/', authMiddleware, addNote);
router.get('/:id',authMiddleware, getNote);
router.get('/employee/:userId',authMiddleware, getNotesByEmployeeId);
router.get('/',authMiddleware, getAllNotes);
router.put('/:id',authMiddleware, updateNote);

export default router