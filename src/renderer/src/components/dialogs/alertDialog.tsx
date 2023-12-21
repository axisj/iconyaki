import * as React from "react";
import { Modal } from "antd";
import { dangerouslySetInnerHTML } from "../../util/dangerouslySetInnerHTML";

export interface IAlertDialogOptions {
  title?: string | React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const alertDialog = (
  options: IAlertDialogOptions,
  isMounted?: React.MutableRefObject<boolean>,
): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    if (isMounted && !isMounted.current) {
      return resolve(true);
    }

    const modalContent =
      typeof options.content === "string" ? (
        <span
          {...dangerouslySetInnerHTML(
            options.content.replace(/[<>\\/'"-]/g, "\\$&"),
          )}
        />
      ) : (
        options.content
      );

    Modal.info({
      autoFocusButton: "ok",
      className: options.className,
      // okText: t.button.ok,
      // cancelText: t.button.cancel,
      title: options.title ?? "Alert",
      content: options.content ? modalContent : "",
      centered: true,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
