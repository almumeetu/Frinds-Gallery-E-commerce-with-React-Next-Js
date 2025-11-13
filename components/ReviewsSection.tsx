import React from 'react';
import { mockReviews } from '../constants';
import type { Review } from '../types';

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = "" }) => {
  const roundedRating = Math.round(rating);
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < roundedRating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <img src={review.avatarUrl} alt={review.author} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-brand-yellow" />
                <div>
                    <p className="font-bold text-lg text-gray-800">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                </div>
            </div>
            <StarRating rating={review.rating} className="mb-4" />
            <blockquote className="text-gray-600 italic relative flex-grow">
                <span className="absolute -top-3 -left-4 text-6xl text-gray-100 font-serif">“</span>
                <p className="z-10 relative">{review.quote}</p>
            </blockquote>
        </div>
    );
};

export const ReviewsSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-20">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">ক্রেতাদের মতামত</h2>
                    <p className="mt-3 text-lg text-gray-600">আমাদের সার্ভিস নিয়ে ক্রেতারা যা বলেন</p>
                    <div className="mt-4 w-24 h-1 bg-brand-yellow mx-auto rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};