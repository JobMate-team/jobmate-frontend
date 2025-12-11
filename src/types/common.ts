export type CommonResponse<T> = {
  resultType: string;
  error: null | {
    errorCode: string;
    reason: string;
    data: unknown;
  };
  success: T;
};
