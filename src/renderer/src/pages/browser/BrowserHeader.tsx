import styled from "@emotion/styled";
import { ColorPicker, Form, Input, InputNumber, message, Select } from "antd";
import * as React from "react";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexRow } from "../../styles/emotion";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  getIcons: () => Promise<void>;
}

export function BrowserHeader({ filter, setFilter, getIcons }: Props) {
  const [messageApi, messageContext] = message.useMessage();
  const currentProject = useAppStore((s) => s.currentProject);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);
  const iconSize = useAppStore((s) => s.iconSize);
  const iconColor = useAppStore((s) => s.iconColor);
  const iconBgColor = useAppStore((s) => s.iconBgColor);
  const setIconSize = useAppStore((s) => s.setIconSize);
  const setIconColor = useAppStore((s) => s.setIconColor);
  const setIconBgColor = useAppStore((s) => s.setIconBgColor);

  const [form] = Form.useForm();

  return (
    <Div>
      {messageContext}
      <Form form={form} layout={"inline"} colon={false}>
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
        <Form.Item label={"Size"}>
          <InputNumber
            value={iconSize}
            onChange={(value) => setIconSize(value ?? 24)}
            max={200}
            min={8}
          />
        </Form.Item>
        <Form.Item label={"Color"}>
          <ColorPicker value={iconColor} onChange={(v, hex) => setIconColor(hex)} showText />
        </Form.Item>
        <Form.Item label={"BgColor"}>
          <ColorPicker value={iconBgColor} onChange={(v, hex) => setIconBgColor(hex)} showText />
        </Form.Item>
        <Form.Item label={"Filter"}>
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={"Search for icons"}
            allowClear
          />
        </Form.Item>
      </Form>
    </Div>
  );
}

const Div = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  background: #eee;

  label {
  }
`;
