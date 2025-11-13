
import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  নাম: string;
  বিবরণ: string;
  মূল্য: number;
  ছাড়মূল্য?: number;
  ছবি: string[];
  ক্যাটাগরি: string;
  স্টকপরিমাণ: number;
  তৈরিরতারিখ: Date;
}

const ProductSchema = new Schema<IProduct>({
  নাম: { type: String, required: true, index: true },
  বিবরণ: { type: String, required: true },
  মূল্য: { type: Number, required: true },
  ছাড়মূল্য: { type: Number },
  ছবি: [{ type: String, required: true }],
  ক্যাটাগরি: { type: String, required: true, index: true },
  স্টকপরিমাণ: { type: Number, required: true, default: 0 },
  তৈরিরতারিখ: { type: Date, default: Date.now }
});

// The model will be created in your Node.js backend like this:
// export const ProductModel = model<IProduct>('Product', ProductSchema);
