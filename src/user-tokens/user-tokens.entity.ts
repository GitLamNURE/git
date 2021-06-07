import { Document, Schema, model, Model } from 'mongoose';

interface IUserTokens extends Document {
  userId: string;
  github: {
    code: string;
    accessToken: string;
  };
}

const UserTokensSchema = new Schema({
  userId: { type: String, required: true },
  github: {
    code: { type: String, required: true },
    accessToken: { type: String, required: true },
  },
});

export const UserTokens: Model<IUserTokens> = model(
  'UserTokens',
  UserTokensSchema,
);
