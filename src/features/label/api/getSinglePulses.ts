import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SinglePulse } from '../types';

import { api } from '@/lib/axios';

export async function getSinglePulses(
  pageNumber: number,
  pageSize: number
): Promise<SinglePulse[]> {
  try {
    const response = await api.get<SinglePulse[]>(
      `/candle/sp?skip=${pageNumber * pageSize}&limit=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulses = (pageNumber: number = 0, pageSize: number = 100) =>
  useQuery<SinglePulse[]>({
    queryKey: ['sp', pageNumber, pageSize],
    queryFn: () => getSinglePulses(pageNumber, pageSize),
    placeholderData: keepPreviousData
  });
