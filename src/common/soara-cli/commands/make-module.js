const { registerCommand } = require('@soara/cli/src/templates/soara-registry');

registerCommand('make:module', 'Create make:module', async (name) => {
  console.log('Hello make:module');
});
