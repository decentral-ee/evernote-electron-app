const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://www.evernote.com/Home.action'

let mainWindow;

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
          nodeIntegration: false
        }
    });
    window.setMenuBarVisibility(false);
    window.loadURL(HOMEPAGE);

    window.webContents.on('will-navigate', (ev, url) => {
        if (!url.startsWith("https://www.evernote.com/") && 
            !url.startsWith("https://accounts.google.com/")) {
            ev.preventDefault();
            shell.openExternal(url);
        };
    });

    window.on('closed', () => {
        window = null;
        app.quit();       
    });
});
