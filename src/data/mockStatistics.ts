import type { StatisticsResponse } from '@/types/statistics';

export const MOCK_STATISTICS_DATA: StatisticsResponse = {
    "resultType": "SUCCESS",
    "error": null,
    "success": {
        "popularQuestions": [
            {
                "id": 1,
                "content": "자기소개 부탁드립니다.",
                "used_count": 142
            },
            {
                "id": 2,
                "content": "본인이 담당했던 기획 프로젝트를 설명해주세요.",
                "used_count": 89
            },
            {
                "id": 3,
                "content": "기획 단계에서 가장 중요하게 고려하는 요소는 무엇인가요?",
                "used_count": 76
            },
            {
                "id": 4,
                "content": "갈등 상황을 해결했던 경험이 있나요?",
                "used_count": 65
            },
            {
                "id": 5,
                "content": "최근 관심 있는 기술 트렌드는 무엇인가요?",
                "used_count": 58
            }
        ],
        "jobCategoryDist": [
            {
                "category": "기획",
                "user_count": 45
            },
            {
                "category": "IT",
                "user_count": 62
            },
            {
                "category": "마케팅",
                "user_count": 38
            },
            {
                "category": "디자인",
                "user_count": 41
            },
            {
                "category": "영업",
                "user_count": 25
            },
            {
                "category": "인사",
                "user_count": 18
            },
            {
                "category": "재무",
                "user_count": 12
            },
            {
                "category": "연구",
                "user_count": 15
            }
        ],
        "coaching": {
            "thisMonth": 156,
            "lastMonth": 124,
            "growth": "+32"
        },
        "newUsers": {
            "thisMonth": 48,
            "lastMonth": 35,
            "growth": "+13"
        },
        "avgAnswerLength": "482.5",
        "monthlyTrend": {
            "coaching": [
                { "month": "2025-06", "count": 45 },
                { "month": "2025-07", "count": 62 },
                { "month": "2025-08", "count": 78 },
                { "month": "2025-09", "count": 95 },
                { "month": "2025-10", "count": 112 },
                { "month": "2025-11", "count": 135 },
                { "month": "2025-12", "count": 156 }
            ],
            "reviews": [
                { "month": "2025-06", "count": 12 },
                { "month": "2025-07", "count": 18 },
                { "month": "2025-08", "count": 25 },
                { "month": "2025-09", "count": 32 },
                { "month": "2025-10", "count": 45 },
                { "month": "2025-11", "count": 58 },
                { "month": "2025-12", "count": 76 }
            ]
        }
    }
};
