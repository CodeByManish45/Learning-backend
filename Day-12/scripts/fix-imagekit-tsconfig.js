const fs = require("fs");
const path = require("path");

const targetPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@imagekit",
  "nodejs",
  "src",
  "tsconfig.json"
);

if (!fs.existsSync(targetPath)) {
  console.log("ImageKit tsconfig not found, skipping patch.");
  process.exit(0);
}

const current = fs.readFileSync(targetPath, "utf8");

if (/"module"\s*:\s*"Node16"/.test(current)) {
  console.log("ImageKit tsconfig already patched.");
  process.exit(0);
}

if (!/"moduleResolution"\s*:\s*"node16"/.test(current)) {
  console.error("Unexpected ImageKit tsconfig format. Patch not applied.");
  process.exit(1);
}

const updated = current.replace(
  /(\r?\n)(\s*)"moduleResolution": "node16"/,
  '$1$2"module": "Node16",$1$2"moduleResolution": "node16"'
);

if (updated === current) {
  console.error("Failed to update ImageKit tsconfig.");
  process.exit(1);
}

fs.writeFileSync(targetPath, updated, "utf8");
console.log("Patched ImageKit tsconfig for Node16 module compatibility.");
