import { JsonRepository } from "../util/JsonRepository";

export interface GetIconProps {
  projectName?: string;
}

export const getIcons = async ({ projectName }: GetIconProps) => {
  if (!projectName) {
    throw new Error("projectName is required");
  }

  const jsonRepository = new JsonRepository(projectName);
  return jsonRepository.read();
};
