import { z } from 'zod';

// 기본 공통 필드
export const adminLoginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일 형식입니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(20, '비밀번호는 20자 이하여야 합니다.'),
});

// 타입 추론
export type adminLoginType = z.infer<typeof adminLoginSchema>;
