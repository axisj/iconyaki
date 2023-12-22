import * as React from "react";
import styled from "@emotion/styled";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { useIconsData } from "../../hooks/useIconsData";
import service from "../../service";
import { IconBin } from "../../components/icon";
import Icon from "../../iconyaki-react/IconYaki";
import { Button, Form, Popconfirm, Select, Space } from "antd";
import electronAPI from "../../util/electronAPI";
import { useEffect } from "react";

interface Props {}

export default function App({}: Props) {
  const currentProject = useAppStore((s) => s.currentProject);
  const projects = useAppStore((s) => s.projects);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);

  const [form] = Form.useForm();

  const { icons, getIcons, loading } = useIconsData(currentProject?.value);

  const handleDelete = React.useCallback(
    async (id: string) => {
      if (currentProject === undefined) return;
      try {
        await service.deleteIcons({
          projectName: currentProject.value,
          id
        });
        await getIcons();
      } catch (err) {
        //
      }
    },
    [currentProject, getIcons]
  );

  const handleExport = React.useCallback(async () => {
    if (!currentProject) return;
    try {
      const path = await electronAPI.openFolder();
      await service.exportReactIcons({
        projectName: currentProject.value,
        targetPath: path
      });
      electronAPI.openPath(path);
    } catch (e: any) {
      //
    }
  }, [currentProject]);

  return (
    <Container>
      <Toolbar>
        <div>
          <Form form={form} layout={"inline"}>
            <Form.Item label={"Project"}>
              <Select
                options={projects ?? []}
                value={currentProject?.value}
                onChange={(value) => {
                  setCurrentProject(value);
                }}
                style={{ minWidth: 200 }}
              />
            </Form.Item>
          </Form>
        </div>

        <Space>
          <Button type={"primary"} onClick={handleExport} disabled={!currentProject}>
            Export
          </Button>
        </Space>
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
                <div className={"tools"}>
                  <Popconfirm
                    title={"Are you sure you want to delete this icon?"}
                    onConfirm={() => handleDelete(icon.id)}
                  >
                    <a href={"#"}>
                      <IconBin />
                    </a>
                  </Popconfirm>
                </div>
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
