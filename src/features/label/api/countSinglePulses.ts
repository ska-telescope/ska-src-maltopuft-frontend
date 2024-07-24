import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

export async function countSinglePulses(latest: boolean): Promise<number> {
  try {
    const response = await api.get<number>(`/candle/sp/count?/latest=${latest}`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulseCount = (latest: boolean = true) =>
  useQuery<number>({
    queryKey: ['sp', 'count', latest],
    queryFn: () => countSinglePulses(latest)
  });
