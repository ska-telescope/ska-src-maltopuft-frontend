import { TokenResponse } from '../types';

import { ROOT } from '@/config';
import { authAPI } from '@/lib/axios';

/**
 * Retrieve a user token with the ska-src-auth-api
 * @param code PCKE code parsed from the login callback URL
 * @returns The user token
 */
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
