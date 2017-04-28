const helpers = require('./global-setup');

describe('wait for second window to be accessible', () => {

    const appPath = 'packages/testapp-darwin-x64/testapp.app/Contents/MacOS/testapp';
    //const appPath = 'packages/testapp-win32-x64/testapp.exe';
    let app;

    beforeEach((done) => {
        app = helpers.startApplication(appPath, done);
    });

    afterEach((done) => {
        helpers.stopApplication(app, done);
    });

    it('should have the correct title', (done) => {

        console.log('Waiting for both windows to be initialised..');
        app.client.waitUntilWindowLoaded().waitUntil(() => {
            return app.client.getWindowCount().then((count) => {
                return count === 2;
            });
        }).then(() => {
            return app.client.browserWindow.getTitle();
        }).then((title) => {
            expect(title).toEqual('First window');
            console.log('Waiting for app window to be shown and loading window to be closed..');
            app.client.waitUntilWindowLoaded().waitUntil(() => {
                return app.client.getWindowCount().then((count) => {
                    return count === 1;
                });
            }).then(() => {
                return app.client.windowByIndex(0);
            }).then(() => {
                return app.client.browserWindow.getTitle()
            }).then((title) => {
                expect(title).toEqual('Second window');
                return app.client.click('.mybutton')
            }).then(() => {
                return app.client.getValue('.mytextfield');
            }).then((value) => {
                expect(value).toEqual('Clicked');
                done();
            });

        });
    });

});