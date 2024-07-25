export type BaseResponse = {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export type Response<T> = {
  [K in keyof T]: T[K];
} & BaseResponse;
