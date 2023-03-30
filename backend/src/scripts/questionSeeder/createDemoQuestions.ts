#!/usr/bin/env npx ts-node

import { questionsData } from './data';
import {
  createQuestionInRepository,
  QuestionRepository,
} from '../../questions/repository/questions.repository';


(async () => {
  const questions = questionsData;
  questions.forEach(async (question) => {
    try {
      const exist = await QuestionRepository.search()
        .where('text')
        .equals(question.text)
        .return.first();
      if (exist) {
        await QuestionRepository.remove(exist.entityId);
      }
      const newQuestion = {
        ...question,
        options: question.options.map((option) => JSON.stringify(option)),
      };

      await createQuestionInRepository(newQuestion);
      console.log('Successfully created question');
      return;
    } catch (e) {
      console.log('error', e);
    }
  });
  return;
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
