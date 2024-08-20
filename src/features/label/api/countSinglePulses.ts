import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

export async function countSinglePulses(
  observationIds: number[],
  latest: boolean
): Promise<number> {
  const searchParams = new URLSearchParams();

  // If fetching latest observation, ignore any observationIds in state
  if (latest) {
    searchParams.append('latest', String(latest));
  } else {
    observationIds.forEach((id: number) => searchParams.append('observation_id', String(id)));
  }

  try {
    const response = await api.get<number>(`/candle/sp/count/?${searchParams.toString()}`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulseCount = (observationIds: number[], latest: boolean = false) =>
  useQuery<number>({
    queryKey: ['sp', 'count', latest, observationIds],
    queryFn: () => countSinglePulses(observationIds, latest)
  });
