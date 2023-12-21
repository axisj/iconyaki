import { getReactTemplate } from "../tmpl/iconTemplate";
import fs from "fs";
import { writeFile } from "fs/promises";
import files from "../tmpl/files.json";

export interface IconyakiIcon {
  id: string;
  fileName: string;
  componentName: string;
  tags: string[];
  viewBox: string;
  svgBody: string;
}

async function exportReactIcons(icons: IconyakiIcon[], targetPath: string) {
  for await (const file of files) {
    await writeFile(targetPath + "/" + file.fileName, file.contents, "utf-8");
  }

  if (!fs.existsSync(targetPath + "/files")) {
    fs.mkdirSync(targetPath + "/files");
  }

  for await (const icon of icons) {
    const fileContents = getReactTemplate({
      fileName: icon.fileName,
      viewBox: icon.viewBox,
      contents: icon.svgBody
    });
    const path = targetPath + "/files/" + icon.componentName + ".tsx";
    await writeFile(path, fileContents, "utf-8");
  }

  // write index
  await writeFile(
    targetPath + "/index.tsx",
    Array.from(new Set(icons.map((icon) => icon.componentName)))
      .map((componentName) => {
        return `export { default as ${componentName} } from "./files/${componentName}";`;
      })
      .join("\n"),
    "utf-8"
  );

  // write data.json
  await writeFile(targetPath + "/data.json", JSON.stringify(icons), "utf-8");
}

export default exportReactIcons;
