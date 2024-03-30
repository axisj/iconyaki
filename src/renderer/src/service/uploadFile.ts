import {FileDto} from "../types";
import {arrayBufferToString} from "../util/arrayBufferToString";
import electronAPI from "../util/electronAPI";

export interface UploadFileProps {
  file: File;
}

export const uploadFile = async ({ file }: UploadFileProps) => {
  const buffer = await file.arrayBuffer();
  const xml = arrayBufferToString(buffer);
  const fileName = file.name;
  const fileSize = file.size;
  const jsonContents = await electronAPI.parseXml2Json(xml);

  const { $, metadata, title, desc, ...rest } = jsonContents.svg;

  const trimJson: Record<string, any> = {
    svg: {
      $: {
        xmlns: $.xmlns,
        viewBox: $.viewBox,
      },
      ...rest
    }
  };

  const trimXml = await electronAPI.parseJson2Xml(trimJson);

  const uploadedFile: FileDto = {
    fileName,
    fileSize,
    rawContents: trimXml,
    jsonContents: trimJson
  };

  return uploadedFile;
};
