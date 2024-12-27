import fs from "fs";
import path from "path";

export function generateCss(outputPath, cssContent) {
  // Ensure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Create directories recursively
  }

  // Write to the file (creates it if it doesn't exist)
  fs.writeFileSync(outputPath, cssContent, "utf-8");
  console.log(`Optimized CSS written to ${outputPath}`);
}
