# Stylesnap

<p float="left">
  <img src="https://img.shields.io/npm/v/stylesnap?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/stylesnap?style=flat-square" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/ravikishan/stylesnap?style=flat-square" alt="license" />
  <img src="https://img.shields.io/github/stars/ravikishan/stylesnap?style=flat-square" alt="stars" />
  <img src="https://img.shields.io/github/forks/ravikishan/stylesnap?style=flat-square" alt="forks" />
  <img src="https://img.shields.io/github/issues/ravikishan/stylesnap?style=flat-square" alt="issues" />
</p>

<p float="left">
    <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript" alt="JavaScript ES6" />
    <img src="https://img.shields.io/badge/Node.js-14.x-green?style=flat-square&logo=node.js" alt="Node.js 14.x" />
    <img src="https://img.shields.io/badge/npm-7.x-red?style=flat-square&logo=npm" alt="npm 7.x" />
    <img src="https://img.shields.io/badge/HTML5-orange?style=flat-square&logo=html5" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-blue?style=flat-square&logo=css3" alt="CSS3" />
    <img src="https://img.shields.io/badge/JSON-lightgrey?style=flat-square&logo=json" alt="JSON" />
</p>
Stylesnap is a powerful CSS optimization tool designed to reduce the size of your CSS files by analyzing your content files and extracting only the necessary class names, tags, and global selectors. It generates a minimal CSS file tailored to your project, improving web performance and reducing unnecessary styles.

## Features
- Extracts class names and tags from your HTML/JSX files.
- Optimizes and minimizes CSS files based on your usage.
- Supports custom configuration via `stylesnap.config.json`.
- Works seamlessly with frameworks like Bootstrap, TailwindCSS, and custom CSS.
- Generates a minified CSS file for better performance.

## Installation

Install Stylesnap as a development dependency using npm:

```bash
npm install stylesnap --save-dev
```

Alternatively, use npx to run it directly:

```bash
npx stylesnap
```

## Usage

Stylesnap can be used via the command line. It supports multiple options for flexibility and customization.

### Command-Line Options

```bash
npx stylesnap [options]
```

#### Options:

- `--init`
  - Initializes the configuration file `stylesnap.config.json`.
  - Example:
    ```bash
    npx stylesnap --init
    ```

- `-c, --content <globPattern>`
  - Glob pattern to specify content files to scan for class names and tags.
  - Example:
    ```bash
    npx stylesnap -c "./src/**/*.html"
    ```

- `-C, --css <cssPath>`
  - Path to the main CSS file to optimize.
  - Example:
    ```bash
    npx stylesnap -C "./src/styles.css"
    ```

- `-d, --defaultCss <defaultCssPath>`
  - Path to a default CSS file to include in the output.
  - Example:
    ```bash
    npx stylesnap -d "./src/default.css"
    ```

- `-o, --output <outputPath>`
  - Path to save the generated optimized CSS file.
  - Example:
    ```bash
    npx stylesnap -o "./dist/optimized.css"
    ```

- `--minifyCss`
  - Minifies the final CSS file for optimal performance.
  - Example:
    ```bash
    npx stylesnap --minifyCss
    ```

## Configuration

Stylesnap uses a configuration file named `stylesnap.config.json` to customize its behavior. Below is an example configuration:

```json
{
  "content": ["./src/**/*.html", "./src/**/*.jsx"],
  "css": "./node_modules/bootstrap/dist/css/bootstrap.css",
  "defaultCss": "./src/styles.css",
  "output": "./dist/optimized.css",
  "minify": true
}
```

### Configuration Fields

- **`content`**: An array of glob patterns to specify the content files where class names and tags are extracted.
- **`css`**: Path to the main CSS file to optimize.
- **`defaultCss`**: Path to the default CSS file to include in the output.
- **`output`**: Path to save the generated CSS file.
- **`minify`**: Boolean to indicate whether to minify the final CSS.

## Example Workflow

1. Initialize the configuration file:
   ```bash
   npx stylesnap --init
   ```

2. Update `stylesnap.config.json` with your project-specific settings:

   ```json
   {
     "content": ["./src/**/*.html", "./src/**/*.jsx"],
     "css": "./node_modules/bootstrap/dist/css/bootstrap.css",
     "defaultCss": "./src/styles.css",
     "output": "./dist/optimized.css",
     "minify": true
   }
   ```

3. Run Stylesnap:
   ```bash
   npx stylesnap
   ```

4. The optimized CSS file will be saved at the path specified in the `output` field (e.g., `./dist/optimized.css`).

## Benefits
- Reduces CSS file size, improving page load speed.
- Eliminates unused CSS, enhancing maintainability.
- Works out of the box with popular CSS frameworks like Bootstrap and TailwindCSS.
- Customizable to fit any project structure or requirement.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Developed by Ravi Kishan ([ravikishan63392@gmail.com](mailto:ravikishan63392@gmail.com)).

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request on the [GitHub repository](#).

---

Start optimizing your CSS today with Stylesnap! 🚀

