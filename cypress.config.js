//const { defineConfig } = require("cypress");
// cypress.config. js
const { defineConfig } = require("cypress");
const { loadDBPlugin } = require("./cypress/plugins/dbPlugin");
module.exports = defineConfig({

  e2e: {
    watchForFileChanges: false,
    defaultCommandTimeout: 4000,

    chromeWebSecurity: false, // Disables certain security features
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', loadDBPlugin(config));
    },
    env: {
      DB_USER: "DPE_TTMS",
      DB_PASSWORD: "password",
      DB_CONNECTSTRING: "43.243.207.196:1521/ipemis_pdb",
    },
    // supportFile: 'cypress/support/e2e.js',

  },
});

