import styled from "@emotion/styled";
import React from "react";
import { Progress } from "antd";

interface IProps {
  spinning: boolean;
}

const StoreSpinner: React.FC<IProps> = ({ spinning }) => {
  const [percent, setPercent] = React.useState(0);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (spinning) {
      timer.current = window.setTimeout(() => setPercent(percent + 1), 30);
    }
  }, [percent, spinning]);

  React.useEffect(() => {
    setPercent(0);
    return () => {
      clearTimeout(timer.current || 0);
    };
  }, []);

  if (!spinning) {
    return null;
  }
  return (
    <Container>
      <Progress percent={percent} type='line' showInfo={false} size={"small"} strokeLinecap='square' status='active' />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: -2px;
  left: 0;
  width: 100%;
  z-index: 200;
  height: 0;

  .ant-progress-status-active .ant-progress-bg::before {
    border-radius: 0;
  }

  .ant-progress {
    display: block;
    line-height: 6px;
    position: absolute;
    height: 6px;

    .ant-progress-outer {
      line-height: 6px;
      position: absolute;
      height: 6px;

      .ant-progress-inner {
        background: transparent;
        border-radius: 0;
      }
    }
  }
`;

export { StoreSpinner };
