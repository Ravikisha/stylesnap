import fs from "fs";
import path from "path";
import {glob} from "glob";

export function extractClassesAndTagsFromFiles(filePaths) {
  const classRegex = /\bclass(?:Name)?=["']([^"']+)["']/g;
  const tagRegex = /<([a-zA-Z0-9-]+)/g; // Matches any HTML tag name
  const idRegex = /id=["']([^"']+)["']/g;
  const classes = new Set();
  const tags = new Set();
  const ids = new Set();

  filePaths.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract classes
    let match;
    while ((match = classRegex.exec(content)) !== null) {
      match[1].split(/\s+/).forEach((cls) => classes.add(cls.trim()));
    }

    // Extract tags
    while ((match = tagRegex.exec(content)) !== null) {
      tags.add(match[1].toLowerCase()); // Normalize tag names to lowercase
    }

    // Extract ids
    while ((match = idRegex.exec(content)) !== null) {
      ids.add(`#${match[1]}`);
    }
  });

  return {
    classes: Array.from(classes),
    tags: Array.from(tags),
    ids: Array.from(ids),
  };
}

export function getFilesFromGlob(globPatterns) {
  return globPatterns.flatMap((pattern) => glob.sync(pattern));
}
