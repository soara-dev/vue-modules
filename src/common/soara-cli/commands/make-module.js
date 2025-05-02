import path from "path";
import { fileURLToPath } from "url";
import { registerCommand } from "@soara/cli/src/templates/soara-registry.js";
import { copyTemplate, camelize } from "@soara/cli/src/utils/index.js";

registerCommand("make:module <name>", "Create make:module", async (name) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, "../template/module");
  const fileNamePath = path.join("src/modules", camelize(name));
  const targetPath = path.join(process.cwd(), fileNamePath);
  copyTemplate(templatePath, targetPath, name);
});
