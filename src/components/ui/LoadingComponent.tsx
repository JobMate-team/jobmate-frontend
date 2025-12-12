import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const scaleBounce = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1.3);
  }
`;

// 로딩 박스 스타일
const LoadingBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 240px;
  text-align: center;
`;

// 원들을 담는 컨테이너
const Circles = styled.div`
  padding-top: 10px;
`;

// 개별 원 스타일
const Circle = styled.i`
  animation: ${scaleBounce} 0.3s alternate infinite;
  display: inline-block;
  margin: 0 4px;
  width: 10px;
  height: 10px;
  background: #717182;
  border-radius: 50em;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

// 텍스트 스타일
const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  white-space: nowrap;
  color: #1e1e1f;
`;

// 로딩 컴포넌트
const LoadingComponent = () => {
  return (
    <LoadingBox>
      <Circles>
        <Circle />
        <Circle />
        <Circle />
      </Circles>
      <LoadingText>추천 질문을 불러오고 있습니다...</LoadingText>
    </LoadingBox>
  );
};

export default LoadingComponent;
