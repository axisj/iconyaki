export interface IconyakiIcon {
  id: string;
  fileName: string;
  componentName: string;
  tags: string[];
  rawFileContents: string;
}

export interface IconyakiData {
  icons: IconyakiIcon[];
}
