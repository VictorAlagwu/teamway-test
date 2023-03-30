import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler';
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getPersonalityTraits,
  getQuestion,
  updateQuestion,
} from './controller/questions.controller';

const router: express.Router = express.Router();

router.get('/', asyncHandler(getAllQuestions));

router.get('/:id', asyncHandler(getQuestion));

router.post('/personality_traits', asyncHandler(getPersonalityTraits));
router.post('/', asyncHandler(createQuestion));

router.patch('/:id', asyncHandler(updateQuestion));

router.delete('/:id', asyncHandler(deleteQuestion));

export const questionsRouter = router;
