import { useQuery } from '@tanstack/react-query';

import { ObservationSources } from '../types';

import { api } from '@/lib/axios';

export async function getObservationRegionKnownPulsars(
  observationIds: number[],
  radius: number
): Promise<ObservationSources[]> {
  const searchParams = new URLSearchParams();
  observationIds.forEach((id: number) => searchParams.append('id', `${id}`));
  searchParams.append('radius', `${radius}`);
  try {
    const response = await api.get<ObservationSources[]>(
      `/obs/sources/?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useObservationRegionKnownPulsars = (observationIds: number[], radius: number) =>
  useQuery<ObservationSources[]>({
    queryKey: ['observationRegionKnownPulsars', observationIds, radius],
    queryFn: () => getObservationRegionKnownPulsars(observationIds, radius)
  });
