const helpers = require('./global-setup');

describe('wait for second window to be accessible', () => {

    const appPath = 'packages/testapp-darwin-x64/testapp.app/Contents/MacOS/testapp';
    let app;

    beforeEach((done) => {
        app = helpers.startApplication(appPath, done);
    });

    afterEach((done) => {
        helpers.stopApplication(app, done);
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