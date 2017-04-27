const Application = require('spectron').Application
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');

chai.should();
chai.use(chaiAsPromised);

exports.getElectronPath = () => {
    let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
    if (process.platform === 'win32') electronPath += '.cmd';
    return electronPath;
};

exports.setupTimeout = (test) => {
    test.timeout(process.env.CI ? 30000 : 10000);
};

exports.startApplication = (options) => {
    options.path = exports.getElectronPath()
    if (process.env.CI) options.startTimeout = 30000;

    const app = new Application(options);
    return app.start().then(() => {
        assert.equal(app.isRunning(), true);
        chaiAsPromised.transferPromiseness = app.transferPromiseness;
        return app;
    })
};

exports.stopApplication = (app) => {
    if (!app || !app.isRunning()) return;

    return app.stop().then(() => {
        assert.equal(app.isRunning(), false);
    })
};