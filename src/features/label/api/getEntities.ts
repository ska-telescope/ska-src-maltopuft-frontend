import { useQuery } from '@tanstack/react-query';

import { Entity } from '../types';

import { api } from '@/lib/axios';

export async function getEntities(): Promise<Entity[]> {
  try {
    const response = await api.get<Entity[]>(`/labels/entity`);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useEntities = () =>
  useQuery<Entity[]>({
    queryKey: ['entities'],
    queryFn: () => getEntities()
  });
