const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let firstMainWindow;
let secondMainWindow;

function createWindow(file, shown, width, height) {
    let window = new BrowserWindow({
        width: width,
        height: height,
        show: shown
    });

    window.loadURL(url.format({
        pathname: path.join(__dirname, file),
        protocol: 'file:',
        slashes: true
    }));

    return window;
}

app.on('ready', () => {
    firstMainWindow = createWindow('index_1.html', true, 400, 200);
    firstMainWindow.on('closed', () => {
        console.log('closing first main window');
        firstMainWindow = null;
    });

    setTimeout(()=> {
        secondMainWindow = createWindow('index_2.html', false, 800, 400);
        secondMainWindow.on('closed', () => {
            console.log('closing second main window');
            secondMainWindow = null;
        });

        setTimeout(() => {
            // show the second window
            // close the first
            console.log('showing second main window');
            secondMainWindow.show();
            firstMainWindow.close();
        }, 5000);
    }, 5000);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (firstMainWindow === null) {
        createWindow();
    }
});