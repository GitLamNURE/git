import { Document, Schema, model, Model } from 'mongoose';

interface IUserTokens extends Document {
  user_id: string;
  github: {
    code: string;
    access_token: string;
  };
}

const UserTokensSchema = new Schema({
  user_id: { type: String, required: true },
  github: {
    code: { type: String, required: true },
    access_token: { type: String, required: true },
  },
});

export const UserTokens: Model<IUserTokens> = model(
  'UserTokens',
  UserTokensSchema,
);
