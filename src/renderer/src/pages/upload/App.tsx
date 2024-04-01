import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Form, InputRef, message, Select, Space } from "antd";
import * as React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LabelText, LabelTextGroup } from "../../components/LabelText";
import service from "../../service";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { FileDto } from "../../types";
import { dangerouslySetInnerHTML } from "../../util/dangerouslySetInnerHTML";
import { toByte } from "../../util/toByte";

interface Props {
  accept?: string;
}

export default function App({ accept = "image/svg+xml" }: Props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const currentProject = useAppStore((s) => s.currentProject);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);
  const projects = useAppStore((s) => s.projects);
  const [spinning, setSpinning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<FileDto[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [activeDrop, setActiveDrop] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const abortController = React.useRef(new AbortController()).current;

  const [form] = Form.useForm();

  const onChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement> | any) => {
      const uploadFiles: FileDto[] = [];
      let selectFiles: File[] = [];

      if (event.type === "drop") {
        selectFiles = event.dataTransfer.files;
      } else {
        selectFiles = event.target.files;
      }

      if (selectFiles.length < 1) return;

      try {
        setSpinning(true);

        const uploadFileCount = selectFiles.length;

        for (let i = 0; i < uploadFileCount; i++) {
          const file = selectFiles[i];
          const data = await service.uploadFile({
            file
          });
          uploadFiles.push(data);
        }

        setUploadedFiles([...uploadedFiles, ...uploadFiles]);
      } catch (err: any) {
        console.error(err);
      } finally {
        setSpinning(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [uploadedFiles]
  );

  const removeFile = React.useCallback(
    (index: number) => {
      setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    },
    [uploadedFiles]
  );

  const handleButtonClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleGenerateIcon = React.useCallback(async () => {
    setUploading(true);
    if (!currentProject) {
      messageApi.error("Please select 'Project Name'");
      return;
    }
    try {
      for await (const file of uploadedFiles) {
        if (file.fileName && file.rawContents) {
          await service.generateIcon({
            fileName: file.fileName,
            contents: file.rawContents,
            projectName: currentProject.value,
            prefix: currentProject.prefix
          });
        }
      }
      setUploading(false);
      setUploadedFiles([]);
      navigate("/");
    } catch (err: any) {
      // await errorHandling(err);
      console.error(err);
    }
  }, [currentProject, messageApi, navigate, uploadedFiles]);

  const onDrop = React.useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      await onChange(e);
      setActiveDrop(false);
    },
    [onChange]
  );
  const onDragEnter = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const onDragLeave = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDrop(false);
  }, []);
  const onDragOver = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer!.files) {
      setActiveDrop(true);
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      project: currentProject?.value
    });
  }, [currentProject?.value, form]);

  return (
    <Container
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      {contextHolder}

      <input
        type="file"
        accept={accept}
        multiple
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />

      <FileListWrap activeDrop={activeDrop}>
        {uploadedFiles.length === 0 && <DragHere>Drag the file here.</DragHere>}
        <FileList>
          {uploadedFiles.map((file, key) => (
            <UploadedFile key={key}>
              <IconPreview {...dangerouslySetInnerHTML(file.rawContents)} />

              <MetaInfos>
                <LabelText label={"Name"}>{file.fileName}</LabelText>
                <LabelText label={"Size"}>{toByte(file.fileSize)}</LabelText>
              </MetaInfos>

              <Button size={"small"} danger onClick={() => removeFile(key)}>
                Delete
              </Button>
            </UploadedFile>
          ))}
        </FileList>
      </FileListWrap>

      <Toolbar>
        <Space size={5}>
          <Button type={"primary"} onClick={handleButtonClick} loading={spinning}>
            {"Select SVG Files"}
            {spinning && `(${progress}%)`}
          </Button>
          {spinning && (
            <Button
              type={"text"}
              danger
              onClick={() => {
                abortController.abort();
              }}
            >
              Cancel
            </Button>
          )}
        </Space>

        {(uploadedFiles.length > 0 || true) && (
          <Form form={form} layout={"inline"} onFinish={handleGenerateIcon}>
            <Form.Item
              name={"project"}
              label={"projectName"}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                options={projects ?? []}
                onChange={(value) => {
                  setCurrentProject(value);
                }}
                style={{ minWidth: 200 }}
              />
            </Form.Item>

            <Button
              type={"primary"}
              onClick={() => form.submit()}
              loading={uploading}
              disabled={!currentProject}
            >
              Generate Icon
            </Button>
          </Form>
        )}
      </Toolbar>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const FileListWrap = styled.div<{ activeDrop: boolean }>`
  flex: 1;
  overflow: auto;
  background: #eee;
  padding: 8px;
  position: relative;

  ${({ activeDrop }) => {
    if (activeDrop) {
      return css`
        background: #ccc;
        border: 3px dashed #888;
        transition: 0.3s all;
      `;
    }
  }}
`;

const Toolbar = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  border-top: 1px solid var(--border-color);
`;

const FileList = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const UploadedFile = styled.div`
  ${SMixinFlexColumn("center", "center")};
  padding: 16px 8px;
  border: 1px solid var(--border-color);
  font-size: 30px;
  border-radius: 8px;
  background: #fff;
  gap: 8px;
`;
const IconPreview = styled.div`
  width: auto;
  svg {
    width: 1em;
    height: 1em;
    display: block;
  }

  padding: 16px;
  border: 1px solid var(--border-color);
  background: var(--border-color);
  font-size: 30px;
`;

const MetaInfos = styled(LabelTextGroup)`
  font-size: 14px;
  flex-wrap: wrap;
`;

const DragHere = styled.div`
  height: 100%;
  flex: 1;
  ${SMixinFlexColumn("center", "center")};
`;
