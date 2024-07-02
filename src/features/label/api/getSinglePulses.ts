import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SinglePulse } from '../types';

import { api } from '@/lib/axios';

export async function getSinglePulses(page: number): Promise<SinglePulse[]> {
  const limit: number = 100;
  const skip: number = page * limit;
  try {
    const response = await api.get<SinglePulse[]>(`/candle/sp?skip=${skip}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulses = (page: number = 0) =>
  useQuery<SinglePulse[]>({
    queryKey: ['sp', page],
    queryFn: () => getSinglePulses(page),
    placeholderData: keepPreviousData
  });
