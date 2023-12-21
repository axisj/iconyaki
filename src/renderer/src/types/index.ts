export type ZustandSetter<T> = (partial: Partial<T>, replace?: boolean | undefined) => void;

export type ZustandGetter<T> = () => T;

export type StoreActions<T, R> = (set: ZustandSetter<T>, get: ZustandGetter<T>) => R;

export interface FileDto {
  fileName: string;
  fileSize: number;
  rawContents: string;
  jsonContents: Record<string, any>;
}

export interface Config {
  iconPrefix?: string;
  projectName?: string;
}
