export interface IconyakiIcon {
  id: string;
  fileName: string;
  componentName: string;
  tags: string[];
  viewBox: string;
  svgBody: string;
}

export interface IconyakiData {
  icons: IconyakiIcon[];
}
