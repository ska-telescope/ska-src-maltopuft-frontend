import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Label } from '../types';

import { api } from '@/lib/axios';

async function createLabels(labels: Label[]): Promise<Label[]> {
  try {
    const response = await api.post<Label[]>(`/labels`, labels);
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useCreateLabels = () =>
  useMutation<Label[], AxiosError, Label[]>({
    mutationKey: ['create-labels'],
    mutationFn: createLabels
  });
