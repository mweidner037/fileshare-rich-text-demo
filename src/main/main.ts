import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { handleCallMain } from "./receive_ipc";
import { callRenderer, setupCallRenderer } from "./send_ipc";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  setupCallRenderer(win);
  void win.loadFile("build/renderer/index.html");
};

app.on("window-all-closed", () => {
  app.quit();
});

void app.whenReady().then(() => {
  ipcMain.handle("callMain", handleCallMain);
  createWindow();

  // TODO: replace below with main code.
  setTimeout(() => callRenderer("tick", Date.now(), "from main"), 1000);
});
