import styled from "@emotion/styled";
import { Flex } from "antd";
import { useState } from "react";
import * as React from "react";
import { useIconsData } from "../../hooks/useIconsData";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { BrowserHeader } from "./BrowserHeader";
import { BrowserIconList } from "./BrowserIconList";
import { BrowserToolbar } from "./BrowserToolbar";

interface Props {}

export default function App({}: Props) {
  const currentProject = useAppStore((s) => s.currentProject);
  const { icons, getIcons, loading } = useIconsData(currentProject?.value);
  const [filter, setFilter] = useState("");
  return (
    <Container>
      <div className={"row-box"}>
        <BrowserHeader filter={filter} setFilter={setFilter} getIcons={getIcons} />
        <BrowserIconList filter={filter} icons={icons} getIcons={getIcons} loading={loading} />
      </div>
      <BrowserToolbar getIcons={getIcons} />
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;

  .row-box {
    ${SMixinFlexRow("stretch", "stretch")};
    flex: 1;
    overflow: hidden;
  }
`;
