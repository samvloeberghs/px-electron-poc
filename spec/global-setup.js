const Application = require('spectron').Application;
const path = require('path');

exports.getElectronPath = () => {
    let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
    if (process.platform === 'win32') electronPath += '.cmd';
    return electronPath;
};

setupTimeout = () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = process.env.CI ? 30000 : 10000;
};

exports.startApplication = (appPath, cb) => {

    setupTimeout();

    appPath = path.join(process.cwd(), appPath);
    app = new Application({
        path: appPath
    });
    app.start().then(cb);
    return app;
};

exports.stopApplication = (app, cb) => {
    if (!app || !app.isRunning()) return;

    return app.stop().then(() => {
        expect(app.isRunning()).toBeFalsy();
        app = null;
        cb();
    });
};