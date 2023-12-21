declare global {
  interface Window {
    electron: any;
    api: any;
  }
}

declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png" {
  const value: any;
  export = value;
}
declare module "*.ico";
declare module "*.svg";
declare module "*.json";
declare module "*.less";
