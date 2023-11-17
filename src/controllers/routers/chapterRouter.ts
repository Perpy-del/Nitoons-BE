import express from 'express'
import { addChapterValidator, updateChapterValidator, chapterValidator } from '../middlewares/validators/chapterValidator'
import ScriptChapters from '../../lib/Scripts/ChapterController'
import { authMiddleware } from '../middlewares/jwtHandler'

export const router = express.Router();

router.post('/create-chapter', authMiddleware, addChapterValidator, ScriptChapters.addChapter);

router.put('/update-chapter/:script_id', authMiddleware, updateChapterValidator, ScriptChapters.updateChapter);

router.delete('/delete-chapter/:script_id', authMiddleware, chapterValidator, ScriptChapters.deleteChapter);

router.get('/fetch-chapter/:script_id', authMiddleware, chapterValidator, ScriptChapters.getChapterById);

router.get('/all-chapters/:script_id', authMiddleware, chapterValidator, ScriptChapters.getAllChapters);