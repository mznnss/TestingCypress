const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  retries: { runMode: 1, openMode: 0 },
  video: false,
  env: {
    loginName: "mizanzulmi1508",
    registeredEmail: "mizanzulmi1508@gmail.com",
    password: "QaTest123!",
  },
  e2e: {
    baseUrl: "https://automationteststore.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
