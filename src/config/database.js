import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
};
