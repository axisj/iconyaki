import { JsonRepository } from "../util/JsonRepository";
import electronAPI from "../util/electronAPI";

export interface ExportIconProps {
  projectName: string;
  targetPath: string;
}

export const exportReactIcons = async (props: ExportIconProps) => {
  const jsonRepository = new JsonRepository(props.projectName);
  const data = await jsonRepository.read();

  await electronAPI.exportReactIcons(data.icons, props.targetPath);
};
