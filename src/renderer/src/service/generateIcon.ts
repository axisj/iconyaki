import { pascalCase } from "change-case";
import { v4 as uuidv4 } from "uuid";
import { JsonRepository } from "../util/JsonRepository";
import electronAPI from "../util/electronAPI";

export interface GenerateIconProps {
  fileName: string;
  contents: string;
  projectName: string;
  prefix: string;
}

export const generateIcon = async ({
  fileName,
  contents,
  projectName,
  prefix
}: GenerateIconProps) => {
  if (!projectName) {
    throw new Error("projectName is required");
  }

  const jsonRepository = new JsonRepository(projectName);
  const data = await jsonRepository.read();

  const _fileName = fileName.replace(/\.svg$/, "");
  const componentName = pascalCase(prefix + "_" + _fileName);

  const jsonContents = await electronAPI.parseXml2Json(contents);

  const { $ } = jsonContents.svg;

  const svgBody = contents.replace(/<svg .*>/g, "").replace(/<\/svg>/g, "");

  const existIconIndex = data.icons.findIndex((icon) => icon.componentName === componentName);

  if (existIconIndex === -1) {
    data.icons.push({
      id: uuidv4(),
      fileName: componentName + ".tsx",
      componentName,
      tags: [],
      viewBox: $.viewBox,
      svgBody
    });
  } else {
    data.icons[existIconIndex] = {
      ...data.icons[existIconIndex],
      viewBox: $.viewBox,
      svgBody
    };
  }

  await jsonRepository.save(data);

  return {};
};
