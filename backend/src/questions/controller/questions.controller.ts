import {
  createQuestionInRepository,
  deleteQuestionInRepository,
  updateQuestionInRepository,
  getAllQuestionsFromRepository,
  getQuestionFromRepositoryById,
} from './../repository/questions.repository';
import { Request, Response } from 'express';
import { HTTP } from '../../constants';
import { getPersonalityBasedOnTraits } from '../service/questions.service';

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const response = await getAllQuestionsFromRepository();
    return res.status(HTTP.OK).send(response);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const response = await getQuestionFromRepositoryById(req.params.id);
    return res.status(HTTP.OK).send(response);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
export const getPersonalityTraits = async (req: Request, res: Response) => {
  try {
    const allQuestions = await getAllQuestionsFromRepository();
    const answers = req.body.data;
    const traitPercentage: { name: string; percent: string }[] = getPersonalityBasedOnTraits(
      allQuestions,
      answers
    );
    return res.status(HTTP.OK).send(traitPercentage);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = {
      text: req.body.text,
      options: req.body.options.map(option => JSON.stringify(option))
    }

    const response = await createQuestionInRepository(question);
    return res.status(HTTP.RESOURCE_CREATED).send(response);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const response = await updateQuestionInRepository(req.params.id, req.body);
    return res.status(HTTP.OK).send(response);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const response = await deleteQuestionInRepository(req.params.id);
    return res.status(HTTP.OK).send(response);
  } catch (err) {
    console.log('err', err);
    return res.status(HTTP.BAD_REQUEST);
  }
};
