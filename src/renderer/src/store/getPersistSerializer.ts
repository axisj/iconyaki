import { del, get, set } from "idb-keyval";
import { PersistOptions, StorageValue } from "zustand/middleware";

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
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

export function getPersistSerializer<T>(
  storeName: string,
  storeVersion: number = 1,
): PersistOptions<T> {
  return {
    version: storeVersion,
    name: `store-${storeName}`,
    migrate: async (state: any, version: number) => {
      console.log(`store-${storeName} migrate`, version);
      return state;
    },
    storage: {
      getItem: async (name) => {
        const value: string | undefined = await get(name);

        try {
          const storageValue = value
            ? JSON.parse(value, reviver)
            : { state: {} };

          storageValue.state.loaded = false;

          return storageValue;
        } catch (e) {
          console.error(`store-${storeName} getItem`, name, e);
          return null;
        }
      },
      setItem: async (name, value) => {
        await set(name, JSON.stringify(value, replacer));
      },
      removeItem: async (name) => {
        await del(name);
      },
    },
  };
}
