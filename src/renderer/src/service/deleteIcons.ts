import { JsonRepository } from "../util/JsonRepository";

export interface DeleteIconProps {
  projectName: string;
  id: string;
}

export const deleteIcons = async (props: DeleteIconProps) => {
  const jsonRepository = new JsonRepository(props.projectName);

  const data = await jsonRepository.read();

  data.icons = data.icons.filter((icon) => icon.id !== props.id);

  await jsonRepository.save(data);

  return data;
};
