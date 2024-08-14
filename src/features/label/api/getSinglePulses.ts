import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SinglePulse } from '../types';

import { api } from '@/lib/axios';

export async function getSinglePulses(
  pageNumber: number,
  pageSize: number,
  latest: boolean,
  observationIds: number[]
): Promise<SinglePulse[]> {
  const params = {
    skip: String(pageNumber * pageSize),
    limit: String(pageSize)
  };
  const searchParams = new URLSearchParams(params);

  // If fetching latest observation, ignore any observationIds in state
  if (latest) {
    searchParams.append('latest', String(latest));
  } else {
    observationIds.forEach((id: number) => searchParams.append('observation_id', String(id)));
  }

  try {
    const response = await api.get<SinglePulse[]>(`/candle/sp/?${searchParams.toString()}`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulses = (
  pageNumber: number = 0,
  pageSize: number = 100,
  latest: boolean = true,
  observationIds: number[] = []
) =>
  useQuery<SinglePulse[]>({
    queryKey: ['sp', pageNumber, pageSize, latest, observationIds],
    queryFn: () => getSinglePulses(pageNumber, pageSize, latest, observationIds),
    placeholderData: keepPreviousData
  });
