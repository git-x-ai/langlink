const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs-extra");
const os = require("os");
const isDev = require("electron-is-dev");

// Prevent default browser opening
process.env.BROWSER = "none";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false, // Disable resizing
    frame: false, // Remove default window frame
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: false, // Disable developer tools and keyboard shortcuts
    },
    icon: path.join(__dirname, "../assets/logo.ico"),
    title: "LangLink v1.0",
    show: false,
    backgroundColor: "#1a1a1a", // Dark background
  });

  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Prevent opening external links in browser
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });

  // Prevent new window creation
  mainWindow.webContents.on("new-window", (event) => {
    event.preventDefault();
  });

  // Prevent navigation to external URLs
  mainWindow.webContents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (
      parsedUrl.origin !== "http://localhost:3000" &&
      parsedUrl.origin !== "file://"
    ) {
      event.preventDefault();
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Window control handlers
ipcMain.handle("window-minimize", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle("window-maximize", () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle("window-close", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle("window-is-maximized", () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// IPC handlers for file operations
ipcMain.handle("get-rules-directory", async () => {
  try {
    // In development, use the relative path. In production, use the extraResources path
    const rulesPath = isDev
      ? path.join(__dirname, "../../rules")
      : path.join(process.resourcesPath, "rules");

    const exists = await fs.pathExists(rulesPath);

    if (!exists) {
      throw new Error("Rules directory not found");
    }

    const folders = await fs.readdir(rulesPath);
    const ruleFolders = [];

    for (const folder of folders) {
      const folderPath = path.join(rulesPath, folder);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        const mdcFiles = await fs.readdir(folderPath);
        const mdcFileList = mdcFiles.filter((file) => file.endsWith(".mdc"));

        if (mdcFileList.length > 0) {
          ruleFolders.push({
            name: folder,
            path: folderPath,
            files: mdcFileList.map((file) => ({
              name: file,
              path: path.join(folderPath, file),
            })),
          });
        }
      }
    }

    return ruleFolders;
  } catch (error) {
    console.error("Error reading rules directory:", error);
    throw error;
  }
});

ipcMain.handle("download-selected-rules", async (event, selectedRules) => {
  try {
    const desktopPath = path.join(os.homedir(), "Desktop");
    const cursorPath = path.join(desktopPath, ".cursor");
    const rulesPath = path.join(cursorPath, "rules");

    // Create directories if they don't exist
    await fs.ensureDir(rulesPath);

    const downloadedFiles = [];

    for (const rule of selectedRules) {
      for (const file of rule.files) {
        const sourcePath = file.path;
        const fileName = file.name;
        const destPath = path.join(rulesPath, fileName);

        await fs.copy(sourcePath, destPath);
        downloadedFiles.push({
          name: fileName,
          path: destPath,
        });
      }
    }

    return {
      success: true,
      downloadedFiles,
      destinationPath: rulesPath,
    };
  } catch (error) {
    console.error("Error downloading rules:", error);
    throw error;
  }
});

ipcMain.handle("open-file-dialog", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "Select Rules Directory",
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }

  return null;
});
