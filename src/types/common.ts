export type CommonResponse<T> = {
  resultType: string;
  error: null | string;
  success: T;
};
