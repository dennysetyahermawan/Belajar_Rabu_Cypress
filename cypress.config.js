// const { defineConfig } = require("cypress");
const { defineConfig } = require("cypress");
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports",
      quiet: true,
      overwrite: true,
      html: true,
      json: true,
      embeddedScreenshots: true,
      charts: true,
      reportPageTitle: "Cypress Inline Report",
      inlineAssets: true,
    },
  },
  pageLoadTimeout: 60000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
      config.specPattern = [
        // "cypress/e2e/1-Belajar/karis/FT/Login.cy.js",
        // "cypress/e2e/1-Belajar/karis/Non_FT/API.cy.js",
        // "cypress/e2e/1-Belajar/Denny/FT/register.cy.js",
        "cypress/e2e/1-Belajar/Denny/FT/login.cy.js",
        // "cypress/e2e/1-Belajar/Denny/Non FT/API.cy.js",
      ];
      return config;
    },

    viewportHeight: 768,
    viewportWidth: 1500,
    experimentalStudio: true,
  },
});
