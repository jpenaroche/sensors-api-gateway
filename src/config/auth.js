import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
};
