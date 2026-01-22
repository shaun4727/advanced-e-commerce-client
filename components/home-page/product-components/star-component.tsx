import { Star } from 'lucide-react';

export const StartRating = ({
    rating,
    reviewCount,
}: {
    rating: number;
    reviewCount: number;
}) => {
    return (
        <div>
            <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-3 w-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                    ))}
                </div>
                <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
        </div>
    );
};
