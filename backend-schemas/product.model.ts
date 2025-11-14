/**
 * ============================================================
 *                      BACKEND SCHEMA
 * ============================================================
 * This file defines the Mongoose schema for the 'Product' collection.
 * It should be implemented in your Node.js/Express backend application.
 *
 * Fields:
 * - নাম (name): String, required, indexed. The name of the product.
 * - বিবরণ (description): String, required. Detailed description of the product.
 * - মূল্য (price): Number, required. The selling price of the product.
 * - ছাড়মূল্য (originalPrice): Number, optional. The original price before discount.
 * - ছবি (images): Array of strings, required. URLs to product images.
 * - ক্যাটাগরি (category): String, required, indexed. The category ID or slug.
 * - স্টকপরিমাণ (stock): Number, required, default 0. The available quantity in stock.
 * - তৈরিরতারিখ (createdAt): Date, defaults to current date. Product creation timestamp.
 *
 * Example Usage in Backend:
 * import mongoose from 'mongoose';
 * const { Schema, model } = mongoose;
 * 
 * // (Paste the schema definition here)
 *
 * export const ProductModel = model<IProduct>('Product', ProductSchema);
 * ============================================================
 */
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
