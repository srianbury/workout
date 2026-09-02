const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
  },
});
