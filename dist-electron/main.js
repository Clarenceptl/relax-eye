import { app, BrowserWindow, ipcMain, powerMonitor } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("focus-main-window", () => {
  const win2 = BrowserWindow.getAllWindows()[0];
  if (!win2) {
    return;
  }
  if (win2.isMinimized()) {
    win2.restore();
  }
  const timeout = setTimeout(() => {
    win2.focus();
    win2.setAlwaysOnTop(true, "screen-saver");
    clearTimeout(timeout);
  }, 1e3);
});
app.whenReady().then(createWindow).then(() => {
  const win2 = BrowserWindow.getAllWindows()[0];
  powerMonitor.on("suspend", () => {
    win2 == null ? void 0 : win2.webContents.send("clear-timer");
  });
  powerMonitor.on("lock-screen", () => {
    win2 == null ? void 0 : win2.webContents.send("clear-timer");
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
