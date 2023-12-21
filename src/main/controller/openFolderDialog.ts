import { IpcError } from "../IpcError";
import { dialog } from "electron";

async function openFolderDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory", "promptToCreate"]
  });
  if (!canceled) {
    return filePaths[0];
  }

  throw new IpcError(200, "cancel:dialog");
}

export default openFolderDialog;
