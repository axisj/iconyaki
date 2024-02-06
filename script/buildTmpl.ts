import * as fs from "fs";

const dirs = fs.readdirSync("src/renderer/src/iconyaki-react", { withFileTypes: true });

const raw = [];
dirs.forEach((dir) => {
  if (dir.isDirectory()) return;

  const contents = fs.readFileSync("src/renderer/src/iconyaki-react/" + dir.name, "utf-8");
  raw.push({
    fileName: dir.name,
    contents
  });
});

fs.writeFileSync("src/main/tmpl/files.json", JSON.stringify(raw));
