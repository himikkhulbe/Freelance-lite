import React from 'react'
import { Star } from 'lucide-react';

function RenderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                    ? 'fill-yellow-200 text-yellow-400'
                    : 'text-gray-300'
                }`}
        />
    ));
};

export default RenderStars