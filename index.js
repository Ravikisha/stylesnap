import fs from "fs";
import cleanCSS from "clean-css";
import { Command } from "commander";
import {
  extractClassesAndTagsFromFiles,
  getFilesFromGlob,
} from "./lib/parser.js";
import { extractCss } from "./lib/extractor.js";
import { generateCss } from "./lib/generator.js";

async function main() {
  const program = new Command();

  program
    .option("--init", "Initialize the configuration file")
    .option("-c, --content <globPattern>", "Glob pattern for content files")
    .option("-C, --css <cssPath>", "Path to the CSS file")
    .option("-d, --defaultCss <defaultCssPath>", "Path to the default CSS file")
    .option("-o, --output <outputPath>", "Path to the output file")
    .option("--minifyCss", "Minify the final CSS");

  program.parse(process.argv);
  let options = program.opts();

  const currentDir = process.cwd();
  const configPath = currentDir + "/stylesnap.config.json";

  if (options.init && !fs.existsSync(configPath)) {
    fs.copyFileSync("./config.default.json", "./stylesnap.config.json");
    console.log("Configuration file initialized");
    console.log(
      "Please update the stylesnap.config.json file with the required configuration"
    );
    console.log("Re-run the command without the --init flag");
    return;
  }

  if (options.init && fs.existsSync(configPath)) {
    console.log(
      "Configuration file already exists. Please update the stylesnap.config.json file with the required configuration"
    );
    return;
  }

  if (!fs.existsSync(configPath)) {
    console.error(
      "Configuration file not found. Please run the command with --init flag to initialize the configuration file"
    );
    return;
  }

  const config = JSON.parse(
    fs.readFileSync("./stylesnap.config.json", "utf-8")
  );

  let filePathsString = [];
  if (options.content) {
    filePathsString.push(options.content);
  } else {
    filePathsString = config.content;
  }

  function mergeObjects(obj1, obj2) {
    // Iterate over each key in obj2
    for (const key in obj2) {
      // Only add the key-value pair from obj2 if it does not exist in obj1
      if (!(key in obj1)) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  }

  options = mergeObjects(options, config);

  const filePaths = getFilesFromGlob(filePathsString);

  if (filePaths.length === 0) {
    console.error("No content files found with the specified glob pattern");
    return;
  }

  const { classes, tags, ids } = extractClassesAndTagsFromFiles(filePaths);

  // Extract the required CSS
  const { variables, globalSelectors, combinedCss, error } = await extractCss(
    classes,
    tags,
    ids,
    options.css, // Assuming you only want to process one CSS file
    options.defaultCss || null
  );

  if (error) {
    console.error(error);
    return;
  }

  if (options.minifyCss) {
    // Generate the final optimized CSS
    const minifiedCss = new cleanCSS().minify(combinedCss).styles;
    generateCss(options.output, minifiedCss);
    return;
  }

  // Generate the final CSS
  generateCss(options.output, combinedCss);
}

main().catch((err) => console.error(err));
