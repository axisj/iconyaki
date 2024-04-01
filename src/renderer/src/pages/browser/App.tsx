import * as React from "react";
import styled from "@emotion/styled";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { useIconsData } from "../../hooks/useIconsData";
import service from "../../service";
import { IconBin } from "../../components/icon";
import Icon from "../../iconyaki-react/IconYaki";
import {Button, Divider, Form, Input, message, Popconfirm, Select, Space} from "antd";
import electronAPI from "../../util/electronAPI";
import {useCallback, useEffect} from "react";

interface Props {}

function printPath(path: string) {
  const paths = path.split("/");
  if(paths.length < 4) {
    return path;
  }
  return `${paths[0]}/${paths[1]}/.../${paths[paths.length - 2]}/${paths[paths.length - 1]}`;
}

export default function App({}: Props) {
  const [messageApi, messageContext] = message.useMessage()
  const currentProject = useAppStore((s) => s.currentProject);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
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
      if(currentProject.folder === undefined) {
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
      if(currentProject.folder === undefined) {
        await messageApi.error("프로젝트 폴더를 선택해주세요.");
        return;
      }
      const icons= await service.loadIcons({
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
        if(!currentProject) return;
        const path = await electronAPI.openFolder();
        currentProject.folder = path;
        projects?.forEach((project) => {
          if (project.value === currentProject?.value) {
            project.folder = path;
          }
        });
        setProjects([...projects ?? []]);
        setCurrentProject(currentProject.value);
      } catch (err) {
        //
      }
  }, [currentProject, projects, setCurrentProject, setProjects]);


  return (
    <Container>
      {messageContext}
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
      <Toolbar>
        <Space>



          <Form layout={"inline"} colon={false}>
            <Form.Item label={<Space>Icon Source Folder
              <Button size={"small"} onClick={setProjectFolder}>Select</Button>
            </Space>}>
              <Input value={printPath(currentProject?.folder ?? "")} readOnly style={{width: 300}} />
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
      </Toolbar>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const IconCardWrap = styled.div`
  overflow: scroll;
  flex: 1;
  background: #eee;
  padding: 8px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
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
  font-size: 30px;
  flex: 1;
  border-bottom: 1px solid var(--border-color);
`;
const IconMeta = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: none;
  font-size: 13px;
  padding: 5px;
  word-break: break-all;
`;
const Toolbar = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  background: #eee;
`;
