import { useQuery } from '@tanstack/react-query';

import { SinglePulse } from '../types';

import { api } from '@/lib/axios';

export async function getSinglePulses(): Promise<SinglePulse[]> {
  try {
    const response = await api.get<SinglePulse[]>(`/candle/sp`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSinglePulses = () =>
  useQuery<SinglePulse[]>({
    queryKey: ['sp'],
    queryFn: () => getSinglePulses()
  });
