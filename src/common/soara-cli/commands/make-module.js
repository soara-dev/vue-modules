const path = require("path");
const { registerCommand } = require("@soara/cli/src/templates/soara-registry");
const { copyTemplate, camelize } = require("@soara/cli/src/utils");

registerCommand("make:module <name>", "Create make:module", async (name) => {
  const templatePath = path.join(__dirname, "../template/module");
  const fileNamePath = path.join("src/modules", camelize(name));
  const targetPath = path.join(process.cwd(), fileNamePath);
  copyTemplate(templatePath, targetPath, name);
});
