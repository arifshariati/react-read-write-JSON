const fs = require('fs');
const path = require('path');

const default_path = `${path.join(__dirname, '../../setting')}/`;

module.exports = {

    readDir: (err, cb) => {
        fs.readdir(default_path, (err, files) => {
            if (err) {
                return cb && cb(err);
            }
            return cb && cb(null, files);
        });
    },
    fileExists: (fileName) => {
        return new Promise((resolve) => {
            fs.access(`${default_path}${fileName}`, fs.F_OK, (error) => {
                error ? resolve(false) : resolve(true);
            });
        });
    },
    removeFile:(fileName) => {
        return new Promise((resolve) => {
            fs.unlink(`${default_path}${fileName}`, (error) => {
                error ? resolve(false) : resolve(true);
            });
        });
    },
    readJSON: (fileName, cb) => {

        fs.readFile(`${default_path}${fileName}`, (err, fileData) => {

            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData);

                return cb && cb(null, object);
            } catch (err) {
                return cb && cb(err)
            }

        });
    },
    writeJSON: (fileName, data) => {
        const jsonString = JSON.stringify(data, null, 4);

        return new Promise((resolve) => {
            fs.writeFile(`${default_path}${fileName}`, jsonString, error => {
                error ? resolve(false) : resolve(true);
            });
        });

    }
};