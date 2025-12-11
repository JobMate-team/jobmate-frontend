import { useMemo, useState } from 'react';
import type { MonthlyTrend } from '@/types/statistics';

interface MonthlyTrendChartProps {
  monthlyTrend: MonthlyTrend;
}

const MonthlyTrendChart = ({ monthlyTrend }: MonthlyTrendChartProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    value: number;
    label: string;
    month: string;
  } | null>(null);

  const trendData = useMemo(() => {
    const months = new Set<string>();
    monthlyTrend.coaching.forEach((c) => months.add(c.month));
    monthlyTrend.reviews.forEach((r) => months.add(r.month));

    const sortedMonths = Array.from(months).sort();

    return sortedMonths.map((month) => {
      const coachingItem = monthlyTrend.coaching.find((c) => c.month === month);
      const reviewItem = monthlyTrend.reviews.find((r) => r.month === month);

      let displayMonth = month;
      try {
        const parts = month.split('-');
        if (parts.length === 2) {
          displayMonth = `${parseInt(parts[1])}월`;
        }
      } catch {
        // X
      }

      return {
        month: displayMonth,
        originalMonth: month,
        coaching: coachingItem?.count || 0,
        review: reviewItem?.count || 0,
      };
    });
  }, [monthlyTrend]);

  // 차트 크기 설정
  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 30, bottom: 40, left: 40 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // 스케일 계산
  const getMaxY = () => {
    const maxVal = Math.max(...trendData.map((d) => Math.max(d.coaching, d.review)));
    return Math.max(maxVal * 1.2, 10); // Minimum scale 10, or 1.2x max value
  };
  const MAX_Y = getMaxY();

  const getX = (index: number) =>
    padding.left + (index * graphWidth) / Math.max(trendData.length - 1, 1); // Prevent div by 0
  const getY = (value: number) => height - padding.bottom - (value / MAX_Y) * graphHeight;

  // 그리드 라인
  const yTicks = [
    0,
    Math.round(MAX_Y * 0.25),
    Math.round(MAX_Y * 0.5),
    Math.round(MAX_Y * 0.75),
    Math.ceil(MAX_Y),
  ];

  // 경로 생성 함수
  const generatePath = (dataKey: 'coaching' | 'review') => {
    if (trendData.length === 0) return '';
    if (trendData.length === 1) {
      const x = getX(0);
      const y = getY(trendData[0][dataKey]);
      return `M ${x} ${y}`;
    }
    return trendData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[dataKey])}`)
      .join(' ');
  };

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm relative'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-bold text-gray-900'>월별 사용 추이</h2>
      </div>

      <div className='w-full overflow-x-auto'>
        <div className='min-w-[600px] relative'>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className='w-full h-auto'
            style={{ maxHeight: '300px' }}
          >
            {/* 그리드 라인 */}
            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={getY(tick)}
                  x2={width - padding.right}
                  y2={getY(tick)}
                  stroke='#E5E7EB'
                  strokeDasharray='4 4'
                  strokeWidth='1'
                />
                <text
                  x={padding.left - 10}
                  y={getY(tick)}
                  dy='4'
                  textAnchor='end'
                  className='text-xs fill-gray-400'
                  style={{ fontSize: '12px' }}
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* X축 레이블 */}
            {trendData.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={height - 10}
                textAnchor='middle'
                className='text-xs fill-gray-500'
                style={{ fontSize: '12px' }}
              >
                {d.month}
              </text>
            ))}

            {/* 코칭 라인 (검정) */}
            <path d={generatePath('coaching')} fill='none' stroke='black' strokeWidth='2' />
            {/* 코칭 데이터 포인트 (인터랙션 영역 포함) */}
            {trendData.map((d, i) => (
              <g key={`c-${i}`}>
                {/* 실제 보이는 점 */}
                <circle
                  cx={getX(i)}
                  cy={getY(d.coaching)}
                  r='3'
                  fill='white'
                  stroke='black'
                  strokeWidth='2'
                />
                {/* 확장된 히트 타겟 (투명) */}
                <circle
                  cx={getX(i)}
                  cy={getY(d.coaching)}
                  r='10'
                  fill='transparent'
                  className='cursor-pointer hover:fill-black/10 transition-colors'
                  onMouseEnter={() =>
                    setHoveredPoint({
                      x: getX(i),
                      y: getY(d.coaching),
                      value: d.coaching,
                      label: '코칭',
                      month: d.month,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}

            {/* 후기 라인 (회색) */}
            <path d={generatePath('review')} fill='none' stroke='#6B7280' strokeWidth='2' />
            {/* 후기 데이터 포인트 (인터랙션 영역 포함) */}
            {trendData.map((d, i) => (
              <g key={`r-${i}`}>
                <circle
                  cx={getX(i)}
                  cy={getY(d.review)}
                  r='3'
                  fill='white'
                  stroke='#6B7280'
                  strokeWidth='2'
                />
                <circle
                  cx={getX(i)}
                  cy={getY(d.review)}
                  r='10'
                  fill='transparent'
                  className='cursor-pointer hover:fill-gray-500/20 transition-colors'
                  onMouseEnter={() =>
                    setHoveredPoint({
                      x: getX(i),
                      y: getY(d.review),
                      value: d.review,
                      label: '후기',
                      month: d.month,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* 툴팁 */}
          {hoveredPoint && (
            <div
              className='absolute bg-gray-900/90 text-white text-xs rounded px-2 py-1 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 z-10 transition-opacity whitespace-nowrap min-w-max'
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                top: `${(hoveredPoint.y / height) * 100}%`,
                marginTop: '-10px',
              }}
            >
              <p className='font-bold mb-0.5'>{hoveredPoint.month}</p>
              <p>
                {hoveredPoint.label}: {hoveredPoint.value}회
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 범례 */}
      <div className='flex justify-center gap-6 mt-4 text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full border-2 border-black bg-white'></div>
          <span>코칭</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full border-2 border-gray-500 bg-white'></div>
          <span>후기</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
