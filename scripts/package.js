const packager = require('electron-packager');

const options64 = {
    dir: '.',
    prune: false,
    platform: 'win32',
    name: 'test app',
    out: 'packages',
    overwrite: true,
    arch: 'x64'
};

const options32 = {
    dir: '.',
    prune: false,
    platform: 'win32',
    name: 'test app',
    out: 'packages',
    overwrite: true,
    arch: 'ia32'
};

packager(options32, (err, appPaths) => {
   console.log('err', err);
   console.log('appPaths', appPaths);
});

packager(options64, (err, appPaths) => {
    console.log('err', err);
    console.log('appPaths', appPaths);
});