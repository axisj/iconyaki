import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { IElectronAPI } from "../renderer/src/env";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    contextBridge.exposeInMainWorld("electronAPI", {
      openFolder: async () => {
        return (await ipcRenderer.invoke("dialog:openFolder")) as string;
      },
      parseXml2Json: async (xml) => {
        return await ipcRenderer.invoke("fn:parseXml2Json", xml);
      },
      parseJson2Xml: async (json) => {
        return (await ipcRenderer.invoke("fn:parseJson2Xml", json)) as string;
      },
      exportReactIcons: async (icons, targetPath) => {
        await ipcRenderer.invoke("fn:exportReactIcons", icons, targetPath);
      },
      openPath: async (path) => {
        await ipcRenderer.invoke("shell:openPath", path);
      }
    } as IElectronAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  (window as any).electron = electronAPI;
  (window as any).api = api;
}
