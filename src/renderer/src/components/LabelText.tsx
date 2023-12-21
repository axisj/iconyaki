import * as React from "react";
import styled from "@emotion/styled";
import { SMixinFlexRow } from "../styles/emotion";

interface Props {
  label: string;
  children?: React.ReactNode;
}

export function LabelText({ label, children }: Props) {
  return (
    <Container>
      <label>{label}</label>
      <span>{children}</span>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexRow("flex-start", "center")};
  display: inline-flex;
  label {
    background: #eee;
    padding: 4px 8px;
    border-radius: 5px;
    margin-right: 8px;
    font-size: 0.9em;
    font-weight: bold;
    min-width: 50px;
    text-align: center;
  }
  > span {
    min-width: 100px;
  }
`;

export const LabelTextGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
