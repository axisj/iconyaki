/// <reference types="vite/client" />

import { IconyakiIcon } from "./iconyaki-react/@types";

export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  openFolder: () => Promise<string>;
  parseXml2Json: (xml: string) => Promise<Record<string, any>>;
  parseJson2Xml: (json: Record<string, any>) => Promise<string>;
  exportReactIcons: (icons: IconyakiIcon[], targetPath: string) => Promise<void>;
  getReactIcons: (targetPath: string) => Promise<IconyakiIcon[]>;
  openPath: (path: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
