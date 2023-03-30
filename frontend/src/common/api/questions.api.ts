import { axiosClient } from 'api';
import asyncHandler from 'common/asyncHandler';

export const getQuestions = asyncHandler(
    async () => await axiosClient.get(`/api/v1/questions`)
);

export const getPersonalityTraits = asyncHandler(
    async (data: {questionId: string, optionId: string}[]) => await axiosClient.post(`/api/v1/questions/personality_traits`, data)
);
