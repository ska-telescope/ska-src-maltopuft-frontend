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
  data_path: string;
  observed_at: Date;
  candidate: Candidate;
}>;

export type Entity = Response<{
  type: string;
  css_color: string;
}>;

export type Label = Response<{
  labeller_id: number;
  candidate_id: number;
  entity_id: number;
}>;
