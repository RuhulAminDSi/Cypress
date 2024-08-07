const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    watchForFileChanges: false,
    defaultCommandTimeout: 4000,
    env:{
      bundleId: 785
    },
    chromeWebSecurity: false, // Disables certain security features
    setupNodeEvents(on, config) {
     
    },
     supportFile: 'cypress/support/e2e.js'
    
  },
});
