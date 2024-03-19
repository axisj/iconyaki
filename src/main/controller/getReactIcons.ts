import fs from "fs";
import {readFile} from "fs/promises";
import {IconyakiIcon} from "./exportReactIcons";

async function syncReactIcons(targetPath: string) {

  if (!fs.existsSync(targetPath + "/data.json")) {
    throw new Error("data.json not found");
  }

  const data = await readFile(targetPath + "/data.json", "utf-8");

  try{
    const icons: IconyakiIcon[] = JSON.parse(data);
    return icons;
  } catch (e: any) {
    throw new Error(e);
  }
}

export default syncReactIcons;
