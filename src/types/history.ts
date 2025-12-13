import type { CommonResponse } from './common';

export type SaveHistoryItem = {
  user_id: number;
  coaching_id: number;
  history_id: number;
};

export type SaveHistoryResponse = CommonResponse<{
  message: string;
  data: SaveHistoryItem;
}>;
