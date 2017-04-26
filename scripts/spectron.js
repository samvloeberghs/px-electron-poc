const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');


// you'll have to change this!
let myPath = path.join(process.cwd(),'packages/testapp-darwin-x64/testapp.app/Contents/MacOS/testapp');

const app = new Application({
    path: myPath
});

app.start().then(function () {
    // Check if the window is visible
    return app.browserWindow.isVisible();
}).then(function (isVisible) {
    // Verify the window is visible
    assert.equal(isVisible, true)
}).then(function () {
    // Get the window's title
    return app.client.getTitle()
}).then(function (title) {
    // Verify the window's title
    assert.equal(title, 'First window')
}).then(function () {
    // Stop the application
    return app.stop();
}).catch(function (error) {
    // Log any failures
    console.error('Test failed', error.message);
});