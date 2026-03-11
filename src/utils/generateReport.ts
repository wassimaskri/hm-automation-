const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports/",
  reportPath: "reports/html-report/",
  metadata: {
    browser: { name: "chromium", version: "latest" },
    device: "Local test machine",
    platform: { name: "windows" },
  },
  customData: {
    title: "H&M Automation Test Report",
    data: [
      { label: "Project", value: "H&M E2E Automation" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "QA Technical Assessment" },
    ],
  },
});