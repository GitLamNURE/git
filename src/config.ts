import { config as fromFile } from 'dotenv';

fromFile({ path: './.env' });

export const config = {
  port: process.env.PORT || 3000,

  mongoUri: process.env.MONGO_URI,

  github: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  },

  authServiceURL: process.env.AUTH_SERVICE_URL,
};
