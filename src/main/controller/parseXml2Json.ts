import * as xml2js from "xml2js";

async function parseXml2Json(xml: string): Promise<Record<string, any>> {
  return await xml2js.parseStringPromise(xml);
}

export default parseXml2Json;
