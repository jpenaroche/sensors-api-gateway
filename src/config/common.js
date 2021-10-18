import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  dev: process.env.ENV === 'development',
  env: process.env.ENV,
  path: {
    static: __dirname + '/../../../static',
    uploads: __dirname + '/../../../static/uploads',
  },
  host: process.env.HOST,
  port: process.env.PORT,
};
