const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let firstMainWindow;
let secondMainWindow;

const createWindow = (file, shown, width, height) => {
    let window = new BrowserWindow({
        width: width,
        height: height,
        show: shown
    });

    let url = 'http://localhost:8080/'+file;
    window.loadURL(url);

    return window;
};

const startup = () => {
    firstMainWindow = createWindow('index_1.html', true, 400, 200);
    firstMainWindow.on('closed', () => {
        console.log('closing first main window');
        firstMainWindow = null;
    });

    setTimeout(() => {
        secondMainWindow = createWindow('index_2.html', false, 800, 400);
        secondMainWindow.on('closed', () => {
            console.log('closing second main window');
            secondMainWindow = null;
            app.quit();
        });

        setTimeout(() => {
            // show the second window
            // close the first
            console.log('showing second main window');
            secondMainWindow.show();
            firstMainWindow.close();
        }, 2000);
    }, 2000);
};

app.on('ready', startup);

app.on('activate', () => {
    if (firstMainWindow === null) {
        startup();
    }
});