import { useQueries } from '@tanstack/react-query';

import { SinglePulse, SubplotData } from '../types';

import { subplotAPI } from '@/lib/axios';

export async function getSubplot(sp: SinglePulse): Promise<SubplotData> {
  const arrayBufferToBase64 = (buffer: number[]) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  try {
    const response = await subplotAPI.get<number[]>(sp.plot_path, {
      responseType: 'arraybuffer'
    });
    const base64String = arrayBufferToBase64(response.data);
    return {
      candidate_id: sp.candidate_id,
      plot_path: sp.plot_path,
      imageData: `data:${response.headers['content-type']};base64,${base64String}`
    };
  } catch (error) {
    throw Error('Something went wrong.');
  }
}

export const useSubplots = (sps: SinglePulse[]) =>
  useQueries<SubplotData[]>({
    queries: sps.map((sp: SinglePulse) => ({
      queryKey: ['subplot', sp.candidate_id],
      queryFn: () => getSubplot(sp),
      staleTime: Infinity
    }))
  });
