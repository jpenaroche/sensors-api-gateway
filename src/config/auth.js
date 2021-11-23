import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  password: process.env.STRATEGY_PASSWORD,
  provider: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      secret: process.env.AUTH0_SECRET,
    },
  },
};
