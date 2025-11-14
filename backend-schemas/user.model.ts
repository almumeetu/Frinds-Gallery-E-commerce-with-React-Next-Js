/**
 * ============================================================
 *                      BACKEND SCHEMA
 * ============================================================
 * This file defines the Mongoose schema for the 'User' collection.
 * It should be implemented in your Node.js/Express backend application.
 *
 * Fields:
 * - নাম (name): String, required. User's full name.
 * - ফোন (phone): String, required, unique. User's phone number, used for login/identification.
 * - পাসওয়ার্ড (password): String, required. Hashed password for user authentication.
 * - ঠিকানা (addresses): Array of address objects.
 *   - বিস্তারিত (details): Full address string.
 *   - উপজেলা (upazila): Sub-district.
 *   - জেলা (district): District.
 * - নিবন্ধনএরতারিখ (joinDate): Date, defaults to current date. The date the user registered.
 *
 * Example Usage in Backend:
 * import mongoose from 'mongoose';
 * const { Schema, model } = mongoose;
 * 
 * // (Paste the schema definition here)
 *
 * export const UserModel = model<IUser>('User', UserSchema);
 * ============================================================
 */
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
