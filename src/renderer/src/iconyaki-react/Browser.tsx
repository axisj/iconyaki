import styled from "@emotion/styled";
import { Space } from "antd";
import Icon from "./IconYaki";
import * as React from "react";
import { SMixinFlexColumn, SMixinFlexRow } from "../styles/emotion";

import icons from "./data.json";

interface Props {}

export default function Browser({}: Props) {
  return (
    <Container>
      <Toolbar>
        <div></div>
        <Space></Space>
      </Toolbar>
      <IconCardWrap>
        <IconList>
          {icons.map((icon, key) => {
            const IconPreview = Icon({
              iconStr: icon.svgBody,
              viewBox: icon.viewBox
            });
            return (
              <IconCard key={key}>
                <div className={"tools"}></div>
                <IconWrap>
                  <IconPreview />
                </IconWrap>
                <IconMeta>{icon.componentName}</IconMeta>
              </IconCard>
            );
          })}
        </IconList>
      </IconCardWrap>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const IconCardWrap = styled.div`
  overflow: auto;
  flex: 1;
  background: #eee;
  padding: 8px;
`;
const IconList = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`;

const IconCard = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  position: relative;

  .tools {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    display: none;

    a {
      color: var(--txt-body);
      &:hover {
        color: var(--txt-link-hover);
      }
    }
  }

  &:hover {
    .tools {
      ${SMixinFlexRow("flex-end", "center")};
      gap: 3px;
    }
  }
`;
const IconWrap = styled.div`
  ${SMixinFlexColumn("center", "center")};
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 30px;
  flex: 1;
`;
const IconMeta = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: none;
  font-size: 13px;
  padding: 5px 0;
`;
const Toolbar = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  background: #eee;
  border-bottom: 1px solid var(--border-color);
`;
