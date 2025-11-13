/*
import { Schema, model, Document, Types } from 'mongoose';

interface IOrder extends Document {
  ব্যবহারকারী: Types.ObjectId;
  অর্ডারআইডি: string;
  পণ্যসমূহ: {
    পণ্য: Types.ObjectId;
    পরিমাণ: number;
    মূল্য: number;
  }[];
  মোটমূল্য: number;
  ডেলিভারিচার্জ: number;
  শিপিংঠিকানা: {
    নাম: string;
    ফোন: string;
    বিস্তারিত: string;
    উপজেলা: string;
    জেলা: string;
  };
  স্ট্যাটাস: 'প্রক্রিয়াধীন' | 'শিপিং-এ' | 'পৌঁছে গেছে' | 'বাতিল';
  পেমেন্টপদ্ধতি: 'ক্যাশ অন ডেলিভারি' | 'অনলাইন পেমেন্ট';
  পেমেন্টস্ট্যাটাস: 'পেইড' | 'আনপেইড';
  অর্ডারেরতারিখ: Date;
}

const OrderSchema = new Schema<IOrder>({
  ব্যবহারকারী: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  অর্ডারআইডি: { type: String, required: true, unique: true },
  পণ্যসমূহ: [{
    পণ্য: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    পরিমাণ: { type: Number, required: true },
    মূল্য: { type: Number, required: true }
  }],
  মোটমূল্য: { type: Number, required: true },
  ডেলিভারিচার্জ: { type: Number, required: true },
  শিপিংঠিকানা: {
    নাম: { type: String, required: true },
    ফোন: { type: String, required: true },
    বিস্তারিত: { type: String, required: true },
    উপজেলা: { type: String, required: true },
    জেলা: { type: String, required: true }
  },
  স্ট্যাটাস: { type: String, enum: ['প্রক্রিয়াধীন', 'শিপিং-এ', 'পৌঁছে গেছে', 'বাতিল'], default: 'প্রক্রিয়াধীন' },
  পেমেন্টপদ্ধতি: { type: String, enum: ['ক্যাশ অন ডেলিভারি', 'অনলাইন পেমেন্ট'], required: true },
  পেমেন্টস্ট্যাটাস: { type: String, enum: ['পেইড', 'আনপেইড'], default: 'আনপেইড' },
  অর্ডারেরতারিখ: { type: Date, default: Date.now }
});

// The model will be created in your Node.js backend like this:
// export const OrderModel = model<IOrder>('Order', OrderSchema);
*/