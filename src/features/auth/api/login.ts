import { TokenResponse } from '../types';

import { ROOT } from '@/config';
import { authAPI } from '@/lib/axios';

export async function fetchToken(code: string): Promise<TokenResponse> {
  try {
    const response = await authAPI.get<TokenResponse>(
      `/token?code=${code}&redirect_uri=${ROOT}/callback`
    );
    return response.data;
  } catch (error) {
    throw Error('Provided code could not be verified or no code provided.');
  }
}
