import { Star } from 'lucide-react';

export const StarRating = ({
    rating,
    reviewCount,
}: {
    rating: number;
    reviewCount: number;
}) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                ))}
            </div>
            <span className="text-sm text-gray-500">
                ({reviewCount} Reviews)
            </span>
        </div>
    );
};
