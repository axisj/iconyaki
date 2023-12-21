import * as React from "react";
import { Modal } from "antd";

export interface IConfirmDialogOptions {
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  content: React.ReactNode;
  message?: string;
  className?: string;
  width?: string | number;
}

export const confirmDialog = (
  options: IConfirmDialogOptions,
  isMounted?: React.MutableRefObject<boolean>,
): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    if (isMounted && !isMounted.current) {
      return resolve(true);
    }

    Modal.confirm({
      autoFocusButton: "ok",
      className: options.className,
      // okText: t.button.ok,
      // cancelText: t.button.cancel,
      title: options.title === null ? null : options.title || "Confirm",
      content: options.content || options.message || "Unknown error occurred",
      width: options.width,
      onOk() {
        resolve(true);
      },
      onCancel() {
        reject("confirm_cancel");
      },
    });
  });
