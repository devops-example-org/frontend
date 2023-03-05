// const CLIOptions =  require( 'aurelia-cli').CLIOptions;
// const aureliaConfig = require('./aurelia_project/aurelia.json');
// const PORT = CLIOptions.getFlagValue('port') || aureliaConfig.platform.port;
// const HOST = CLIOptions.getFlagValue('host') || aureliaConfig.platform.host;

// module.exports = {
//   config: {
//     //baseUrl: `http://${HOST}:${PORT}`,
//     baseUrl: `http://127.0.0.1:8080`, //DevSkim: ignore DS137138 
//     retries: { "runMode": 3, "openMode": 5 },
//     trashAssetsBeforeRuns: false,
//     video: true,
//     experimentalInteractiveRunEvents: true,
//     experimentalSessionAndOrigin: true,
//     experimentalStudio: true,
//   }
// };

import { defineConfig } from "cypress";
import * as browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";

export async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    preprocessor(config, {
      ...browserify.defaultOptions,
      typescript: require.resolve("typescript"),
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: `http://127.0.0.1:8080`, //DevSkim: ignore DS137138 
    specPattern: "**/*.feature",
    supportFile: false,
    video: true,
    setupNodeEvents,
    chromeWebSecurity: false
  },
});
