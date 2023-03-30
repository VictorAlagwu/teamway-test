export const getPersonalityBasedOnTraits = (questions: any, answers: any) => {
  const answersQuestionIds = answers.map(
    (answer: { questionId: string; optionId: string }) => answer.questionId
  );
  const currentQuestions = questions.filter(
    (question: { entityId: string; text: string; options: string[] }) =>
      answersQuestionIds.includes(question.entityId)
  );

  console.log('answers', answers);
  const traits: object = {};
  const percentageOfTraits: { name: string; percent: string }[] = [];

  currentQuestions.forEach((question) => {
    const answer = answers.find((answer) => answer.questionId === question.entityId);
    const selectedOption = question.options.find(
      (option) => JSON.parse(option).id === answer.optionId
    );
    const personality = selectedOption ? JSON.parse(selectedOption).personality : undefined;
    traits[personality] = traits[personality] ? +1 : 1;
  });
  const sumOfTraits: number = Object.values(traits).reduce((a, b) => a + b, 0);
  Object.keys(traits).forEach((key) => {
    const percentageOfTrait = (traits[key] / sumOfTraits) * 100;
    percentageOfTraits.push({ name: key, percent: percentageOfTrait.toFixed(2) });
  });
  return percentageOfTraits;
};
