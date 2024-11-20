import { Response } from '@/types/api';

export type AxisValues = {
  xMin: Date | null;
  xMax: Date | null;
  yMin: number | null;
  yMax: number | null;
};

export type Candidate = Response<{
  dm: number;
  snr: number;
  width: number;
  ra: string;
  dec: string;
  observed_at: Date;
}>;

export interface Entity {
  id: number;
  css_color: string;
  type: string;
}

export type KnownPulsar = Response<{
  name: string;
  dm: number;
  width: number;
  ra: string;
  dec: string;
  period: number;
}>;

export interface Label {
  id?: number;
  labeller_id?: number;
  candidate_id: number;
  entity_id: number;
}

export type Observation = Response<{
  t_min: Date;
  t_max: Date;
  s_ra: string;
  s_dec: string;
}>;

export type SinglePulse = Response<{
  candidate_id: number;
  plot_path: string;
  candidate: Candidate;
}>;

export interface ObservationSources {
  observation: Response<Observation>;
  sources: Response<KnownPulsar[]>;
}

export interface SubplotData {
  candidate_id: number;
  plot_path: string;
  imageData: string;
}
