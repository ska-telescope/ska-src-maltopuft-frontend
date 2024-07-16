import { Response } from '@/types/api';

export type Candidate = Response<{
  dm: number;
  snr: number;
  width: number;
  ra: string;
  dec: string;
}>;

export type SinglePulse = Response<{
  candidate_id: number;
  plot_path: string;
  observed_at: Date;
  candidate: Candidate;
}>;

export interface Entity {
  id: number;
  css_color: string;
  type: string;
}

export interface Label {
  id?: number;
  labeller_id?: number;
  candidate_id: number;
  entity_id: number;
}

export interface SubplotData {
  candidate_id: number;
  plot_path: string;
  imageData: string;
}
