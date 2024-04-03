import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popconfirm } from "antd";
import * as React from "react";
import { IconBin, IconCopy } from "../../components/icon";
import { useIconsData } from "../../hooks/useIconsData";
import { IconyakiIcon } from "../../iconyaki-react/@types";
import Icon from "../../iconyaki-react/IconYaki";
import service from "../../service";
import { useAppStore } from "../../store/useAppStore";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { dangerouslySetInnerHTML } from "../../util/dangerouslySetInnerHTML";
import { copyToClipboard } from "../../util/dom/copyToClipboard";

interface Props {
  filter: string;
  getIcons: () => Promise<void>;
  icons: IconyakiIcon[];
  loading: boolean;
}

export function BrowserIconList({ filter, icons, getIcons, loading }: Props) {
  const currentProject = useAppStore((s) => s.currentProject);
  const iconSize = useAppStore((s) => s.iconSize);
  const iconColor = useAppStore((s) => s.iconColor);
  const iconBgColor = useAppStore((s) => s.iconBgColor);

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

  return (
    <Div>
      <IconList>
        {icons
          .filter((i) => {
            return i.componentName.toLowerCase().includes(filter.toLowerCase());
          })
          .map((icon, key) => {
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
                <IconWrap size={iconSize} color={iconColor} bgcolor={iconBgColor}>
                  <IconPreview />
                </IconWrap>
                <IconMeta onClick={() => copyToClipboard(icon.componentName)}>
                  <span
                    {...dangerouslySetInnerHTML(
                      icon.componentName.replace(
                        new RegExp(filter, "i"),
                        (match) => `<u>${match}</u>`
                      )
                    )}
                  />
                  <div className={"tools"}>
                    <IconCopy />
                  </div>
                </IconMeta>
              </IconCard>
            );
          })}
      </IconList>
    </Div>
  );
}

const Div = styled.div`
  overflow: auto;
  flex: 1;
  background: #eee;
  padding: 8px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`;
const IconList = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
`;

const IconCard = styled.div`
  ${SMixinFlexColumn("flex-start", "stretch")};
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  position: relative;

  .tools {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    display: none;
    background: #fff;
    border-radius: 50%;

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
const IconWrap = styled.div<{ size?: number; color?: string; bgcolor?: string }>`
  ${SMixinFlexColumn("center", "center")};
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  ${({ size = 24, color = "#1677ff", bgcolor = "#ffffff" }) => {
    return css`
      font-size: ${size}px;
      color: ${color};
      background-color: ${bgcolor};
    `;
  }}
`;
const IconMeta = styled.div`
  ${SMixinFlexRow("center", "center")};
  background: #f9fbff;
  position: relative;
  cursor: pointer;

  &:hover {
    background: #eef2ff;
  }

  flex: 1;
  font-size: 13px;
  padding: 6px 12px;
  min-height: 36px;
  word-break: break-all;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

  u {
    color: var(--red);
  }
`;
