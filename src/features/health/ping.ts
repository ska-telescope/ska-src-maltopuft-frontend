import { api } from '@/lib/axios';

interface pingResponse {
  data: string;
}

export async function doPing(): Promise<pingResponse> {
  try {
    const response = await api.get<pingResponse>('/ping');
    return response.data;
  } catch (error) {
    return { data: 'unhealthy' };
  }
}
