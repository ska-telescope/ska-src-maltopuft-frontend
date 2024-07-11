import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

export async function countSinglePulses(): Promise<number> {
  try {
    const response = await api.get<number>(`/candle/sp/count`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulseCount = () =>
  useQuery<number>({
    queryKey: ['sp', 'count'],
    queryFn: () => countSinglePulses()
  });
