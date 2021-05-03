import { app, BrowserWindow, ipcMain } from "electron";
import axios from "axios";
import { otp_url, otp_request_payload } from "./api";

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

//https://www.electronforge.io/config/plugins/webpack
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//https://stackoverflow.com/questions/51254618/how-do-you-handle-cors-in-an-electron-app

ipcMain.handle("otp", async (event, ...args) => {
  console.log("main: otp", event, args);
  try {
    const res = await axios.post(otp_url, otp_request_payload(args[0].email));
    console.log("main: otp result", res);
    return {
      data: res.data,
      error: null,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        data: null,
        error: err,
      };
    } else {
      console.warn(err);
    }
  }
});
