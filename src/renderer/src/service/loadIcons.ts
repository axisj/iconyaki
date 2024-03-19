import electronAPI from "../util/electronAPI";

export interface LoadIconProps {
  targetPath?: string;
}

export const loadIcons = async ({ targetPath }: LoadIconProps) => {
  if (!targetPath) {
    throw new Error("projectName is required");
  }

  return await electronAPI.getReactIcons(targetPath);
};
