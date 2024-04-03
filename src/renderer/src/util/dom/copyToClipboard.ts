import { message } from "antd";
import { writeTextClipboard } from "./writeTextClipboard";

const copyToClipboard = async (text?: string | number | null) => {
  if (!text) return;
  try {
    await writeTextClipboard(`${text}`);
    message.info("Copied successfully");
  } catch (err) {
    console.error(err);
  }
};

export { copyToClipboard };
