import { Skeleton } from '@/components/ui/skeleton';

export function SearchResultsSkeleton() {
    return (
        <div className="w-full flex flex-col space-y-8 animate-in fade-in duration-300">
            {/* 2. Product List Skeleton */}
            <div className="flex flex-col space-y-6">
                {/* We map 5 items to fill the screen space realistically */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-6">
                        {/* Image Placeholder (Square, gray bg) */}
                        <Skeleton className="size-20 md:size-24 rounded-md bg-muted" />

                        {/* Text Placeholders */}
                        <div className="flex-1 space-y-3">
                            {/* Title Line (Wider) */}
                            <Skeleton className="h-4 w-3/4 max-w-[300px] bg-muted" />
                            {/* Price Line (Shorter) */}
                            <Skeleton className="h-4 w-1/4 max-w-[100px] bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
