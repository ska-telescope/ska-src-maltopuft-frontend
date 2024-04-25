import { axios } from '@/lib/axios';

interface pingResponse {
  data: string;
}

export async function doPing(): Promise<pingResponse> {
  try {
    const response = await axios.get<pingResponse>('/ping');
    return response.data;
  } catch (error) {
    return { data: 'unhealthy' };
  }
}
