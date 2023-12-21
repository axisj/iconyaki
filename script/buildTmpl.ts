import * as fs from "fs";

const dirs = fs.readdirSync("src/renderer/src/iconyaki-react");

const raw = [];
dirs.forEach((dir) => {
  const contents = fs.readFileSync("src/renderer/src/iconyaki-react/" + dir, "utf-8");
  raw.push({
    fileName: dir,
    contents
  });
});

fs.writeFileSync("src/main/tmpl/files.json", JSON.stringify(raw));
