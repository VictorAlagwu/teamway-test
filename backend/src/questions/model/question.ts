import { Entity, Schema } from 'redis-om';

interface Question {
  text: string;
  options: string[];
}

class Question extends Entity {}

export const questionSchema = new Schema(
  Question,
  {
    text: { type: 'string' },
    options: { type: 'string[]' },
  },
  {
    dataStructure: 'JSON',
  }
);

