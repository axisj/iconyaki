import { Tooltip } from "antd";
import styled from "@emotion/styled";
import { IconWarning } from "./icon";
import * as React from "react";

interface Props {
  iconPath: string;
}
const IconLoadError = ({ iconPath }: Props) => {
  return (
    <Tooltip title={`Icon load error : ${iconPath}`}>
      <Container>
        <IconWarning />
      </Container>
    </Tooltip>
  );
};

const Container = styled.div`
  display: inline-block;
  color: #ff3300;
  font-size: 16px;
`;

export default IconLoadError;
