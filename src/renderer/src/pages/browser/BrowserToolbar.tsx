import styled from "@emotion/styled";
import { Button, Divider, Form, Input, message, Space } from "antd";
import { useCallback } from "react";
import * as React from "react";
import { useIconsData } from "../../hooks/useIconsData";
import service from "../../service";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexRow } from "../../styles/emotion";
import electronAPI from "../../util/electronAPI";

interface Props {
  getIcons: () => Promise<void>;
}

function printPath(path: string) {
  const paths = path.split("/");
  if (paths.length < 5) {
    return path;
  }
  return `.../${paths[paths.length - 5]}/${paths[paths.length - 4]}/${paths[paths.length - 3]}/${
    paths[paths.length - 2]
  }/${paths[paths.length - 1]}`;
}

export function BrowserToolbar({ getIcons }: Props) {
  const [messageApi, messageContext] = message.useMessage();
  const currentProject = useAppStore((s) => s.currentProject);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);

  const [form] = Form.useForm();

  const handleExport = React.useCallback(async () => {
    if (!currentProject) return;
    try {
      if (currentProject.folder === undefined) {
        await messageApi.error("프로젝트 폴더를 선택해주세요.");
        return;
      }
      await service.exportReactIcons({
        projectName: currentProject.value,
        targetPath: currentProject.folder
      });

      await messageApi.success(`Exported to "${currentProject.folder}"`);
    } catch (e: any) {
      //
    }
  }, [currentProject, messageApi]);

  const handleSync = React.useCallback(async () => {
    if (!currentProject) return;
    try {
      if (currentProject.folder === undefined) {
        await messageApi.error("프로젝트 폴더를 선택해주세요.");
        return;
      }
      const icons = await service.loadIcons({
        targetPath: currentProject.folder
      });

      await service.saveIcons({
        projectName: currentProject.value,
        icons
      });
      await getIcons();

      await messageApi.success(`Loaded to "${currentProject.folder}"`);
    } catch (e: any) {
      //
    }
  }, [currentProject, getIcons, messageApi]);

  const setProjectFolder = useCallback(async () => {
    try {
      if (!currentProject) return;
      const path = await electronAPI.openFolder();
      currentProject.folder = path;
      projects?.forEach((project) => {
        if (project.value === currentProject?.value) {
          project.folder = path;
        }
      });
      setProjects([...(projects ?? [])]);
      setCurrentProject(currentProject.value);
    } catch (err) {
      //
    }
  }, [currentProject, projects, setCurrentProject, setProjects]);

  return (
    <Div>
      {messageContext}
      <Space>
        <Form form={form} layout={"inline"} colon={false}>
          <Form.Item label={"Path"}>
            <Input
              value={printPath(currentProject?.folder ?? "")}
              readOnly
              style={{ width: 400, cursor: "pointer" }}
              placeholder={"Load & Import target path"}
              onClick={setProjectFolder}
            />
          </Form.Item>
          <Form.Item>
            <Divider type={"vertical"} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={handleSync} disabled={!currentProject}>
                Load Icon
              </Button>
              <Button type={"primary"} onClick={handleExport} disabled={!currentProject}>
                Export Icon
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Div>
  );
}

const Div = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  background: #eee;
`;
