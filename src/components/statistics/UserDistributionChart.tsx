import { useMemo, useState } from 'react';
import type { JobCategoryDist } from '@/types/statistics';

interface UserDistributionChartProps {
  jobCategoryDist: JobCategoryDist[];
}

const UserDistributionChart = ({ jobCategoryDist }: UserDistributionChartProps) => {
  // 툴팁 상태 관리
  const [hoveredSlice, setHoveredSlice] = useState<{
    name: string;
    percent: number;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const chartData = useMemo(() => {
    // 1. 총 사용자 수 계산
    const total = jobCategoryDist.reduce((sum, item) => sum + item.user_count, 0);

    // 2. 데이터 변환
    const data = jobCategoryDist.map((item) => ({
      name: item.category,
      count: item.user_count,
      percent: total > 0 ? (item.user_count / total) * 100 : 0,
    }));

    // 시각적 효과를 위해 내림차순 정렬
    return data.sort((a, b) => b.count - a.count);
  }, [jobCategoryDist]);

  // 파이 차트 슬라이스 색상
  const COLORS = [
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#F59E0B',
    '#10B981',
    '#6B7280',
    '#EF4444',
    '#6366F1',
  ];

  // SVG 파이 차트 로직
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const slices = chartData.map((slice, index) => {
    // 슬라이스의 시작과 끝 퍼센트 (0 에서 1 사이)
    const startPercent = cumulativePercent;
    cumulativePercent += slice.percent / 100;
    const endPercent = cumulativePercent;

    // 좌표 계산
    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(endPercent);

    // 큰 호 플래그 (50% 이상일 경우 1)
    const largeArcFlag = slice.percent > 50 ? 1 : 0;

    // 경로 명령어
    // 중심으로 이동(0,0) -> 시작점으로 선 그리기 -> 끝점까지 호 그리기 -> 경로 닫기
    const pathData = [
      `M 0 0`,
      `L ${startX} ${startY}`,
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `Z`,
    ].join(' ');

    // 툴팁 위치 계산 (슬라이스의 중간 각도)
    const midAngle = 2 * Math.PI * (startPercent + (endPercent - startPercent) / 2);
    const tooltipX = Math.cos(midAngle) * 0.7; // 반지름의 70% 지점
    const tooltipY = Math.sin(midAngle) * 0.7;

    return {
      ...slice,
      pathData,
      color: COLORS[index % COLORS.length],
      tooltipX,
      tooltipY,
    };
  });

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full'>
      <h2 className='text-lg font-bold text-gray-900 mb-6'>직무별 사용자 분포</h2>

      <div className='flex-1 flex items-center justify-center relative'>
        {/* 파이 차트 SVG */}
        <div className='w-full max-w-[300px] aspect-square relative group'>
          <svg viewBox='-1.2 -1.2 2.4 2.4' className='w-full h-full transform -rotate-90'>
            {slices.map((slice, i) => (
              <path
                key={i}
                d={slice.pathData}
                fill={slice.color}
                stroke='white'
                strokeWidth='0.02'
                className='transition-all duration-200 hover:opacity-90 cursor-pointer hover:scale-105 transform origin-center'
                onMouseEnter={() => {
                  // SVG 내에서 마우스 위치 또는 미리 계산된 중심점 사용
                  setHoveredSlice({
                    name: slice.name,
                    count: slice.count,
                    percent: slice.percent,
                    x: slice.tooltipX,
                    y: slice.tooltipY,
                  });
                }}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            ))}
          </svg>

          {/* 툴팁 (차트 중앙에 오버레이하거나 마우스 위치에 따라 표시) */}
          {hoveredSlice && (
            <div
              className='absolute pointer-events-none bg-gray-900/90 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap'
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${hoveredSlice.y * 110}%), calc(-50% + ${hoveredSlice.x * 110}%))`,
              }}
            >
              <p className='font-bold text-center'>{hoveredSlice.name}</p>
              <p>
                {hoveredSlice.count}명 ({Math.round(hoveredSlice.percent)}%)
              </p>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-x-4 gap-y-2 mt-4 w-full px-2'>
        {slices.map((slice, i) => (
          <div key={i} className='flex items-center gap-1.5'>
            <div
              className='w-3 h-3 rounded-full shrink-0'
              style={{ backgroundColor: slice.color }}
            ></div>
            <span
              className='text-xs text-gray-600 font-medium whitespace-nowrap'
              style={{ color: slice.color }}
            >
              {slice.name} {Math.round(slice.percent)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDistributionChart;
