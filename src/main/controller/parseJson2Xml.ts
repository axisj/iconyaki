import * as xml2js from "xml2js";

const xmlBuilder = new xml2js.Builder({
  headless: true
});

async function parseJson2Xml(json: Record<string, any>): Promise<string> {
  return xmlBuilder.buildObject(json);
}

export default parseJson2Xml;
