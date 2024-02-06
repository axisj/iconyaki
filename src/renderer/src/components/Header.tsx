import * as React from "react";
import styled from "@emotion/styled";
import { Alert, Button, Menu, MenuProps } from "antd";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { SMixinFlexRow } from "../styles/emotion";
import { IconSettingsVertical } from "./icon";
import { SettingDrawer } from "./SettingDrawer";
import { useAppStore } from "../store/useAppStore";

interface Props {}

const itmes: MenuProps["items"] = [
  {
    label: "Icon Browser",
    key: "/"
  },
  {
    label: "Upload",
    key: "/upload"
  },
  {
    label: "Guide",
    key: "/guide"
  }
];

export function Header({}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const setOpenSettings = useAppStore((s) => s.setOpenSettings);
  const projects = useAppStore((s) => s.projects);
  const openSettings = useAppStore((s) => s.openSettings);

  const onClick = useCallback<MenuClickEventHandler>(
    ({ key }) => {
      navigate(key);
    },
    [navigate]
  );

  const selectedKeys = useMemo(() => {
    switch (location.pathname) {
      case "/upload": {
        return ["/upload"];
      }
      case "/guide": {
        return ["/guide"];
      }
      case "/":
      default: {
        return ["/"];
      }
    }
  }, [location.pathname]);

  return (
    <>
      {(projects ?? []).length === 0 && (
        <Alert
          message="Project creation is required."
          banner
          action={
            <Button size="small" danger onClick={() => setOpenSettings(true)}>
              Create
            </Button>
          }
        />
      )}
      <Container>
        <div style={{ flex: 1 }}>
          <Menu mode={"horizontal"} items={itmes} selectedKeys={selectedKeys} onClick={onClick} />
        </div>
        <ConfigHandle onClick={() => setOpenSettings(!openSettings)}>
          <IconSettingsVertical />
        </ConfigHandle>
      </Container>

      <SettingDrawer />
    </>
  );
}

const Container = styled.div`
  user-select: none;
  border-bottom: 1px solid var(--border-color);
  ${SMixinFlexRow("space-between", "center")};
`;

const ConfigHandle = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  color: var(--txt-body);
  &:hover {
    color: var(--txt-link-hover);
  }
`;
