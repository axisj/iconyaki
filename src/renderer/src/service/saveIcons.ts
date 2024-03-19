import {IconyakiIcon} from "../iconyaki-react/@types";
import { JsonRepository } from "../util/JsonRepository";

export interface SaveIconProps {
  projectName: string;
  icons: IconyakiIcon[];
}

export const saveIcons = async (props: SaveIconProps) => {
  const jsonRepository = new JsonRepository(props.projectName);

  const data = await jsonRepository.read();
  await jsonRepository.save({ ...data, icons: props.icons});

  return data;
};
