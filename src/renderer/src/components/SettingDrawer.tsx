import * as React from "react";
import styled from "@emotion/styled";
import { Button, Divider, Drawer, Empty, Form, Input, Popconfirm } from "antd";
import { useAppStore } from "../store/useAppStore";
import { IconBin } from "./icon";
import { SMixinFlexColumn, SMixinFlexRow } from "../styles/emotion";
import { alertDialog } from "./dialogs";

interface Props {}

export function SettingDrawer({}: Props) {
  const openSettings = useAppStore((s) => s.openSettings);
  const setOpenSettings = useAppStore((s) => s.setOpenSettings);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);
  const currentProject = useAppStore((s) => s.currentProject);

  const [form] = Form.useForm();

  const handleAdd = React.useCallback(async () => {
    const project = form.getFieldValue("project");
    const prefix = form.getFieldValue("prefix");

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
        value: project,
        prefix: prefix
      }
    ]);
    if (!projects || projects.length === 0) {
      setCurrentProject(project);
    }
    form.setFieldsValue({
      project: "",
      prefix: ""
    });
  }, [form, projects, setCurrentProject, setProjects]);

  const handleDel = React.useCallback(
    async (project: string) => {
      setProjects([...(projects ?? []).filter((p) => p.value !== project)]);
      if (project === currentProject?.value) {
        setCurrentProject(undefined);
      }
    },
    [currentProject, projects, setCurrentProject, setProjects]
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
      <LegendForm>
        <legend>Projects</legend>
        <NewProject>
          <Form form={form} layout={"vertical"} onFinish={handleAdd}>
            <Form.Item label={"Project Name"} name={"project"} rules={[{ required: true }]}>
              <Input placeholder={"project name"} />
            </Form.Item>
            <Form.Item label={"Icon prefix"} name={"prefix"} rules={[{ required: true }]}>
              <Input placeholder={"Icon Prefix Name"} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType={"submit"}>
                Add
              </Button>
            </Form.Item>
          </Form>
        </NewProject>
        <Divider style={{ margin: "12px 0" }} />
        <ProjectList>
          {projects?.map((project) => {
            return (
              <Project key={project.value}>
                <b>
                  {project.label} / {project.prefix}
                </b>

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
