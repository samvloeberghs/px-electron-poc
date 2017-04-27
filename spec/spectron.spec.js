const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');
const helpers = require('./global-setup');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('wait for second window to be accessible', () => {

    const appPath = path.join(process.cwd(), 'packages/testapp-darwin-x64/testapp.app/Contents/MacOS/testapp');
    let app;

    beforeEach((done) => {

        app = new Application({
            path: appPath
        });
        app.start().then(done);

    });

    afterEach((done) => {
        app.stop().then(() => {
            app = null;
            done();
        });
    });

    it('should have the correct title', (done) => {

        app.client.waitUntilWindowLoaded().waitUntil(() => {
            return app.client.getWindowCount().then((count) => {
                return count === 2
            });
        }).then(() => {
            return app.client.windowByIndex(1).getTitle();
        }).then((title) => {
            expect(title).toEqual('Second window');
            done();
        });

    });

});