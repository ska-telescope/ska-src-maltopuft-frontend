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
    latest,
    skip: pageNumber * pageSize,
    limit: pageSize
  };
  const searchParams = new URLSearchParams(JSON.stringify(params));
  observationIds.forEach((id: number) => searchParams.append('observation_id', `${id}`));

  try {
    const response = await api.get<SinglePulse[]>(`/candle/sp?${searchParams.toString()}`);
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
