import { shell } from "electron";

async function shellOpenPath(path: string) {
  await shell.openPath(path);
}

export default shellOpenPath;
