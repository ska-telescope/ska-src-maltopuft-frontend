import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Label } from '../types';

import { api } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';

async function updateLabel(label: Label): Promise<Label> {
  try {
    const response = await api.put<Label>(`/labels/${label.id}`, {
      entity_id: label.entity_id
    });
    return response.data;
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useUpdateLabel = () =>
  useMutation<Label, AxiosError, Label>({
    mutationKey: ['label', 'update'],
    mutationFn: async (label: Label) => updateLabel(label),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['labels', 'get'] });
    }
  });
