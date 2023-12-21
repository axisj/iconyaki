import * as React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export interface IErrorDialogOptions {
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  content: string | React.ReactNode;
  message?: string;
  code?: number;
  className?: string;
  width?: string | number;
}

export const errorDialog = (
  options: IErrorDialogOptions,
  isMounted?: React.MutableRefObject<boolean>,
): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    if (isMounted && !isMounted.current) {
      return resolve(true);
    }

    let dialogConfig: IErrorDialogOptions = {
      content: "",
    };

    if (options.code) {
      options.content = options.message ? ` [${options.message}]` : "";
    }

    if (!options.code) {
      options.title = "Error";
    }

    dialogConfig = { ...options };

    Modal.error({
      icon: dialogConfig.icon === null ? null : dialogConfig.icon || <CloseCircleOutlined />,
      autoFocusButton: "ok",
      className: dialogConfig.className,
      title: dialogConfig.title ?? `Error ${options.code}`,
      content: <>{dialogConfig.content || options.message || "Unknown error occurred"} </>,
      centered: true,
      width: dialogConfig.width,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
