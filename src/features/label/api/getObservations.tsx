import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Observation } from '../types';

import { api } from '@/lib/axios';

export async function getObservations(
  tMin: dayjs.Dayjs,
  tMax: dayjs.Dayjs
): Promise<Observation[]> {
  try {
    const response = await api.get<Observation[]>(
      `/obs/?t_min=${tMin.toISOString()}&t_max=${tMax.toISOString()}`
    );
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useObservations = (tMin: dayjs.Dayjs, tMax: dayjs.Dayjs) =>
  useQuery<Observation[]>({
    queryKey: ['obs', tMin, tMax],
    queryFn: () => getObservations(tMin, tMax)
  });
