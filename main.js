const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://www.evernote.com/Home.action';
const OUTBOUND_REDIRECT_URL = 'https://www.evernote.com/OutboundRedirect.action?dest=';

let mainWindow;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
          nodeIntegration: false
        }
    });
    win.setMenuBarVisibility(false);
    win.loadURL(HOMEPAGE);

    win.webContents.on('will-navigate', (ev, url) => {
        console.debug("will-navigate", url);
        if (!url.startsWith("https://www.evernote.com/") &&
            !url.startsWith("https://accounts.evernote.com/") &&
            !url.startsWith("https://accounts.google.com/")) {
            ev.preventDefault();
            shell.openExternal(url);
        }
    });

    win.webContents.on('new-window', (ev, url) => {
        console.debug("new-window", url);
        if (url.startsWith(OUTBOUND_REDIRECT_URL)) {
            ev.preventDefault();
            let outboundUrl = decodeURIComponent(url.substring(OUTBOUND_REDIRECT_URL.length));
            console.debug("Redirect to outbound", outboundUrl);
            shell.openExternal(outboundUrl);
        }
    });

    win.on('closed', () => {
        win = null;
        app.quit();       
    });
});
