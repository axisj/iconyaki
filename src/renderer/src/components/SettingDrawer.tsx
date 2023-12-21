import * as React from "react";
import styled from "@emotion/styled";
import { Button, Divider, Drawer, Empty, Form, Input, InputRef, Popconfirm, Space } from "antd";
import { useAppStore } from "../store/useAppStore";
import { IconBin } from "./icon";
import { useRef, useState } from "react";
import { SMixinFlexColumn, SMixinFlexRow } from "../styles/emotion";
import { alertDialog } from "./dialogs";

interface Props {}

export function SettingDrawer({}: Props) {
  const openSettings = useAppStore((s) => s.openSettings);
  const setOpenSettings = useAppStore((s) => s.setOpenSettings);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);

  const [form] = Form.useForm();

  const handleAdd = React.useCallback(async () => {
    const project = form.getFieldValue("project");

    if ((projects ?? []).find((p) => p.value === project)) {
      await alertDialog({
        title: "Not Allowed",
        content: "A registered name already exists."
      });
      return;
    }

    setProjects([
      ...(projects ?? []),
      {
        label: project,
        value: project
      }
    ]);
    if (!projects || projects.length === 0) {
      setCurrentProject(project);
    }
    form.setFieldValue("project", "");
  }, [form, projects, setCurrentProject, setProjects]);

  const handleDel = React.useCallback(
    async (project: string) => {
      setProjects([...(projects ?? []).filter((p) => p.value !== project)]);
    },
    [projects, setProjects]
  );

  return (
    <Drawer
      title={`Settings`}
      placement="right"
      onClose={() => {
        setOpenSettings(false);
      }}
      open={openSettings}
    >
      <p style={{ marginBottom: 16, lineHeight: 1.8 }}>
        Use the project name as the prefix for the icon. <br />
        ex) project name: test {"=>"} TestAdd.tsx
      </p>
      <LegendForm>
        <legend>Projects</legend>
        <NewProject>
          <Form form={form} onFinish={handleAdd}>
            <Space.Compact block>
              <Form.Item name={"project"} rules={[{ required: true }]} style={{ margin: 0 }}>
                <Input placeholder={"project name"} />
              </Form.Item>
              <Button type="primary" htmlType={"submit"}>
                Add
              </Button>
            </Space.Compact>
          </Form>
        </NewProject>
        <Divider style={{ margin: "12px 0" }} />
        <ProjectList>
          {projects?.map((project) => {
            return (
              <Project key={project.value}>
                <b>{project.label}</b>

                <Popconfirm
                  title={"Are sure want delete?"}
                  onConfirm={() => handleDel(project.value)}
                >
                  <Button type="text" size={"small"}>
                    <IconBin />
                  </Button>
                </Popconfirm>
              </Project>
            );
          })}

          {(projects ?? [])?.length === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Project creation is required."}
            />
          )}
        </ProjectList>
      </LegendForm>
    </Drawer>
  );
}

const ProjectList = styled.div`
  ${SMixinFlexColumn("flex-start", "stretch")};
  gap: 6px;
`;
const Project = styled.div`
  border: 1px solid var(--border-color);
  padding: 4px 6px;
  border-radius: 6px;

  ${SMixinFlexRow("stretch", "center")};
  b {
    flex: 1;
    padding-left: 6px;
  }
`;
const NewProject = styled.div``;

const LegendForm = styled.fieldset`
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 16px;
  legend {
    font-size: 14px;
    font-weight: bold;
    padding: 0 8px;
  }
`;
