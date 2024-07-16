import { useQuery } from '@tanstack/react-query';

import { Label } from '../types';

import { api } from '@/lib/axios';

export async function getLabelsById(candidateIds: number[]): Promise<Label[]> {
  let queryString = '';
  function prepareQueryString(id: number) {
    queryString += `&candidate_id=${id}`;
  }
  candidateIds.forEach(prepareQueryString);

  try {
    const response = await api.get<Label[]>(`/labels/?${queryString}`);
    return response.data.map((d) => ({
      id: d.id,
      labeller_id: d.labeller_id,
      candidate_id: d.candidate_id,
      entity_id: d.entity_id
    }));
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useLabels = (candidateIds: number[]) =>
  useQuery<Label[]>({
    queryKey: ['labels', 'get', candidateIds],
    queryFn: () => getLabelsById(candidateIds)
  });
