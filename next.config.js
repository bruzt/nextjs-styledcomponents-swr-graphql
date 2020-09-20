const withImages = require('next-images');
const dotenv = require('dotenv');

let env;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

module.exports = withImages({
    target: "serverless",
    env: {
        BACKEND_URL: process.env.BACKEND_URL
    }
});
