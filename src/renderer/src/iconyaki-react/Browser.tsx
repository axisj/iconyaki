import styled from "@emotion/styled";
import * as React from "react";
import icons from "./data.json";
import Icon from "./IconYaki";

interface Props {}

export default function Browser({}: Props) {
  return (
    <Container>
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
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
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
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
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
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      gap: 3px;
    }
  }
`;
const IconWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 30px;
  flex: 1;
`;
const IconMeta = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: none;
  font-size: 13px;
  padding: 5px 0;
`;
