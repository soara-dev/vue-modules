import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const safeImport = async (routePath) => {
  try {
    const route = await import(routePath);
    return route.default || route;
  } catch (err) {
    return null;
  }
};

export const getModuleRoutes = async (options = {}) => {
  let { global, local, config } = options;

  if (!global) global = 'src/common/routes/routes.js';
  if (!local) local = 'src/modules/__module__/common/routes/routes.js';
  if (!config) config = 'src/modules/**/common/config/app.js';

  const globOptions = { absolute: true, cwd: __dirname };
  const moduleConfigs = glob.sync(path.join(process.cwd(), config), globOptions);
  const globalRoutes = await safeImport(pathToFileURL(global));

  const routesLoader = await Promise.all(
    moduleConfigs.map(async (conf) => {
      const dataConfig = await safeImport(pathToFileURL(conf));
      if (!dataConfig.enabled) return null;

      const localPath = path.join(process.cwd(), local.replace('__module__', dataConfig.name));
      const moduleRoutes = await safeImport(pathToFileURL(localPath));

      return moduleRoutes || [];
    })
  );

  const routes = [...(globalRoutes || []), ...routesLoader.filter(Boolean).flat()];
  return routes;
};
