import { config as fromFile } from 'dotenv';

fromFile({ path: './.env' });

export const config = {
  port: process.env.PORT || 3000,

  // publicUrl: process.env.PUBLIC_URL,

  mongoUri: process.env.MONGO_URI,

  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },

  authServiceURL: process.env.AUTH_SERVICE_URL,
};
