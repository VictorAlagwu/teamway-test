import client from '../../database';
import { questionSchema } from '../model/question';

export const QuestionRepository = client.fetchRepository(questionSchema);

(async () => {
  await QuestionRepository.createIndex();
})();

export const getAllQuestionsFromRepository = async () => {
  try {
    const questions = QuestionRepository.search().return.all();
    return questions;
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionFromRepositoryUsingText = async (text: string) => {
  try {
    const questions = QuestionRepository.search().where('text').equals(text).return.first();
    return questions;
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionFromRepositoryById = async (entityId: string) => {
  try {
    const question = await QuestionRepository.fetch(entityId);
    return question;
  } catch (err) {
    console.log(err);
  }
};

export const createQuestionInRepository = async (questionModel: {
  text: string;
  options: string[];
}) => {
  try {
    const question = await QuestionRepository.createAndSave(questionModel);
    return question;
  } catch (err) {
    console.log(err);
  }
};
export const updateQuestionInRepository = async (id: string, questionModel: any) => {
  try {
    const fetchQuestion = await QuestionRepository.fetch(id);

    fetchQuestion.text = questionModel.text ?? fetchQuestion.text;
    fetchQuestion.options = questionModel.options ?? fetchQuestion.options;

    const question = await QuestionRepository.save(fetchQuestion);
    return question;
  } catch (err) {
    console.log(err);
  }
};
export const deleteQuestionInRepository = async (id: string) => {
  try {
    await QuestionRepository.remove(id);
    return { entityId: id };
  } catch (err) {
    console.log(err);
  }
};
