import React from 'react';
import { mockReviews } from '../constants';
import type { Review } from '../types';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center h-full">
            <span className="text-5xl text-brand-green -mt-12">❝</span>
            <blockquote className="text-gray-600 italic flex-grow">"{review.quote}"</blockquote>
            <div className="mt-4">
                <p className="font-semibold text-gray-800">{review.author}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
            </div>
        </div>
    );
};

export const ReviewsSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">ক্রেতাদের মতামত</h2>
                    <p className="mt-2 text-gray-500">আমাদের সার্ভিস নিয়ে ক্রেতারা যা বলেন</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    {mockReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};
