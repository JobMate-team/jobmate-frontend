export type CommonResponse<T> = {
  resultType: string;
  error: null | {
    errorCode: string;
    reason: string;
    data: unknown;
  };
  success: T;
};

export type CommonItem = {
  id: number;
  name: string;
};
