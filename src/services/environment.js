const fs = require('fs');

const ENV = [
    {
        name: 'NGROK_AUTHTOKEN',
        required: true
    },
    {
        name: 'SERVICE_HOST',
        required: true
    },
    {
        name: 'SERVICE_PORT',
        required: true
    },
    {
        name: 'PORT',
        required: false,
        defaultValue: 3000
    }
];

global.Environment = {};

for (const { name, required, defaultValue } of ENV) {
    const file = `${name}_FILE`;
    const isSet = Boolean(process.env[name]);
    const isFileSet = Boolean(process.env[file]);

    if (isSet && isFileSet) throw new Error(`Environment variable ${name} set as value and file`);

    if (!isSet && !isFileSet) {
        if (required) throw new Error(`Required environment variable ${name} not set`);
        
        global.Environment[name] = defaultValue || null;
        continue;
    }

    if (isSet) {
        global.Environment[name] = process.env[name];
        continue;
    }

    const path = process.env[file];

    if (!fs.existsSync(path)) throw new Error(`Environment file at ${file} not found`);

    const value = fs.readFileSync(path, 'utf8');

    global.Environment[name] = value;
}