import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Config, StoreActions } from "../types";
import { getPersistSerializer } from "./getPersistSerializer";

interface Project {
  label: string;
  value: string;
  prefix: string;
  folder?: string;
}

export interface AppModel {
  loaded: boolean;
  width: number;
  height: number;
  currentProject?: Project;
  projects?: Project[];
  openSettings: boolean;
}

export interface AppActions {
  setLoaded: (loaded: boolean) => void;
  setWidthHeight: (width: number, height: number) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (value?: string) => void;
  setOpenSettings: (open: boolean) => void;
}

export interface AppStore extends AppModel, AppActions {}

export const appInitialState: AppModel = {
  loaded: true,
  width: 0,
  height: 0,
  openSettings: false
};

const getAppStoreActions: StoreActions<AppModel & AppActions, AppActions> = (set, get) => ({
  setLoaded: (loaded) => set({ loaded }),
  setWidthHeight: (width, height) => set({ width, height }),
  setProjects: (projects) => {
    set({ projects });
  },
  setCurrentProject: (value) => {
    const project = get().projects?.find((p) => p.value === value);
    set({ currentProject: project });
  },
  setOpenSettings: (open) => set({ openSettings: open })
});

export const useAppStore = create<AppStore>(
  persist(
    (set, get) => ({
      ...appInitialState,
      ...getAppStoreActions(set, get)
    }),
    getPersistSerializer<AppStore>("app", 1)
  ) as StateCreator<AppStore>
);
