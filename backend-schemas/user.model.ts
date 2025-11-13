
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  নাম: string;
  ফোন: string;
  পাসওয়ার্ড: string;
  ঠিকানা: {
    বিস্তারিত: string;
    উপজেলা: string;
    জেলা: string;
  }[];
  নিবন্ধনএরতারিখ: Date;
}

const UserSchema = new Schema<IUser>({
  নাম: { type: String, required: true },
  ফোন: { type: String, required: true, unique: true },
  পাসওয়ার্ড: { type: String, required: true },
  ঠিকানা: [{
    বিস্তারিত: { type: String, required: true },
    উপজেলা: { type: String, required: true },
    জেলা: { type: String, required: true }
  }],
  নিবন্ধনএরতারিখ: { type: Date, default: Date.now }
});

// The model will be created in your Node.js backend like this:
// export const UserModel = model<IUser>('User', UserSchema);
