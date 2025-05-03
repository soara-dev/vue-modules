import path from 'path';
import { fileURLToPath } from 'url';
import { registerCommand } from '@soara/cli/src/templates/soara-registry.js';
import { copyTemplate } from '@soara/cli/src/utils/index.js';

registerCommand('load:module <name>', 'Load any data from modules [routes]', async (name) => {
  if (!name.includes(['routes'])) {
    console.log(`Unknown to load ${name}`);
    process.exit();
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, '../template/loaders');
  const fileNamePath = path.join('src/common/loaders');
  const targetPath = path.join(process.cwd(), fileNamePath);
  copyTemplate(templatePath, targetPath, '');

  console.log(`Success to load ${name}`);
});
