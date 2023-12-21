import { IconyakiData } from "../iconyaki-react/@types";
import { get, set } from "idb-keyval";

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()) // or with spread: value: [...value]
    };
  }
  return value;
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

export class JsonRepository {
  private projectName: string;

  constructor(projectName: string) {
    this.projectName = projectName;
  }

  public async read(): Promise<IconyakiData> {
    const value: string | undefined = await get(this.projectName);
    try {
      return (value ? JSON.parse(value, reviver) : { icons: [] }) as IconyakiData;
    } catch (e) {
      console.error(`${this.projectName} getItem`, e);
      return { icons: [] } as IconyakiData;
    }
  }

  public async save(data: IconyakiData): Promise<void> {
    await set(this.projectName, JSON.stringify(data, replacer));
  }
}
