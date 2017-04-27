const packager = require('electron-packager');
const options = {
    dir: '.',
    prune: false,
    platform: 'win32',
    name: 'testapp',
    out: 'packages',
    overwrite: true,
    arch: ['x64', 'ia32']
};

packager(options, (err, appPaths) => {
   console.log('err', err);
   console.log('appPaths', appPaths);
});
