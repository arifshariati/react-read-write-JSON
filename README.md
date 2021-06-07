# react-read-write-JSON

Times in come in handdy in react Js applications where configuration setting from react js front end components needs to be persistent with json files rather persistent with database like mongo to reduce number of transactions.

However, react js directly can not handle file system functionaly, for which Node js express comes in handy, where simple route for reading and wrting json files and do the job.

[Checkout DEMO](https://react-read-write-json.netlify.app/)
## Folder structure
for this sake of this example, we have kept out setting folder outside our backend project;

```
const default_path = `${path.join(__dirname, '../../setting')}/`;
```

## Module - reading and wrting JSON files

This is the core module for reading and writing JSON files in setting folder. 

```
const fs = require('fs');
const path = require('path');

const default_path = `${path.join(__dirname, '../../setting')}/`;

module.exports = {

    fileExists : (fileName) => {
        return new Promise((resolve) => {
            fs.access(`${default_path}${fileName}`,fs.F_OK,(error) => {
                error ? resolve(false) : resolve(true);
            });
        });
    },
    readJSON : (fileName, cb) => {

        fs.readFile(`${default_path}${fileName}`, (err, fileData) => {
    
            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData);
                
                return cb && cb(null, object);
            } catch(err) {
                return cb && cb(err)
            }
            
        });
    },
    writeJSON: (fileName, data) => {
        const jsonString = JSON.stringify(data,null,4);

        return new Promise((resolve) => {
            fs.writeFile(`${default_path}${fileName}`, jsonString, error => {
                error ? resolve(false) : resolve(true);
            });
        });
        
    }
};
```

## How to use ?

clone project in your local machine, and get started checking out functionalities;

```
npm start
```

Cheers!