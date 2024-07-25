import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

export async function countSinglePulses(
  observationIds: number[],
  latest: boolean
): Promise<number> {
  const params = { latest: String(latest) };
  const searchParams = new URLSearchParams(JSON.stringify(params));
  observationIds.forEach((id: number) => searchParams.append('observation_id', `${id}`));

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
