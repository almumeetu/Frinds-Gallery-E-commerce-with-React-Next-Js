import React from 'react';

export const DiscountMarquee: React.FC = () => {
    const discounts = [
        { icon: '🎉', text: '৫০% পর্যন্ত ছাড় সব পণ্যে!' },
        { icon: '🛍️', text: 'প্রথম অর্ডারে অতিরিক্ত ২০% অফ' },
        { icon: '⭐', text: 'ফ্রি ডেলিভারি ৫০০ টাকার উপরে' },
        { icon: '💝', text: 'বিশেষ বান্ডল ডিল এখন লাইভ' },
        { icon: '🎁', text: 'প্রতি ক্রয়ে ফ্রি গিফট!' },
    ];

    return (
        <div className="w-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 overflow-hidden shadow-lg relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                @keyframes pulse-glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
                    }
                    50% {
                        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
                    }
                }
                
                .marquee-content {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    gap: 3.5rem;
                    white-space: nowrap;
                }
                
                .marquee-content:hover {
                    animation-play-state: paused;
                }
                
                .marquee-item {
                    flex-shrink: 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    animation: pulse-glow 3s ease-in-out infinite;
                }
                
                .marquee-icon {
                    font-size: 1.5rem;
                    display: inline-block;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.15);
                    }
                }
            `}</style>
            <div className="py-4 sm:py-5 relative z-10">
                <div className="marquee-content">
                    {discounts.map((discount, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-icon">{discount.icon}</span>
                            <span>{discount.text}</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {discounts.map((discount, index) => (
                        <div key={`dup-${index}`} className="marquee-item">
                            <span className="marquee-icon">{discount.icon}</span>
                            <span>{discount.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
