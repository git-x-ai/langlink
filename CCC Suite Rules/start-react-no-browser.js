const { spawn } = require("child_process");
const path = require("path");

// Set environment variable to prevent browser opening
process.env.BROWSER = "none";

// Start React development server
const reactProcess = spawn("npm", ["start"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    BROWSER: "none",
  },
});

reactProcess.on("error", (error) => {
  console.error("Failed to start React server:", error);
});

reactProcess.on("exit", (code) => {
  console.log(`React server exited with code ${code}`);
});
