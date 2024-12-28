import postcss from "postcss";
import fs from "fs";
import path from "path";
import selectorParser from "postcss-selector-parser";

export async function extractCss(classes, tags, ids, cssPath, defaultCssPath) {
  if (!fs.existsSync(cssPath)) {
    return {
      variables: [],
      globalSelectors: [],
      combinedCss: "",
      error: "CSS file not found at the specified path",
    };
  }

  const cssContent = fs.readFileSync(cssPath, "utf-8");
  const usedCss = [];
  const globalSelectors = [];
  const cssVariables = [];

  // Create a PostCSS plugin to extract required classes, tags, and global selectors
  const extractClassesAndGlobalSelectorsPlugin = postcss.plugin("extract-classes-global-selectors", () => {
    return (root) => {
      root.walkRules((rule) => {
        const selector = rule.selector;

        // Check for classes and tags and ids
        selectorParser((selectors) => {
          selectors.walkClasses((classNode) => {
            if (classes.includes(classNode.value)) {
              usedCss.push(rule.toString());
            }
          });

          selectors.walkTags((tagNode) => {
            if (tags.includes(tagNode.value)) {
              usedCss.push(rule.toString());
            }
          });

          selectors.walkIds((idNode) => {
            if (ids.includes(idNode.value)) {
              usedCss.push(rule.toString());
            }
          });

          // Check for global selectors (like *, body, html)
          if (selector === "*" || selector === "body" || selector === "html") {
            globalSelectors.push(rule.toString());
          }
        }).processSync(selector);

        // Extract CSS variables (defined as --variable-name)
        rule.walkDecls((decl) => {
          if (decl.prop.startsWith("--")) {
            cssVariables.push(decl.toString());
          }
        });
      });
    };
  });
  

  // Process the main CSS file with the custom plugin
  await postcss([extractClassesAndGlobalSelectorsPlugin]).process(cssContent, { from: cssPath });

  // Initialize default CSS content
  let defaultCssContent = "";

  // Check if defaultCssPath is defined and the file exists
  if (defaultCssPath) {
    if (fs.existsSync(defaultCssPath)) {
      defaultCssContent = fs.readFileSync(defaultCssPath, "utf-8");
    } else {
      console.warn(`Default CSS file not found at ${defaultCssPath}`);
    }
  }

  const finalCss =
    cssVariables.length > 0
      ? `:root {\n  ${cssVariables.join("\n  ")}\n}\n\n${globalSelectors.join("\n")}\n\n${usedCss.join("\n")}`
      : `${globalSelectors.join("\n")}\n\n${usedCss.join("\n")}`;

  // Combine everything (variables, global selectors, and the extracted CSS)
  return {
    variables: cssVariables,
    globalSelectors: globalSelectors,
    combinedCss: defaultCssContent + "\n" + finalCss,
  };
}
